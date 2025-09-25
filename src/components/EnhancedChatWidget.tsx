import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Paperclip, 
  X, 
  Minimize2,
  Maximize2,
  Phone,
  Video,
  Calendar,
  MapPin,
  DollarSign,
  Home,
  Settings,
  Globe,
  Volume2,
  VolumeX,
  User,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { sensayService, SensayAction } from '@/services/sensayService';
import { sensayTheme } from '@/config/sensay';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type: 'text' | 'voice' | 'file' | 'action';
  metadata?: Record<string, any>;
  actions?: SensayAction[];
  language?: string;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  message: string;
  category: 'search' | 'tour' | 'valuation' | 'financing' | 'support';
}

const quickActions: QuickAction[] = [
  {
    id: '1',
    label: 'Show Listings',
    icon: Home,
    message: 'Show me available properties',
    category: 'search'
  },
  {
    id: '2',
    label: 'Book Tour',
    icon: Calendar,
    message: 'I want to book a property tour',
    category: 'tour'
  },
  {
    id: '3',
    label: 'Get Valuation',
    icon: DollarSign,
    message: 'I need a property valuation',
    category: 'valuation'
  },
  {
    id: '4',
    label: 'Financing Help',
    icon: Phone,
    message: 'Tell me about financing options',
    category: 'financing'
  },
  {
    id: '5',
    label: 'Market Report',
    icon: MapPin,
    message: 'What are the current market trends?',
    category: 'search'
  }
];

const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' }
];

export const EnhancedChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      content: "Hi! I'm your PropGuard AI assistant. I can help you find properties, book tours, get valuations, and answer questions about real estate. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
      type: 'text',
      language: selectedLanguage
    };
    setMessages([welcomeMessage]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue.trim();
    if (!content) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      type: 'text',
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await sensayService.sendMessage(content);
      
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: response.message,
          role: 'assistant',
          timestamp: new Date(),
          type: 'text',
          actions: response.actions,
          language: selectedLanguage
        };

        setMessages(prev => [...prev, assistantMessage]);
        
        if (!isOpen) {
          setUnreadCount(prev => prev + 1);
        }

        // Text-to-speech for assistant messages
        if (voiceEnabled && isOpen) {
          speakMessage(response.message);
        }
        
        setIsTyping(false);
      }, 1000); // Simulate typing delay
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
        type: 'text',
        language: selectedLanguage
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceRecord = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks: BlobPart[] = [];
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          
          // Here you would typically send the audio to a speech-to-text service
          // For now, we'll simulate it
          const transcribedText = "I'm looking for a 3 bedroom house in Melbourne"; // Mock transcription
          
          const voiceMessage: ChatMessage = {
            id: Date.now().toString(),
            content: transcribedText,
            role: 'user',
            timestamp: new Date(),
            type: 'voice',
            metadata: { audioUrl: URL.createObjectURL(audioBlob) }
          };

          setMessages(prev => [...prev, voiceMessage]);
          await handleSendMessage(transcribedText);
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileMessage: ChatMessage = {
      id: Date.now().toString(),
      content: `Uploaded file: ${file.name}`,
      role: 'user',
      timestamp: new Date(),
      type: 'file',
      metadata: { fileName: file.name, fileSize: file.size, fileType: file.type }
    };

    setMessages(prev => [...prev, fileMessage]);
    
    // Simulate file processing
    handleSendMessage(`I've uploaded a file: ${file.name}. Can you help me with this?`);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'en' ? 'en-US' : selectedLanguage;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleActionClick = (action: SensayAction) => {
    // Handle different action types
    switch (action.type) {
      case 'viewProperty':
        window.location.href = `/property/${action.data.propertyId}`;
        break;
      case 'scheduleShowing':
        // Open scheduling modal or navigate to booking page
        break;
      case 'downloadReport':
        window.open(action.data.reportUrl, '_blank');
        break;
      case 'bookTour':
        // Open tour booking component
        break;
      case 'getValuation':
        // Open valuation form
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const renderMessage = (message: ChatMessage) => {
    return (
      <div
        key={message.id}
        className={cn(
          "flex gap-3 p-4",
          message.role === 'user' ? 'justify-end' : 'justify-start'
        )}
      >
        {message.role === 'assistant' && (
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        )}
        
        <div className={cn(
          "max-w-[80%] rounded-lg p-3",
          message.role === 'user' 
            ? "bg-blue-600 text-white" 
            : "bg-gray-100 text-gray-900"
        )}>
          <p className="text-sm">{message.content}</p>
          
          {message.type === 'voice' && message.metadata?.audioUrl && (
            <audio controls className="mt-2 w-full">
              <source src={message.metadata.audioUrl} type="audio/wav" />
            </audio>
          )}
          
          {message.type === 'file' && (
            <div className="mt-2 text-xs opacity-75">
              📎 {message.metadata?.fileName} ({(message.metadata?.fileSize / 1024).toFixed(1)} KB)
            </div>
          )}
          
          {message.actions && message.actions.length > 0 && (
            <div className="mt-3 space-x-2">
              {message.actions.map((action, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => handleActionClick(action)}
                  className="text-xs"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
          
          <div className="text-xs opacity-50 mt-1">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
        
        {message.role === 'user' && (
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-shadow"
          style={{ backgroundColor: sensayTheme.primaryColor }}
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 rounded-full text-xs flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={cn(
        "w-96 shadow-2xl transition-all duration-300",
        isMinimized ? "h-16" : "h-[600px]"
      )}>
        {/* Header */}
        <CardHeader className="p-4 border-b bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm">PropGuard AI Assistant</CardTitle>
                <p className="text-xs opacity-75">
                  {isTyping ? 'Typing...' : 'Online'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="text-white hover:bg-white/20"
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
            {/* Quick Actions */}
            {showQuickActions && messages.length <= 1 && (
              <div className="p-4 border-b bg-gray-50">
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.slice(0, 4).map((action) => {
                    const IconComponent = action.icon;
                    return (
                      <Button
                        key={action.id}
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendMessage(action.message)}
                        className="justify-start"
                      >
                        <IconComponent className="h-4 w-4 mr-2" />
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              {messages.map(renderMessage)}
              
              {isTyping && (
                <div className="flex justify-start p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about properties, book tours, get valuations..."
                    className="resize-none min-h-[40px] max-h-[120px]"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleVoiceRecord}
                    disabled={isLoading}
                    className={cn(isRecording && "bg-red-100 text-red-600")}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Language Selector */}
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <select 
                  value={selectedLanguage} 
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="text-xs bg-transparent border-none"
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  <span>Multi-language support</span>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*,application/pdf,.doc,.docx"
        className="hidden"
      />
    </div>
  );
};
