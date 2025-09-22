import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Waves, 
  Flame, 
  Mountain, 
  Wind,
  TrendingUp,
  Shield,
  AlertTriangle,
  Clock,
  DollarSign
} from 'lucide-react';
import { COLLINS_STREET_MOCK_DATA } from '@/data/mockData';

export const EnhancedRiskAnalysis = () => {
  const data = COLLINS_STREET_MOCK_DATA;

  const getRiskIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'flood': return <Waves className="h-5 w-5 text-blue-500" />;
      case 'fire': return <Flame className="h-5 w-5 text-orange-500" />;
      case 'coastal': return <Mountain className="h-5 w-5 text-green-500" />;
      case 'cyclone': return <Wind className="h-5 w-5 text-purple-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'destructive';
    if (score >= 40) return 'secondary';
    return 'default';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-sm flex items-center gap-3 text-blue-700 dark:text-blue-300">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Waves className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              Flood Risk
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-blue-800 dark:text-blue-200">72</span>
                <Badge variant="destructive" className="shadow-sm">High</Badge>
              </div>
              <div className="space-y-2">
                <Progress value={72} className="h-3 bg-blue-200/50 dark:bg-blue-800/30" />
                <div className="text-xs text-blue-600/80 dark:text-blue-400/80 font-medium">
                  800m to Yarra River
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/50 dark:to-orange-900/30">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"></div>
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-sm flex items-center gap-3 text-orange-700 dark:text-orange-300">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Flame className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              Fire Risk
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-orange-800 dark:text-orange-200">45</span>
                <Badge variant="secondary" className="shadow-sm">Medium</Badge>
              </div>
              <div className="space-y-2">
                <Progress value={45} className="h-3 bg-orange-200/50 dark:bg-orange-800/30" />
                <div className="text-xs text-orange-600/80 dark:text-orange-400/80 font-medium">
                  4.2km to bushland
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/50 dark:to-emerald-900/30">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-sm flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Mountain className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              Coastal Risk
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">38</span>
                <Badge variant="default" className="shadow-sm bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Low</Badge>
              </div>
              <div className="space-y-2">
                <Progress value={38} className="h-3 bg-emerald-200/50 dark:bg-emerald-800/30" />
                <div className="text-xs text-emerald-600/80 dark:text-emerald-400/80 font-medium">
                  No direct exposure
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-sm flex items-center gap-3 text-purple-700 dark:text-purple-300">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Wind className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              Cyclone Risk
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-purple-800 dark:text-purple-200">10</span>
                <Badge variant="default" className="shadow-sm bg-purple-100 text-purple-800 hover:bg-purple-200">Very Low</Badge>
              </div>
              <div className="space-y-2">
                <Progress value={10} className="h-3 bg-purple-200/50 dark:bg-purple-800/30" />
                <div className="text-xs text-purple-600/80 dark:text-purple-400/80 font-medium">
                  Southern latitude
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Climate Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Climate Change Projections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.climateProjections.map((projection, index) => (
              <div key={index} className="space-y-3">
                <div className="text-center">
                  <div className="text-lg font-bold">{projection.year}</div>
                  <Badge variant="outline">Projection</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Temperature</span>
                    <span className="font-medium text-red-500">{projection.temp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rainfall</span>
                    <span className="font-medium text-blue-500">{projection.rainfall}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sea Level</span>
                    <span className="font-medium text-orange-500">{projection.seaLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Flood Risk</span>
                    <span className="font-medium">{projection.flood_risk}/100</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Mitigation Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Risk Mitigation Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.riskMitigation.map((mitigation, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getRiskIcon(mitigation.type.split(' ')[0])}
                    <div>
                      <div className="font-medium">{mitigation.type}</div>
                      <Badge variant={mitigation.priority === 'High' ? 'destructive' : 'secondary'}>
                        {mitigation.priority} Priority
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{mitigation.cost}</div>
                    <div className="text-xs text-muted-foreground">Investment</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      ROI
                    </div>
                    <div className="font-medium">{mitigation.roi}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Timeline
                    </div>
                    <div className="font-medium">{mitigation.timeline}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      Impact
                    </div>
                    <div className="font-medium">{mitigation.impact}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Recommended Actions:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {mitigation.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span>•</span>
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button size="sm" variant="outline">
                    Get Quote
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Timeline Projection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            10-Year Risk Projection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="text-lg font-bold">2024</div>
                <div className="text-sm text-muted-foreground">Current</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Flood</span>
                    <span>72</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Fire</span>
                    <span>45</span>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg font-bold">2027</div>
                <div className="text-sm text-muted-foreground">3 Years</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Flood</span>
                    <span className="text-orange-500">78</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Fire</span>
                    <span className="text-orange-500">49</span>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg font-bold">2030</div>
                <div className="text-sm text-muted-foreground">6 Years</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Flood</span>
                    <span className="text-red-500">82</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Fire</span>
                    <span className="text-orange-500">52</span>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg font-bold">2034</div>
                <div className="text-sm text-muted-foreground">10 Years</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Flood</span>
                    <span className="text-red-500">88</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Fire</span>
                    <span className="text-red-500">58</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Risk scores are projected based on climate change models and historical trends
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};