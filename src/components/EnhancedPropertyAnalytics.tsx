import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  MapPin 
} from 'lucide-react';

interface EnhancedPropertyAnalyticsProps {
  analysis?: any;
  className?: string;
}

export const EnhancedPropertyAnalytics: React.FC<EnhancedPropertyAnalyticsProps> = ({
  analysis,
  className = ''
}) => {
  const landValue = 2500000;
  const buildingValue = 6000000;
  const totalValue = landValue + buildingValue;
  const riskScore = 75;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          Enhanced Property Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Land Value</p>
                  <p className="text-2xl font-bold">${(landValue / 1000000).toFixed(1)}M</p>
                </div>
                <MapPin className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Building Value</p>
                  <p className="text-2xl font-bold">${(buildingValue / 1000000).toFixed(1)}M</p>
                </div>
                <Building className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">${(totalValue / 1000000).toFixed(1)}M</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Overall Risk Score</span>
                <Badge variant={riskScore > 80 ? "default" : riskScore > 60 ? "secondary" : "destructive"}>
                  {riskScore}%
                </Badge>
              </div>
              <Progress value={riskScore} className="h-3" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <CheckCircle className="w-6 h-6 mx-auto mb-1 text-green-500" />
                  <p className="text-sm font-medium">Market</p>
                  <p className="text-xs text-muted-foreground">Strong</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-6 h-6 mx-auto mb-1 text-green-500" />
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-xs text-muted-foreground">Excellent</p>
                </div>
                <div className="text-center">
                  <AlertTriangle className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                  <p className="text-sm font-medium">Climate</p>
                  <p className="text-xs text-muted-foreground">Moderate</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-6 h-6 mx-auto mb-1 text-green-500" />
                  <p className="text-sm font-medium">Financial</p>
                  <p className="text-xs text-muted-foreground">Stable</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Market Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">1 Year Growth</p>
                <p className="text-xl font-bold text-green-600">+12.5%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">5 Year Avg</p>
                <p className="text-xl font-bold text-blue-600">+8.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};