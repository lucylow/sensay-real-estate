import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Satellite, Activity, TrendingUp, Database } from 'lucide-react';

interface NASAIntegrationStatusProps {
  className?: string;
}

export const NASAIntegrationStatus: React.FC<NASAIntegrationStatusProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Satellite className="h-5 w-5 text-blue-500" />
          NASA Integration Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {/* FIRMS Fire Detection */}
          <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
            <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 text-orange-500" />
              <div>
                <div className="font-medium text-sm">FIRMS Fire Detection</div>
                <div className="text-xs text-muted-foreground">Near real-time bushfire monitoring</div>
              </div>
            </div>
            <Badge variant="default">Active</Badge>
          </div>

          {/* VIIRS Satellite Data */}
          <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
            <div className="flex items-center gap-3">
              <Satellite className="h-4 w-4 text-blue-500" />
              <div>
                <div className="font-medium text-sm">VIIRS NOAA-20</div>
                <div className="text-xs text-muted-foreground">750m thermal infrared data</div>
              </div>
            </div>
            <Badge variant="default">Enabled</Badge>
          </div>

          {/* Data Processing */}
          <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
            <div className="flex items-center gap-3">
              <Database className="h-4 w-4 text-green-500" />
              <div>
                <div className="font-medium text-sm">Data Caching</div>
                <div className="text-xs text-muted-foreground">24-hour cache for Australia</div>
              </div>
            </div>
            <Badge variant="secondary">Optimized</Badge>
          </div>

          {/* Risk Calculation */}
          <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <div>
                <div className="font-medium text-sm">Risk Algorithm</div>
                <div className="text-xs text-muted-foreground">Distance, intensity & count weighted</div>
              </div>
            </div>
            <Badge variant="default">Enhanced</Badge>
          </div>
        </div>

        <div className="pt-3 border-t">
          <div className="text-sm">
            <div className="font-medium mb-1">Coverage:</div>
            <div className="text-muted-foreground text-xs">
              Australia-wide fire monitoring with 50km radius analysis for each property.
              Data updated every 3-6 hours from NASA satellites.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};