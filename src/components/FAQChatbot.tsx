/**
 * FAQ Chatbot Component for Real Estate Questions
 * Integrates with ElevenLabs for voice responses and provides comprehensive FAQ handling
 */

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bot, 
  User, 
  Send, 
  Search, 
  BookOpen, 
  Volume2, 
  VolumeX,
  ChevronRight,
  Clock,
  TrendingUp,
  Shield,
  Calculator,
  Home
} from 'lucide-react';
import { 
  mockRealEstateFAQs, 
  getFAQsByCategory, 
  getFAQsByDifficulty, 
  searchFAQs,
  getAllCategories,
  getSubcategoriesByCategory,
  getAllTags,
  FAQItem
} from '@/data/mockRealEstateFAQs';
import { useElevenLabs } from '@/hooks/useElevenLabs';

interface FAQMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  faqId?: string;
  audioUrl?: string;
}

export const FAQChatbot: React.FC = () => {
  const [messages, setMessages] = useState<FAQMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your PropGuard AI FAQ assistant. I can help you with questions about real estate, property investment, PropGuard AI features, and much more. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [searchResults, setSearchResults] = useState<FAQItem[]>([]);
  const [showCategories, setShowCategories] = useState(true);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { speak, isConfigured: isVoiceConfigured, isPlaying } = useElevenLabs();

  const categories = getAllCategories();
  const tags = getAllTags();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const findBestFAQ = (query: string): FAQItem | null => {
    const lowercaseQuery = query.toLowerCase();
    
    // First try exact matches in questions
    let bestMatch = mockRealEstateFAQs.find(faq => 
      faq.question.toLowerCase().includes(lowercaseQuery)
    );
    
    if (bestMatch) return bestMatch;
    
    // Then try tag matches
    bestMatch = mockRealEstateFAQs.find(faq => 
      faq.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
    
    if (bestMatch) return bestMatch;
    
    // Finally try partial matches in answers
    bestMatch = mockRealEstateFAQs.find(faq => 
      faq.answer.toLowerCase().includes(lowercaseQuery)
    );
    
    return bestMatch || null;
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: FAQMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Find the best matching FAQ
      const matchingFAQ = findBestFAQ(message);
      
      let response = '';
      let faqId = '';

      if (matchingFAQ) {
        response = matchingFAQ.answer;
        faqId = matchingFAQ.id;
      } else {
        // Search for related FAQs
        const searchResults = searchFAQs(message);
        if (searchResults.length > 0) {
          response = `I found ${searchResults.length} related questions. Here are the most relevant ones:\n\n`;
          searchResults.slice(0, 3).forEach((faq, index) => {
            response += `${index + 1}. **${faq.question}**\n`;
            response += `${faq.answer.substring(0, 200)}...\n\n`;
          });
          response += 'Would you like me to provide more details on any of these questions?';
        } else {
          response = `I couldn't find a specific answer to "${message}". However, I can help you with questions about:\n\n• General real estate processes (buying, selling, financing)\n• PropGuard AI features and capabilities\n• Property investment strategies\n• Risk assessment and valuation\n• Market analysis and trends\n• Legal and compliance matters\n\nCould you try rephrasing your question or ask about one of these topics?`;
        }
      }

      const assistantMessage: FAQMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        faqId
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Generate voice response if configured
      if (isVoiceConfigured && matchingFAQ) {
        try {
          const audioUrl = await speak(response);
          if (audioUrl) {
            setMessages(prev => prev.map(msg => 
              msg.id === assistantMessage.id 
                ? { ...msg, audioUrl }
                : msg
            ));
          }
        } catch (error) {
          console.error('Voice synthesis failed:', error);
        }
      }
    } catch (error) {
      console.error('FAQ processing error:', error);
      const errorMessage: FAQMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an issue processing your question. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setSearchResults(getFAQsByCategory(category));
    setShowCategories(false);
  };

  const handleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    if (difficulty === 'all') {
      setSearchResults(mockRealEstateFAQs);
    } else {
      setSearchResults(getFAQsByDifficulty(difficulty as 'beginner' | 'intermediate' | 'advanced'));
    }
    setShowCategories(false);
  };

  const handleFAQClick = (faq: FAQItem) => {
    const message = `Tell me about: ${faq.question}`;
    setInputValue(message);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'PropGuard AI': return <Bot className="h-4 w-4" />;
      case 'Investment': return <TrendingUp className="h-4 w-4" />;
      case 'General Real Estate': return <Home className="h-4 w-4" />;
      case 'Risk Assessment': return <Shield className="h-4 w-4" />;
      case 'Valuation': return <Calculator className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-[800px] gap-4">
      {/* Main Chat Interface */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              PropGuard AI FAQ Assistant
              {isVoiceConfigured && (
                <Badge variant="outline" className="ml-2">
                  <Volume2 className="h-3 w-3 mr-1" />
                  Voice Enabled
                </Badge>
              )}
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowCategories(!showCategories)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {showCategories ? 'Hide' : 'Show'} Categories
            </Button>
          </div>
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
                      <div className={`inline-block p-3 rounded-lg max-w-[85%] ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted'
                      }`}>
                        <div className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </div>
                        
                        {/* Audio playback for assistant messages */}
                        {message.type === 'assistant' && message.audioUrl && isVoiceConfigured && (
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
                              {isPlaying ? (
                                <VolumeX className="h-3 w-3" />
                              ) : (
                                <Volume2 className="h-3 w-3" />
                              )}
                            </Button>
                            <span className="text-xs text-muted-foreground">
                              Click to play audio
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {message.timestamp.toLocaleTimeString()}
                        {message.faqId && (
                          <Badge variant="outline" className="text-xs">
                            FAQ #{message.faqId}
                          </Badge>
                        )}
                      </div>
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
                        Searching FAQs...
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
                placeholder="Ask me anything about real estate, PropGuard AI, or property investment..."
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

      {/* FAQ Categories and Search */}
      {showCategories && (
        <Card className="w-80 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              FAQ Categories
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden">
            <Tabs defaultValue="categories" className="h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
              </TabsList>
              
              <TabsContent value="categories" className="h-full overflow-auto">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Browse by Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => handleCategoryFilter(category)}
                        >
                          {getCategoryIcon(category)}
                          <span className="ml-2">{category}</span>
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Browse by Difficulty</h4>
                    <Select value={selectedDifficulty} onValueChange={handleDifficultyFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="search" className="h-full overflow-auto">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Quick Search</h4>
                    <div className="space-y-2">
                      {tags.slice(0, 20).map((tag) => (
                        <Button
                          key={tag}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            const results = searchFAQs(tag);
                            setSearchResults(results);
                            setShowCategories(false);
                          }}
                        >
                          <Search className="h-3 w-3 mr-2" />
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {!showCategories && searchResults.length > 0 && (
        <Card className="w-80 flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Search Results</CardTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setShowCategories(true);
                  setSearchResults([]);
                  setSelectedCategory('');
                  setSelectedDifficulty('');
                }}
              >
                ← Back
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {searchResults.length} questions found
            </p>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-3">
              {searchResults.map((faq) => (
                <div
                  key={faq.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleFAQClick(faq)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm line-clamp-2">{faq.question}</h4>
                    <Badge className={`text-xs ${getDifficultyColor(faq.difficulty)}`}>
                      {faq.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-3">
                    {faq.answer}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{faq.category}</span>
                    <div className="flex gap-1">
                      {faq.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FAQChatbot;
