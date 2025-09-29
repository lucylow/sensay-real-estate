import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  Expand, 
  User, 
  Bot,
  Clock,
  Globe,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { sensayConversationService, SensayMessage, SensayConversationItem } from '@/services/sensayConversationService';

interface SensayConversationViewerProps {
  replicaUUID?: string;
  conversationUUID?: string;
  className?: string;
}

interface ConversationState {
  items: SensayConversationItem[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  expandedPlaceholders: Set<string>;
}

export const SensayConversationViewer: React.FC<SensayConversationViewerProps> = ({ 
  replicaUUID = 'f0e4c2f7-ae27-4b35-89bf-7cf729a73687',
  conversationUUID = 'demo-conversation-uuid',
  className = '' 
}) => {
  const [conversationState, setConversationState] = useState<ConversationState>({
    items: [],
    loading: true,
    error: null,
    hasNextPage: false,
    hasPreviousPage: false,
    expandedPlaceholders: new Set()
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanding, setIsExpanding] = useState(false);

  const loadConversation = useCallback(async (page: number = 1, beforeUUID?: string, afterUUID?: string) => {
    setConversationState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await sensayConversationService.getConversationMentions(
        replicaUUID,
        conversationUUID,
        {
          limit: 20,
          beforeUUID,
          afterUUID
        }
      );

      if (response.success) {
        setConversationState(prev => ({
          ...prev,
          items: response.items,
          loading: false,
          hasNextPage: response.items.length === 20,
          hasPreviousPage: page > 1
        }));
        setCurrentPage(page);
      } else {
        throw new Error('Failed to load conversation');
      }
    } catch (error) {
      setConversationState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load conversation'
      }));
    }
  }, [replicaUUID, conversationUUID]);

  const loadNextPage = useCallback(() => {
    if (conversationState.items.length === 0) return;

    const lastMention = conversationState.items
      .filter(item => item.type === 'mention')
      .slice(-1)[0] as any;

    if (lastMention?.messages?.length > 0) {
      const lastMessageUUID = lastMention.messages[lastMention.messages.length - 1].uuid;
      loadConversation(currentPage + 1, lastMessageUUID);
    }
  }, [conversationState.items, currentPage, loadConversation]);

  const loadPreviousPage = useCallback(() => {
    if (conversationState.items.length === 0) return;

    const firstMention = conversationState.items
      .filter(item => item.type === 'mention')
      .slice(0, 1)[0] as any;

    if (firstMention?.messages?.length > 0) {
      const firstMessageUUID = firstMention.messages[0].uuid;
      loadConversation(currentPage - 1, undefined, firstMessageUUID);
    }
  }, [conversationState.items, currentPage, loadConversation]);

  const expandPlaceholder = useCallback(async (placeholderIndex: number) => {
    const placeholder = conversationState.items[placeholderIndex];
    if (placeholder.type !== 'placeholder') return;

    setIsExpanding(true);
    setConversationState(prev => ({
      ...prev,
      expandedPlaceholders: new Set([...prev.expandedPlaceholders, placeholderIndex.toString()])
    }));

    try {
      // Find surrounding messages for context
      const beforeMention = conversationState.items[placeholderIndex - 1] as any;
      const afterMention = conversationState.items[placeholderIndex + 1] as any;

      let beforeUUID: string | undefined;
      let afterUUID: string | undefined;

      if (beforeMention?.type === 'mention' && beforeMention.messages?.length > 0) {
        beforeUUID = beforeMention.messages[beforeMention.messages.length - 1].uuid;
      }

      if (afterMention?.type === 'mention' && afterMention.messages?.length > 0) {
        afterUUID = afterMention.messages[0].uuid;
      }

      const response = await sensayConversationService.getConversationMessages(
        replicaUUID,
        conversationUUID,
        {
          limit: placeholder.count,
          beforeUUID,
          afterUUID
        }
      );

      if (response.success) {
        // Insert expanded messages into the conversation
        setConversationState(prev => {
          const newItems = [...prev.items];
          newItems[placeholderIndex] = {
            type: 'mention',
            messages: response.items
          } as any;
          return { ...prev, items: newItems };
        });
      }
    } catch (error) {
      console.error('Failed to expand placeholder:', error);
      setConversationState(prev => ({
        ...prev,
        error: 'Failed to expand placeholder'
      }));
    } finally {
      setIsExpanding(false);
    }
  }, [conversationState.items, replicaUUID, conversationUUID]);

  const collapsePlaceholder = useCallback((placeholderIndex: number) => {
    setConversationState(prev => {
      const newExpanded = new Set(prev.expandedPlaceholders);
      newExpanded.delete(placeholderIndex.toString());
      return {
        ...prev,
        expandedPlaceholders: newExpanded
      };
    });
  }, []);

  useEffect(() => {
    loadConversation();
  }, [loadConversation]);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'web':
        return <Globe className="h-3 w-3" />;
      case 'telegram':
        return <MessageSquare className="h-3 w-3" />;
      case 'discord':
        return <MessageSquare className="h-3 w-3" />;
      default:
        return <MessageSquare className="h-3 w-3" />;
    }
  };

  const renderMessage = (message: SensayMessage, index: number) => {
    const isUser = message.role === 'user';
    
    return (
      <div
        key={message.uuid}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isUser 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-800'
        }`}>
          <div className="flex items-center space-x-2 mb-1">
            {isUser ? (
              <User className="h-4 w-4" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
            <Badge variant="outline" className="text-xs">
              {message.source}
            </Badge>
          </div>
          <p className="text-sm">{message.content}</p>
          <div className="flex items-center justify-between mt-2 text-xs opacity-70">
            <span>{formatTimestamp(message.createdAt)}</span>
            <div className="flex items-center space-x-1">
              {getSourceIcon(message.source)}
              <span className="text-xs">{message.source}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConversationItem = (item: SensayConversationItem, index: number) => {
    if (item.type === 'mention') {
      return (
        <div key={index} className="mb-6">
          <div className="bg-blue-50 p-3 rounded-lg mb-3">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Conversation Exchange
              </span>
            </div>
            <div className="space-y-2">
              {item.messages.map((message, msgIndex) => renderMessage(message, msgIndex))}
            </div>
          </div>
        </div>
      );
    }

    if (item.type === 'placeholder') {
      const isExpanded = conversationState.expandedPlaceholders.has(index.toString());
      
      return (
        <div key={index} className="mb-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {item.count} messages collapsed
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => isExpanded ? collapsePlaceholder(index) : expandPlaceholder(index)}
                disabled={isExpanding}
              >
                {isExpanding ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                {isExpanded ? 'Collapse' : 'Expand'}
              </Button>
            </div>
            {isExpanded && (
              <div className="mt-3 space-y-2">
                <div className="text-sm text-gray-600">
                  Loading expanded messages...
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  if (conversationState.loading && conversationState.items.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Loading conversation...</span>
          </div>
        </div>
      </div>
    );
  }

  if (conversationState.error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {conversationState.error}
          </AlertDescription>
        </Alert>
        <Button onClick={() => loadConversation()} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Conversation Viewer</h2>
          <p className="text-gray-600">Real-time conversation analysis with cursor-based pagination</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Page {currentPage}</Badge>
          <Button onClick={() => loadConversation()} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={loadPreviousPage}
          disabled={!conversationState.hasPreviousPage || conversationState.loading}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {conversationState.items.length} items on this page
          </span>
        </div>

        <Button
          variant="outline"
          onClick={loadNextPage}
          disabled={!conversationState.hasNextPage || conversationState.loading}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Conversation Content */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation Messages</CardTitle>
          <CardDescription>
            Organization ID: E0b1218c-e817-4994-a45b-43e092bd6d4b
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full">
            <div className="space-y-4">
              {conversationState.items.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No conversation data available</p>
                </div>
              ) : (
                conversationState.items.map((item, index) => renderConversationItem(item, index))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* API Information */}
      <Card>
        <CardHeader>
          <CardTitle>API Integration Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Organization ID:</span>
              <br />
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                E0b1218c-e817-4994-a45b-43e092bd6d4b
              </code>
            </div>
            <div>
              <span className="font-medium">Replica UUID:</span>
              <br />
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                {replicaUUID}
              </code>
            </div>
            <div>
              <span className="font-medium">Conversation UUID:</span>
              <br />
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                {conversationUUID}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensayConversationViewer;
