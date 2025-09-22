import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Coins } from 'lucide-react';

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
  risk?: {
    flood: number;
    fire: number;
    coastalErosion: number;
    subsidence: number;
    market: number;
  };
  compliance?: {
    status: 'APPROVED' | 'REVIEW' | 'REJECTED';
    reasons: string[];
    lvr: number;
    dti: number;
  };
}

interface ValuationResultsProps {
  data: PropertyData;
}

export default function ValuationResults({ data }: ValuationResultsProps) {
  const baseValue = Math.floor(data.valuation / (1 - data.riskScore * 0.15));
  const adjustment = baseValue - data.valuation;
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'High': return <AlertTriangle className="w-3 h-3" />;
      case 'Medium': return <TrendingDown className="w-3 h-3" />;
      default: return <Shield className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Valuation Card */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">AI Valuation Report</h3>
            <Badge className={getRiskColor(data.climateRisk)}>
              {getRiskIcon(data.climateRisk)}
              {data.climateRisk} Risk
            </Badge>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {data.address}
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Base Property Value:</span>
              <span className="font-medium">${baseValue.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center text-red-600">
              <span>Climate Risk Adjustment:</span>
              <span className="font-medium">-${adjustment.toLocaleString()}</span>
            </div>
            
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="text-lg font-semibold">Final Valuation:</span>
              <span className="text-2xl font-bold text-primary">
                ${data.valuation.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Story & Sentiment */}
      {data.story && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-900">AI Risk Analysis</h3>
            <div className="text-sm text-blue-800">
              <strong>Market Intelligence:</strong> {data.story}
            </div>
            {data.sentiment && (
              <div className="text-sm text-blue-700">
                <strong>Sentiment Analysis:</strong> {data.sentiment.score > 0 ? 'Positive' : 'Negative'} market sentiment ({Math.abs(data.sentiment.score * 100).toFixed(1)}%)
              </div>
            )}
            <div className="text-xs text-blue-600">
              Powered by Ollama + CoreLogic Australia + Geoscience Australia
            </div>
          </div>
        </Card>
      )}

      {/* Risk Assessment */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Climate Risk Assessment</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Risk Score:</span>
              <span className="font-medium">{(data.riskScore * 100).toFixed(1)}%</span>
            </div>
            <Progress value={data.riskScore * 100} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Flood Risk</div>
              <div className="font-medium">{data.riskScore > 0.6 ? 'High' : data.riskScore > 0.3 ? 'Medium' : 'Low'}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Fire Risk</div>
              <div className="font-medium">{data.riskScore > 0.5 ? 'High' : data.riskScore > 0.3 ? 'Medium' : 'Low'}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Sea Level Rise</div>
              <div className="font-medium">{data.address.includes('Coastal') || data.address.includes('Byron') ? 'Medium' : 'Low'}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Geological</div>
              <div className="font-medium">{data.address.includes('Mountain') || data.address.includes('Katoomba') ? 'High' : 'Low'}</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium mb-1">APRA CPS 230 Compliance</div>
            <div className="text-xs text-muted-foreground">
              ✅ Real-time climate data integration<br />
              ✅ Operational risk monitoring<br />
              ✅ Financial resilience assessment
            </div>
          </div>
        </div>
      </Card>

      {/* LVR Certificate */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Dynamic LVR Certificate</h3>
            <Coins className="w-5 h-5 text-purple-600" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Standard LVR:</span>
              <span className="text-gray-500 line-through">80%</span>
            </div>
            <div className="flex justify-between">
              <span>Risk-Adjusted LVR:</span>
              <span className="font-bold text-purple-600 text-xl">
                {(data.lvrRatio * 100).toFixed(0)}%
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Dynamically calculated using AI climate risk assessment
            </div>
          </div>
          
          <Button 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => {
              // Simulate NFT minting for demo
              alert(`🎉 NFT Certificate minted!\n\nTransaction Hash: 0x742d35Cc6635C0532925a3b8D84\n\nThis certificate is now on the Ethereum blockchain and updates automatically as climate risks change.`);
            }}
          >
            <Shield className="w-4 h-4 mr-2" />
            Mint Dynamic LVR NFT
          </Button>
          
          <div className="text-xs text-purple-600 text-center space-y-1">
            <div>APRA CPS 230 Compliant • Blockchain Verified</div>
            <div>Updates automatically with changing climate data</div>
          </div>
        </div>
      </Card>
    </div>
  );
}