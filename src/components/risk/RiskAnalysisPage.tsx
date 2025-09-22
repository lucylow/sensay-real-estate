import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { COLLINS_STREET_MOCK_DATA } from '@/data/mockData';

export const RiskAnalysisPage: React.FC = () => {
  const riskData = {
    floodRisk: { score: 72, level: 'High', color: 'destructive' as const },
    fireRisk: { score: 45, level: 'Moderate', color: 'warning' as const },
    erosionRisk: { score: 38, level: 'Low', color: 'secondary' as const },
    cyclonesRisk: { score: 10, level: 'Very Low', color: 'secondary' as const }
  };
  const climateProjections = COLLINS_STREET_MOCK_DATA.climateProjections;
  const riskMitigation = COLLINS_STREET_MOCK_DATA.riskMitigation;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold mb-2">📈 Risk Analysis Tools</h2>
        <p className="text-muted-foreground">Advanced analytics for: 456 Collins St, Melbourne VIC 3000</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Risk Visualizations */}
        <div className="space-y-6">
          {/* Risk Heatmap Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">🔵 Risk Heatmap Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-3">Risk Assessment</h4>
                <div className="space-y-3">
                  <div className="flex items-end space-x-4">
                    <div className="bg-orange-400 h-32 w-16 rounded-t flex items-end justify-center pb-2">
                      <span className="text-white text-xs font-bold">66.7%</span>
                    </div>
                    <div className="bg-blue-400 h-16 w-16 rounded-t flex items-end justify-center pb-2">
                      <span className="text-white text-xs font-bold">28.4%</span>
                    </div>
                    <div className="bg-teal-400 h-4 w-16 rounded-t flex items-end justify-center pb-1">
                      <span className="text-white text-xs">1.4%</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8 text-xs text-muted-foreground">
                    <span>Flood</span>
                    <span>Fire</span>
                    <span>Coastal Erosion</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Projection Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="mr-2">⏰</span>
                Risk Projection Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 relative">
                <div className="absolute inset-0 flex items-end">
                  <svg viewBox="0 0 300 100" className="w-full h-full">
                    <polyline
                      points="20,80 80,70 140,65 200,60 260,55"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      fill="none"
                      markerEnd="url(#arrow)"
                    />
                    <circle cx="80" cy="70" r="3" fill="#3b82f6" />
                    <circle cx="140" cy="65" r="3" fill="#3b82f6" />
                    <circle cx="200" cy="60" r="3" fill="#3b82f6" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                  <span>2024</span>
                  <span>2025</span>
                  <span>2026</span>
                  <span>2027</span>
                  <span>2030</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Flood risk projection through 2030 (based on climate models)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Climate Risk Projections */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Climate Risk Projections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Flood Risk</span>
                  <span className="font-bold">67%</span>
                </div>
                <Progress value={67} className="h-3 bg-yellow-200">
                  <div className="h-full bg-yellow-500 rounded-full" style={{width: '67%'}} />
                </Progress>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Fire Risk</span>
                  <span className="font-bold">28%</span>
                </div>
                <Progress value={28} className="h-3 bg-green-200">
                  <div className="h-full bg-green-500 rounded-full" style={{width: '28%'}} />
                </Progress>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Coastal Erosion Risk</span>
                  <span className="font-bold">1%</span>
                </div>
                <Progress value={1} className="h-3 bg-green-200">
                  <div className="h-full bg-green-500 rounded-full" style={{width: '1%'}} />
                </Progress>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Subsidence Risk</span>
                  <span className="font-bold">12%</span>
                </div>
                <Progress value={12} className="h-3 bg-green-200">
                  <div className="h-full bg-green-500 rounded-full" style={{width: '12%'}} />
                </Progress>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Market Risk</span>
                  <span className="font-bold">51%</span>
                </div>
                <Progress value={51} className="h-3 bg-yellow-200">
                  <div className="h-full bg-yellow-500 rounded-full" style={{width: '51%'}} />
                </Progress>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Risk Mitigation Strategies</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Flood-resistant construction materials</li>
                  <li>• Defensible space around property</li>
                  <li>• Stormwater management system</li>
                  <li>• Insurance premium discounts available</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};