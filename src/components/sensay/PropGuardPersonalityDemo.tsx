/**
 * PropGuard AI Sensay Personality Demonstration Component
 * 
 * Interactive demo showcasing the personality training dataset and
 * emotional intelligence capabilities of the PropGuard AI chatbot.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  MessageCircle, 
  Users, 
  Globe, 
  Heart, 
  TrendingUp, 
  Shield, 
  Star,
  Zap,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Eye,
  BarChart3,
  Brain,
  Smile,
  Frown,
  Meh,
  Languages,
  User,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

import { sensayPersonalityIntegration } from '@/services/sensayPersonalityIntegration';
import { SENSAY_PERSONALITY_CONFIG } from '@/data/sensayPersonalityTraining';

// ============================================================================
// INTERFACES AND TYPES
// ============================================================================

interface PersonalityDemoState {
  userId: string;
  userType: string;
  language: string;
  platform: string;
  conversation: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    personality?: any;
    emotionalState?: string;
  }>;
  currentMessage: string;
  isTyping: boolean;
  selectedDemo: string;
  analytics: any;
}

interface UserTypeCardProps {
  type: string;
  characteristics: string[];
  tone: any;
  isSelected: boolean;
  onSelect: () => void;
}

interface LanguageCardProps {
  language: string;
  settings: any;
  isSelected: boolean;
  onSelect: () => void;
}

interface EmotionalDemoProps {
  emotion: string;
  keywords: string[];
  responseStrategy: string;
  sampleResponses: string[];
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const PropGuardPersonalityDemo: React.FC = () => {
  const [state, setState] = useState<PersonalityDemoState>({
    userId: 'demo-user-' + Date.now(),
    userType: 'first_time_buyer',
    language: 'en',
    platform: 'web',
    conversation: [],
    currentMessage: '',
    isTyping: false,
    selectedDemo: 'chat',
    analytics: {}
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    // Initialize demo with welcome message
    addMessage('assistant', 'Welcome to the PropGuard AI Sensay Personality Demo! I\'m your intelligent property assistant, trained with advanced personality traits and emotional intelligence. How can I help you today?', {
      emotionalState: 'friendly',
      personality: {
        tone: SENSAY_PERSONALITY_CONFIG.defaultTone,
        userType: state.userType,
        language: state.language
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [state.conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (role: 'user' | 'assistant', content: string, metadata?: any) => {
    const message = {
      id: `msg_${Date.now()}`,
      role,
      content,
      timestamp: new Date(),
      ...metadata
    };

    setState(prev => ({
      ...prev,
      conversation: [...prev.conversation, message]
    }));
  };

  const handleSendMessage = async () => {
    if (!state.currentMessage.trim()) return;

    const userMessage = state.currentMessage;
    setState(prev => ({ ...prev, currentMessage: '', isTyping: true }));

    // Add user message
    addMessage('user', userMessage);

    try {
      // Generate enhanced response with personality
      const response = await sensayPersonalityIntegration.generateEnhancedChatCompletion({
        userId: state.userId,
        message: userMessage,
        context: {
          platform: state.platform,
          language: state.language,
          userType: state.userType
        }
      });

      // Add assistant response with personality metadata
      addMessage('assistant', response.content, {
        personality: response.personality,
        emotionalState: response.analytics.emotionalState,
        actions: response.actions,
        analytics: response.analytics
      });

      // Update analytics
      setState(prev => ({
        ...prev,
        analytics: {
          ...prev.analytics,
          totalInteractions: (prev.analytics.totalInteractions || 0) + 1,
          userTypeDistribution: {
            ...prev.analytics.userTypeDistribution,
            [state.userType]: (prev.analytics.userTypeDistribution?.[state.userType] || 0) + 1
          }
        }
      }));

    } catch (error) {
      console.error('Error generating response:', error);
      addMessage('assistant', 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.', {
        emotionalState: 'apologetic',
        personality: {
          tone: { ...SENSAY_PERSONALITY_CONFIG.defaultTone, empathy: 10 },
          userType: state.userType,
          language: state.language
        }
      });
    } finally {
      setState(prev => ({ ...prev, isTyping: false }));
    }
  };

  const handleUserTypeChange = (userType: string) => {
    setState(prev => ({ ...prev, userType }));
    
    // Add system message about user type change
    addMessage('assistant', `I've adapted my communication style for ${userType.replace('_', ' ')}. I'll now focus on ${SENSAY_PERSONALITY_CONFIG.userTypes[userType as keyof typeof SENSAY_PERSONALITY_CONFIG.userTypes]?.priorityActions.join(', ')}.`, {
      emotionalState: 'adaptive',
      personality: {
        tone: SENSAY_PERSONALITY_CONFIG.userTypes[userType as keyof typeof SENSAY_PERSONALITY_CONFIG.userTypes]?.preferredTone,
        userType,
        language: state.language
      }
    });
  };

  const handleLanguageChange = (language: string) => {
    setState(prev => ({ ...prev, language }));
    
    // Get language-specific greeting
    const greeting = SENSAY_PERSONALITY_CONFIG.languageSettings[language]?.greeting || 
                    SENSAY_PERSONALITY_CONFIG.languageSettings.en.greeting;
    
    addMessage('assistant', greeting, {
      emotionalState: 'welcoming',
      personality: {
        tone: SENSAY_PERSONALITY_CONFIG.defaultTone,
        userType: state.userType,
        language
      }
    });
  };

  const handlePlatformChange = (platform: string) => {
    setState(prev => ({ ...prev, platform }));
  };

  const runPersonalityTest = async () => {
    const testMessages = [
      "I'm feeling overwhelmed by the home buying process",
      "I need to find a great investment property ASAP!",
      "Is this property safe? I'm worried about floods",
      "Can you help me understand the market trends?",
      "I'm excited to buy my first home!"
    ];

    for (const message of testMessages) {
      setState(prev => ({ ...prev, currentMessage: message }));
      await handleSendMessage();
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  };

  const clearConversation = () => {
    setState(prev => ({
      ...prev,
      conversation: [],
      analytics: {}
    }));
    
    // Add welcome message
    addMessage('assistant', 'Conversation cleared! I\'m ready to help you with your real estate needs. How can I assist you today?', {
      emotionalState: 'welcoming',
      personality: {
        tone: SENSAY_PERSONALITY_CONFIG.defaultTone,
        userType: state.userType,
        language: state.language
      }
    });
  };

  // ============================================================================
  // RENDER METHODS
  // ============================================================================

  const renderUserTypeSelector = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Type Adaptation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(SENSAY_PERSONALITY_CONFIG.userTypes).map(([type, config]) => (
            <UserTypeCard
              key={type}
              type={type}
              characteristics={config.characteristics}
              tone={config.preferredTone}
              isSelected={state.userType === type}
              onSelect={() => handleUserTypeChange(type)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderLanguageSelector = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Multilingual Support
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(SENSAY_PERSONALITY_CONFIG.languageSettings).map(([code, settings]) => (
            <LanguageCard
              key={code}
              language={code}
              settings={settings}
              isSelected={state.language === code}
              onSelect={() => handleLanguageChange(code)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderEmotionalIntelligenceDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Emotional Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {SENSAY_PERSONALITY_CONFIG.emotionalResponses.map((response, index) => (
            <EmotionalDemo
              key={index}
              emotion={response.emotion}
              keywords={response.keywords}
              responseStrategy={response.responseStrategy}
              sampleResponses={response.sampleResponses}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderChatInterface = () => (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            PropGuard AI Chat
            <Badge variant="secondary" className="ml-2">
              {state.userType.replace('_', ' ')}
            </Badge>
            <Badge variant="outline" className="ml-1">
              {state.language.toUpperCase()}
            </Badge>
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={runPersonalityTest}
              disabled={state.isTyping}
            >
              <Play className="h-4 w-4 mr-1" />
              Test
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearConversation}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {state.conversation.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  {message.personality && (
                    <div className="mt-2 text-xs opacity-70">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {message.emotionalState}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Tone: {Math.round(message.personality.tone?.warmth || 0)}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {state.isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">PropGuard AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={state.currentMessage}
              onChange={(e) => setState(prev => ({ ...prev, currentMessage: e.target.value }))}
              placeholder="Ask me anything about real estate..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={state.isTyping}
            />
            <Button onClick={handleSendMessage} disabled={state.isTyping || !state.currentMessage.trim()}>
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAnalytics = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Personality Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{state.conversation.length}</div>
              <div className="text-sm text-muted-foreground">Total Messages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {state.conversation.filter(m => m.role === 'assistant').length}
              </div>
              <div className="text-sm text-muted-foreground">AI Responses</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Current Configuration</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>User Type:</span>
                <Badge variant="outline">{state.userType}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Language:</span>
                <Badge variant="outline">{state.language.toUpperCase()}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Platform:</span>
                <Badge variant="outline">{state.platform}</Badge>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Personality Traits</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(SENSAY_PERSONALITY_CONFIG.corePersonality).map(([trait, value]) => (
                <div key={trait} className="flex items-center gap-2">
                  {value ? <CheckCircle className="h-3 w-3 text-green-500" /> : <AlertCircle className="h-3 w-3 text-red-500" />}
                  <span className="capitalize">{trait.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Bot className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">PropGuard AI Sensay Personality Demo</h1>
        <Badge variant="secondary" className="ml-auto">
          <Zap className="h-3 w-3 mr-1" />
          Advanced AI Personality
        </Badge>
      </div>

      <Tabs value={state.selectedDemo} onValueChange={(value) => setState(prev => ({ ...prev, selectedDemo: value }))}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">Interactive Chat</TabsTrigger>
          <TabsTrigger value="personality">Personality Traits</TabsTrigger>
          <TabsTrigger value="multilingual">Multilingual</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {renderChatInterface()}
            </div>
            <div className="space-y-6">
              {renderAnalytics()}
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Platform Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={state.platform} onValueChange={handlePlatformChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                        <SelectItem value="discord">Discord</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="x_twitter">X (Twitter)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="personality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderUserTypeSelector()}
            {renderEmotionalIntelligenceDemo()}
          </div>
        </TabsContent>

        <TabsContent value="multilingual" className="space-y-6">
          {renderLanguageSelector()}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {renderAnalytics()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const UserTypeCard: React.FC<UserTypeCardProps> = ({ type, characteristics, tone, isSelected, onSelect }) => (
  <Card 
    className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
    onClick={onSelect}
  >
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium capitalize">{type.replace('_', ' ')}</h4>
        {isSelected && <CheckCircle className="h-4 w-4 text-primary" />}
      </div>
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">
          <div className="flex items-center gap-1 mb-1">
            <Heart className="h-3 w-3" />
            <span>Warmth: {tone.warmth}/10</span>
          </div>
          <div className="flex items-center gap-1 mb-1">
            <Target className="h-3 w-3" />
            <span>Formality: {tone.formality}/10</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span>Empathy: {tone.empathy}/10</span>
          </div>
        </div>
        <div className="text-xs">
          {characteristics.slice(0, 2).map((char, index) => (
            <div key={index} className="text-muted-foreground">• {char}</div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const LanguageCard: React.FC<LanguageCardProps> = ({ language, settings, isSelected, onSelect }) => (
  <Card 
    className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
    onClick={onSelect}
  >
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium uppercase">{language}</h4>
        {isSelected && <CheckCircle className="h-4 w-4 text-primary" />}
      </div>
      <div className="text-xs text-muted-foreground">
        <div className="mb-1">{settings.name}</div>
        <div className="space-y-1">
          {settings.culturalAdaptations.slice(0, 1).map((adaptation: string, index: number) => (
            <div key={index}>• {adaptation}</div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const EmotionalDemo: React.FC<EmotionalDemoProps> = ({ emotion, keywords, responseStrategy, sampleResponses }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-2 text-base">
        {emotion === 'stressed' && <Frown className="h-4 w-4 text-red-500" />}
        {emotion === 'excited' && <Smile className="h-4 w-4 text-green-500" />}
        {emotion === 'neutral' && <Meh className="h-4 w-4 text-yellow-500" />}
        {emotion === 'uncertain' && <AlertCircle className="h-4 w-4 text-orange-500" />}
        {emotion === 'frustrated' && <Frown className="h-4 w-4 text-red-500" />}
        {emotion === 'urgent' && <Clock className="h-4 w-4 text-blue-500" />}
        <span className="capitalize">{emotion}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="space-y-3">
        <div>
          <div className="text-sm font-medium mb-1">Keywords:</div>
          <div className="flex flex-wrap gap-1">
            {keywords.map((keyword, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium mb-1">Strategy:</div>
          <div className="text-xs text-muted-foreground">{responseStrategy}</div>
        </div>
        <div>
          <div className="text-sm font-medium mb-1">Sample Response:</div>
          <div className="text-xs text-muted-foreground italic">
            "{sampleResponses[0]}"
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default PropGuardPersonalityDemo;
