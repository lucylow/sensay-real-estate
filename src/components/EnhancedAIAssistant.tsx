import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Brain, MessageCircle, Send } from 'lucide-react';

interface EnhancedAIAssistantProps {
  analysis?: any;
  className?: string;
  context?: string;
}

export const EnhancedAIAssistant: React.FC<EnhancedAIAssistantProps> = ({
  analysis,
  className = '',
  context = 'default'
}) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    const userMessage = { role: 'user' as const, content: message };
    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    
    setTimeout(() => {
      const aiResponse = { 
        role: 'assistant' as const, 
        content: `I understand you're asking about: "${message}". How can I help you with property analysis?` 
      };
      setConversation(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Enhanced AI Assistant
          <Badge variant="secondary">Powered by Sensay</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
          {conversation.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Start a conversation to get AI-powered insights</p>
            </div>
          ) : (
            conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about property analysis, market trends, or get insights..."
            className="flex-1"
            rows={2}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {context && (
          <div className="text-sm text-muted-foreground">
            Context: {context}
          </div>
        )}
      </CardContent>
    </Card>
  );
};