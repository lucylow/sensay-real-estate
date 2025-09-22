import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { COLLINS_STREET_MOCK_DATA } from '@/data/mockData';

export const RiskVisualization: React.FC = () => {
  const { propertyAnalysis } = COLLINS_STREET_MOCK_DATA;
  const riskData = {
    floodRisk: { score: 72, level: 'High', color: 'destructive' as const },
    fireRisk: { score: 45, level: 'Moderate', color: 'warning' as const },
    erosionRisk: { score: 38, level: 'Low', color: 'secondary' as const },
    cyclonesRisk: { score: 10, level: 'Very Low', color: 'secondary' as const }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Search and Map Visualization */}
      <div className="lg:col-span-2 space-y-4">
        <Input 
          placeholder="123 Collins Street, Melbourne VIC"
          value="123 Collins Street, Melbourne VIC"
          readOnly
          className="text-sm"
        />
        
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-96 bg-gradient-to-br from-green-100 via-green-50 to-blue-50">
              {/* Google Maps style background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 h-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-gray-200"></div>
                  ))}
                </div>
              </div>
              
              {/* Streets and roads */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                {/* Main roads */}
                <line x1="0" y1="200" x2="400" y2="200" stroke="#E5E7EB" strokeWidth="3" />
                <line x1="200" y1="0" x2="200" y2="400" stroke="#E5E7EB" strokeWidth="3" />
                <line x1="100" y1="0" x2="100" y2="400" stroke="#F3F4F6" strokeWidth="2" />
                <line x1="300" y1="0" x2="300" y2="400" stroke="#F3F4F6" strokeWidth="2" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#F3F4F6" strokeWidth="2" />
                <line x1="0" y1="300" x2="400" y2="300" stroke="#F3F4F6" strokeWidth="2" />
                
                {/* Buildings */}
                <rect x="180" y="180" width="40" height="40" fill="#D1D5DB" rx="2" />
                <rect x="120" y="120" width="30" height="30" fill="#D1D5DB" rx="2" />
                <rect x="250" y="250" width="35" height="35" fill="#D1D5DB" rx="2" />
                <rect x="80" y="280" width="25" height="25" fill="#D1D5DB" rx="2" />
                <rect x="320" y="80" width="30" height="30" fill="#D1D5DB" rx="2" />
              </svg>
              
              {/* Risk overlay zones */}
              <div className="absolute inset-0">
                {/* Flood risk area */}
                <div className="absolute top-16 left-16 w-32 h-32 bg-blue-500/20 rounded-full"></div>
                {/* Fire risk area */}
                <div className="absolute bottom-16 right-16 w-28 h-28 bg-red-500/20 rounded-full"></div>
                {/* Combined risk area */}
                <div className="absolute top-32 right-32 w-24 h-24 bg-orange-500/20 rounded-full"></div>
              </div>
              
              {/* Property marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
                </div>
              </div>
              
              {/* Google Maps style controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <div className="bg-white rounded-lg shadow-lg border">
                  <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-t-lg border-b">
                    <span className="text-lg font-bold">+</span>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-b-lg">
                    <span className="text-lg font-bold">−</span>
                  </button>
                </div>
                
                {/* Street View control */}
                <button className="w-10 h-10 bg-white rounded-lg shadow-lg border flex items-center justify-center text-gray-600 hover:bg-gray-50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
              
              {/* Compass */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full shadow-lg border flex items-center justify-center">
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-red-500"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-600">N</div>
                </div>
              </div>
              
              {/* Property info card - Google Maps style */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-xl border max-w-xs">
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">123 Collins Street</h3>
                      <p className="text-sm text-gray-500">Melbourne VIC 3000</p>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">4.5</span>
                      </div>
                      <div className="mt-2 flex space-x-2">
                        <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">Directions</button>
                        <button className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Scale and attribution */}
              <div className="absolute bottom-4 right-4 flex items-end space-x-4">
                <div className="bg-white/90 px-2 py-1 rounded text-xs text-gray-600">
                  <div className="border-b border-gray-400 w-16 mb-1"></div>
                  100 m
                </div>
                <div className="text-xs text-gray-500 bg-white/90 px-2 py-1 rounded">
                  © 2024 PropGuard
                </div>
              </div>
              
              {/* Street names */}
              <div className="absolute top-24 left-8 text-xs font-medium text-gray-600 bg-white/80 px-2 py-1 rounded">
                Collins St
              </div>
              <div className="absolute top-36 right-8 text-xs font-medium text-gray-600 bg-white/80 px-2 py-1 rounded transform rotate-90">
                Elizabeth St
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Layers */}
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Layers</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox checked disabled />
                <span className="text-sm">Flood Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox checked disabled />
                <span className="text-sm">Fire Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox checked disabled />
                <span className="text-sm">Erosion Risk</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Property Analytics */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Property Analytics</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">AI Valuation</span>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-xs">$</span>
                  </div>
                </div>
                <div className="text-2xl font-bold">${(propertyAnalysis.current_valuation / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-muted-foreground">Current market value estimate</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">AI Confidence: {propertyAnalysis.confidence}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Climate Risk Assessment</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Flood Risk</span>
                  <span>{riskData.floodRisk.score}%</span>
                </div>
                <Progress value={riskData.floodRisk.score} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Bushfire Risk</span>
                  <span>{riskData.fireRisk.score}%</span>
                </div>
                <Progress value={riskData.fireRisk.score} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Market Volatility</span>
                  <span>51%</span>
                </div>
                <Progress value={51} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Subsidence Risk</span>
                  <span>12%</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};