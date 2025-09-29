import { useState, useEffect, useCallback } from 'react';
import { 
  sensayConversationService, 
  SensayConversationItem, 
  ConversationPaginationOptions,
  ConversationSummary 
} from '@/services/sensayConversationService';

interface UseSensayConversationsOptions {
  replicaUUID: string;
  conversationUUID?: string;
  autoLoad?: boolean;
  limit?: number;
}

interface UseSensayConversationsReturn {
  // Conversation data
  items: SensayConversationItem[];
  loading: boolean;
  error: string | null;
  
  // Pagination state
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  
  // Actions
  loadPage: (page: number, options?: ConversationPaginationOptions) => Promise<void>;
  loadNextPage: () => Promise<void>;
  loadPreviousPage: () => Promise<void>;
  refresh: () => Promise<void>;
  
  // Placeholder expansion
  expandedPlaceholders: Set<string>;
  expandPlaceholder: (placeholderIndex: number) => Promise<void>;
  collapsePlaceholder: (placeholderIndex: number) => void;
  
  // Analytics
  summary: ConversationSummary | null;
  loadSummary: () => Promise<void>;
  
  // Utility
  clearError: () => void;
}

export const useSensayConversations = ({
  replicaUUID,
  conversationUUID = 'default-conversation',
  autoLoad = true,
  limit = 20
}: UseSensayConversationsOptions): UseSensayConversationsReturn => {
  const [items, setItems] = useState<SensayConversationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [expandedPlaceholders, setExpandedPlaceholders] = useState<Set<string>>(new Set());
  const [summary, setSummary] = useState<ConversationSummary | null>(null);

  const loadPage = useCallback(async (page: number, options: ConversationPaginationOptions = {}) => {
    if (!conversationUUID) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await sensayConversationService.getConversationMentions(
        replicaUUID,
        conversationUUID,
        {
          limit,
          ...options
        }
      );

      if (response.success) {
        setItems(response.items);
        setCurrentPage(page);
        setHasNextPage(response.items.length === limit);
        setHasPreviousPage(page > 1);
      } else {
        throw new Error('Failed to load conversation');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load conversation';
      setError(errorMessage);
      console.error('Conversation loading error:', err);
    } finally {
      setLoading(false);
    }
  }, [replicaUUID, conversationUUID, limit]);

  const loadNextPage = useCallback(async () => {
    if (items.length === 0) return;

    const lastMention = items
      .filter(item => item.type === 'mention')
      .slice(-1)[0] as any;

    if (lastMention?.messages?.length > 0) {
      const lastMessageUUID = lastMention.messages[lastMention.messages.length - 1].uuid;
      await loadPage(currentPage + 1, { beforeUUID: lastMessageUUID });
    }
  }, [items, currentPage, loadPage]);

  const loadPreviousPage = useCallback(async () => {
    if (items.length === 0) return;

    const firstMention = items
      .filter(item => item.type === 'mention')
      .slice(0, 1)[0] as any;

    if (firstMention?.messages?.length > 0) {
      const firstMessageUUID = firstMention.messages[0].uuid;
      await loadPage(currentPage - 1, { afterUUID: firstMessageUUID });
    }
  }, [items, currentPage, loadPage]);

  const refresh = useCallback(async () => {
    await loadPage(1);
  }, [loadPage]);

  const expandPlaceholder = useCallback(async (placeholderIndex: number) => {
    const placeholder = items[placeholderIndex];
    if (placeholder.type !== 'placeholder') return;

    setExpandedPlaceholders(prev => new Set([...prev, placeholderIndex.toString()]));

    try {
      // Find surrounding messages for context
      const beforeMention = items[placeholderIndex - 1] as any;
      const afterMention = items[placeholderIndex + 1] as any;

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
        conversationUUID!,
        {
          limit: placeholder.count,
          beforeUUID,
          afterUUID
        }
      );

      if (response.success) {
        // Replace placeholder with expanded messages
        setItems(prev => {
          const newItems = [...prev];
          newItems[placeholderIndex] = {
            type: 'mention',
            messages: response.items
          } as any;
          return newItems;
        });
      }
    } catch (err) {
      console.error('Failed to expand placeholder:', err);
      setError('Failed to expand placeholder');
    }
  }, [items, replicaUUID, conversationUUID]);

  const collapsePlaceholder = useCallback((placeholderIndex: number) => {
    setExpandedPlaceholders(prev => {
      const newExpanded = new Set(prev);
      newExpanded.delete(placeholderIndex.toString());
      return newExpanded;
    });
  }, []);

  const loadSummary = useCallback(async () => {
    try {
      const summaryData = await sensayConversationService.getConversationSummary(replicaUUID);
      setSummary(summaryData);
    } catch (err) {
      console.error('Failed to load summary:', err);
    }
  }, [replicaUUID]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-load on mount
  useEffect(() => {
    if (autoLoad && conversationUUID) {
      loadPage(1);
    }
  }, [autoLoad, conversationUUID, loadPage]);

  return {
    // Conversation data
    items,
    loading,
    error,
    
    // Pagination state
    currentPage,
    hasNextPage,
    hasPreviousPage,
    
    // Actions
    loadPage,
    loadNextPage,
    loadPreviousPage,
    refresh,
    
    // Placeholder expansion
    expandedPlaceholders,
    expandPlaceholder,
    collapsePlaceholder,
    
    // Analytics
    summary,
    loadSummary,
    
    // Utility
    clearError
  };
};

interface UseSensayAnalyticsOptions {
  replicaUUID: string;
  autoLoad?: boolean;
}

interface UseSensayAnalyticsReturn {
  // Analytics data
  summary: ConversationSummary | null;
  historicalData: any;
  sourceData: any;
  
  // Loading states
  loading: boolean;
  error: string | null;
  
  // Actions
  loadAnalytics: () => Promise<void>;
  refresh: () => Promise<void>;
  
  // Utility
  clearError: () => void;
}

export const useSensayAnalytics = ({
  replicaUUID,
  autoLoad = true
}: UseSensayAnalyticsOptions): UseSensayAnalyticsReturn => {
  const [summary, setSummary] = useState<ConversationSummary | null>(null);
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [sourceData, setSourceData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [summaryData, analyticsData] = await Promise.all([
        sensayConversationService.getConversationSummary(replicaUUID),
        sensayConversationService.getComprehensiveAnalytics(replicaUUID)
      ]);

      setSummary(summaryData);
      setHistoricalData(analyticsData.historical);
      setSourceData(analyticsData.sources);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load analytics';
      setError(errorMessage);
      console.error('Analytics loading error:', err);
    } finally {
      setLoading(false);
    }
  }, [replicaUUID]);

  const refresh = useCallback(async () => {
    await loadAnalytics();
  }, [loadAnalytics]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-load on mount
  useEffect(() => {
    if (autoLoad) {
      loadAnalytics();
    }
  }, [autoLoad, loadAnalytics]);

  return {
    // Analytics data
    summary,
    historicalData,
    sourceData,
    
    // Loading states
    loading,
    error,
    
    // Actions
    loadAnalytics,
    refresh,
    
    // Utility
    clearError
  };
};

// Utility hook for managing multiple conversations
interface UseMultipleConversationsOptions {
  replicaUUID: string;
  conversationUUIDs: string[];
  autoLoad?: boolean;
}

export const useMultipleConversations = ({
  replicaUUID,
  conversationUUIDs,
  autoLoad = false
}: UseMultipleConversationsOptions) => {
  const [conversations, setConversations] = useState<Map<string, SensayConversationItem[]>>(new Map());
  const [loading, setLoading] = useState<Map<string, boolean>>(new Map());
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  const loadConversation = useCallback(async (conversationUUID: string) => {
    setLoading(prev => new Map(prev.set(conversationUUID, true)));
    setErrors(prev => {
      const newErrors = new Map(prev);
      newErrors.delete(conversationUUID);
      return newErrors;
    });

    try {
      const response = await sensayConversationService.getConversationMentions(
        replicaUUID,
        conversationUUID,
        { limit: 20 }
      );

      if (response.success) {
        setConversations(prev => new Map(prev.set(conversationUUID, response.items)));
      } else {
        throw new Error('Failed to load conversation');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load conversation';
      setErrors(prev => new Map(prev.set(conversationUUID, errorMessage)));
    } finally {
      setLoading(prev => new Map(prev.set(conversationUUID, false)));
    }
  }, [replicaUUID]);

  const loadAllConversations = useCallback(async () => {
    await Promise.all(conversationUUIDs.map(loadConversation));
  }, [conversationUUIDs, loadConversation]);

  // Auto-load conversations
  useEffect(() => {
    if (autoLoad) {
      loadAllConversations();
    }
  }, [autoLoad, loadAllConversations]);

  return {
    conversations,
    loading,
    errors,
    loadConversation,
    loadAllConversations
  };
};
