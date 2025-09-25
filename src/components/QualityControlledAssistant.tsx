import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, User, Send, Sparkles, TrendingUp, AlertCircle, Key, Settings, 
  ThumbsUp, ThumbsDown, Star, MessageSquare, Clock, Target, Zap
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { 
  ChatFlowQualityEngine, 
  ConversationState, 
  QualityResponse, 
  ConversationMetrics,
  MessageAnalysis 
} from '@/services/chatflow/qualityEngine';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  quickActions?: Array<{
    action: string;
    label: string;
    icon?: string;
  }>;
  fallbackOptions?: Array<{
    type: 'clarification' | 'information_gap' | 'alternative';
    message: string;
    options?: string[];
  }>;
  richMedia?: {
    type: 'image' | 'video' | 'document' | 'map';
    url: string;
    caption?: string;
  };
  metadata?: {
    confidence: number;
    processingTime: number;
    model: string;
  };
  qualityMetrics?: ConversationMetrics;
  messageAnalysis?: MessageAnalysis;
}

interface QualityControlledAssistantProps {
  property?: any;
  analysis?: any;
  className?: string;
  userId?: string;
  onQualityMetrics?: (metrics: ConversationMetrics) => void;
  onStateChange?: (state: ConversationState) => void;
}

export const QualityControlledAssistant: React.FC<QualityControlledAssistantProps> = ({ 
  property, 
  analysis, 
  className = '',
  userId = 'default_user',
  onQualityMetrics,
  onStateChange
}) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: t('chatflow.greeting.welcome'),
      timestamp: new Date(),
      quickActions: [
        { action: 'property_search', label: t('chatflow.greeting.quickActions.propertySearch') },
        { action: 'get_valuation', label: t('chatflow.greeting.quickActions.getValuation') },
        { action: 'market_insights', label: t('chatflow.greeting.quickActions.marketInsights') },
        { action: 'risk_assessment', label: t('chatflow.greeting.quickActions.riskAssessment') }
      ],
      metadata: {
        confidence: 95,
        processingTime: 0.5,
        model: 'quality_engine'
      }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentState, setCurrentState] = useState<ConversationState>(ConversationState.GREETING);
  const [qualityEngine] = useState(() => new ChatFlowQualityEngine(t));
  const [showQualityMetrics, setShowQualityMetrics] = useState(false);
  const [userFeedback, setUserFeedback] = useState<Record<string, 'positive' | 'negative' | null>>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Process message through quality engine
      const result = await qualityEngine.processMessage(userId, message, 'web');
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: result.response.message,
        timestamp: new Date(),
        suggestions: result.suggestedActions.map(action => ({
          action,
          label: t(`chatflow.suggestions.${action}`, { defaultValue: action })
        })),
        quickActions: result.response.quickActions,
        fallbackOptions: result.response.fallbackOptions,
        richMedia: result.response.richMedia,
        metadata: result.response.metadata,
        qualityMetrics: result.qualityMetrics,
        messageAnalysis: result.messageAnalysis
      };

      setMessages(prev => [...prev, assistantMessage]);
      setCurrentState(result.conversationState);
      
      // Notify parent components
      if (onQualityMetrics) {
        onQualityMetrics(result.qualityMetrics);
      }
      if (onStateChange) {
        onStateChange(result.conversationState);
      }
      
    } catch (error) {
      console.error('Quality Controlled Assistant error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: t('chatflow.fallbacks.errorOccurred'),
        timestamp: new Date(),
        suggestions: [
          { action: 'property_search', label: t('chatflow.greeting.quickActions.propertySearch') },
          { action: 'get_valuation', label: t('chatflow.greeting.quickActions.getValuation') }
        ],
        metadata: {
          confidence: 0,
          processingTime: 0,
          model: 'fallback'
        }
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleQuickActionClick = (action: string) => {
    const actionMessages: Record<string, string> = {
      'property_search': t('chatflow.needsAssessment.prompt'),
      'get_valuation': t('chatflow.valuation.requestPrompt'),
      'market_insights': 'Show me market trends and insights',
      'risk_assessment': 'I need a risk assessment',
      'schedule_viewing': t('chatflow.scheduling.prompt')
    };
    
    const message = actionMessages[action] || action;
    handleSendMessage(message);
  };

  const handleFallbackOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setUserFeedback(prev => ({ ...prev, [messageId]: feedback }));
    
    // Here you would typically send feedback to analytics
    console.log(`Feedback for message ${messageId}: ${feedback}`);
  };

  const getQualityBadge = (metrics?: ConversationMetrics) => {
    if (!metrics) return null;
    
    const overallScore = (metrics.confidenceScore + metrics.personalizationScore + metrics.engagementLevel) / 3;
    
    let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
    let label = t('chatflow.quality.poor');
    
    if (overallScore >= 90) {
      variant = "default";
      label = t('chatflow.quality.excellent');
    } else if (overallScore >= 70) {
      variant = "default";
      label = t('chatflow.quality.good');
    } else if (overallScore >= 50) {
      variant = "secondary";
      label = t('chatflow.quality.fair');
    }
    
    return (
      <Badge variant={variant} className="text-xs">
        {label}
      </Badge>
    );
  };

  const getStateIcon = (state: ConversationState) => {
    const stateIcons: Record<ConversationState, React.ReactNode> = {
      [ConversationState.GREETING]: <MessageSquare className="h-4 w-4" />,
      [ConversationState.NEEDS_ASSESSMENT]: <Target className="h-4 w-4" />,
      [ConversationState.PROPERTY_SEARCH]: <TrendingUp className="h-4 w-4" />,
      [ConversationState.VALUATION_REQUEST]: <Key className="h-4 w-4" />,
      [ConversationState.RISK_ASSESSMENT]: <AlertCircle className="h-4 w-4" />,
      [ConversationState.SCHEDULING]: <Clock className="h-4 w-4" />,
      [ConversationState.FOLLOW_UP]: <MessageSquare className="h-4 w-4" />,
      [ConversationState.COMPLEX_QUERY]: <Zap className="h-4 w-4" />,
      [ConversationState.ERROR_RECOVERY]: <AlertCircle className="h-4 w-4" />
    };
    
    return stateIcons[state] || <MessageSquare className="h-4 w-4" />;
  };

  return (
    <Card className={`flex flex-col h-[700px] ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Quality-Controlled AI Assistant
          <Badge variant="default" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            {t('chatflow.quality.excellent')}
          </Badge>
        </CardTitle>
        
        {/* State and Quality Indicators */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            {getStateIcon(currentState)}
            <span>{currentState.replace('_', ' ').toUpperCase()}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowQualityMetrics(!showQualityMetrics)}
            className="h-6 px-2"
          >
            <Settings className="h-3 w-3 mr-1" />
            Quality
          </Button>
        </div>
        
        {/* Quality Metrics Panel */}
        {showQualityMetrics && (
          <Alert className="mt-2">
            <Target className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Confidence: {messages[messages.length - 1]?.qualityMetrics?.confidenceScore?.toFixed(1) || 0}%</div>
                  <div>Engagement: {messages[messages.length - 1]?.qualityMetrics?.engagementLevel?.toFixed(1) || 0}%</div>
                  <div>Personalization: {messages[messages.length - 1]?.qualityMetrics?.personalizationScore?.toFixed(1) || 0}%</div>
                  <div>Response Time: {messages[messages.length - 1]?.qualityMetrics?.responseTime?.toFixed(1) || 0}s</div>
                </div>
                <Progress 
                  value={messages[messages.length - 1]?.qualityMetrics?.confidenceScore || 0} 
                  className="h-2"
                />
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={`flex items-start gap-3 ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.type === 'user' 
                      ? 'bg-primary' 
                      : 'bg-muted'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className={`flex-1 space-y-2 ${
                    message.type === 'user' ? 'text-right' : ''
                  }`}>
                    <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}>
                      <div className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </div>
                      
                      {/* Message Analysis Indicators */}
                      {message.messageAnalysis && message.type === 'assistant' && (
                        <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                          {message.messageAnalysis.clarityScore > 80 && (
                            <Badge variant="outline" className="text-xs">Clear</Badge>
                          )}
                          {message.messageAnalysis.sentimentScore > 0.6 && (
                            <Badge variant="outline" className="text-xs">Positive</Badge>
                          )}
                          {message.messageAnalysis.potentialAmbiguities.length === 0 && (
                            <Badge variant="outline" className="text-xs">Unambiguous</Badge>
                          )}
                        </div>
                      )}
                      
                      {/* Quality Metrics */}
                      {message.metadata && message.type === 'assistant' && (
                        <div className="text-xs opacity-70 mt-2">
                          {t('chatflow.quality.confidence', { confidence: Math.round(message.metadata.confidence * 100) })}%
                          {message.metadata.model && ` • ${message.metadata.model}`}
                          {getQualityBadge(message.qualityMetrics)}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </div>

                    {/* Quick Actions */}
                    {message.quickActions && message.type === 'assistant' && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.quickActions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => handleQuickActionClick(action.action)}
                          >
                            {action.icon && <span className="mr-1">{action.icon}</span>}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Fallback Options */}
                    {message.fallbackOptions && message.type === 'assistant' && (
                      <div className="space-y-2 mt-2">
                        {message.fallbackOptions.map((fallback, index) => (
                          <div key={index} className="bg-yellow-50 p-2 rounded border border-yellow-200">
                            <div className="text-xs text-yellow-800 mb-1">{fallback.message}</div>
                            {fallback.options && (
                              <div className="flex flex-wrap gap-1">
                                {fallback.options.map((option, optIndex) => (
                                  <Button
                                    key={optIndex}
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-6 px-2"
                                    onClick={() => handleFallbackOptionClick(option)}
                                  >
                                    {option}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && message.type === 'assistant' && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => handleSuggestionClick(suggestion.label)}
                          >
                            {suggestion.label}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* User Feedback */}
                    {message.type === 'assistant' && (
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => handleFeedback(message.id, 'positive')}
                        >
                          <ThumbsUp className={`h-3 w-3 ${
                            userFeedback[message.id] === 'positive' ? 'text-green-500' : ''
                          }`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => handleFeedback(message.id, 'negative')}
                        >
                          <ThumbsDown className={`h-3 w-3 ${
                            userFeedback[message.id] === 'negative' ? 'text-red-500' : ''
                          }`} />
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {t('chatflow.quality.feedback')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-muted">
                  <Bot className="h-4 w-4 text-muted-foreground animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="inline-block p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      Quality AI analyzing...
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('chatflow.input.placeholder', { defaultValue: "Ask me about properties, valuations, or market insights..." })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(inputValue);
                }
              }}
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground mt-2">
            Powered by Quality-Controlled AI • {t('chatflow.quality.excellent')} Response Quality
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
