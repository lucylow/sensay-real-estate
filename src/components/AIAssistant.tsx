import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bot, User, Send, Sparkles, TrendingUp, AlertCircle, Volume2, VolumeX, Settings } from 'lucide-react';
import { llmAPI } from '@/services/api/llm';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  data?: any;
  audioUrl?: string;
}

interface AIAssistantProps {
  property?: any;
  analysis?: any;
  className?: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ 
  property, 
  analysis, 
  className = '' 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your PropGuard AI assistant. I can help you analyze properties, understand market trends, assess risks, and provide investment insights. How can I assist you today?',
      timestamp: new Date(),
      suggestions: [
        'Analyze this property\'s investment potential',
        'What are the main risks for this property?',
        'Compare with similar properties in the area',
        'Generate a valuation report'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('');
  const [isVoiceConfigured, setIsVoiceConfigured] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Voice service initialization removed
    setIsVoiceConfigured(false);
  }, []);

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
      // Prepare context for the AI
      const context = {
        property,
        analysis,
        timestamp: new Date().toISOString()
      };

      let aiResponse = '';
      let suggestions: string[] = [];
      let responseData: any = null;

      if (message.toLowerCase().includes('risk') || message.toLowerCase().includes('assess')) {
        const riskAssessment = await llmAPI.getRiskAssessment(context);
        aiResponse = (riskAssessment as any)?.explanation || 'I\'ve analyzed the risk factors for this property.';
        suggestions = ['Show detailed risk breakdown', 'Compare with market averages', 'Generate risk mitigation plan'];
        responseData = riskAssessment;
      } else if (message.toLowerCase().includes('market') || message.toLowerCase().includes('trend')) {
        const marketSentiment = await llmAPI.getMarketSentiment(context);
        aiResponse = `Based on current market analysis: ${(marketSentiment as any)?.summary || 'Market conditions appear favorable.'}`;
        suggestions = ['Show market comparisons', 'Analyze price trends', 'Forecast future performance'];
        responseData = marketSentiment;
      } else if (message.toLowerCase().includes('valuation') || message.toLowerCase().includes('worth')) {
        const comprehensive = await llmAPI.getComprehensiveAnalysis(context);
        aiResponse = (comprehensive as any)?.analysis_summary || 'I\'ve conducted a comprehensive property analysis.';
        suggestions = ['Generate detailed report', 'Show investment metrics', 'Compare with benchmarks'];
        responseData = comprehensive;
      } else if (message.toLowerCase().includes('investment') || message.toLowerCase().includes('potential')) {
        aiResponse = generateInvestmentAnalysis(property, analysis);
        suggestions = ['Calculate ROI projections', 'Show cash flow analysis', 'Identify optimization opportunities'];
      } else {
        // General AI response
        aiResponse = await generateGeneralResponse(message, context);
        suggestions = [
          'Tell me about market conditions',
          'What are the investment risks?',
          'Generate a detailed report',
          'Show comparable properties'
        ];
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        suggestions,
        data: responseData
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Voice generation disabled
    } catch (error) {
      console.error('AI Assistant error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an issue processing your request. Please try again or rephrase your question.',
        timestamp: new Date(),
        suggestions: ['Ask about property risks', 'Request market analysis', 'Get valuation insights']
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const generateInvestmentAnalysis = (property: any, analysis: any): string => {
    if (!analysis) return 'Please analyze a property first to get investment insights.';
    
    const valuation = analysis.current_valuation || 0;
    const risk = analysis.risk_score || 0;
    const confidence = analysis.confidence || 0;

    return `**Investment Analysis Summary:**

📊 **Property Valuation:** $${valuation.toLocaleString()}
🎯 **Risk Level:** ${risk < 30 ? 'Low' : risk < 60 ? 'Medium' : 'High'} (${risk}/100)
🔍 **Confidence:** ${confidence}%

**Key Investment Insights:**
${risk < 30 
  ? '✅ This property shows low risk indicators, making it suitable for conservative investors.'
  : risk < 60 
    ? '⚠️ Moderate risk profile - suitable for balanced investment strategies.'
    : '🚨 Higher risk investment - requires careful consideration and risk management.'
}

${confidence > 80 
  ? '✅ High confidence in valuation accuracy.'
  : confidence > 60 
    ? '⚠️ Moderate confidence - additional due diligence recommended.'
    : '🔍 Lower confidence - more market research needed.'
}

**Recommendation:** ${risk < 40 && confidence > 70 ? 'Favorable investment opportunity' : 'Proceed with detailed analysis'}`;
  };

  const generateGeneralResponse = async (message: string, context: any): Promise<string> => {
    // Simple keyword-based responses for now
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! I\'m here to help you with property analysis, market insights, and investment advice. What would you like to know?';
    }
    
    if (lowerMessage.includes('help')) {
      return `I can assist you with:
• Property valuation and analysis
• Risk assessment and mitigation
• Market trends and comparisons
• Investment potential evaluation
• Compliance and regulatory insights
• Report generation

What specific area would you like to explore?`;
    }

    return 'I understand you\'re asking about property analysis. Let me help you with specific insights about this property or market conditions. Could you be more specific about what you\'d like to know?';
  };

  return (
    <Card className={`flex flex-col h-[600px] ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Property Assistant
          </CardTitle>
          
          <div className="flex items-center gap-2">
            {isVoiceConfigured && (
              <>
                <div className="flex items-center gap-2">
                  <Label htmlFor="voice-toggle" className="text-sm">
                    Voice
                  </Label>
                  <Switch
                    id="voice-toggle"
                    checked={isVoiceEnabled}
                    onCheckedChange={setIsVoiceEnabled}
                  />
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                  title="Voice Settings"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </>
            )}
            
            <div className="inline-flex items-center rounded-full border border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
              <Sparkles className="h-3 w-3 mr-1" />
              Live
            </div>
          </div>
        </div>
        
        {showVoiceSettings && isVoiceConfigured && (
          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Voice Settings</span>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                {selectedVoiceId ? 'Configured' : 'Not Selected'}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {selectedVoiceId 
                ? `Voice ID: ${selectedVoiceId}` 
                : 'Please select a voice in the voice settings panel'
              }
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4 h-[400px] overflow-hidden" ref={scrollAreaRef}>
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
                      
                      {/* Audio playback for assistant messages */}
                      {message.type === 'assistant' && message.audioUrl && (
                        <div className="mt-2 flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const audio = new Audio(message.audioUrl);
                              audio.play().catch(console.error);
                            }}
                            className="h-6 px-2"
                          >
                            {isVoiceEnabled ? (
                              <Volume2 className="h-3 w-3" />
                            ) : (
                              <VolumeX className="h-3 w-3" />
                            )}
                          </Button>
                          <span className="text-xs text-muted-foreground">
                            Click to play audio
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </div>

                    {message.suggestions && message.type === 'assistant' && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
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
                      Analyzing...
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
              placeholder="Ask me about this property, market trends, or investment advice..."
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
        </div>
      </CardContent>
    </Card>
  );
};