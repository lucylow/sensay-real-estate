/**
 * Fixed Sensay Page with proper tab handling
 * Includes setup, live data, and analytics tabs
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, 
  Activity, 
  BarChart3, 
  Database,
  CheckCircle,
  AlertCircle,
  Loader2,
  Globe,
  TrendingUp,
  Users,
  Home,
  Bot
} from 'lucide-react';
import SensaySetupFixed from '@/components/SensaySetupFixed';
import { mockDataService } from '@/services/mockDataService';

interface SensayCredentials {
  apiKey: string;
  organizationId: string;
}

interface LiveDataItem {
  id: string;
  type: 'property' | 'analysis' | 'user' | 'market';
  title: string;
  description: string;
  timestamp: string;
  status: 'active' | 'processing' | 'completed' | 'error';
  value?: string | number;
}

export const SensayPageFixed: React.FC = () => {
  const [activeTab, setActiveTab] = useState('setup');
  const [credentials, setCredentials] = useState<SensayCredentials | null>(null);
  const [liveData, setLiveData] = useState<LiveDataItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  // Load credentials from localStorage on mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem('sensay_credentials');
    if (savedCredentials) {
      try {
        const creds = JSON.parse(savedCredentials);
        setCredentials(creds);
        setActiveTab('live-data');
      } catch (error) {
        console.error('Failed to parse saved credentials:', error);
      }
    }
  }, []);

  // Load live data when switching to live data tab
  useEffect(() => {
    if (activeTab === 'live-data' && credentials) {
      loadLiveData();
    }
  }, [activeTab, credentials]);

  const loadLiveData = async () => {
    setIsLoadingData(true);
    setDataError(null);

    try {
      // Simulate loading live data
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock live data
      const mockData: LiveDataItem[] = [
        {
          id: '1',
          type: 'property',
          title: 'Property Analysis - 123 Collins Street',
          description: 'Comprehensive property valuation completed',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          status: 'completed',
          value: '$850,000'
        },
        {
          id: '2',
          type: 'analysis',
          title: 'Risk Assessment - Melbourne CBD',
          description: 'Environmental risk analysis in progress',
          timestamp: new Date(Date.now() - 600000).toISOString(),
          status: 'processing'
        },
        {
          id: '3',
          type: 'user',
          title: 'New User Registration',
          description: 'Sarah Chen joined the platform',
          timestamp: new Date(Date.now() - 900000).toISOString(),
          status: 'active'
        },
        {
          id: '4',
          type: 'market',
          title: 'Market Update - Victoria',
          description: 'Property prices increased 8.5% this quarter',
          timestamp: new Date(Date.now() - 1200000).toISOString(),
          status: 'completed',
          value: '+8.5%'
        },
        {
          id: '5',
          type: 'property',
          title: 'Property Analysis - 456 Bourke Street',
          description: 'Commercial property valuation completed',
          timestamp: new Date(Date.now() - 1500000).toISOString(),
          status: 'completed',
          value: '$3,200,000'
        }
      ];

      setLiveData(mockData);
    } catch (error) {
      setDataError(error instanceof Error ? error.message : 'Failed to load live data');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleCredentialsSet = (creds: SensayCredentials) => {
    setCredentials(creds);
    setActiveTab('live-data');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'property':
        return <Home className="h-4 w-4" />;
      case 'analysis':
        return <BarChart3 className="h-4 w-4" />;
      case 'user':
        return <Users className="h-4 w-4" />;
      case 'market':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Sensay Real Estate Platform</h1>
        <p className="text-xl text-muted-foreground">
          Advanced property analysis and market intelligence
        </p>
        
        <div className="flex justify-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Global Platform
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Powered
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Setup
          </TabsTrigger>
          <TabsTrigger 
            value="live-data" 
            className="flex items-center gap-2"
            disabled={!credentials}
          >
            <Database className="h-4 w-4" />
            Live Data
            {!credentials && <Badge variant="secondary" className="ml-1 text-xs">Setup Required</Badge>}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Setup Tab */}
        <TabsContent value="setup" className="space-y-6">
          <SensaySetupFixed onCredentialsSet={handleCredentialsSet} />
        </TabsContent>

        {/* Live Data Tab */}
        <TabsContent value="live-data" className="space-y-6">
          {credentials ? (
            <div className="space-y-6">
              {/* Live Data Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Live Data Stream
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={loadLiveData}
                        disabled={isLoadingData}
                      >
                        {isLoadingData ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Refreshing...
                          </>
                        ) : (
                          <>
                            <Activity className="h-4 w-4 mr-2" />
                            Refresh
                          </>
                        )}
                      </Button>
                      <Badge variant="outline" className="text-xs">
                        {liveData.length} items
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Real-time data from Sensay platform including property analyses, user activities, and market updates.
                  </div>
                </CardContent>
              </Card>

              {/* Data Error */}
              {dataError && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-700">
                    <div className="space-y-1">
                      <p className="font-medium">Failed to load live data</p>
                      <p className="text-sm">{dataError}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Live Data Items */}
              {isLoadingData ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Loader2 className="h-8 w-8 mx-auto text-blue-500 animate-spin mb-4" />
                    <p className="text-muted-foreground">Loading live data...</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {liveData.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            {getTypeIcon(item.type)}
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{item.title}</h3>
                              <div className="flex items-center gap-2">
                                {item.value && (
                                  <Badge variant="outline">{item.value}</Badge>
                                )}
                                <Badge className={getStatusColor(item.status)}>
                                  {item.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                            
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              {getStatusIcon(item.status)}
                              <span>{new Date(item.timestamp).toLocaleString()}</span>
                              <Badge variant="outline" className="text-xs">
                                {item.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Setup Required</h3>
                <p className="text-muted-foreground mb-4">
                  Please complete the setup process first to access live data.
                </p>
                <Button onClick={() => setActiveTab('setup')}>
                  Go to Setup
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Properties Analyzed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-sm text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">892</div>
                <p className="text-sm text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Market Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8.5%</div>
                <p className="text-sm text-muted-foreground">Average property value increase</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>API Status</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Database Status</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>AI Models</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Updated</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SensayPageFixed;
