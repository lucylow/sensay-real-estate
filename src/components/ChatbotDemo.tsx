import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward,
  User,
  Bot,
  Clock,
  TrendingUp,
  Home,
  DollarSign,
  Globe,
  BarChart3
} from 'lucide-react';
import { 
  mockConversationFlows, 
  getConversationById, 
  getConversationsByScenario,
  mockConversationAnalytics,
  type ConversationFlow,
  type ConversationMessage
} from '@/data/mockConversations';

interface ChatbotDemoProps {
  className?: string;
}

export const ChatbotDemo: React.FC<ChatbotDemoProps> = ({ className = '' }) => {
  const [selectedConversation, setSelectedConversation] = useState<ConversationFlow | null>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [displayedMessages, setDisplayedMessages] = useState<ConversationMessage[]>([]);
  const [activeTab, setActiveTab] = useState('scenarios');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom when new messages are displayed
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages]);

  // Playback control
  useEffect(() => {
    if (isPlaying && selectedConversation) {
      playbackIntervalRef.current = setInterval(() => {
        setCurrentMessageIndex(prev => {
          const nextIndex = prev + 1;
          if (nextIndex >= selectedConversation.messages.length) {
            setIsPlaying(false);
            return prev;
          }
          return nextIndex;
        });
      }, 2000 / playbackSpeed); // 2 seconds base speed
    } else {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
      }
    }

    return () => {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
      }
    };
  }, [isPlaying, selectedConversation, playbackSpeed]);

  // Update displayed messages when current message index changes
  useEffect(() => {
    if (selectedConversation && currentMessageIndex >= 0) {
      setDisplayedMessages(selectedConversation.messages.slice(0, currentMessageIndex + 1));
    }
  }, [currentMessageIndex, selectedConversation]);

  const handleConversationSelect = (conversation: ConversationFlow) => {
    setSelectedConversation(conversation);
    setCurrentMessageIndex(0);
    setDisplayedMessages([]);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (!selectedConversation) return;
    
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentMessageIndex >= selectedConversation.messages.length - 1) {
        // Reset to beginning
        setCurrentMessageIndex(0);
      }
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setCurrentMessageIndex(0);
    setDisplayedMessages([]);
    setIsPlaying(false);
  };

  const handleFastForward = () => {
    if (!selectedConversation) return;
    
    const nextIndex = Math.min(currentMessageIndex + 3, selectedConversation.messages.length - 1);
    setCurrentMessageIndex(nextIndex);
  };

  const getScenarioIcon = (scenario: string) => {
    switch (scenario) {
      case 'buyer': return <Home className="h-4 w-4" />;
      case 'seller': return <DollarSign className="h-4 w-4" />;
      case 'investor': return <TrendingUp className="h-4 w-4" />;
      case 'agent': return <User className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getScenarioColor = (scenario: string) => {
    switch (scenario) {
      case 'buyer': return 'bg-blue-100 text-blue-800';
      case 'seller': return 'bg-green-100 text-green-800';
      case 'investor': return 'bg-purple-100 text-purple-800';
      case 'agent': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  const getMessageIcon = (role: string) => {
    switch (role) {
      case 'user':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'assistant':
        return <Bot className="h-4 w-4 text-green-500" />;
      case 'system':
        return <MessageCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <MessageCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageCircle className="h-8 w-8 text-primary" />
            PropGuard AI Chatbot Demo
          </h1>
          <p className="text-muted-foreground mt-1">
            Interactive demonstrations of real estate conversational experiences
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            Multilingual
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <BarChart3 className="h-3 w-3" />
            AI-Powered
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Demo Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="scenarios" className="space-y-3">
                  {mockConversationFlows.map((conversation) => (
                    <Card 
                      key={conversation.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedConversation?.id === conversation.id 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : ''
                      }`}
                      onClick={() => handleConversationSelect(conversation)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{conversation.title}</h4>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getScenarioColor(conversation.scenario)}`}
                            >
                              {getScenarioIcon(conversation.scenario)}
                              {conversation.scenario}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {conversation.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{conversation.messages.length} messages</span>
                            <Badge variant="outline" className="text-xs">
                              {conversation.language}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">Total Conversations</p>
                      <p className="text-2xl font-bold text-primary">
                        {mockConversationAnalytics.totalConversations.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="text-sm">
                      <p className="font-medium">Average Session Length</p>
                      <p className="text-xl font-bold">
                        {mockConversationAnalytics.averageSessionLength} messages
                      </p>
                    </div>
                    
                    <div className="text-sm">
                      <p className="font-medium">User Satisfaction</p>
                      <p className="text-xl font-bold text-green-600">
                        {mockConversationAnalytics.userSatisfaction}/5
                      </p>
                    </div>
                    
                    <div className="text-sm">
                      <p className="font-medium">Conversion Rate</p>
                      <p className="text-xl font-bold text-blue-600">
                        {mockConversationAnalytics.conversionRate}%
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Chat Display */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {selectedConversation ? selectedConversation.title : 'Select a Demo'}
                </CardTitle>
                {selectedConversation && (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleReset}
                      disabled={isPlaying}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleFastForward}
                      disabled={isPlaying || currentMessageIndex >= selectedConversation.messages.length - 1}
                    >
                      <FastForward className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={handlePlayPause}
                      disabled={!selectedConversation}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </div>
                )}
              </div>
              {selectedConversation && (
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Progress: {currentMessageIndex + 1}/{selectedConversation.messages.length}</span>
                  <span>•</span>
                  <span>Language: {selectedConversation.language}</span>
                  <span>•</span>
                  <span>Scenario: {selectedConversation.scenario}</span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {selectedConversation ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {displayedMessages.map((message, index) => (
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
                        {getMessageIcon(message.role)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {message.role === 'user' ? 'User' : 
                             message.role === 'assistant' ? 'PropGuard AI' : 'System'}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {message.metadata?.intent || 'message'}
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                        
                        <div className="text-sm leading-relaxed whitespace-pre-line">
                          {message.content}
                        </div>
                        
                        {/* Suggestions */}
                        {message.metadata?.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.metadata.suggestions.slice(0, 3).map((suggestion: string, suggestionIndex: number) => (
                              <Badge 
                                key={suggestionIndex}
                                variant="secondary" 
                                className="text-xs cursor-pointer hover:bg-primary/10"
                              >
                                {suggestion}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        {message.metadata?.actions && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {message.metadata.actions.slice(0, 2).map((action: string, actionIndex: number) => (
                              <Badge 
                                key={actionIndex}
                                variant="outline" 
                                className="text-xs"
                              >
                                {action}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isPlaying && currentMessageIndex < selectedConversation.messages.length - 1 && (
                    <div className="flex gap-3 p-3 rounded-lg bg-gray-50 mr-8">
                      <div className="flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-green-500 animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">PropGuard AI</span>
                          <Badge variant="outline" className="text-xs">typing...</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-muted-foreground">Analyzing request...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Demo Scenario</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Choose from various real estate conversation scenarios to see PropGuard AI in action.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Conversation Details */}
      {selectedConversation && (
        <Card>
          <CardHeader>
            <CardTitle>Conversation Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Outcome</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedConversation.outcome}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedConversation.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Metrics</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Messages:</span>
                    <span>{selectedConversation.messages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{selectedConversation.messages.length * 2}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Language:</span>
                    <span>{selectedConversation.language}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
