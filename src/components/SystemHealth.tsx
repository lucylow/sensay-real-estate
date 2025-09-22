import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { propGuardAPI } from '@/config/api';

interface SystemHealthProps {
  className?: string;
}

interface SystemHealth {
  propguard: any;
  llm: any;
  blockchain: any;
  xnode: any;
  pipeline: any;
}

export const SystemHealth: React.FC<SystemHealthProps> = ({ className }) => {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSystemHealth();
    const interval = setInterval(checkSystemHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkSystemHealth = async () => {
    try {
      const health = await propGuardAPI.checkSystemHealth();
      setSystemHealth(health);
    } catch (error) {
      console.error('Failed to check system health:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getHealthStatus = (service: any) => {
    if (!service) return 'offline';
    return service.success ? 'online' : 'error';
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'error': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>System Health Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Checking system health...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>System Health Status</span>
          <Badge variant="secondary" className="text-xs">
            Last updated: {new Date().toLocaleTimeString()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {systemHealth && Object.entries(systemHealth).map(([service, health]) => {
            const status = getHealthStatus(health);
            return (
              <div key={service} className="text-center">
                <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${getHealthColor(status)}`}></div>
                <p className="text-sm font-medium capitalize">{service}</p>
                <p className="text-xs text-muted-foreground">{status}</p>
                {health?.version && (
                  <p className="text-xs text-muted-foreground">v{health.version}</p>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Overall system status */}
        <div className="mt-6 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Status</span>
            <Badge variant={systemHealth && Object.values(systemHealth).every(s => s?.success) ? "default" : "destructive"}>
              {systemHealth && Object.values(systemHealth).every(s => s?.success) ? "All Systems Operational" : "Some Services Degraded"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};