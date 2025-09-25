import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageCircle, 
  Send, 
  Globe, 
  Languages, 
  AlertCircle, 
  CheckCircle,
  Lightbulb,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { LanguageSelector } from '@/components/ui/language-selector';
import { multilingualChatService } from '@/services/multilingualChatService';
import { SensayAssistant } from '@/components/SensayAssistant';

interface MultilingualChatInterfaceProps {
  property?: any;
  analysis?: any;
  className?: string;
}

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  language: string;
  confidence?: number;
  metadata?: any;
  culturalTips?: string[];
}

export const MultilingualChatInterface: React.FC<MultilingualChatInterfaceProps> = ({
  property,
  analysis,
  className = ''
}) => {
  const { t, language, setLanguage } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<any>(null);
  const [showLanguageDetection, setShowLanguageDetection] = useState(false);
  const [culturalTips, setCulturalTips] = useState<string[]>([]);
  const [conversationContext, setConversationContext] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Add welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      content: t('sensaySetup.welcomeDescription'),
      role: 'assistant',
      timestamp: new Date(),
      language: language,
      metadata: {
        type: 'welcome',
        suggestions: [
          t('property.analysis'),
          t('property.valuation'),
          t('property.risk'),
          t('property.market')
        ]
      }
    };
    setMessages([welcomeMessage]);
  }, [language, t]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
      language: detectedLanguage?.language || language
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Process message with multilingual service
      const response = await multilingualChatService.processChatMessage(
        inputValue,
        language,
        property?.country
      );

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        role: 'assistant',
        timestamp: new Date(),
        language: response.language,
        confidence: response.confidence,
        metadata: response.localizedData,
        culturalTips: response.culturalTips
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update detected language and cultural tips
      setDetectedLanguage({
        language: response.language,
        confidence: response.confidence
      });
      
      if (response.culturalTips && response.culturalTips.length > 0) {
        setCulturalTips(response.culturalTips);
      }

      // Auto-switch language if confidence is high and different from current
      if (response.confidence > 0.8 && response.language !== language) {
        setLanguage(response.language);
        setShowLanguageDetection(true);
        setTimeout(() => setShowLanguageDetection(false), 5000);
      }

    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
        language: language
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const getMessageIcon = (message: ChatMessage) => {
    switch (message.role) {
      case 'user':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'assistant':
        return <Globe className="h-4 w-4 text-green-500" />;
      case 'system':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getConfidenceBadge = (confidence?: number) => {
    if (!confidence) return null;
    
    const getConfidenceColor = (conf: number) => {
      if (conf >= 0.8) return 'bg-green-100 text-green-800';
      if (conf >= 0.6) return 'bg-yellow-100 text-yellow-800';
      return 'bg-red-100 text-red-800';
    };

    return (
      <Badge className={`ml-2 ${getConfidenceColor(confidence)}`}>
        {Math.round(confidence * 100)}%
      </Badge>
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-primary" />
          {t('sensaySetup.title')}
          <div className="ml-auto flex items-center gap-2">
            <LanguageSelector variant="ghost" size="sm" showLabel={false} />
            <Badge variant="outline">
              <Globe className="h-3 w-3 mr-1" />
              Global
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Language Detection Alert */}
        {showLanguageDetection && detectedLanguage && (
          <Alert className="border-blue-200 bg-blue-50">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <div className="flex items-center gap-2">
                <span>Language detected: {detectedLanguage.language}</span>
                {getConfidenceBadge(detectedLanguage.confidence)}
                <span className="text-sm">Auto-switched interface</span>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Cultural Tips */}
        {culturalTips.length > 0 && (
          <Alert className="border-amber-200 bg-amber-50">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-700">
              <div className="space-y-1">
                <p className="font-medium">Local Market Insights:</p>
                {culturalTips.map((tip, index) => (
                  <p key={index} className="text-sm">• {tip}</p>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Messages */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-50 ml-8'
                  : message.role === 'assistant'
                  ? 'bg-gray-50 mr-8'
                  : 'bg-yellow-50'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                {getMessageIcon(message)}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">
                    {message.role === 'user' ? 'You' : 
                     message.role === 'assistant' ? 'PropGuard AI' : 'System'}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {message.language}
                  </Badge>
                  {message.confidence && getConfidenceBadge(message.confidence)}
                  <span className="text-xs text-muted-foreground ml-auto">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                <p className="text-sm leading-relaxed">{message.content}</p>
                
                {/* Suggestions */}
                {message.metadata?.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.metadata.suggestions.map((suggestion: string, index: number) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Property Context */}
                {message.metadata?.type === 'property_analysis' && property && (
                  <div className="mt-2 p-2 bg-white rounded border">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs font-medium">Property Context</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {property.address} • {property.type} • {property.currency} {property.price?.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 p-3 rounded-lg bg-gray-50 mr-8">
              <div className="flex-shrink-0 mt-1">
                <Globe className="h-4 w-4 text-green-500 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">PropGuard AI</span>
                  <Badge variant="outline" className="text-xs">
                    {language}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Analyzing your request...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask about properties in ${language} or any language...`}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSuggestionClick('Show me properties in this area')}
            className="text-xs"
          >
            <MapPin className="h-3 w-3 mr-1" />
            Local Properties
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSuggestionClick('What is the market trend?')}
            className="text-xs"
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            Market Trends
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSuggestionClick('Assess climate risks')}
            className="text-xs"
          >
            <AlertCircle className="h-3 w-3 mr-1" />
            Risk Analysis
          </Button>
        </div>

        {/* Language Support Info */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          <div className="flex items-center justify-center gap-4">
            <span>🌐 Supports 12 languages</span>
            <span>🤖 AI-powered translations</span>
            <span>🏠 Real estate expertise</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
