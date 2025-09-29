import { SensayAPI } from '@/services/api/sensay';

export interface SensayMessage {
  uuid: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: string;
  source: 'web' | 'telegram' | 'discord' | 'embed' | 'whatsapp';
  replicaUUID: string;
}

export interface SensayMention {
  type: 'mention';
  messages: SensayMessage[];
}

export interface SensayPlaceholder {
  type: 'placeholder';
  count: number;
}

export type SensayConversationItem = SensayMention | SensayPlaceholder;

export interface SensayConversationResponse {
  success: boolean;
  items: SensayConversationItem[];
  count: number;
}

export interface SensayMessagesResponse {
  success: boolean;
  items: SensayMessage[];
  count: number;
}

export interface SensayHistoricalAnalytics {
  success: boolean;
  items: Array<{
    date: string;
    cumulativeConversations: number;
  }>;
}

export interface SensaySourceAnalytics {
  success: boolean;
  items: Array<{
    source: string;
    conversations: number;
  }>;
}

export interface ConversationPaginationOptions {
  limit?: number;
  beforeUUID?: string;
  afterUUID?: string;
}

export class SensayConversationService {
  private sensayAPI: SensayAPI;
  private organizationId: string;
  private apiVersion: string;

  constructor() {
    this.sensayAPI = new SensayAPI();
    this.organizationId = 'E0b1218c-e817-4994-a45b-43e092bd6d4b';
    this.apiVersion = '2025-03-25';
  }

  /**
   * Get conversation mentions with cursor-based pagination
   */
  async getConversationMentions(
    replicaUUID: string,
    conversationUUID: string,
    options: ConversationPaginationOptions = {}
  ): Promise<SensayConversationResponse> {
    try {
      const { limit = 20, beforeUUID, afterUUID } = options;
      
      let url = `https://api.sensay.io/v1/replicas/${replicaUUID}/conversations/${conversationUUID}/mentions?limit=${limit}`;
      
      if (beforeUUID) {
        url += `&beforeUUID=${beforeUUID}`;
      } else if (afterUUID) {
        url += `&afterUUID=${afterUUID}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-ORGANIZATION-SECRET': import.meta.env.VITE_SENSAY_API_KEY,
          'X-API-Version': this.apiVersion,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 400) {
          // Invalid cursor - fall back to loading from beginning
          return this.getConversationMentions(replicaUUID, conversationUUID, { limit });
        }
        throw new Error(`Failed to fetch mentions: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Conversation mentions error:', error);
      throw error;
    }
  }

  /**
   * Get conversation messages with cursor-based pagination
   */
  async getConversationMessages(
    replicaUUID: string,
    conversationUUID: string,
    options: ConversationPaginationOptions = {}
  ): Promise<SensayMessagesResponse> {
    try {
      const { limit = 20, beforeUUID, afterUUID } = options;
      
      let url = `https://api.sensay.io/v1/replicas/${replicaUUID}/conversations/${conversationUUID}/messages?limit=${limit}`;
      
      if (beforeUUID) {
        url += `&beforeUUID=${beforeUUID}`;
      } else if (afterUUID) {
        url += `&afterUUID=${afterUUID}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-ORGANIZATION-SECRET': import.meta.env.VITE_SENSAY_API_KEY,
          'X-API-Version': this.apiVersion,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Conversation messages error:', error);
      throw error;
    }
  }

  /**
   * Load next page of mentions (older messages)
   */
  async loadNextPage(
    replicaUUID: string,
    conversationUUID: string,
    lastMessageUUID: string,
    limit: number = 20
  ): Promise<SensayConversationResponse> {
    return this.getConversationMentions(replicaUUID, conversationUUID, {
      limit,
      beforeUUID: lastMessageUUID
    });
  }

  /**
   * Load previous page of mentions (newer messages)
   */
  async loadPreviousPage(
    replicaUUID: string,
    conversationUUID: string,
    firstMessageUUID: string,
    limit: number = 20
  ): Promise<SensayConversationResponse> {
    return this.getConversationMentions(replicaUUID, conversationUUID, {
      limit,
      afterUUID: firstMessageUUID
    });
  }

  /**
   * Expand placeholder messages before a known message UUID
   */
  async expandPlaceholderBefore(
    replicaUUID: string,
    conversationUUID: string,
    firstMessageUUID: string,
    limit: number = 20
  ): Promise<SensayMessagesResponse> {
    return this.getConversationMessages(replicaUUID, conversationUUID, {
      limit,
      beforeUUID: firstMessageUUID
    });
  }

  /**
   * Expand placeholder messages after a known message UUID
   */
  async expandPlaceholderAfter(
    replicaUUID: string,
    conversationUUID: string,
    lastMessageUUID: string,
    limit: number = 20
  ): Promise<SensayMessagesResponse> {
    return this.getConversationMessages(replicaUUID, conversationUUID, {
      limit,
      afterUUID: lastMessageUUID
    });
  }

  /**
   * Get historical conversation analytics
   */
  async getHistoricalAnalytics(replicaUUID: string): Promise<SensayHistoricalAnalytics> {
    try {
      const response = await fetch(
        `https://api.sensay.io/v1/replicas/${replicaUUID}/analytics/conversations/historical`,
        {
          method: 'GET',
          headers: {
            'X-ORGANIZATION-SECRET': import.meta.env.VITE_SENSAY_API_KEY,
            'X-API-Version': this.apiVersion,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Analytics request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Historical analytics error:', error);
      throw error;
    }
  }

  /**
   * Get source analytics
   */
  async getSourceAnalytics(replicaUUID: string): Promise<SensaySourceAnalytics> {
    try {
      const response = await fetch(
        `https://api.sensay.io/v1/replicas/${replicaUUID}/analytics/conversations/sources`,
        {
          method: 'GET',
          headers: {
            'X-ORGANIZATION-SECRET': import.meta.env.VITE_SENSAY_API_KEY,
            'X-API-Version': this.apiVersion,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Analytics request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Source analytics error:', error);
      throw error;
    }
  }

  /**
   * Calculate daily growth from historical data
   */
  calculateDailyGrowth(historicalData: SensayHistoricalAnalytics['items']) {
    return historicalData.slice(1).map((day, index) => ({
      date: day.date,
      newConversations: day.cumulativeConversations - historicalData[index].cumulativeConversations,
      cumulativeConversations: day.cumulativeConversations
    }));
  }

  /**
   * Calculate source percentages
   */
  calculateSourcePercentages(sourceData: SensaySourceAnalytics['items']) {
    const totalConversations = sourceData.reduce((sum, source) => sum + source.conversations, 0);
    
    return sourceData.map(source => ({
      ...source,
      percentage: totalConversations > 0 ? ((source.conversations / totalConversations) * 100).toFixed(1) : '0'
    }));
  }

  /**
   * Process placeholders to extract navigation information
   */
  processPlaceholders(items: SensayConversationItem[]) {
    return items.reduce((acc, item, index, array) => {
      if (item.type === 'placeholder') {
        const mentionBefore = array[index - 1] as SensayMention;
        const mentionAfter = array[index + 1] as SensayMention;

        const firstMessageBeforePlaceholder = mentionBefore?.messages.at(-1)?.uuid;
        const firstMessageAfterPlaceholder = mentionAfter?.messages.at(0)?.uuid;

        acc.push({
          ...item,
          firstMessageBeforePlaceholder,
          firstMessageAfterPlaceholder
        });
      }
      return acc;
    }, [] as Array<SensayPlaceholder & {
      firstMessageBeforePlaceholder?: string;
      firstMessageAfterPlaceholder?: string;
    }>);
  }

  /**
   * Safe analytics request with error handling
   */
  async safeAnalyticsRequest(endpoint: string, replicaUUID: string) {
    try {
      const response = await fetch(
        `https://api.sensay.io/v1/replicas/${replicaUUID}/analytics/${endpoint}`,
        {
          headers: {
            'X-ORGANIZATION-SECRET': import.meta.env.VITE_SENSAY_API_KEY,
            'X-API-Version': this.apiVersion,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 404) {
        // Replica doesn't exist or no access
        return null;
      }

      if (response.status === 403) {
        // Insufficient permissions
        throw new Error('Access denied to replica analytics');
      }

      if (!response.ok) {
        throw new Error(`Analytics request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Analytics request error:', error);
      throw error;
    }
  }

  /**
   * Prepare historical data for chart visualization
   */
  prepareHistoricalChart(data: SensayHistoricalAnalytics['items']) {
    return {
      labels: data.map(d => d.date),
      datasets: [{
        label: 'Cumulative Conversations',
        data: data.map(d => d.cumulativeConversations),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }]
    };
  }

  /**
   * Prepare source data for chart visualization
   */
  prepareSourceChart(data: SensaySourceAnalytics['items']) {
    return {
      labels: data.map(d => d.source),
      datasets: [{
        label: 'Conversations by Source',
        data: data.map(d => d.conversations),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)', 
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)'
        ]
      }]
    };
  }

  /**
   * Get comprehensive conversation analytics
   */
  async getComprehensiveAnalytics(replicaUUID: string) {
    try {
      const [historicalData, sourceData] = await Promise.all([
        this.safeAnalyticsRequest('conversations/historical', replicaUUID),
        this.safeAnalyticsRequest('conversations/sources', replicaUUID)
      ]);

      const dailyGrowth = historicalData ? this.calculateDailyGrowth(historicalData.items) : [];
      const sourcePercentages = sourceData ? this.calculateSourcePercentages(sourceData.items) : [];

      return {
        historical: {
          data: historicalData?.items || [],
          dailyGrowth,
          chartData: historicalData ? this.prepareHistoricalChart(historicalData.items) : null
        },
        sources: {
          data: sourceData?.items || [],
          percentages: sourcePercentages,
          chartData: sourceData ? this.prepareSourceChart(sourceData.items) : null
        }
      };
    } catch (error) {
      console.error('Comprehensive analytics error:', error);
      throw error;
    }
  }

  /**
   * Get conversation summary with key metrics
   */
  async getConversationSummary(replicaUUID: string) {
    try {
      const analytics = await this.getComprehensiveAnalytics(replicaUUID);
      
      const totalConversations = analytics.historical.data.length > 0 
        ? analytics.historical.data[analytics.historical.data.length - 1].cumulativeConversations 
        : 0;

      const totalSources = analytics.sources.data.reduce((sum, source) => sum + source.conversations, 0);
      
      const averageDailyGrowth = analytics.historical.dailyGrowth.length > 0
        ? analytics.historical.dailyGrowth.reduce((sum, day) => sum + day.newConversations, 0) / analytics.historical.dailyGrowth.length
        : 0;

      const topSource = analytics.sources.data.length > 0
        ? analytics.sources.data.reduce((top, current) => current.conversations > top.conversations ? current : top)
        : null;

      return {
        totalConversations,
        totalSources,
        averageDailyGrowth: Math.round(averageDailyGrowth * 10) / 10,
        topSource,
        growthTrend: analytics.historical.dailyGrowth.length > 0 
          ? analytics.historical.dailyGrowth[analytics.historical.dailyGrowth.length - 1].newConversations > 
            analytics.historical.dailyGrowth[0].newConversations ? 'increasing' : 'decreasing'
          : 'stable'
      };
    } catch (error) {
      console.error('Conversation summary error:', error);
      throw error;
    }
  }
}

export const sensayConversationService = new SensayConversationService();
