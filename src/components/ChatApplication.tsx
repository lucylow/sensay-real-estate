import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageCircle, 
  Send, 
  User, 
  Bot, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Settings,
  RefreshCw,
  X
} from 'lucide-react';
import { SensayAPIClient, SensayUtils, SensayCredentials } from '@/lib/sensay-client';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  conversationId?: string;
}

interface ChatApplicationState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  userId: string;
  replicaId: string;
  conversationId?: string;
  error?: string;
}

export default function ChatApplication() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [appState, setAppState] = useState<ChatApplicationState>({
    isInitialized: false,
    isAuthenticated: false,
    userId: '',
    replicaId: '',
    conversationId: undefined,
    error: undefined
  });
  const [apiKey, setApiKey] = useState(
    import.meta.env.VITE_SENSAY_API_KEY || ''
  );
  const [credentials, setCredentials] = useState<SensayCredentials | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<SensayAPIClient | null>(null);

  // Initialize the chat application following the tutorial flow
  useEffect(() => {
    initializeApplication();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeApplication = async () => {
    try {
      console.log('🚀 Initializing Sensay Chat Application...');
      
      // Step 1: Initialize client with API key
      const credentials: SensayCredentials = {
        apiKey: apiKey || import.meta.env.VITE_SENSAY_API_KEY || '',
      };
      
      if (!credentials.apiKey) {
        throw new Error('SENSAY_API_KEY not provided. Please set your API key.');
      }

      const client = new SensayAPIClient(credentials);
      clientRef.current = client;

      // Step 2: Validate credentials
      console.log('🔐 Validating API credentials...');
      const isValid = await client.validateCredentials();
      
      if (!isValid) {
        throw new Error('Invalid API credentials. Please check your API key.');
      }

      setCredentials(credentials);

      // Step 3: Create organization client for user management
      console.log('👤 Setting up user management...');
      const orgClient = client.createOrganizationClient();
      
      // Step 4: Generate a sample user ID (following tutorial pattern)
      const userId = `sample-user-${Date.now()}`;
      console.log('📝 Creating/retrieving user:', userId);
      
      // Step 5: Ensure user exists
      const user = await SensayUtils.ensureUserExists(userId, orgClient);

      // Step 6: Create user client
      const userClient = client.createUserClient(userId);

      // Step 7: Setup replica management
      console.log('🤖 Setting up replica management...');
      const replicaId = await SensayUtils.ensureReplicaExists(userId, userClient);

      // Step 8: Application is ready
      setAppState({
        isInitialized: true,
        isAuthenticated: true,
        userId: user.id,
        replicaId: replicaId,
        conversationId: undefined,
        error: undefined
      });

      // Step 9: Add welcome message
      const welcomeMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'Hello! I am your Sensay AI assistant, created following the Sensay API tutorial. I can help you with various tasks and answer questions. How can I assist you today?',
        timestamp: new Date(),
      };

          setMessages([welcomeMessage]);
          console.log('✅ Sensay Chat Application initialized successfully!');

    } catch (error: any) {
      console.error('❌ Application initialization failed:', error);
      
      setAppState({
        isInitialized: false,
        isAuthenticated: false,
        userId: '',
        replicaId: '',
        conversationId: undefined,
        error: error.message || 'Application initialization failed'
      });

      // Add error message for user
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `I encountered an error during initialization: ${error.message}. Please check your API key and try again.`,
        timestamp: new Date(),
      };

      setMessages([errorMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !appState.isAuthenticated) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (!clientRef.current) {
        throw new Error('Client not initialized');
      }

      // Create user client for this request
      const userClient = clientRef.current.createUserClient(appState.userId);

      // Send message to Sensay API following tutorial pattern
      const response = await SensayUtils.sendMessage(
        appState.replicaId, 
        userMessage.content, 
        userClient,
        appState.conversationId
      );

      if (response.success) {
        // Process and display the response
        const assistantMessage: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: response.content,
          timestamp: new Date(),
          conversationId: response.conversationId,
        };

        setMessages(prev => [...prev, assistantMessage]);
        
        // Update conversation ID for continuity
        if (response.conversationId) {
          setAppState(prev => ({
            ...prev,
            conversationId: response.conversationId
          }));
        }
      } else {
        throw new Error('Failed to get response from Sensay API');
      }

    } catch (error: any) {
      console.error('Error processing message:', error);
      
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `I apologize, but I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date(),
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

  const handleRetryInitialization = () => {
    setAppState({
      isInitialized: false,
      isAuthenticated: false,
      userId: '',
      replicaId: '',
      conversationId: undefined,
      error: undefined
    });
    setMessages([]);
    initializeApplication();
  };

  const handleApiKeyUpdate = () => {
    if (apiKey !== import.meta.env.VITE_SENSAY_API_KEY) {
      // In a real app, you'd want to update the environment or backend
      console.log('API key updated:', apiKey);
    }
    handleRetryInitialization();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-blue-600 text-white">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Sensay Chat Application</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant={appState.isAuthenticated ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {appState.isAuthenticated ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        Connected
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3" />
                        Disconnected
                      </>
                    )}
                  </Badge>
                  {appState.isAuthenticated && (
                    <span className="text-sm text-muted-foreground">
                      User: {appState.userId.substring(0, 8)}...
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetryInitialization}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Status and Configuration */}
          {appState.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p>{appState.error}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">To fix this issue:</p>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>Make sure you have a valid Sensay API key</li>
                      <li>Set your API key in environment variables or the input below</li>
                      <li>Check that the Sensay API is accessible</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Input
                      placeholder="Enter your Sensay API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleApiKeyUpdate} size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Update
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Chat Messages */}
          <div className="h-96 border rounded-lg">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={
                          message.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-muted'
                        }>
                          {message.role === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      
                      <Card className={`${
                        message.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-muted'
                      }`}>
                        <CardContent className="p-3">
                          <p className="text-sm whitespace-pre-wrap">
                            {message.content}
                          </p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-muted">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <Card className="bg-muted">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Assistant is thinking...
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              placeholder={
                appState.isAuthenticated 
                  ? "Type your message and press Enter..." 
                  : "Application not initialized yet..."
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!appState.isAuthenticated || isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || !appState.isAuthenticated || isLoading}
              size="default"
            >
              <Send className="h-4 w-4 mr-1" />
              Send
            </Button>
          </div>

          {/* Tutorial Information */}
          {appState.isAuthenticated && (
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                Tutorial Demo: This application follows the Sensay API tutorial pattern
              </p>
              <p className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3 text-blue-500" />
                Ready for chat completion requests with Sensay API
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
