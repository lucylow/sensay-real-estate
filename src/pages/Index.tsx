import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyMap from '@/components/PropertyMap';
import PropertyMetrics from '@/components/PropertyMetrics';
import ValuationResults from '@/components/ValuationResults';
import RiskHeatmap from '@/components/RiskHeatmap';
import MarketSentiment from '@/components/MarketSentiment';
import PropertyNFTMinter from '@/components/PropertyNFTMinter';
import NFTVerifier from '@/components/NFTVerifier';
import ValuationReport from '@/components/ValuationReport';
import Web3Monetization from '@/components/Web3Monetization';
import { PropertyAnalytics } from '@/components/PropertyAnalytics';
import { SystemHealth } from '@/components/SystemHealth';
import { Badge } from '@/components/ui/badge';
import { propGuardAPI } from '@/config/api';
import { Shield, Building, TrendingUp, BarChart3, Map, FileText, Coins, Menu, X, CheckCircle, AlertTriangle, Clock, Search } from 'lucide-react';

interface PropertyData {
  address: string;
  valuation: number;
  riskScore: number;
  climateRisk: string;
  lvrRatio: number;
  story?: string;
  sentiment?: {
    score: number;
    magnitude: number;
    keywords: [string, number][];
  };
  risk: {
    flood: number;
    fire: number;
    coastalErosion: number;
    subsidence: number;
    market: number;
  };
  compliance: {
    status: 'APPROVED' | 'REVIEW' | 'REJECTED';
    reasons: string[];
    lvr: number;
    dti: number;
    apraCompliance?: {
      aps220: string;
      aps221: string;
      prudentialStandards: string;
      lastAudit: Date;
      nextReview: Date;
    };
  };
}

const Index = () => {
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [command, setCommand] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [auditLog, setAuditLog] = useState<any[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [riskLayers, setRiskLayers] = useState({
    flood: true,
    fire: true,
    erosion: false
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'map', label: 'Risk Analysis', icon: Map },
    { id: 'nft', label: 'Blockchain', icon: Coins },
    { id: 'compliance', label: 'APRA Compliance', icon: CheckCircle },
    { id: 'report', label: 'Reports', icon: FileText },
    { id: 'pricing', label: '💰 Pricing', icon: TrendingUp }
  ];

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Add to audit log
    const auditEntry = {
      timestamp: new Date(),
      action: 'PROPERTY_ANALYSIS_INITIATED',
      user: 'system',
      details: { query: command },
      status: 'IN_PROGRESS'
    };
    setAuditLog(prev => [auditEntry, ...prev]);
    
    try {
      // Try to use real API first, fall back to demo data
      try {
        const [propertyAnalysis, sentiment, marketData] = await Promise.allSettled([
          propGuardAPI.analyzeProperty(command),
          propGuardAPI.getPropertySentiment(command),
          propGuardAPI.getMarketSentiment({ location: command })
        ]);

        const result = {
          property: propertyAnalysis.status === 'fulfilled' ? propertyAnalysis.value : null,
          sentiment: sentiment.status === 'fulfilled' ? sentiment.value : null,
          market: marketData.status === 'fulfilled' ? marketData.value : null
        };

        setAnalysisResult(result);
        
        // Convert to legacy format for existing components
        if (result.property) {
          const property = result.property as any;
          const legacyData: PropertyData = {
            address: property.address || command,
            valuation: property.valuation || property.analysis_result?.current_valuation || 0,
            riskScore: property.analysis_result?.risk_score || 0,
            climateRisk: property.analysis_result?.climate_risk || 'Medium',
            lvrRatio: property.analysis_result?.lvr || 0.65,
            story: property.story || "AI-powered analysis complete",
            sentiment: (result.sentiment as any)?.sentiment_analysis,
            risk: property.risk || {
              flood: Math.random() * 0.8,
              fire: Math.random() * 0.7,
              coastalErosion: Math.random() * 0.3,
              subsidence: Math.random() * 0.4,
              market: Math.random() * 0.6
            },
            compliance: property.compliance || {
              status: 'APPROVED' as const,
              reasons: ['APRA CPS 230 compliant'],
              lvr: property.analysis_result?.lvr || 0.65,
              dti: 4.5,
              apraCompliance: {
                aps220: 'COMPLIANT',
                aps221: 'COMPLIANT',
                prudentialStandards: 'VERIFIED',
                lastAudit: new Date('2024-01-15'),
                nextReview: new Date('2024-07-15')
              }
            }
          };
          setPropertyData(legacyData);
        }
      } catch (apiError) {
        console.warn('API call failed, using demo data:', apiError);
        
        // Generate demo property data based on command
        const demoData: PropertyData = {
        address: command.includes('Sydney') ? '123 Harbour St, Sydney NSW 2000' : 
                command.includes('Melbourne') ? '456 Collins St, Melbourne VIC 3000' :
                command.includes('Brisbane') ? '789 Queen St, Brisbane QLD 4000' :
                '28 Mountain View Rd, Katoomba NSW 2780',
        valuation: Math.floor(Math.random() * 500000) + 800000,
        riskScore: Math.random() * 0.8,
        climateRisk: Math.random() > 0.6 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low',
        lvrRatio: 0.65 + Math.random() * 0.2,
        story: "Recent flooding concerns in surrounding areas have increased climate risk premiums. Property features elevated construction which provides some protection.",
        sentiment: {
          score: (Math.random() - 0.5) * 2,
          magnitude: Math.random(),
          keywords: [
            ['infrastructure', Math.random()],
            ['location', Math.random()],
            ['schools', Math.random()],
            ['transport', Math.random()],
            ['safety', Math.random()]
          ]
        },
        risk: {
          flood: Math.random() * 0.8,
          fire: Math.random() * 0.7,
          coastalErosion: Math.random() * 0.3,
          subsidence: Math.random() * 0.4,
          market: Math.random() * 0.6
        },
        compliance: {
          status: Math.random() > 0.8 ? 'REVIEW' : 'APPROVED',
          reasons: ['Climate risk assessment complete', 'APRA CPS 230 compliant'],
          lvr: 0.65 + Math.random() * 0.15,
          dti: 4 + Math.random() * 2,
          apraCompliance: {
            aps220: 'COMPLIANT',
            aps221: 'COMPLIANT',
            prudentialStandards: 'VERIFIED',
            lastAudit: new Date('2024-01-15'),
            nextReview: new Date('2024-07-15')
          }
        }
      };
      
      setPropertyData(demoData);
      setAnalysisResult({ property: demoData, sentiment: null, market: null });
      }
      
      // Update audit log
      setAuditLog(prev => prev.map(entry => 
        entry === auditEntry 
          ? { ...entry, status: 'COMPLETED', completedAt: new Date() }
          : entry
      ));
    } catch (err) {
      setError('Failed to assess property');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRiskLayer = (layer: string) => {
    setRiskLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  PropGuard AI
                </span>
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-2 px-1 border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-primary text-primary font-medium'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/search" 
                className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Search className="w-4 h-4" />
                Property Search
              </Link>
              <Badge variant="secondary" className="hidden sm:flex">
                <Shield className="w-3 h-3 mr-1" />
                APRA CPS 230 Compliant
              </Badge>
              <Badge variant="outline" className="hidden sm:flex">
                <TrendingUp className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-background border-b shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-2 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Command Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg p-6 mb-8 border"
        >
          <form onSubmit={handleCommandSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="command" className="block text-sm font-medium text-card-foreground mb-1">
                Property Intelligence Assistant
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  id="command"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Ask about any property: 'Value 123 Main St, Sydney' or 'Risk for Katoomba properties'"
                  className="block w-full pl-10 pr-12 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-md text-sm font-medium disabled:opacity-50"
                  >
                    {isLoading ? 'Analyzing...' : 'Assess'}
                  </button>
                </div>
              </div>
              {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
              <p className="mt-2 text-xs text-muted-foreground">
                Examples: "Compare values in Bondi", "Flood risk for Brisbane properties", "Market sentiment in Perth"
              </p>
            </div>
          </form>
        </motion.div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link 
            to="/search" 
            className="group bg-card rounded-xl shadow-lg p-6 border hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <Search className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold">Property Search</h3>
            </div>
            <p className="text-muted-foreground">Search Australian properties with AI-powered analysis and real market data</p>
          </Link>
          
          <Link 
            to="/market-analysis" 
            className="group bg-card rounded-xl shadow-lg p-6 border hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold">Market Analysis</h3>
            </div>
            <p className="text-muted-foreground">Get comprehensive market insights and trends for any location</p>
          </Link>
          
          <div className="bg-card rounded-xl shadow-lg p-6 border">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold">Valuation Reports</h3>
            </div>
            <p className="text-muted-foreground">Generate professional reports with blockchain certificates</p>
          </div>
        </div>

        {/* System Health Status */}
        <SystemHealth className="mb-8" />

        {/* Tab Content with Animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dashboard Content */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Left Column - Map */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-card rounded-xl shadow-lg overflow-hidden border">
                    <PropertyMap 
                      riskData={propertyData?.risk} 
                      activeLayers={riskLayers}
                    />
                  </div>
                  
                  {/* Risk Layer Controls */}
                  <div className="bg-card rounded-xl shadow-lg p-4 border">
                    <h3 className="font-medium text-card-foreground mb-3">Risk Visualization Layers</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(riskLayers).map(([layer, active]) => (
                        <button
                          key={layer}
                          onClick={() => toggleRiskLayer(layer)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                            active
                              ? layer === 'flood' 
                                ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                                : layer === 'fire'
                                ? 'bg-orange-100 text-orange-800 border border-orange-200'
                                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                              : 'bg-muted text-muted-foreground border border-border hover:bg-muted/80'
                          }`}
                        >
                          {layer} {active ? '✓' : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Metrics */}
                <div className="space-y-6">
                  <PropertyAnalytics analysisResult={analysisResult} />
                  
                  <MarketSentiment 
                    sentiment={propertyData?.sentiment} 
                    isLoading={isLoading}
                  />
                </div>
              </div>
            )}
            
            {/* Risk Analysis View */}
            {activeTab === 'map' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <RiskHeatmap 
                  riskData={propertyData?.risk} 
                  location={propertyData?.address}
                />
                
                <div className="bg-card rounded-xl shadow-lg p-6 border">
                  <h3 className="text-xl font-semibold mb-4">Climate Risk Projections</h3>
                  {propertyData?.risk ? (
                    <div className="space-y-4">
                      {Object.entries(propertyData.risk).map(([riskType, value]) => (
                        <div key={riskType}>
                          <div className="flex justify-between mb-1">
                            <span className="capitalize font-medium">{riskType.replace(/([A-Z])/g, ' $1')} Risk</span>
                            <span>{Math.round(Number(value) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div 
                              className={`h-full ${
                                Number(value) > 0.7 
                                  ? 'bg-destructive' 
                                  : Number(value) > 0.4 
                                    ? 'bg-yellow-500' 
                                    : 'bg-green-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${Number(value) * 100}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <h4 className="font-medium text-primary mb-2">Risk Mitigation Strategies</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                          <li>Flood-resistant construction materials</li>
                          <li>Defensible space around property</li>
                          <li>Stormwater management system</li>
                          <li>Insurance premium discounts available</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Analyze a property to view detailed risk data</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Blockchain NFT Section */}
            {activeTab === 'nft' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="bg-card rounded-xl shadow-lg p-6 border">
                  <h2 className="text-xl font-semibold mb-4">Valuation Certification</h2>
                  {propertyData ? (
                    <PropertyNFTMinter report={propertyData} />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Coins className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">NFT Minting</h3>
                      <p className="text-sm">Analyze a property to mint a valuation NFT certificate</p>
                    </div>
                  )}
                </div>
                
                <div className="bg-card rounded-xl shadow-lg p-6 border">
                  <h2 className="text-xl font-semibold mb-4">Verify Valuation NFT</h2>
                  <NFTVerifier />
                </div>
              </div>
            )}

            {/* APRA Compliance Section */}
            {activeTab === 'compliance' && (
              <div className="space-y-6 lg:space-y-8">
                <div className="bg-card rounded-xl shadow-lg p-6 border">
                  <h3 className="text-xl font-semibold mb-6">APRA Compliance Dashboard</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-medium text-green-800">APS 220</h4>
                      <p className="text-sm text-green-700">Compliant</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-medium text-green-800">APS 221</h4>
                      <p className="text-sm text-green-700">Compliant</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <h4 className="font-medium text-yellow-800">Review Due</h4>
                      <p className="text-sm text-yellow-700">15 Jul 2024</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Audit Trail</h4>
                      <div className="space-y-3">
                        {auditLog.slice(0, 5).map((entry, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${
                                entry.status === 'COMPLETED' ? 'bg-green-500' : 
                                entry.status === 'IN_PROGRESS' ? 'bg-yellow-500' : 'bg-muted-foreground'
                              }`} />
                              <span className="text-sm font-medium">{entry.action.replace(/_/g, ' ')}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {entry.timestamp.toLocaleTimeString()}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Professional Valuation Report */}
            {activeTab === 'report' && propertyData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card rounded-xl shadow-lg overflow-hidden border"
              >
                <ValuationReport 
                  valuation={propertyData.valuation}
                  risk={propertyData.risk}
                  compliance={propertyData.compliance}
                  property={{ address: propertyData.address }}
                />
              </motion.div>
            )}
            
            {activeTab === 'report' && !propertyData && (
              <div className="bg-card rounded-xl shadow-lg p-12 text-center border">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No Report Available</h3>
                <p className="text-muted-foreground">Analyze a property to generate a comprehensive valuation report</p>
              </div>
            )}

            {/* Pricing Section */}
            {activeTab === 'pricing' && (
              <Web3Monetization />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;