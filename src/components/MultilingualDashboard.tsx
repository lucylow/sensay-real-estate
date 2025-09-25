import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Languages, 
  MapPin, 
  TrendingUp, 
  Shield, 
  DollarSign,
  MessageCircle,
  BarChart3,
  Users,
  Zap
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { LanguageSelector } from '@/components/ui/language-selector';
import { MultilingualChatInterface } from '@/components/MultilingualChatInterface';
import { multilingualChatService } from '@/services/multilingualChatService';

interface MultilingualDashboardProps {
  className?: string;
}

interface GlobalStats {
  totalLanguages: number;
  activeUsers: number;
  propertiesAnalyzed: number;
  translationsToday: number;
}

interface LanguageStats {
  language: string;
  name: string;
  flag: string;
  users: number;
  properties: number;
  growth: number;
}

export const MultilingualDashboard: React.FC<MultilingualDashboardProps> = ({
  className = ''
}) => {
  const { t, language, setLanguage } = useTranslation();
  const [stats, setStats] = useState<GlobalStats>({
    totalLanguages: 12,
    activeUsers: 245000,
    propertiesAnalyzed: 1250000,
    translationsToday: 89000
  });
  
  const [languageStats, setLanguageStats] = useState<LanguageStats[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    // Mock data - in production, this would come from your analytics API
    setLanguageStats([
      { language: 'en', name: 'English', flag: '🇺🇸', users: 85000, properties: 450000, growth: 12.5 },
      { language: 'es', name: 'Español', flag: '🇪🇸', users: 62000, properties: 320000, growth: 18.2 },
      { language: 'pt', name: 'Português', flag: '🇧🇷', users: 45000, properties: 280000, growth: 22.1 },
      { language: 'zh', name: '中文', flag: '🇨🇳', users: 38000, properties: 180000, growth: 25.8 },
      { language: 'fr', name: 'Français', flag: '🇫🇷', users: 28000, properties: 150000, growth: 15.3 },
      { language: 'de', name: 'Deutsch', flag: '🇩🇪', users: 22000, properties: 120000, growth: 19.7 },
      { language: 'ja', name: '日本語', flag: '🇯🇵', users: 18000, properties: 95000, growth: 21.4 },
      { language: 'ko', name: '한국어', flag: '🇰🇷', users: 15000, properties: 78000, growth: 16.9 },
      { language: 'ar', name: 'العربية', flag: '🇸🇦', users: 12000, properties: 65000, growth: 28.3 },
      { language: 'hi', name: 'हिन्दी', flag: '🇮🇳', users: 8000, properties: 42000, growth: 31.2 },
      { language: 'ru', name: 'Русский', flag: '🇷🇺', users: 6000, properties: 35000, growth: 14.6 },
      { language: 'it', name: 'Italiano', flag: '🇮🇹', users: 4000, properties: 25000, growth: 17.8 }
    ]);
  }, []);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat(language, {
      notation: num > 1000000 ? 'compact' : 'standard',
      maximumFractionDigits: 1
    }).format(num);
  };

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTopLanguages = (limit: number = 5): LanguageStats[] => {
    return languageStats
      .sort((a, b) => b.users - a.users)
      .slice(0, limit);
  };

  const getFastestGrowingLanguages = (limit: number = 5): LanguageStats[] => {
    return languageStats
      .sort((a, b) => b.growth - a.growth)
      .slice(0, limit);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleDemoToggle = () => {
    setShowDemo(!showDemo);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary" />
            Global Property Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">
            Multilingual real estate analysis platform serving users worldwide
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector 
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
            showLabel={true}
          />
          <Button onClick={handleDemoToggle} variant="outline">
            <MessageCircle className="h-4 w-4 mr-2" />
            {showDemo ? 'Hide' : 'Show'} Chat Demo
          </Button>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Languages Supported</p>
                <p className="text-2xl font-bold">{stats.totalLanguages}</p>
              </div>
              <Languages className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{formatNumber(stats.activeUsers)}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Properties Analyzed</p>
                <p className="text-2xl font-bold">{formatNumber(stats.propertiesAnalyzed)}</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Translations Today</p>
                <p className="text-2xl font-bold">{formatNumber(stats.translationsToday)}</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Top Languages by Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getTopLanguages().map((lang, index) => (
                    <div key={lang.language} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatNumber(lang.users)}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(lang.properties)} properties
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fastest Growing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Fastest Growing Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getFastestGrowingLanguages().map((lang, index) => (
                    <div key={lang.language} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-green-600 bg-green-100">
                          +{lang.growth.toFixed(1)}%
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(lang.users)} users
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="languages" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {languageStats.map((lang) => (
              <Card key={lang.language} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-lg">{lang.name}</span>
                    </div>
                    <Badge variant={lang.language === language ? "default" : "outline"}>
                      {lang.language}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Users:</span>
                    <span className="font-medium">{formatNumber(lang.users)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Properties:</span>
                    <span className="font-medium">{formatNumber(lang.properties)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Growth:</span>
                    <span className="font-medium text-green-600">+{lang.growth.toFixed(1)}%</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full mt-3"
                    variant={lang.language === language ? "default" : "outline"}
                    onClick={() => setLanguage(lang.language)}
                  >
                    {lang.language === language ? 'Current' : 'Switch to'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>North America</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>United States (English)</span>
                    <Badge>45% of users</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Canada (English/French)</span>
                    <Badge>12% of users</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Mexico (Spanish)</span>
                    <Badge>8% of users</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Europe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Spain (Spanish)</span>
                    <Badge>18% of users</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Germany (German)</span>
                    <Badge>9% of users</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>France (French)</span>
                    <Badge>7% of users</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Asia-Pacific</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>China (Mandarin)</span>
                    <Badge>15% of users</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Japan (Japanese)</span>
                    <Badge>6% of users</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>South Korea (Korean)</span>
                    <Badge>5% of users</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Other Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Middle East (Arabic)</span>
                    <Badge>4% of users</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>India (Hindi)</span>
                    <Badge>3% of users</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Russia (Russian)</span>
                    <Badge>2% of users</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Translation Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy Rate</span>
                      <span>96.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '96.8%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Response Time</span>
                      <span>1.2s avg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>User Satisfaction</span>
                      <span>4.7/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Property Analysis</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Intelligence</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Assessment</span>
                    <span className="font-medium">52%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment Advice</span>
                    <span className="font-medium">43%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chat Support</span>
                    <span className="font-medium">89%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Chat Demo */}
      {showDemo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Multilingual Chat Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MultilingualChatInterface 
              property={{
                address: "123 Global Street, International City",
                type: "House",
                price: 750000,
                currency: "USD",
                country: "US"
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground py-8 border-t">
        <p>PropGuard AI • Global Property Intelligence Platform</p>
        <p className="mt-1">
          Supporting {stats.totalLanguages} languages • Serving {formatNumber(stats.activeUsers)} users worldwide
        </p>
      </div>
    </div>
  );
};
