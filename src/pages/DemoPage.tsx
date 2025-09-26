/**
 * Demo Page showcasing Sensay, ElevenLabs, and HeyGen integrations
 * Provides a comprehensive demonstration of all features
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mic, 
  Video, 
  Home, 
  Bot, 
  Play, 
  Pause, 
  Volume2, 
  TrendingUp,
  Shield,
  Calculator,
  BookOpen,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import VoiceSelector from '@/components/VoiceSelector';
import AudioPlayer from '@/components/AudioPlayer';
import VoiceCloner from '@/components/VoiceCloner';
import FAQChatbot from '@/components/FAQChatbot';
import { useElevenLabs } from '@/hooks/useElevenLabs';
import { mockDataService } from '@/services/mockDataService';
import { mockSensayProperties, mockSensayAnalyses } from '@/data/mockSensay';
import { mockHeyGenAvatars } from '@/data/mockHeyGen';

export const DemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [demoData, setDemoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null);
  
  const { 
    isConfigured: isVoiceConfigured, 
    speak, 
    voices, 
    selectedVoiceId,
    isPlaying,
    currentTrack 
  } = useElevenLabs();

  useEffect(() => {
    loadDemoData();
  }, []);

  const loadDemoData = async () => {
    setIsLoading(true);
    try {
      const data = await mockDataService.getDashboardData();
      setDemoData(data?.dashboard);
      
      // Select first property for demo
      if (mockSensayProperties.length > 0) {
        setSelectedProperty(mockSensayProperties[0]);
        setSelectedAnalysis(mockSensayAnalyses[0]);
      }
    } catch (error) {
      console.error('Failed to load demo data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoVoice = async () => {
    if (!isVoiceConfigured) return;
    
    const demoText = `Welcome to the Sensay Real Estate demo. This property at ${selectedProperty?.address} has an estimated value of $${selectedProperty?.estimated_value?.toLocaleString() || '1,500,000'} with a confidence score of ${selectedProperty?.confidence_score || 92}%. The risk assessment indicates ${selectedAnalysis?.risk_assessment?.overall_risk_score < 30 ? 'low' : 'moderate'} overall risk.`;
    
    await speak(demoText);
  };

  const handleDemoPropertyAnalysis = async () => {
    setIsLoading(true);
    try {
      const analysis = await mockDataService.analyzeSensayProperty(selectedProperty?.address || '123 Collins Street');
      if (analysis?.success) {
        setSelectedProperty(analysis.property);
        setSelectedAnalysis(analysis.analysis);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoVideoGeneration = async () => {
    setIsLoading(true);
    try {
      const presentation = await mockDataService.generatePropertyPresentation(selectedProperty?.id || 'prop_001');
      if (presentation?.success) {
        // Show success message
        console.log('Presentation generated:', presentation.presentation);
      }
    } catch (error) {
      console.error('Video generation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !demoData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading demo data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Sensay Real Estate Demo</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive AI-powered property analysis with voice and video integration
        </p>
        
        <div className="flex justify-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            ElevenLabs Voice AI
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            HeyGen Video AI
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            PropGuard AI Analysis
          </Badge>
        </div>
      </div>

      {/* Demo Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="voice">Voice AI</TabsTrigger>
          <TabsTrigger value="video">Video AI</TabsTrigger>
          <TabsTrigger value="analysis">Property Analysis</TabsTrigger>
          <TabsTrigger value="faq">FAQ Chatbot</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Voice AI Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Available Voices</span>
                  <Badge variant="secondary">{voices.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Voice Status</span>
                  <Badge variant={isVoiceConfigured ? "default" : "secondary"}>
                    {isVoiceConfigured ? 'Configured' : 'Not Configured'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Currently Playing</span>
                  <Badge variant={isPlaying ? "default" : "outline"}>
                    {isPlaying ? 'Playing' : 'Stopped'}
                  </Badge>
                </div>
                <Button onClick={handleDemoVoice} className="w-full" disabled={!isVoiceConfigured}>
                  <Play className="h-4 w-4 mr-2" />
                  Demo Voice
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video AI Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Available Avatars</span>
                  <Badge variant="secondary">{mockHeyGenAvatars.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Real Estate Avatars</span>
                  <Badge variant="secondary">2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Supported Languages</span>
                  <Badge variant="secondary">5+</Badge>
                </div>
                <Button onClick={handleDemoVideoGeneration} className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  Generate Video
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Property Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Properties Analyzed</span>
                  <Badge variant="secondary">{demoData?.total_properties || 0}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Reports</span>
                  <Badge variant="secondary">{demoData?.total_reports || 0}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>AI Confidence</span>
                  <Badge variant="secondary">92%</Badge>
                </div>
                <Button onClick={handleDemoPropertyAnalysis} className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Analyze Property
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {demoData?.recent_activities?.map((activity: any) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{activity.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Voice AI Tab */}
        <TabsContent value="voice" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VoiceSelector />
            <div className="space-y-4">
              <AudioPlayer showQueue={true} />
              <VoiceCloner />
            </div>
          </div>
        </TabsContent>

        {/* Video AI Tab */}
        <TabsContent value="video" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockHeyGenAvatars.slice(0, 6).map((avatar) => (
              <Card key={avatar.avatar_id}>
                <CardHeader>
                  <CardTitle className="text-lg">{avatar.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{avatar.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Gender</span>
                    <Badge variant="outline">{avatar.gender}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Age Range</span>
                    <span className="text-sm">{avatar.age_range}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Style</span>
                    <Badge variant="secondary">{avatar.style}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Premium</span>
                    <Badge variant={avatar.is_premium ? "default" : "outline"}>
                      {avatar.is_premium ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <Button className="w-full" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Property Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          {selectedProperty && selectedAnalysis ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{selectedProperty.address}</h3>
                    <p className="text-muted-foreground">
                      {selectedProperty.suburb}, {selectedProperty.state} {selectedProperty.postcode}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="font-medium">{selectedProperty.property_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-medium">{selectedProperty.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="font-medium">{selectedProperty.bathrooms}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Car Spaces</p>
                      <p className="font-medium">{selectedProperty.car_spaces}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.features.map((feature: string) => (
                        <Badge key={feature} variant="outline">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Estimated Value</span>
                      <span className="font-bold text-lg">
                        ${selectedProperty.estimated_value?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Confidence Score</span>
                      <Badge variant={selectedProperty.confidence_score > 90 ? "default" : "secondary"}>
                        {selectedProperty.confidence_score}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Risk Score</span>
                      <Badge variant={selectedProperty.risk_score < 30 ? "default" : selectedProperty.risk_score < 60 ? "secondary" : "destructive"}>
                        {selectedProperty.risk_score}/100
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Risk Assessment</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Flood Risk</span>
                        <Badge variant="outline" className="text-xs">
                          {selectedAnalysis.risk_assessment.flood_risk}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Fire Risk</span>
                        <Badge variant="outline" className="text-xs">
                          {selectedAnalysis.risk_assessment.fire_risk}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Market Risk</span>
                        <Badge variant="outline" className="text-xs">
                          {selectedAnalysis.risk_assessment.market_risk}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Environmental</span>
                        <Badge variant="outline" className="text-xs">
                          {selectedAnalysis.risk_assessment.environmental_risk}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Investment Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Rental Yield</span>
                        <span className="font-medium">
                          {selectedAnalysis.investment_metrics.rental_yield}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Capital Growth</span>
                        <span className="font-medium">
                          {selectedAnalysis.investment_metrics.capital_growth_projection}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total Return</span>
                        <span className="font-medium">
                          {selectedAnalysis.investment_metrics.total_return_projection}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No property analysis available</p>
                <Button onClick={handleDemoPropertyAnalysis} className="mt-4">
                  Load Demo Analysis
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* FAQ Chatbot Tab */}
        <TabsContent value="faq" className="space-y-6">
          <FAQChatbot />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DemoPage;