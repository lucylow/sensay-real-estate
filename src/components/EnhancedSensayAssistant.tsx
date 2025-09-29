import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Brain, MessageCircle, Search, Home, DollarSign, Calendar } from 'lucide-react';

interface EnhancedSensayAssistantProps {
  analysis?: any;
  className?: string;
  context?: string;
}

export const EnhancedSensayAssistant: React.FC<EnhancedSensayAssistantProps> = ({
  analysis,
  className = '',
  context = 'default'
}) => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions] = useState([
    { icon: Search, label: 'Property Search', action: 'search' },
    { icon: DollarSign, label: 'Property Valuation', action: 'valuation' },
    { icon: Calendar, label: 'Schedule Viewing', action: 'booking' },
    { icon: MessageCircle, label: 'General FAQ', action: 'faq' }
  ]);

  const handleQuickAction = (action: string) => {
    setIsProcessing(true);
    console.log(`Executing action: ${action}`);
    
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };

  const handleSendQuery = () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    console.log(`Processing query: ${query}`);
    
    setTimeout(() => {
      setIsProcessing(false);
      setQuery('');
    }, 2000);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Enhanced Sensay Assistant
          <Badge variant="secondary">Wisdom Engine</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="flex items-center gap-2 h-auto p-3"
                onClick={() => handleQuickAction(suggestion.action)}
                disabled={isProcessing}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{suggestion.label}</span>
              </Button>
            );
          })}
        </div>

        <div className="space-y-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about properties, market trends, or schedule a viewing..."
          />
          <Button 
            onClick={handleSendQuery}
            disabled={!query.trim() || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              'Send Query'
            )}
          </Button>
        </div>

        {context && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium">Context: {context}</p>
            {analysis && (
              <p className="text-xs text-muted-foreground mt-1">
                Analysis data available for enhanced responses
              </p>
            )}
          </div>
        )}

        <div className="border rounded-lg p-3 space-y-2">
          <p className="text-sm font-medium">Recent Interaction:</p>
          <div className="text-xs space-y-1">
            <div className="flex justify-end">
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded">
                Show me properties under $1M
              </span>
            </div>
            <div className="flex justify-start">
              <span className="bg-muted px-2 py-1 rounded">
                I found 24 properties matching your criteria. Would you like to see the top recommendations?
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};