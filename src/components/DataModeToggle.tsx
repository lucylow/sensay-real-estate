import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Database, Globe, TestTube, Wifi, WifiOff } from 'lucide-react';
import { propertyDataService, DataMode } from '@/services/propertyDataService';

interface DataModeToggleProps {
  dataMode: DataMode;
  onModeChange: (mode: DataMode) => void;
  apiHealth?: {
    propguard: boolean;
    realtybase: boolean;
    supabase: boolean;
    nasa: boolean;
  };
}

export const DataModeToggle: React.FC<DataModeToggleProps> = ({
  dataMode,
  onModeChange,
  apiHealth
}) => {
  const modes = [
    {
      key: 'demo' as DataMode,
      label: 'Demo Mode',
      icon: TestTube,
      description: 'Use mock data for demonstration',
      color: 'secondary'
    },
    {
      key: 'live' as DataMode,
      label: 'Live APIs',
      icon: Globe,
      description: 'Use real property APIs',
      color: 'default'
    },
    {
      key: 'auto' as DataMode,
      label: 'Auto',
      icon: Database,
      description: 'Try live APIs, fallback to demo',
      color: 'default'
    }
  ];

  const getHealthStatus = () => {
    if (!apiHealth) return 'unknown';
    const healthyCount = Object.values(apiHealth).filter(Boolean).length;
    if (healthyCount === 3) return 'healthy';
    if (healthyCount > 0) return 'partial';
    return 'unhealthy';
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-success text-success-foreground';
      case 'partial': return 'bg-warning text-warning-foreground';
      case 'unhealthy': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Data Source</h3>
        {apiHealth && (
          <div className="flex items-center gap-2">
            {getHealthStatus() === 'healthy' ? (
              <Wifi className="h-4 w-4 text-success" />
            ) : (
              <WifiOff className="h-4 w-4 text-destructive" />
            )}
            <Badge className={getHealthColor(getHealthStatus())}>
              {getHealthStatus()}
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = dataMode === mode.key;
          
          return (
            <Button
              key={mode.key}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onModeChange(mode.key)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {mode.label}
            </Button>
          );
        })}
      </div>

      {apiHealth && (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">API Status:</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${apiHealth.supabase ? 'bg-success' : 'bg-destructive'}`} />
              Supabase
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${apiHealth.nasa ? 'bg-success' : 'bg-destructive'}`} />
              NASA FIRMS
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${apiHealth.propguard ? 'bg-success' : 'bg-destructive'}`} />
              PropGuard
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${apiHealth.realtybase ? 'bg-success' : 'bg-destructive'}`} />
              RealtyBase
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        {modes.find(m => m.key === dataMode)?.description}
      </div>
    </Card>
  );
};