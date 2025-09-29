import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Languages, 
  MessageCircle, 
  Users, 
  TrendingUp, 
  CheckCircle,
  AlertCircle,
  Settings,
  Brain,
  Zap,
  Target,
  BarChart3,
  Clock,
  Star,
  Flag,
  Languages,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  proficiency: number;
  isActive: boolean;
  users: number;
  conversations: number;
  satisfaction: number;
  culturalAdaptations: {
    currency: string;
    measurements: string;
    dateFormat: string;
    numberFormat: string;
  };
}

interface TranslationMetrics {
  totalTranslations: number;
  accuracy: number;
  avgResponseTime: number;
  supportedLanguages: number;
  activeUsers: number;
  culturalAdaptations: number;
  realTimeTranslations: number;
  contextAccuracy: number;
}

interface Conversation {
  id: string;
  language: string;
  originalText: string;
  translatedText: string;
  confidence: number;
  timestamp: Date;
  context: string;
  culturalNotes: string[];
  userSatisfaction: number;
}

export const MultilingualSupport: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [metrics, setMetrics] = useState<TranslationMetrics>({
    totalTranslations: 0,
    accuracy: 0,
    avgResponseTime: 0,
    supportedLanguages: 0,
    activeUsers: 0,
    culturalAdaptations: 0,
    realTimeTranslations: 0,
    contextAccuracy: 0
  });
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [isAutoDetection, setIsAutoDetection] = useState(true);
  const [isRealTimeTranslation, setIsRealTimeTranslation] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    const mockLanguages: Language[] = [
      {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
        proficiency: 98,
        isActive: true,
        users: 1250,
        conversations: 3456,
        satisfaction: 9.2,
        culturalAdaptations: {
          currency: 'USD',
          measurements: 'Imperial',
          dateFormat: 'MM/DD/YYYY',
          numberFormat: '1,234.56'
        }
      },
      {
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español',
        flag: '🇪🇸',
        proficiency: 94,
        isActive: true,
        users: 890,
        conversations: 2134,
        satisfaction: 8.8,
        culturalAdaptations: {
          currency: 'EUR',
          measurements: 'Metric',
          dateFormat: 'DD/MM/YYYY',
          numberFormat: '1.234,56'
        }
      },
      {
        code: 'zh',
        name: 'Chinese',
        nativeName: '中文',
        flag: '🇨🇳',
        proficiency: 91,
        isActive: true,
        users: 567,
        conversations: 1456,
        satisfaction: 8.5,
        culturalAdaptations: {
          currency: 'CNY',
          measurements: 'Metric',
          dateFormat: 'YYYY/MM/DD',
          numberFormat: '1,234.56'
        }
      },
      {
        code: 'fr',
        name: 'French',
        nativeName: 'Français',
        flag: '🇫🇷',
        proficiency: 89,
        isActive: true,
        users: 345,
        conversations: 789,
        satisfaction: 8.7,
        culturalAdaptations: {
          currency: 'EUR',
          measurements: 'Metric',
          dateFormat: 'DD/MM/YYYY',
          numberFormat: '1 234,56'
        }
      }
    ];

    const mockMetrics: TranslationMetrics = {
      totalTranslations: 7845,
      accuracy: 96.8,
      avgResponseTime: 0.3,
      supportedLanguages: 4,
      activeUsers: 3052,
      culturalAdaptations: 156,
      realTimeTranslations: 6789,
      contextAccuracy: 94.2
    };

    const mockConversations: Conversation[] = [
      {
        id: '1',
        language: 'es',
        originalText: 'Hola, estoy buscando una casa de 3 habitaciones en Melbourne',
        translatedText: 'Hello, I am looking for a 3-bedroom house in Melbourne',
        confidence: 96,
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        context: 'property_search',
        culturalNotes: ['Australian property terminology', 'Local area preferences'],
        userSatisfaction: 9
      },
      {
        id: '2',
        language: 'zh',
        originalText: '这套房子的价格是多少？',
        translatedText: 'What is the price of this property?',
        confidence: 94,
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        context: 'price_inquiry',
        culturalNotes: ['Chinese number formatting', 'Currency conversion'],
        userSatisfaction: 8
      }
    ];

    setLanguages(mockLanguages);
    setMetrics(mockMetrics);
    setConversations(mockConversations);
  }, []);

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 95) return 'text-green-600';
    if (proficiency >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSatisfactionColor = (satisfaction: number) => {
    if (satisfaction >= 9) return 'text-green-600';
    if (satisfaction >= 8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-green-600';
    if (confidence >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Multilingual Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              Multilingual Support
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="flex items-center gap-1">
                <Brain className="h-3 w-3" />
                AI-Powered
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Real-time
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.supportedLanguages}</div>
              <div className="text-sm text-muted-foreground">Supported Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{metrics.accuracy}%</div>
              <div className="text-sm text-muted-foreground">Translation Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{metrics.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{metrics.avgResponseTime}s</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="languages" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="translation">Translation</TabsTrigger>
          <TabsTrigger value="cultural">Cultural Adaptation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="languages" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Language List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Supported Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {languages.map((language) => (
                    <div 
                      key={language.code}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedLanguage(language)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{language.flag}</div>
                          <div>
                            <div className="font-medium">{language.name}</div>
                            <div className="text-sm text-muted-foreground">{language.nativeName}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={language.isActive ? "default" : "secondary"}>
                            {language.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                        <div>
                          <div className="text-muted-foreground">Users</div>
                          <div className="font-medium">{language.users.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Conversations</div>
                          <div className="font-medium">{language.conversations.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Proficiency</span>
                          <span className={getProficiencyColor(language.proficiency)}>
                            {language.proficiency}%
                          </span>
                        </div>
                        <Progress value={language.proficiency} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3" />
                          <span className={getSatisfactionColor(language.satisfaction)}>
                            {language.satisfaction}/10
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Language Details */}
            {selectedLanguage && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5" />
                    {selectedLanguage.name} Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl mb-2">{selectedLanguage.flag}</div>
                      <div className="font-medium">{selectedLanguage.name}</div>
                      <div className="text-sm text-muted-foreground">{selectedLanguage.nativeName}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Usage Statistics</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Active Users</div>
                          <div className="font-medium">{selectedLanguage.users.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Total Conversations</div>
                          <div className="font-medium">{selectedLanguage.conversations.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Cultural Adaptations</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Currency:</span>
                          <span>{selectedLanguage.culturalAdaptations.currency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Measurements:</span>
                          <span>{selectedLanguage.culturalAdaptations.measurements}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date Format:</span>
                          <span>{selectedLanguage.culturalAdaptations.dateFormat}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Number Format:</span>
                          <span>{selectedLanguage.culturalAdaptations.numberFormat}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Performance</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Proficiency</span>
                          <span className={getProficiencyColor(selectedLanguage.proficiency)}>
                            {selectedLanguage.proficiency}%
                          </span>
                        </div>
                        <Progress value={selectedLanguage.proficiency} className="h-2" />
                        
                        <div className="flex justify-between text-sm">
                          <span>Satisfaction</span>
                          <span className={getSatisfactionColor(selectedLanguage.satisfaction)}>
                            {selectedLanguage.satisfaction}/10
                          </span>
                        </div>
                        <Progress value={selectedLanguage.satisfaction * 10} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="translation" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Translation Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Translation Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-Detection</span>
                    <Badge variant={isAutoDetection ? "default" : "secondary"}>
                      {isAutoDetection ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Real-time Translation</span>
                    <Badge variant={isRealTimeTranslation ? "default" : "secondary"}>
                      {isRealTimeTranslation ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Context Awareness</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Voice Translation</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cultural Adaptation</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cross-Platform Sync</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Translations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Recent Translations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversations.map((conversation) => (
                    <div key={conversation.id} className="p-3 border rounded">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{conversation.language.toUpperCase()}</span>
                          <Badge variant="outline" className="text-xs">
                            {conversation.context}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${getConfidenceColor(conversation.confidence)}`}>
                            {conversation.confidence}%
                          </span>
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs">{conversation.userSatisfaction}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <div className="text-muted-foreground mb-1">Original:</div>
                          <div className="p-2 bg-muted rounded">{conversation.originalText}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Translation:</div>
                          <div className="p-2 bg-blue-50 rounded">{conversation.translatedText}</div>
                        </div>
                      </div>
                      
                      {conversation.culturalNotes.length > 0 && (
                        <div className="mt-2">
                          <div className="text-xs text-muted-foreground mb-1">Cultural Notes:</div>
                          <div className="flex flex-wrap gap-1">
                            {conversation.culturalNotes.map((note, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {note}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cultural" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cultural Adaptations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Cultural Adaptations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{metrics.culturalAdaptations}</div>
                    <div className="text-sm text-muted-foreground">Active Adaptations</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <div className="font-medium text-sm mb-2">Property Terminology</div>
                      <div className="text-xs text-muted-foreground">
                        Localized property terms, measurements, and descriptions
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded">
                      <div className="font-medium text-sm mb-2">Currency & Pricing</div>
                      <div className="text-xs text-muted-foreground">
                        Automatic currency conversion and local pricing formats
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded">
                      <div className="font-medium text-sm mb-2">Date & Time</div>
                      <div className="text-xs text-muted-foreground">
                        Regional date formats and time zone handling
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded">
                      <div className="font-medium text-sm mb-2">Communication Style</div>
                      <div className="text-xs text-muted-foreground">
                        Cultural communication preferences and etiquette
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Adaptation Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Adaptation Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded">
                    <div className="font-medium text-sm mb-2">English → Spanish</div>
                    <div className="text-xs space-y-1">
                      <div>• "3-bedroom house" → "casa de 3 habitaciones"</div>
                      <div>• "$500,000" → "500.000 €" (EUR conversion)</div>
                      <div>• "12/25/2024" → "25/12/2024" (date format)</div>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="font-medium text-sm mb-2">English → Chinese</div>
                    <div className="text-xs space-y-1">
                      <div>• "Property investment" → "房地产投资"</div>
                      <div>• "$1,000,000" → "¥6,500,000" (CNY conversion)</div>
                      <div>• "Square feet" → "平方米" (metric conversion)</div>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="font-medium text-sm mb-2">English → French</div>
                    <div className="text-xs space-y-1">
                      <div>• "Real estate agent" → "agent immobilier"</div>
                      <div>• "$750,000" → "750 000 €" (number format)</div>
                      <div>• "Open house" → "visite libre"</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Translation Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Translation Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Accuracy</span>
                      <span>{metrics.accuracy}%</span>
                    </div>
                    <Progress value={metrics.accuracy} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Context Accuracy</span>
                      <span>{metrics.contextAccuracy}%</span>
                    </div>
                    <Progress value={metrics.contextAccuracy} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Real-time Translations</span>
                      <span>{metrics.realTimeTranslations}</span>
                    </div>
                    <Progress value={(metrics.realTimeTranslations / metrics.totalTranslations) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Avg Response Time</span>
                      <span>{metrics.avgResponseTime}s</span>
                    </div>
                    <Progress value={100 - (metrics.avgResponseTime * 20)} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Language Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {languages.map((language) => (
                    <div key={language.code} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span>{language.flag}</span>
                          <span>{language.name}</span>
                        </div>
                        <span>{language.users} users</span>
                      </div>
                      <Progress value={(language.users / metrics.activeUsers) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
