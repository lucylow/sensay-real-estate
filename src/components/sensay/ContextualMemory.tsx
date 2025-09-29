import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Users, 
  MessageCircle, 
  Clock, 
  Target, 
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Database,
  Brain,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  Star,
  Heart,
  Bookmark,
  Tag,
  Calendar,
  MapPin,
  Home,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Shield,
  Key,
  User,
  UserCheck,
  UserX,
  History,
  Archive,
  Trash,
  RotateCcw,
  Play,
  Pause,
  Stop,
  SkipForward,
  SkipBack
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  preferences: {
    language: string;
    currency: string;
    timezone: string;
    communicationStyle: 'formal' | 'casual' | 'friendly';
    preferredContactTime: string;
    notificationPreferences: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  propertyPreferences: {
    propertyType: string[];
    budgetRange: { min: number; max: number };
    preferredLocations: string[];
    mustHaveFeatures: string[];
    dealBreakers: string[];
    timeline: string;
    investmentGoals: string[];
  };
  behaviorPatterns: {
    searchFrequency: number;
    avgSessionDuration: number;
    preferredChannels: string[];
    responseTime: number;
    decisionMakingStyle: 'quick' | 'deliberate' | 'research-heavy';
    priceSensitivity: 'low' | 'medium' | 'high';
  };
  conversationHistory: Array<{
    id: string;
    timestamp: Date;
    platform: string;
    topic: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    outcome: string;
    notes: string;
  }>;
  leadScore: number;
  status: 'new' | 'qualified' | 'hot' | 'warm' | 'cold' | 'converted' | 'lost';
  lastInteraction: Date;
  nextFollowUp?: Date;
  tags: string[];
  customFields: Record<string, any>;
}

interface PredictiveFlow {
  id: string;
  userId: string;
  trigger: string;
  predictedIntent: string;
  confidence: number;
  suggestedActions: string[];
  expectedOutcome: string;
  successProbability: number;
  lastUpdated: Date;
  accuracy: number;
}

interface CrossPlatformSync {
  platform: string;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastSync: Date;
  syncFrequency: number;
  dataPoints: number;
  conflicts: number;
  resolution: 'automatic' | 'manual' | 'pending';
}

interface MemoryMetrics {
  totalProfiles: number;
  activeProfiles: number;
  avgProfileCompleteness: number;
  crossPlatformSync: number;
  predictiveAccuracy: number;
  memoryRetention: number;
  dataPoints: number;
  privacyCompliance: number;
}

export const ContextualMemory: React.FC = () => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [predictiveFlows, setPredictiveFlows] = useState<PredictiveFlow[]>([]);
  const [crossPlatformSync, setCrossPlatformSync] = useState<CrossPlatformSync[]>([]);
  const [metrics, setMetrics] = useState<MemoryMetrics>({
    totalProfiles: 0,
    activeProfiles: 0,
    avgProfileCompleteness: 0,
    crossPlatformSync: 0,
    predictiveAccuracy: 0,
    memoryRetention: 0,
    dataPoints: 0,
    privacyCompliance: 0
  });
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [isMemoryActive, setIsMemoryActive] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    const mockUserProfiles: UserProfile[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1-555-0123',
        preferences: {
          language: 'en',
          currency: 'USD',
          timezone: 'America/New_York',
          communicationStyle: 'friendly',
          preferredContactTime: '9:00 AM - 5:00 PM',
          notificationPreferences: {
            email: true,
            sms: true,
            push: false
          }
        },
        propertyPreferences: {
          propertyType: ['House', 'Townhouse'],
          budgetRange: { min: 500000, max: 800000 },
          preferredLocations: ['Melbourne CBD', 'South Yarra', 'Richmond'],
          mustHaveFeatures: ['Modern Kitchen', 'Garage', 'Garden'],
          dealBreakers: ['High Crime Area', 'Poor Schools'],
          timeline: '3-6 months',
          investmentGoals: ['Primary Residence', 'Future Rental']
        },
        behaviorPatterns: {
          searchFrequency: 3,
          avgSessionDuration: 15,
          preferredChannels: ['Web', 'WhatsApp'],
          responseTime: 2,
          decisionMakingStyle: 'deliberate',
          priceSensitivity: 'medium'
        },
        conversationHistory: [
          {
            id: '1',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            platform: 'Web',
            topic: 'property_search',
            sentiment: 'positive',
            outcome: 'interested_in_viewing',
            notes: 'Looking for 3-bedroom house, mentioned budget flexibility'
          }
        ],
        leadScore: 92,
        status: 'hot',
        lastInteraction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        nextFollowUp: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        tags: ['First-time Buyer', 'High Budget', 'Melbourne'],
        customFields: {
          employer: 'Tech Company',
          familySize: 3,
          pets: true
        }
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'm.chen@email.com',
        phone: '+1-555-0456',
        preferences: {
          language: 'zh',
          currency: 'AUD',
          timezone: 'Australia/Melbourne',
          communicationStyle: 'formal',
          preferredContactTime: '10:00 AM - 6:00 PM',
          notificationPreferences: {
            email: true,
            sms: false,
            push: true
          }
        },
        propertyPreferences: {
          propertyType: ['Apartment', 'Unit'],
          budgetRange: { min: 400000, max: 600000 },
          preferredLocations: ['Sydney CBD', 'Chatswood', 'Parramatta'],
          mustHaveFeatures: ['Modern Kitchen', 'Balcony', 'Parking'],
          dealBreakers: ['No Elevator', 'Poor Transport'],
          timeline: '1-2 months',
          investmentGoals: ['Investment Property', 'Rental Income']
        },
        behaviorPatterns: {
          searchFrequency: 5,
          avgSessionDuration: 25,
          preferredChannels: ['WhatsApp', 'Telegram'],
          responseTime: 1,
          decisionMakingStyle: 'quick',
          priceSensitivity: 'high'
        },
        conversationHistory: [
          {
            id: '2',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            platform: 'WhatsApp',
            topic: 'price_inquiry',
            sentiment: 'neutral',
            outcome: 'requested_more_info',
            notes: 'Asked about rental yield and market trends'
          }
        ],
        leadScore: 78,
        status: 'warm',
        lastInteraction: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        nextFollowUp: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        tags: ['Investor', 'Chinese Speaker', 'Sydney'],
        customFields: {
          investmentExperience: '5 years',
          portfolioSize: 3,
          riskTolerance: 'medium'
        }
      }
    ];

    const mockPredictiveFlows: PredictiveFlow[] = [
      {
        id: '1',
        userId: '1',
        trigger: 'property_search',
        predictedIntent: 'schedule_viewing',
        confidence: 87,
        suggestedActions: ['Send property details', 'Schedule virtual tour', 'Provide market analysis'],
        expectedOutcome: 'viewing_scheduled',
        successProbability: 78,
        lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
        accuracy: 92
      },
      {
        id: '2',
        userId: '2',
        trigger: 'price_inquiry',
        predictedIntent: 'negotiate_price',
        confidence: 82,
        suggestedActions: ['Provide comparable sales', 'Offer financing options', 'Schedule call'],
        expectedOutcome: 'price_negotiation',
        successProbability: 65,
        lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
        accuracy: 88
      }
    ];

    const mockCrossPlatformSync: CrossPlatformSync[] = [
      {
        platform: 'Web',
        status: 'connected',
        lastSync: new Date(Date.now() - 5 * 60 * 1000),
        syncFrequency: 5,
        dataPoints: 1247,
        conflicts: 0,
        resolution: 'automatic'
      },
      {
        platform: 'WhatsApp',
        status: 'connected',
        lastSync: new Date(Date.now() - 3 * 60 * 1000),
        syncFrequency: 3,
        dataPoints: 892,
        conflicts: 2,
        resolution: 'automatic'
      },
      {
        platform: 'Telegram',
        status: 'connected',
        lastSync: new Date(Date.now() - 7 * 60 * 1000),
        syncFrequency: 5,
        dataPoints: 456,
        conflicts: 1,
        resolution: 'manual'
      },
      {
        platform: 'Email',
        status: 'syncing',
        lastSync: new Date(Date.now() - 10 * 60 * 1000),
        syncFrequency: 10,
        dataPoints: 234,
        conflicts: 0,
        resolution: 'automatic'
      }
    ];

    const mockMetrics: MemoryMetrics = {
      totalProfiles: 1247,
      activeProfiles: 892,
      avgProfileCompleteness: 87.3,
      crossPlatformSync: 94.2,
      predictiveAccuracy: 89.7,
      memoryRetention: 96.8,
      dataPoints: 45678,
      privacyCompliance: 98.5
    };

    setUserProfiles(mockUserProfiles);
    setPredictiveFlows(mockPredictiveFlows);
    setCrossPlatformSync(mockCrossPlatformSync);
    setMetrics(mockMetrics);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-orange-100 text-orange-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-emerald-100 text-emerald-800';
      case 'lost': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'syncing': return 'text-yellow-600';
      case 'disconnected': return 'text-red-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'syncing': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'disconnected': return <AlertCircle className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Contextual Memory Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              Contextual Memory System
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isMemoryActive ? "default" : "secondary"}>
                {isMemoryActive ? "Active" : "Inactive"}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsMemoryActive(!isMemoryActive)}
              >
                {isMemoryActive ? "Pause" : "Resume"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{metrics.totalProfiles}</div>
              <div className="text-sm text-muted-foreground">Total Profiles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.avgProfileCompleteness}%</div>
              <div className="text-sm text-muted-foreground">Profile Completeness</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{metrics.predictiveAccuracy}%</div>
              <div className="text-sm text-muted-foreground">Predictive Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{metrics.crossPlatformSync}%</div>
              <div className="text-sm text-muted-foreground">Cross-Platform Sync</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profiles" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profiles">User Profiles</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Flows</TabsTrigger>
          <TabsTrigger value="sync">Cross-Platform Sync</TabsTrigger>
          <TabsTrigger value="analytics">Memory Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Profile List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Profiles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfiles.map((profile) => (
                    <div 
                      key={profile.id}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedProfile(profile)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                            {profile.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium">{profile.name}</div>
                            <div className="text-sm text-muted-foreground">{profile.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getStatusColor(profile.status)}>
                            {profile.status}
                          </Badge>
                          <div className="text-sm font-medium text-blue-600">
                            {profile.leadScore}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                        <div>
                          <div className="text-muted-foreground">Last Interaction</div>
                          <div className="font-medium">{formatDate(profile.lastInteraction)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Next Follow-up</div>
                          <div className="font-medium">
                            {profile.nextFollowUp ? formatDate(profile.nextFollowUp) : 'Not scheduled'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm mb-2">
                        <div className="text-muted-foreground">Property Preferences:</div>
                        <div className="font-medium">
                          {profile.propertyPreferences.propertyType.join(', ')} • 
                          ${profile.propertyPreferences.budgetRange.min.toLocaleString()} - 
                          ${profile.propertyPreferences.budgetRange.max.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {profile.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Profile Details */}
            {selectedProfile && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {selectedProfile.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Contact Information</div>
                      <div className="space-y-1 text-sm">
                        <div>Email: {selectedProfile.email}</div>
                        <div>Phone: {selectedProfile.phone}</div>
                        <div>Language: {selectedProfile.preferences.language}</div>
                        <div>Timezone: {selectedProfile.preferences.timezone}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Property Preferences</div>
                      <div className="space-y-1 text-sm">
                        <div>Types: {selectedProfile.propertyPreferences.propertyType.join(', ')}</div>
                        <div>Budget: ${selectedProfile.propertyPreferences.budgetRange.min.toLocaleString()} - ${selectedProfile.propertyPreferences.budgetRange.max.toLocaleString()}</div>
                        <div>Locations: {selectedProfile.propertyPreferences.preferredLocations.join(', ')}</div>
                        <div>Timeline: {selectedProfile.propertyPreferences.timeline}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Behavior Patterns</div>
                      <div className="space-y-1 text-sm">
                        <div>Search Frequency: {selectedProfile.behaviorPatterns.searchFrequency}/week</div>
                        <div>Avg Session: {selectedProfile.behaviorPatterns.avgSessionDuration} minutes</div>
                        <div>Response Time: {selectedProfile.behaviorPatterns.responseTime} hours</div>
                        <div>Decision Style: {selectedProfile.behaviorPatterns.decisionMakingStyle}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Recent Conversations</div>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {selectedProfile.conversationHistory.map((conv, index) => (
                          <div key={index} className="p-2 bg-muted rounded text-xs">
                            <div className="font-medium">{conv.topic.replace('_', ' ')}</div>
                            <div className="text-muted-foreground">{conv.outcome.replace('_', ' ')}</div>
                            <div className="text-muted-foreground">{formatDate(conv.timestamp)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit Profile
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Predictive Flows */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Predictive Conversation Flows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictiveFlows.map((flow) => (
                    <div key={flow.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{flow.predictedIntent.replace('_', ' ')}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {flow.confidence}% confidence
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        Trigger: {flow.trigger.replace('_', ' ')}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Suggested Actions:</div>
                        <div className="space-y-1">
                          {flow.suggestedActions.map((action, index) => (
                            <div key={index} className="text-xs p-2 bg-muted rounded">
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                        <div>
                          <div className="text-muted-foreground">Success Probability</div>
                          <div className="font-medium">{flow.successProbability}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Accuracy</div>
                          <div className="font-medium">{flow.accuracy}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Flow Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Flow Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{metrics.predictiveAccuracy}%</div>
                    <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Property Search → Viewing</span>
                        <span className="text-sm text-green-600">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Price Inquiry → Negotiation</span>
                        <span className="text-sm text-yellow-600">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Risk Assessment → Decision</span>
                        <span className="text-sm text-green-600">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cross-Platform Sync Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Cross-Platform Sync
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {crossPlatformSync.map((sync, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white text-sm font-medium">
                            {sync.platform[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium">{sync.platform}</div>
                            <div className="text-sm text-muted-foreground">
                              {sync.dataPoints} data points
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={getSyncStatusColor(sync.status)}>
                            {getSyncStatusIcon(sync.status)}
                          </div>
                          <Badge variant="outline" className={getSyncStatusColor(sync.status)}>
                            {sync.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Last Sync</div>
                          <div className="font-medium">{formatDate(sync.lastSync)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Frequency</div>
                          <div className="font-medium">Every {sync.syncFrequency} min</div>
                        </div>
                      </div>
                      
                      {sync.conflicts > 0 && (
                        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <span className="text-yellow-800">
                              {sync.conflicts} conflicts • {sync.resolution} resolution
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sync Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Sync Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{metrics.crossPlatformSync}%</div>
                    <div className="text-sm text-muted-foreground">Sync Success Rate</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Data Points Synced</span>
                        <span className="text-sm text-blue-600">{metrics.dataPoints.toLocaleString()}</span>
                      </div>
                      <Progress value={(metrics.dataPoints / 50000) * 100} className="h-2" />
                    </div>
                    
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Memory Retention</span>
                        <span className="text-sm text-green-600">{metrics.memoryRetention}%</span>
                      </div>
                      <Progress value={metrics.memoryRetention} className="h-2" />
                    </div>
                    
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Privacy Compliance</span>
                        <span className="text-sm text-green-600">{metrics.privacyCompliance}%</span>
                      </div>
                      <Progress value={metrics.privacyCompliance} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Memory Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Memory Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{metrics.totalProfiles}</div>
                      <div className="text-sm text-muted-foreground">Total Profiles</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{metrics.activeProfiles}</div>
                      <div className="text-sm text-muted-foreground">Active Profiles</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Profile Completeness</span>
                        <span className="text-sm text-blue-600">{metrics.avgProfileCompleteness}%</span>
                      </div>
                      <Progress value={metrics.avgProfileCompleteness} className="h-2" />
                    </div>
                    
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Predictive Accuracy</span>
                        <span className="text-sm text-green-600">{metrics.predictiveAccuracy}%</span>
                      </div>
                      <Progress value={metrics.predictiveAccuracy} className="h-2" />
                    </div>
                    
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Memory Retention</span>
                        <span className="text-sm text-purple-600">{metrics.memoryRetention}%</span>
                      </div>
                      <Progress value={metrics.memoryRetention} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{metrics.dataPoints.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Data Points</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">User Preferences</span>
                        <span className="text-sm text-blue-600">12,456</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Conversation History</span>
                        <span className="text-sm text-green-600">8,923</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Behavior Patterns</span>
                        <span className="text-sm text-purple-600">15,234</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    
                    <div className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Predictive Models</span>
                        <span className="text-sm text-orange-600">9,065</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
