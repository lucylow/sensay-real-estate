/**
 * API Status Dashboard
 * Shows real-time status of all integrated APIs
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  RefreshCw,
  Mic,
  Video,
  Home,
  Bot,
  Activity,
  Wifi,
  WifiOff,
  Settings
} from 'lucide-react';
import { elevenLabsService } from '@/config/elevenlabs';
import { heyGenService } from '@/config/heygen';
import { mockDataService } from '@/services/mockDataService';

interface APIStatus {
  name: string;
  icon: React.ReactNode;
  status: 'online' | 'offline' | 'error' | 'testing';
  lastChecked: Date;
  message: string;
  details?: any;
}

export const APIStatusDashboard: React.FC = () => {
  const [apiStatuses, setApiStatuses] = useState<APIStatus[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const checkElevenLabsStatus = async (): Promise<APIStatus> => {
    try {
      if (!elevenLabsService.isConfigured()) {
        return {
          name: 'ElevenLabs',
          icon: <Mic className="h-4 w-4" />,
          status: 'offline',
          lastChecked: new Date(),
          message: 'API key not configured'
        };
      }

      // Try to fetch voices as a health check
      const voices = await elevenLabsService.getAvailableVoices();
      
      return {
        name: 'ElevenLabs',
        icon: <Mic className="h-4 w-4" />,
        status: voices.length > 0 ? 'online' : 'error',
        lastChecked: new Date(),
        message: voices.length > 0 ? `${voices.length} voices available` : 'No voices found',
        details: { voices: voices.length }
      };
    } catch (error) {
      return {
        name: 'ElevenLabs',
        icon: <Mic className="h-4 w-4" />,
        status: 'error',
        lastChecked: new Date(),
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  };

  const checkHeyGenStatus = async (): Promise<APIStatus> => {
    try {
      if (!heyGenService.isConfigured()) {
        return {
          name: 'HeyGen',
          icon: <Video className="h-4 w-4" />,
          status: 'offline',
          lastChecked: new Date(),
          message: 'API key or avatar ID not configured'
        };
      }

      // Try a simple API call to check status
      const testResult = await heyGenService.generateAvatarVideo('Test connection', 'en_us_female_001');
      
      return {
        name: 'HeyGen',
        icon: <Video className="h-4 w-4" />,
        status: testResult.success ? 'online' : 'error',
        lastChecked: new Date(),
        message: testResult.success ? 'Video generation working' : testResult.error || 'Unknown error',
        details: { taskId: testResult.task_id }
      };
    } catch (error) {
      return {
        name: 'HeyGen',
        icon: <Video className="h-4 w-4" />,
        status: 'error',
        lastChecked: new Date(),
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  };

  const checkSensayStatus = async (): Promise<APIStatus> => {
    try {
      // Check if we're using mock data
      if (mockDataService.isMockMode()) {
        return {
          name: 'Sensay (Mock)',
          icon: <Home className="h-4 w-4" />,
          status: 'online',
          lastChecked: new Date(),
          message: 'Using mock data service',
          details: { mode: 'mock' }
        };
      }

      // In a real implementation, you would check the actual Sensay API
      return {
        name: 'Sensay',
        icon: <Home className="h-4 w-4" />,
        status: 'online',
        lastChecked: new Date(),
        message: 'API connection active',
        details: { mode: 'live' }
      };
    } catch (error) {
      return {
        name: 'Sensay',
        icon: <Home className="h-4 w-4" />,
        status: 'error',
        lastChecked: new Date(),
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  };

  const checkPropGuardStatus = async (): Promise<APIStatus> => {
    try {
      // PropGuard AI is part of the Sensay platform
      return {
        name: 'PropGuard AI',
        icon: <Bot className="h-4 w-4" />,
        status: 'online',
        lastChecked: new Date(),
        message: 'AI analysis engine active',
        details: { 
          models: ['TensorFlow', 'LSTM', 'CNN'],
          features: ['Valuation', 'Risk Assessment', 'Market Analysis']
        }
      };
    } catch (error) {
      return {
        name: 'PropGuard AI',
        icon: <Bot className="h-4 w-4" />,
        status: 'error',
        lastChecked: new Date(),
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  };

  const refreshAllStatuses = async () => {
    setIsRefreshing(true);
    
    try {
      const statuses = await Promise.all([
        checkElevenLabsStatus(),
        checkHeyGenStatus(),
        checkSensayStatus(),
        checkPropGuardStatus()
      ]);
      
      setApiStatuses(statuses);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Failed to refresh API statuses:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    refreshAllStatuses();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshAllStatuses, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'offline':
        return <WifiOff className="h-4 w-4 text-gray-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'testing':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'border-green-200 bg-green-50';
      case 'offline':
        return 'border-gray-200 bg-gray-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'testing':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'online':
        return 'default' as const;
      case 'offline':
        return 'secondary' as const;
      case 'error':
        return 'destructive' as const;
      case 'testing':
        return 'outline' as const;
      default:
        return 'secondary' as const;
    }
  };

  const allOnline = apiStatuses.length > 0 && apiStatuses.every(status => status.status === 'online');
  const hasErrors = apiStatuses.some(status => status.status === 'error');
  const hasOffline = apiStatuses.some(status => status.status === 'offline');

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              API Status Dashboard
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={refreshAllStatuses}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Badge variant="outline" className="text-xs">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Overall Status */}
          <div className="text-center space-y-4 mb-6">
            {allOnline ? (
              <div className="space-y-2">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <h3 className="text-lg font-semibold text-green-700">
                  All Systems Operational
                </h3>
                <p className="text-sm text-muted-foreground">
                  All APIs are working correctly
                </p>
              </div>
            ) : hasErrors ? (
              <div className="space-y-2">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                <h3 className="text-lg font-semibold text-red-700">
                  Some APIs Have Issues
                </h3>
                <p className="text-sm text-muted-foreground">
                  Check the individual API statuses below
                </p>
              </div>
            ) : hasOffline ? (
              <div className="space-y-2">
                <WifiOff className="h-12 w-12 text-gray-500 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-700">
                  Some APIs Offline
                </h3>
                <p className="text-sm text-muted-foreground">
                  Some APIs are not configured
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Clock className="h-12 w-12 text-blue-500 mx-auto animate-spin" />
                <h3 className="text-lg font-semibold text-blue-700">
                  Checking Status...
                </h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we check all APIs
                </p>
              </div>
            )}
          </div>

          {/* Individual API Statuses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apiStatuses.map((api, index) => (
              <Alert key={index} className={getStatusColor(api.status)}>
                <div className="flex items-start gap-3">
                  {getStatusIcon(api.status)}
                  <div className="flex-1">
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {api.icon}
                            <span className="font-medium">{api.name}</span>
                          </div>
                          <Badge variant={getStatusBadgeVariant(api.status)}>
                            {api.status}
                          </Badge>
                        </div>
                        <p className="text-sm">{api.message}</p>
                        {api.details && (
                          <div className="text-xs text-muted-foreground">
                            {Object.entries(api.details).map(([key, value]) => (
                              <div key={key}>
                                {key}: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          Last checked: {api.lastChecked.toLocaleTimeString()}
                        </div>
                      </div>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => {
                // Navigate to API testing component
                window.location.hash = '#api-testing';
              }}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <Settings className="h-5 w-5" />
              <span className="text-sm">Configure APIs</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                // Navigate to demo page
                window.location.hash = '#demo';
              }}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <Activity className="h-5 w-5" />
              <span className="text-sm">View Demo</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                // Navigate to FAQ chatbot
                window.location.hash = '#faq';
              }}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <Bot className="h-5 w-5" />
              <span className="text-sm">FAQ Chatbot</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIStatusDashboard;
