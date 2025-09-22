import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Satellite, MapPin, Clock } from 'lucide-react';
import { FireRiskData } from '@/services/propertyDataService';

interface FireRiskDisplayProps {
  fireRisk: FireRiskData;
  className?: string;
}

export const FireRiskDisplay: React.FC<FireRiskDisplayProps> = ({ fireRisk, className }) => {
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary'; // Changed from 'warning' to 'secondary'
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const formatLastUpdated = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Less than 1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  const getDataSourceLabel = (source: string) => {
    switch (source) {
      case 'nasa_firms': return 'NASA FIRMS Real-time';
      case 'nasa_no_data': return 'NASA FIRMS (No Data)';
      case 'nasa_no_nearby_fires': return 'NASA FIRMS (No Nearby Fires)';
      case 'mock': return 'Demo Data';
      case 'fallback': return 'Fallback Data';
      case 'error_fallback': return 'Error Fallback';
      default: return 'Unknown Source';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="h-5 w-5 text-orange-500" />
          Bushfire Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Risk Score and Level */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">
              {Math.round(fireRisk.riskScore * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Risk Score</div>
          </div>
          <Badge variant={getRiskColor(fireRisk.riskLevel)}>
            {fireRisk.riskLevel} Risk
          </Badge>
        </div>

        {/* Fire Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Nearby Fires</div>
            <div className="font-semibold">{fireRisk.nearbyFires}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Closest Fire</div>
            <div className="font-semibold">
              {fireRisk.closestFireDistance > 0 
                ? `${fireRisk.closestFireDistance} km` 
                : 'None detected'}
            </div>
          </div>
        </div>

        {/* Fire Intensity */}
        {fireRisk.totalFRP > 0 && (
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Total Fire Intensity</div>
            <div className="font-semibold">{fireRisk.totalFRP} MW (Fire Radiative Power)</div>
          </div>
        )}

        {/* Data Source and Last Updated */}
        <div className="pt-3 border-t space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Satellite className="h-4 w-4" />
            {getDataSourceLabel(fireRisk.dataSource)}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Updated {formatLastUpdated(fireRisk.lastUpdated)}
          </div>
        </div>

        {/* Risk Interpretation */}
        <div className="pt-2 text-sm">
          <div className="font-medium mb-1">Risk Assessment:</div>
          <div className="text-muted-foreground">
            {fireRisk.riskLevel === 'High' && 
              'Significant fire activity detected nearby. Monitor conditions closely and ensure fire safety measures are in place.'}
            {fireRisk.riskLevel === 'Medium' && 
              'Moderate fire risk detected. Be aware of changing conditions and maintain fire safety preparedness.'}
            {fireRisk.riskLevel === 'Low' && 
              'Low fire risk based on current satellite data. Continue standard fire safety practices.'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};