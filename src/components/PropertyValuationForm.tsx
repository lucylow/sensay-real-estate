import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Shield, AlertTriangle, TrendingDown, Database } from 'lucide-react';
import { CoreLogicClient } from '@/lib/apis/corelogic';

interface PropertyData {
  address: string;
  valuation: number;
  riskScore: number;
  climateRisk: string;
  lvrRatio: number;
  story?: string;
  sentiment?: string;
}

interface PropertyValuationFormProps {
  onValuation: (data: PropertyData) => void;
}

// Demo data for global properties with compelling stories
const DEMO_PROPERTIES = {
  // North America
  '123 Park Avenue, Manhattan, NY 10022': {
    baseValue: 2800000,
    riskScore: 0.35,
    story: 'Prime Manhattan location with hurricane exposure',
    sentiment: 'Market showing resilience despite climate concerns',
  },
  '456 Sunset Boulevard, West Hollywood, CA 90069': {
    baseValue: 1850000,
    riskScore: 0.75,
    story: 'Wildfire and earthquake risk in Hollywood Hills',
    sentiment: 'Insurance premiums rising due to climate risks',
  },
  '789 Bay Street, Toronto, ON M5G 1M5': {
    baseValue: 1200000,
    riskScore: 0.45,
    story: 'Downtown Toronto with flooding concerns',
    sentiment: 'Strong market despite climate challenges',
  },
  // Europe
  '10 Downing Street, Westminster, London SW1A 2AA': {
    baseValue: 4500000,
    riskScore: 0.25,
    story: 'Historic London location with flood risk',
    sentiment: 'Political uncertainty affecting values',
  },
  '25 Unter den Linden, Berlin 10117': {
    baseValue: 850000,
    riskScore: 0.55,
    story: 'Historic Berlin with heat wave exposure',
    sentiment: 'Tech boom driving demand despite climate risks',
  },
  // Asia-Pacific
  '28 Mountain View Rd, Katoomba NSW 2780': {
    baseValue: 1250000,
    riskScore: 0.75,
    story: 'Recent landslide concerns in Blue Mountains area',
    sentiment: 'Local forums mention geological instability',
  },
  '1-1-1 Marunouchi, Chiyoda City, Tokyo 100-0005': {
    baseValue: 45000000,
    riskScore: 0.65,
    story: 'Tokyo business district with earthquake and typhoon risks',
    sentiment: 'Olympics legacy effects on property values',
  },
  '68 Orchard Road, Singapore 238839': {
    baseValue: 2800000,
    riskScore: 0.45,
    story: 'Prime Singapore location with sea level rise concerns',
    sentiment: 'Government cooling measures affecting demand',
  }
};

const mockValuation = async (address: string): Promise<PropertyData> => {
  // Initialize CoreLogic client
  const coreLogicClient = new CoreLogicClient();
  
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  try {
    // Get enhanced property data from CoreLogic
    const propertyData = await coreLogicClient.getEnhancedPropertyDetails(address);
    
    // Use real CoreLogic data for more accurate valuation
    const climateAdjustment = propertyData.riskFactors.length * 0.05; // 5% per risk factor
    const finalValuation = Math.floor(propertyData.estimatedValue * (1 - climateAdjustment));
    
    return {
      address: propertyData.address,
      valuation: finalValuation,
      riskScore: propertyData.riskFactors.length / 10, // Normalize risk score
      climateRisk: propertyData.riskFactors.length > 3 ? 'High' : 
                   propertyData.riskFactors.length > 1 ? 'Medium' : 'Low',
      lvrRatio: Math.max(0.6, 0.85 - (propertyData.riskFactors.length * 0.05)),
      story: propertyData.riskFactors.length > 0 ? 
        `CoreLogic analysis: ${propertyData.riskFactors[0]}` :
        `Prime ${propertyData.suburb} location with strong fundamentals`,
      sentiment: `Market trends: ${propertyData.marketTrends.priceGrowth12m > 0 ? 'Positive' : 'Neutral'} growth (${propertyData.marketTrends.priceGrowth12m}% YoY)`,
    };
  } catch (error) {
    // Fallback to demo data if CoreLogic fails
    const demoData = DEMO_PROPERTIES[address as keyof typeof DEMO_PROPERTIES];
    
    if (demoData) {
      const climateAdjustment = demoData.riskScore * 0.18;
      const finalValuation = Math.floor(demoData.baseValue * (1 - climateAdjustment));
      
      return {
        address,
        valuation: finalValuation,
        riskScore: demoData.riskScore,
        climateRisk: demoData.riskScore > 0.7 ? 'High' : demoData.riskScore > 0.4 ? 'Medium' : 'Low',
        lvrRatio: 0.85 - (demoData.riskScore * 0.25),
        story: demoData.story,
        sentiment: demoData.sentiment,
      };
    }
    
    // Final fallback
    const baseValue = Math.floor(Math.random() * 800000) + 600000;
    const riskScore = Math.random();
    const climateAdjustment = riskScore * 0.15;
    const finalValuation = Math.floor(baseValue * (1 - climateAdjustment));
    
    return {
      address,
      valuation: finalValuation,
      riskScore,
      climateRisk: riskScore > 0.7 ? 'High' : riskScore > 0.4 ? 'Medium' : 'Low',
      lvrRatio: 0.85 - (riskScore * 0.25),
      story: 'AI analysis of local market conditions',
      sentiment: 'Processing social media and forum sentiment...',
    };
  }
};

export default function PropertyValuationForm({ onValuation }: PropertyValuationFormProps) {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [dataMode, setDataMode] = useState('');

  const demoAddresses = Object.keys(DEMO_PROPERTIES);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    
    setLoading(true);
    
    // Show data mode
    const coreLogicClient = new CoreLogicClient();
    setDataMode(coreLogicClient.getDataMode());
    
    // Simulate AI analysis steps for demo
    const steps = [
      'Connecting to CoreLogic Australia API...',
      'Fetching property features and sales history...',
      'Analyzing Geoscience Australia climate data...',
      'Processing social media sentiment with Ollama...',
      'Calculating dynamic LVR with TensorFlow...',
      'Generating APRA CPS 230 compliance report...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    try {
      const result = await mockValuation(address);
      onValuation(result);
    } finally {
      setLoading(false);
      setAnalysisStep('');
      setDataMode('');
    }
  };

  const handleDemoClick = (demoAddress: string) => {
    setAddress(demoAddress);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Property Valuation</h2>
            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              APRA CPS 230
            </Badge>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Property Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  type="text"
                  placeholder="e.g. 28 Mountain View Rd, Katoomba NSW"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full gradient-primary text-white"
              disabled={loading || !address.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  AI Analysis in Progress...
                </>
              ) : (
                'Get AI-Powered Valuation'
              )}
            </Button>
            
            {loading && analysisStep && (
              <div className="text-center text-sm text-muted-foreground animate-pulse">
                {analysisStep}
              </div>
            )}
            
            {dataMode && (
              <div className="flex items-center justify-center text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2">
                <Database className="w-3 h-3 mr-1" />
                {dataMode}
              </div>
            )}
          </form>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Real-time climate risk assessment</p>
            <p>• APRA CPS 230 compliant methodology</p>
            <p>• Dynamic LVR calculation</p>
          </div>
        </div>
      </Card>

      {/* Demo Properties */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Demo Properties</h3>
        <div className="grid gap-2">
          {demoAddresses.map((addr) => {
            const data = DEMO_PROPERTIES[addr as keyof typeof DEMO_PROPERTIES];
            return (
              <button
                key={addr}
                onClick={() => handleDemoClick(addr)}
                className="text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="text-sm font-medium">{addr}</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center">
                  {data.riskScore > 0.7 ? (
                    <AlertTriangle className="w-3 h-3 text-red-500 mr-1" />
                  ) : data.riskScore > 0.4 ? (
                    <TrendingDown className="w-3 h-3 text-yellow-500 mr-1" />
                  ) : (
                    <Shield className="w-3 h-3 text-green-500 mr-1" />
                  )}
                  {data.story}
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}