import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PropertySearch } from './PropertySearch';
import { PropertyDetails } from '@/components/PropertyDetails';
import PropertyMap from '@/components/PropertyMap';

import { EnhancedPropertyAnalytics } from '@/components/EnhancedPropertyAnalytics';
import { EnhancedRiskAnalysis } from '@/components/EnhancedRiskAnalysis';
import { APRAComplianceDashboard } from '@/components/APRAComplianceDashboard';
import { BlockchainDashboard } from '@/components/BlockchainDashboard';
import { ReportsPage } from '../reports/ReportsPage';
import { PricingPage } from '../pricing/PricingPage';
import { AIAssistant } from '@/components/AIAssistant';
import { AIPredictiveAnalytics } from '@/components/AIPredictiveAnalytics';
import { AIInsights } from '@/components/AIInsights';
import { SensayRealEstateChatbot } from '@/components/SensayRealEstateChatbot';
import { EnhancedSensayAssistant } from '@/components/EnhancedSensayAssistant';
import { MultilingualChatInterface } from '@/components/MultilingualChatInterface';
import { usePropertyAnalysis } from '@/hooks/usePropertyAnalysis';
import { COLLINS_STREET_MOCK_DATA } from '@/data/mockData';
import { WalletConnection } from '@/components/WalletConnection';

interface Property {
  address: string;
  coordinates: { lat: number; lng: number };
  riskData?: {
    flood?: string | number;
    fire?: string | number;
    coastal?: string | number;
  };
  [key: string]: unknown;
}

interface PropertyValuation {
  analysis_result?: {
    risk?: {
      flood?: string | number;
      fire?: string | number;
      coastalErosion?: string | number;
    };
  };
  [key: string]: unknown;
}

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [propertyValuation, setPropertyValuation] = useState<PropertyValuation | null>(null);
  
  const { 
    isLoading, 
    analysis,
    sentiment,
    marketSentiment,
    fireRisk,
    error,
    dataMode,
    apiHealth,
    analyzeProperty,
    checkAPIHealth,
    setDataMode
  } = usePropertyAnalysis();

  const handlePropertyAnalysis = async (address: string, propertyData?: Property): Promise<{ success: boolean; property?: Property; error?: string }> => {
    try {
      console.log('Analyzing property:', address, propertyData);
      
      // Always trigger the actual analysis
      await analyzeProperty(address);
      
      // Set property data based on input
      if (address.toLowerCase().includes('collins street') || propertyData === COLLINS_STREET_MOCK_DATA) {
        const newPropertyData: Property = {
          ...COLLINS_STREET_MOCK_DATA.propertyData,
          address,
          coordinates: { lat: -37.8136, lng: 144.9631 },
          riskData: {
            flood: COLLINS_STREET_MOCK_DATA.propertyAnalysis.analysis_result.risk.flood,
            fire: COLLINS_STREET_MOCK_DATA.propertyAnalysis.analysis_result.risk.fire,
            coastal: COLLINS_STREET_MOCK_DATA.propertyAnalysis.analysis_result.risk.coastalErosion
          }
        };
        setSelectedProperty(newPropertyData);
        setPropertyValuation(COLLINS_STREET_MOCK_DATA.propertyAnalysis);
        return { success: true, property: newPropertyData };
      } else {
        const newPropertyData: Property = propertyData || { 
          address,
          coordinates: { lat: -33.8688, lng: 151.2093 } // Default Sydney coordinates
        };
        setSelectedProperty(newPropertyData);
        setPropertyValuation(analysis);
        return { success: true, property: newPropertyData };
      }
    } catch (error) {
      console.error('Property analysis failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Analysis failed' 
      };
    }
  };
  
  React.useEffect(() => {
    checkAPIHealth();
  }, [checkAPIHealth]);
  

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'ai-insights', label: 'AI Insights' },
    { id: 'risk', label: 'Risk Analysis' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'compliance', label: 'APRA Compliance' },
    { id: 'reports', label: 'Reports' },
    { id: 'pricing', label: 'Pricing' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <PropertySearch onAnalyze={handlePropertyAnalysis} isLoading={isLoading} />
            {selectedProperty ? (
              <div className="mt-8 space-y-8">
                <PropertyDetails 
                  property={selectedProperty} 
                  valuation={propertyValuation}
                />
                <PropertyMap 
                  property={selectedProperty}
                />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2">
                    <EnhancedPropertyAnalytics 
                      analysis={analysis || propertyValuation}
                      sentiment={sentiment}
                      marketSentiment={marketSentiment}
                      property={selectedProperty}
                    />
                  </div>
                  <div className="space-y-6">
                    <EnhancedSensayAssistant 
                      property={selectedProperty}
                      analysis={analysis || propertyValuation}
                      className="h-[400px]"
                    />
                    <AIAssistant 
                      property={selectedProperty}
                      analysis={analysis || propertyValuation}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
                <div className="text-center py-20">
                  <div className="glass-card max-w-md mx-auto p-8 rounded-2xl shadow-lg">
                    <div className="w-16 h-16 gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏠</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Analyze</h3>
                    <p className="text-muted-foreground">Enter a property address above to unlock comprehensive AI-powered analysis</p>
                  </div>
                </div>
                <div>
                  <MultilingualChatInterface 
                    className="h-[500px]"
                  />
                </div>
              </div>
            )}
          </>
        );
      case 'ai-insights':
        return (
          <div className="space-y-8">
            <PropertySearch onAnalyze={handlePropertyAnalysis} isLoading={isLoading} />
            {selectedProperty ? (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                  <AIInsights 
                    property={selectedProperty}
                    analysis={analysis || propertyValuation}
                    marketData={marketSentiment}
                  />
                  <AIPredictiveAnalytics 
                    property={selectedProperty}
                    analysis={analysis || propertyValuation}
                  />
                </div>
                <div className="space-y-6">
                  <EnhancedSensayAssistant 
                    property={selectedProperty}
                    analysis={analysis || propertyValuation}
                    className="h-[300px]"
                  />
                  <AIAssistant 
                    property={selectedProperty}
                    analysis={analysis || propertyValuation}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="text-center py-20">
                  <div className="glass-card max-w-md mx-auto p-8 rounded-2xl shadow-lg">
                    <div className="w-16 h-16 gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">AI Insights Awaiting</h3>
                    <p className="text-muted-foreground">Enter a property address above to access advanced AI predictions and market intelligence</p>
                  </div>
                </div>
                <div>
                  <SensayRealEstateChatbot 
                    className="h-[500px]"
                  />
                </div>
              </div>
            )}
          </div>
        );
      case 'risk':
        return (
          <div className="space-y-8">
            <PropertySearch onAnalyze={handlePropertyAnalysis} isLoading={isLoading} />
            {selectedProperty ? (
              <div className="space-y-8">
                <PropertyDetails 
                  property={selectedProperty} 
                  valuation={propertyValuation}
                />
                <PropertyMap 
                  property={selectedProperty}
                />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2">
                    <EnhancedRiskAnalysis />
                  </div>
                  <div>
                    <EnhancedSensayAssistant 
                      property={selectedProperty}
                      analysis={analysis || propertyValuation}
                      className="h-[400px]"
                      context="risk-analysis"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="text-center py-20">
                  <div className="glass-card max-w-md mx-auto p-8 rounded-2xl shadow-lg">
                    <div className="w-16 h-16 gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Risk Analysis Ready</h3>
                    <p className="text-muted-foreground">Enter a property address above to view comprehensive climate and market risk assessment</p>
                  </div>
                </div>
                <div>
                  <SensayRealEstateChatbot 
                    className="h-[500px]"
                    context="risk-analysis"
                  />
                </div>
              </div>
            )}
          </div>
        );
        case 'blockchain':
          return <BlockchainDashboard analysis={analysis} />;
      case 'compliance':
        return <APRAComplianceDashboard />;
      case 'reports':
        return <ReportsPage />;
      case 'pricing':
        return <PricingPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="glass-card border-0 border-b border-border/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-propguard-blue to-propguard-orange bg-clip-text text-transparent">
                    PropGuard AI
                  </span>
                  <div className="text-xs text-muted-foreground">Property Intelligence Platform</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20 font-medium">
                ✓ APRA CPS 230 Compliant
              </Badge>
              <Badge variant="secondary" className="gradient-brand text-white border-0 font-medium shadow-sm">
                🤖 AI-Powered
              </Badge>
              <WalletConnection />
            </div>
          </div>
        </div>
      </header>

      <nav className="glass-card border-0 border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-propguard-orange text-propguard-orange bg-propguard-orange/5 shadow-sm'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground hover:bg-muted/50'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>
    </div>
  );
};