/**
 * Comprehensive Sensay API Integration Service
 * Implements all Sensay API endpoints for the PropGuard Real Estate Platform
 * 
 * Based on Sensay API Documentation v2025-03-25
 * Endpoints covered:
 * - Conversations
 * - Analytics  
 * - Replicas
 * - API Keys
 * - Chat History
 * - Chat Completions
 * - Users
 * - Knowledge Base
 * - Usage
 * - Telegram Integration
 * - Discord Integration 
 * - Chat-widget Integration
 * - Experimental
 */

import { sensayConfig } from '@/config/sensay';

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

export interface SensayCredentials {
  apiKey: string;
  organizationId: string;
}

export interface SensayBasicReplica {
  uuid: string;
  name: string;
  shortDescription: string;
  greeting: string;
  ownerID: string;
  slug: string;
  llm: {
    model: string;
    systemMessage: string;
  };
  private: boolean;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SensayDetailedReplica extends SensayBasicReplica {
  purpose?: string;
  whitelistEmails?: string[];
  tags?: string[];
  suggestedQuestions?: string[];
  tools?: Array<{
    type: string;
    configuration: Record<string, any>;
  }>;
  voicePreviewText?: string;
}

export interface SensayUser {
  id: string;
  name?: string;
  email?: string;
  linkedAccounts?: Array<{
    platform: string;
    accountId: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface SensayConversation {
  uuid: string;
  source: string;
  messageCount: number;
  firstMessageAt: string;
  lastMessageAt: string;
  replicaUUID?: string;
  userUUID?: string;
}

export interface SensayMessage {
  uuid: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: string;
  source: string;
  replicaUUID: string;
  conversationUUID: string;
  discordData?: {
    channelId: string;
    channelName: string;
    authorId: string;
    authorName: string;
    messageId: string;
  };
  telegramData?: {
    chatId: string;
    messageId: string;
    threadId?: string;
  };
}

export interface SensayKnowledgeBaseEntry {
  id: number;
  title: string;
  content?: string;
  url?: string;
  type: 'file' | 'text' | 'website' | 'youtube';
  status: 'NEW' | 'READY' | 'UNPROCESSABLE';
  language?: string;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SensayHistoricalAnalytics {
  items: Array<{
    date: string;
    cumulativeConversations: number;
  }>;
}

export interface SensaySourceAnalytics {
  items: Array<{
    source: string;
    conversations: number;
  }>;
}

export interface SensayUsageData {
  replicas: Array<{
    uuid: string;
    name: string;
    conversations: number;
    knowledgeBaseEntries: number;
  }>;
  totalConversations: number;
  totalKnowledgeBaseEntries: number;
}

export interface SensayChatCompletionRequest {
  content: string;
  source?: string;
  skip_chat_history?: boolean;
  store?: boolean;
  discord_data?: {
    channelId: string;
    channelName: string;
    authorId: string;
    authorName: string;
    messageId: string;
  };
  telegram_data?: {
    chatId: string;
    messageId: string;
    threadId?: string;
  };
}

export interface SensayChatCompletionResponse {
  content: string;
  conversationUUID?: string;
  conversationIndex?: number;
  hasMore?: boolean;
  isComplete?: boolean;
  messageMetadata?: Record<string, any>;
}

export interface SensayInviteRedeemRequest {
  organizationName: string;
  name: string;
  email: string;
}

export interface SensayInviteRedeemResponse {
  apiKey: string;
  organizationID: string;
}

// ============================================================================
// MAIN SENSAY COMPREHENSIVE API SERVICE
// ============================================================================

export class SensayComprehensiveAPI {
  private apiKey: string;
  private organizationId: string;
  private baseUrl: string = 'https://api.sensay.io/v1';
  private apiVersion: string = '2025-03-25';

  constructor(credentials?: SensayCredentials) {
    this.apiKey = credentials?.apiKey || sensayConfig.apiKey || '';
    this.organizationId = credentials?.organizationId || sensayConfig.organizationId || '';
  }

  private getHeaders(): Record<string, string> {
    return {
      'X-ORGANIZATION-SECRET': this.apiKey,
      'X-API-Version': this.apiVersion,
      'Content-Type': 'application/json'
    };
  }

  private getUserHeaders(userId: string): Record<string, string> {
    return {
      'X-ORGANIZATION-SECRET': this.apiKey,
      'X-USER-ID': userId,
      'X-API-Version': this.apiVersion,
      'Content-Type': 'application/json'
    };
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {},
    userId?: string
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = userId ? this.getUserHeaders(userId) : this.getHeaders();

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    };

    console.log(`Sensay API Request: ${config.method || 'GET'} ${url}`);

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Sensay API Error: ${response.status} - ${errorText}`);
        throw new Error(`Sensay API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log(`Sensay API Response:`, data);
      return data as T;
    } catch (error) {
      console.error('Sensay API Request failed:', error);
      throw error;
    }
  }

  // ============================================================================
  // CONVERSATIONS ENDPOINTS
  // ============================================================================

  /**
   * Get details of a specific conversation
   * Endpoint: GET /v1/replicas/{replicaUUID}/conversations/{conversationUUID}
   */
  async getConversationDetails(replicaUUID: string, conversationUUID: string): Promise<SensayConversation> {
    return this.makeRequest<SensayConversation>(
      `/replicas/${replicaUUID}/conversations/${conversationUUID}`,
      { method: 'GET' }
    );
  }

  /**
   * List conversations for a replica with pagination
   * Endpoint: GET /v1/replicas/{replicaUUID}/conversations
   */
  async listConversations(
    replicaUUID: string,
    options: {
      limit?: number;
      offset?: number;
      source?: string[];
    } = {}
  ): Promise<{ items: SensayConversation[]; total: number }> {
    const params = new URLSearchParams();
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.offset) params.append('offset', options.offset.toString());
    if (options.source) params.append('source[]', options.source.join(','));

    const query = params.toString();
    return this.makeRequest<{ items: SensayConversation[]; total: number }>(
      `/replicas/${replicaUUID}/conversations${query ? `?${query}` : ''}`,
      { method: 'GET' }
    );
  }

  /**
   * List mentions in a conversation
   * Endpoint: GET /v1/replicas/{replicaUUID}/conversations/{conversationUUID}/mentions
   */
  async listConversationMentions(
    replicaUUID: string,
    conversationUUID: string,
    options: { limit?: number; beforeUUID?: string; afterUUID?: string } = {}
  ): Promise<{ items: any[]; hasMore?: boolean }> {
    const params = new URLSearchParams();
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.beforeUUID) params.append('beforeUUID', options.beforeUUID);
    if (options.afterUUID) params.append('afterUUID', options.afterUUID);

    const query = params.toString();
    return this.makeRequest<{ items: any[]; hasMore?: boolean }>(
      `/replicas/${replicaUUID}/conversations/${conversationUUID}/mentions${query ? `?${query}` : ''}`,
      { method: 'GET' }
    );
  }

  /**
   * List messages in a conversation
   * Endpoint: GET /v1/replicas/{replicaUUID}/conversations/{conversationUUID}/messages
   */
  async listConversationMessages(
    replicaUUID: string,
    conversationUUID: string,
    options: { limit?: number; beforeUUID?: string; afterUUID?: string } = {}
  ): Promise<{ items: SensayMessage[]; hasMore?: boolean }> {
    const params = new URLSearchParams();
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.beforeUUID) params.append('beforeUUID', options.beforeUUID);
    if (options.afterUUID) params.append('afterUUID', options.afterUUID);

    const query = params.toString();
    return this.makeRequest<{ items: SensayMessage[]; hasMore?: boolean }>(
      `/replicas/${replicaUUID}/conversations/${conversationUUID}/messages${query ? `?${query}` : ''}`,
      { method: 'GET' }
    );
  }

  // ============================================================================
  // ANALYTICS ENDPOINTS
  // ============================================================================

  /**
   * Get historical conversation analytics
   * Endpoint: GET /v1/replicas/{replicaUUID}/analytics/conversations/historical
   */
  async getHistoricalConversationAnalytics(replicaUUID: string): Promise<SensayHistoricalAnalytics> {
    return this.makeRequest<SensayHistoricalAnalytics>(
      `/replicas/${replicaUUID}/analytics/conversations/historical`,
      { method: 'GET' }
    );
  }

  /**
   * Get conversation source analytics
   * Endpoint: GET /v1/replicas/{replicaUUID}/analytics/conversations/sources
   */
  async getSourceAnalytics(replicaUUID: string): Promise<SensaySourceAnalytics> {
    return this.makeRequest<SensaySourceAnalytics>(
      `/replicas/${replicaUUID}/analytics/conversations/sources`,
      { method: 'GET' }
    );
  }

  // ============================================================================
  // REPLICAS ENDPOINTS
  // ============================================================================

  /**
   * List replicas with filtering and pagination
   * Endpoint: GET /v1/replicas
   */
  async listReplicas(options: {
    page?: number;
    page_size?: number;
    owner_uuid?: string;
    slug?: string;
    search?: string;
    tags?: string[];
    integration?: string;
  } = {}): Promise<{ items: SensayBasicReplica[]; pagination: any }> {
    const params = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(item => params.append(`${key}[]`, item));
        } else {
          params.append(key, value.toString());
        }
      }
    });

    const query = params.toString();
    return this.makeRequest<{ items: SensayBasicReplica[]; pagination: any }>(
      `/replicas${query ? `?${query}` : ''}`,
      { method: 'GET' }
    );
  }

  /**
   * Create a new replica
   * Endpoint: POST /v1/replicas
   */
  async createReplica(data: Omit<SensayDetailedReplica, 'uuid' | 'createdAt' | 'updatedAt'>): Promise<SensayDetailedReplica> {
    return this.makeRequest<SensayDetailedReplica>(
      '/replicas',
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * Get details of a specific replica
   * Endpoint: GET /v1/replicas/{replicaUUID}
   */
  async getReplicaDetails(replicaUUID: string): Promise<SensayDetailedReplica> {
    return this.makeRequest<SensayDetailedReplica>(
      `/replicas/${replicaUUID}`,
      { method: 'GET' }
    );
  }

  /**
   * Update an existing replica
   * Endpoint: PUT /v1/replicas/{replicaUUID}
   */
  async updateReplica(replicaUUID: string, data: Partial<SensayDetailedReplica>): Promise<SensayDetailedReplica> {
    return this.makeRequest<SensayDetailedReplica>(
      `/replicas/${replicaUUID}`,
      {
        method: 'PUT',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * Delete a replica
   * Endpoint: DELETE /v1/replicas/{replicaUUID}
   */
  async deleteReplica(replicaUUID: string): Promise<void> {
    return this.makeRequest<void>(
      `/replicas/${replicaUUID}`,
      { method: 'DELETE' }
    );
  }

  // ============================================================================
  // API KEYS ENDPOINT
  // ============================================================================

  /**
   * Redeem an API key invitation code
   * Endpoint: POST /v1/api-keys/invites/{code}/redeem
   */
  async redeemApiKeyInvitation(
    invitationCode: string,
    request: SensayInviteRedeemRequest
    ): Promise<SensayInviteRedeemResponse> {
    return this.makeRequest<SensayInviteRedeemResponse>(
      `/api-keys/invites/${invitationCode}/redeem`,
      {
        method: 'POST',
        body: JSON.stringify(request)
      }
    );
  }

  // ============================================================================
  // CHAT HISTORY ENDPOINTS
  // ============================================================================

  /**
   * Get chat history for a replica
   * Endpoint: GET /v1/replicas/{replicaUUID}/chat/history
   */
  async getChatHistory(
    replicaUUID: string,
    options: {
      source?: string[];
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<{ items: SensayMessage[]; total: number }> {
    const params = new URLSearchParams();
    if (options.source) params.append('source[]', options.source.join(','));
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.offset) params.append('offset', options.offset.toString());

    const query = params.toString();
    return this.makeRequest<{ items: SensayMessage[]; total: number }>(
      `/replicas/${replicaUUID}/chat/history${query ? `?${query}` : ''}`,
      { method: 'GET' }
    );
  }

  /**
   * Create a chat history entry
   * Endpoint: POST /v1/replicas/{replicaUUID}/chat/history
   */
  async createChatHistoryEntry(
    replicaUUID: string,
    data: {
      content: string;
      role: 'user' | 'assistant';
      source: string;
      user_uuid: string;
      discord_data?: {
        channelId: string;
        channelName: string;
        authorId: string;
        authorName: string;
        messageId: string;
      };
      telegram_data?: {
        chatId: string;
        messageId: string;
        threadId?: string;
      };
    }
  ): Promise<SensayMessage> {
    return this.makeRequest<SensayMessage>(
      `/replicas/${replicaUUID}/chat/history`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * Get web chat history
   * Endpoint: GET /v1/replicas/{replicaUUID}/chat/history/web
   */
  async getWebChatHistory(replicaUUID: string, options: { limit?: number; offset?: number } = {}): Promise<{ items: SensayMessage[]; total: number }> {
    const params = new URLSearchParams();
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.offset) params.append('offset', options.offset.toString());

    const query = params.toString();
    return this.makeRequest<{ items: SensayMessage[]; total: number }>(
      `/replicas/${replicaUUID}/chat/history/web${query ? `?${query}` : ''}`,
      { method: 'GET' }
    );
  }

  // ============================================================================
  // CHAT COMPLETIONS ENDPOINTS
  // ============================================================================

  /**
   * Generate a chat completion
   * Endpoint: POST /v1/replicas/{replicaUUID}/chat/completions
   */
  async generateChatCompletion(
    replicaUUID: string,
    request: SensayChatCompletionRequest,
    stream: boolean = false
  ): Promise<SensayChatCompletionResponse> {
    const headers = this.getHeaders();
    if (stream) {
      headers['Accept'] = 'text/event-stream';
    }

    return this.makeRequest<SensayChatCompletionResponse>(
      `/replicas/${replicaUUID}/chat/completions`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(request)
      }
    );
  }

  /**
   * Stream chat completions (for real-time response)
   */
  async *streamChatCompletion(
    replicaUUID: string,
    request: SensayChatCompletionRequest
  ): AsyncGenerator<string> {
    const response = await fetch(`${this.baseUrl}/replicas/${replicaUUID}/chat/completions`, {
      method: 'POST',
      headers: {
        ...this.getHeaders(),
        'Accept': 'text/event-stream'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`Chat streaming failed: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response stream not available');
    }

    const decoder = new TextDecoder();
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                yield parsed.content;
              }
            } catch (e) {
              // Ignore invalid JSON lines
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  // ============================================================================
  // USERS ENDPOINTS
  // ============================================================================

  /**
   * Get current authenticated user details
   * Endpoint: GET /v1/users/me
   */
  async getCurrentUserDetails(userId: string): Promise<SensayUser> {
    return this.makeRequest<SensayUser>(
      '/users/me',
      { method: 'GET' },
      userId
    );
  }

  /**
   * Update current user information
   * Endpoint: PUT /v1/users/me
   */
  async updateCurrentUser(
    userId: string,
    data: { name?: string; email?: string; linked_accounts?: Array<{ platform: string; accountId: string }> }
  ): Promise<SensayUser> {
    return this.makeRequest<SensayUser>(
      '/users/me',
      {
        method: 'PUT',
        body: JSON.stringify(data)
      },
      userId
    );
  }

  /**
   * Delete current user
   * Endpoint: DELETE /v1/users/me
   */
  async deleteCurrentUser(userId: string): Promise<void> {
    return this.makeRequest<void>(
      '/users/me',
      { method: 'DELETE' },
      userId
    );
  }

  /**
   * Create a new user
   * Endpoint: POST /v1/users
   */
  async createUser(data: {
    name: string;
    email?: string;
    linked_accounts?: Array<{ platform: string; accountId: string }>;
  }): Promise<SensayUser> {
    return this.makeRequest<SensayUser>(
      '/users',
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * Get user by ID
   * Endpoint: GET /v1/users/{userID}
   */
  async getUserById(userId: string): Promise<SensayUser> {
    return this.makeRequest<SensayUser>(
      `/users/${userId}`,
      { method: 'GET' }
    );
  }

  // ============================================================================
  // KNOWLEDGE BASE ENDPOINTS
  // ============================================================================

  /**
   * List knowledge base entries for a replica
   * Endpoint: GET /v1/replicas/{replicaUUID}/knowledge-base
   */
  async listKnowledgeBaseEntries(
    replicaUUID: string,
    options: {
      status?: ('NEW' | 'READY' | 'UNPROCESSABLE')[];
      type?: ('file' | 'text' | 'website' | 'youtube')[];
      page?: number;
      page_size?: number;
    } = {}
  ): Promise<{ items: SensayKnowledgeBaseEntry[]; pagination: any }> {
    const params = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(item => params.append(`${key}[]`, item));
        } else {
          params.append(key, value.toString());
        }
      }
    });

    const query = params.toString();
    return this.makeRequest<{ items: SensayKnowledgeBaseEntry[]; pagination: any }>(
      `/replicas/${replicaUUID}/knowledge-base${query ? `?${query}` : ''}`,
      { method: 'GET' }
    );
  }

  /**
   * Create knowledge base entry from text
   * Endpoint: POST /v1/replicas/{replicaUUID}/knowledge-base/text
   */
  async createKnowledgeBaseEntryFromText(
    replicaUUID: string,
    data: {
      content: string;
      title: string;
      language?: string;
    }
  ): Promise<SensayKnowledgeBaseEntry> {
    return this.makeRequest<SensayKnowledgeBaseEntry>(
      `/replicas/${replicaUUID}/knowledge-base/text`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * Create knowledge base entry from website
   * Endpoint: POST /v1/replicas/{replicaUUID}/knowledge-base/website
   */
  async createKnowledgeBaseEntryFromWebsite(
    replicaUUID: string,
    data: {
      url: string;
      title?: string;
      autoRefresh?: boolean;
    }
  ): Promise<SensayKnowledgeBaseEntry> {
    return this.makeRequest<SensayKnowledgeBaseEntry>(
      `/replicas/${replicaUUID}/knowledge-base/website`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * Get specific knowledge base entry
   * Endpoint: GET /v1/replicas/{replicaUUID}/knowledge-base/{knowledgeBaseEntryID}
   */
  async getKnowledgeBaseEntry(replicaUUID: string, entryId: number): Promise<SensayKnowledgeBaseEntry> {
    return this.makeRequest<SensayKnowledgeBaseEntry>(
      `/replicas/${replicaUUID}/knowledge-base/${entryId}`,
      { method: 'GET' }
    );
  }

  /**
   * Update knowledge base entry
   * Endpoint: PATCH /v1/replicas/{replicaUUID}/knowledge-base/{knowledgeBaseEntryID}
   */
  async updateKnowledgeBaseEntry(
    replicaUUID: string,
    entryId: number,
    data: { title?: string; content?: string; language?: string }
  ): Promise<SensayKnowledgeBaseEntry> {
    return this.makeRequest<SensayKnowledgeBaseEntry>(
      `/replicas/${replicaUUID}/knowledge-base/${entryId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * Delete knowledge base entry
   * Endpoint: DELETE /v1/replicas/{replicaUUID}/knowledge-base/{knowledgeBaseEntryID}
   */
  async deleteKnowledgeBaseEntry(replicaUUID: string, entryId: number): Promise<void> {
    return this.makeRequest<void>(
      `/replicas/${replicaUUID}/knowledge-base/${entryId}`,
      { method: 'DELETE' }
    );
  }

  // ============================================================================
  // USAGE ENDPOINTS
  // ============================================================================

  /**
   * Get combined usage metrics
   * Endpoint: GET /v1/usage
   */
  async getCombinedUsage(): Promise<SensayUsageData> {
    return this.makeRequest<SensayUsageData>('/usage', { method: 'GET' });
  }

  /**
   * Get conversation usage metrics
   * Endpoint: GET /v1/usage/conversations
   */
  async getConversationUsage(): Promise<SensayUsageData> {
    return this.makeRequest<SensayUsageData>('/usage/conversations', { method: 'GET' });
  }

  /**
   * Get knowledge base entry usage counts
   * Endpoint: GET /v1/usage/knowledgeBaseEntries
   */
  async getKnowledgeBaseUsage(): Promise<SensayUsageData> {
    return this.makeRequest<SensayUsageData>('/usage/knowledgeBaseEntries', { method: 'GET' });
  }

  // ============================================================================
  // TELEGRAM INTEGRATION ENDPOINTS
  // ============================================================================

  /**
   * Get Telegram chat history for a replica
   * Endpoint: GET /v1/replicas/{replicaUUID}/chat/history/telegram
   */
  async getTelegramChatHistory(replicaUUID: string): Promise<{ items: SensayMessage[]; total: number }> {
    return this.makeRequest<SensayMessage[]>(
      `/replicas/${replicaUUID}/chat/history/telegram`,
      { method: 'GET' }
    );
  }

  /**
   * Create Telegram chat history entry
   * Endpoint: POST /v1/replicas/{replicaUUID}/chat/history/telegram
   */
  async createTelegramChatHistoryEntry(
    replicaUUID: string,
    data: {
      content: string;
      role: 'user' | 'assistant';
      user_uuid: string;
      telegram_data: {
        chatId: string;
        messageId: string;
        threadId?: string;
      };
    }
  ): Promise<SensayMessage> {
    return this.makeRequest<SensayMessage>(
      `/replicas/${replicaUUID}/chat/history/telegram`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * Generate Telegram completion
   * Endpoint: POST /v1/replicas/{replicaUUID}/chat/completions/telegram
   */
  async generateTelegramCompletion(
    replicaUUID: string,
    request: SensayChatCompletionRequest
  ): Promise<SensayChatCompletionResponse> {
    return this.makeRequest<SensayChatCompletionResponse>(
      `/replicas/${replicaUUID}/chat/completions/telegram`,
      {
        method: 'POST',
        body: JSON.stringify(request)
      }
    );
  }

  /**
   * Create replica Telegram integration
   * Endpoint: POST /v1/replicas/{replicaUUID}/integrations/telegram
   */
  async createTelegramIntegration(
    replicaUUID: string,
    data: {
      token: string;
      service_name: string;
    }
  ): Promise<{ success: boolean }> {
    return this.makeRequest<{ success: boolean }>(
      `/replicas/${replicaUUID}/integrations/telegram`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * Delete replica Telegram integration
   * Endpoint: DELETE /v1/replicas/{replicaUUID}/integrations/telegram
   */
  async deleteTelegramIntegration(replicaUUID: string): Promise<{ success: boolean }> {
    return this.makeRequest<{ success: boolean }>(
      `/replicas/${replicaUUID}/integrations/telegram`,
      { method: 'DELETE' }
    );
  }

  // ============================================================================
  // DISCORD INTEGRATION ENDPOINTS
  // ============================================================================

  /**
   * Get Discord chat history for a replica
   * Endpoint: GET /v1/replicas/{replicaUUID}/chat/history/discord
   */
  async getDiscordChatHistory(replicaUUID: string): Promise<{ items: SensayMessage[]; total: number }> {
    return this.makeRequest<SensayMessage[]>(
      `/replicas/${replicaUUID}/chat/history/discord`,
      { method: 'GET' }
    );
  }

  /**
   * Create Discord chat history entry
   * Endpoint: POST /v1/replicas/{replicaUUID}/chat/history/discord
   */
  async createDiscordChatHistoryEntry(
    replicaUUID: string,
    data: {
      content: string;
      role: 'user' | 'assistant';
      user_uuid: string;
      discord_data: {
        channelId: string;
        channelName: string;
        authorId: string;
        authorName: string;
        messageId: string;
      };
    }
  ): Promise<SensayMessage> {
    return this.makeRequest<SensayMessage>(
      `/replicas/${replicaUUID}/chat/history/discord`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * Generate Discord completion
   * Endpoint: POST /v1/replicas/{replicaUUID}/chat/completions/discord
   */
  async generateDiscordCompletion(
    replicaUUID: string,
    request: SensayChatCompletionRequest
  ): Promise<SensayChatCompletionResponse> {
    return this.makeRequest<SensayChatCompletionResponse>(
      `/replicas/${replicaUUID}/chat/completions/discord`,
      {
        method: 'POST',
        body: JSON.stringify(request)
      }
    );
  }

  /**
   * Create replica Discord integration
   * Endpoint: POST /v1/replicas/{replicaUUID}/integrations/discord
   */
  async createDiscordIntegration(
    replicaUUID: string,
    data: {
      token: string;
      service_name: string;
    }
  ): Promise<{ success: boolean }> {
    return this.makeRequest<{ success: boolean }>(
      `/replicas/${replicaUUID}/integrations/discord`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * Delete replica Discord integration
   * Endpoint: DELETE /v1/replicas/{replicaUUID}/integrations/discord
   */
  async deleteDiscordIntegration(replicaUUID: string): Promise<{ success: boolean }> {
    return this.makeRequest<{ success: boolean }>(
      `/replicas/${replicaUUID}/integrations/discord`,
      { method: 'DELETE' }
    );
  }

  // ============================================================================
  // CHAT-WIDGET INTEGRATION ENDPOINTS
  // ============================================================================

  /**
   * Get embed chat history for a replica
   * Endpoint: GET /v1/replicas/{replicaUUID}/chat/history/embed
   */
  async getEmbedChatHistory(replicaUUID: string): Promise<{ items: SensayMessage[]; total: number }> {
    return this.makeRequest<SensayMessage[]>(
      `/replicas/${replicaUUID}/chat/history/embed`,
      { method: 'GET' }
    );
  }

  /**
   * Create embed chat history entry
   * Endpoint: POST /v1/replicas/{replicaUUID}/chat/history/embed
   */
  async createEmbedChatHistoryEntry(
    replicaUUID: string,
    data: {
      content: string;
      role: 'user' | 'assistant';
      user_uuid: string;
    }
  ): Promise<SensayMessage> {
    return this.makeRequest<SensayMessage>(
      `/replicas/${replicaUUID}/chat/history/embed`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * Generate embed completion
   * Endpoint: POST /v1/replicas/{replicaUUID}/chat/completions/embed
   */
  async generateEmbedCompletion(
    replicaUUID: string,
    request: SensayChatCompletionRequest
  ): Promise<SensayChatCompletionResponse> {
    return this.makeRequest<SensayChatCompletionResponse>(
      `/replicas/${replicaUUID}/chat/completions/embed`,
      {
        method: 'POST',
        body: JSON.stringify(request)
      }
    );
  }

  // ============================================================================
  // EXPERIMENTAL ENDPOINTS
  // ============================================================================

  /**
   * Generate OpenAI-compatible chat completion
   * Endpoint: POST /v1/experimental/replicas/{replicaUUID}/chat/completions
   */
  async generateExperimentalCompletion(
    replicaUUID: string,
    data: {
      messages: Array<{
        role: 'system' | 'user' | 'assistant';
        content: string;
      }>;
      store?: boolean;
      source?: string;
    }
  ): Promise<SensayChatCompletionResponse> {
    return this.makeRequest<SensayChatCompletionResponse>(
      `/experimental/replicas/${replicaUUID}/chat/completions`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  // ============================================================================
  // HEALTH AND UTILITY METHODS
  // ============================================================================

  /**
   * Validate API credentials
   */
  async validateCredentials(): Promise<boolean> {
    try {
      await this.listReplicas({ page: 1, page_size: 1 });
      return true;
    } catch (error) {
      console.error('Credential validation failed:', error);
      return false;
    }
  }

  /**
   * Get API health status
   */
  async getHealthStatus(): Promise<{
    status: 'healthy' | 'unhealthy' | 'error';
    message: string;
    timestamp: string;
  }> {
    try {
      const isHealthy = await this.validateCredentials();
      return {
        status: isHealthy ? 'healthy' : 'unhealthy',
        message: isHealthy ? 'API is functioning normally' : 'API credentials invalid',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

export const sensayComprehensiveAPI = new SensayComprehensiveAPI();

// ============================================================================
// UTILITY FUNCTIONS FOR PROPERTY-RELATED OPERATIONS
// ============================================================================

/**
 * Property-specific wrapper functions for PropGuard Real Estate
 */
export class PropGuardSensayWrapper {
  private api: SensayComprehensiveAPI;
  private defaultReplicaId: string;

  constructor(api?: SensayComprehensiveAPI) {
    this.api = api || sensayComprehensiveAPI;
    this.defaultReplicaId = sensayConfig.replicaId;
  }

  /**
   * Send property analysis request to Sensay
   */
  async analyzeProperty(
    address: string,
    analysisType: 'valuation' | 'risk' | 'market' = 'valuation'
  ): Promise<SensayChatCompletionResponse> {
    const message = this.buildPropertyQueryMessage(address, analysisType);
    
    return this.api.generateChatCompletion(this.defaultReplicaId, {
      content: message,
      source: 'web'
    });
  }

  /**
   * Stream property analysis responses for real-time updates
   */
  async *streamPropertyAnalysis(
    address: string,
    analysisType: 'valuation' | 'risk' | 'market' = 'valuation'
  ): AsyncGenerator<string> {
    const message = this.buildPropertyQueryMessage(address, analysisType);
    
    const request: SensayChatCompletionRequest = {
      content: message,
      source: 'web'
    };

    yield* this.api.streamChatCompletion(this.defaultReplicaId, request);
  }

  /**
   * Add property knowledge to replica
   */
  async addPropertyKnowledge(
    replicaId: string,
    knowledge: string,
    title: string
  ): Promise<SensayKnowledgeBaseEntry> {
    return this.api.createKnowledgeBaseEntryFromText(replicaId, {
      content: knowledge,
      title: title,
      language: 'en'
    });
  }

  /**
   * Create PropGuard-specific replica with real estate knowledge
   */
  async createPropGuardReplica(name: string, ownerId: string): Promise<SensayDetailedReplica> {
    return this.api.createReplica({
      name,
      shortDescription: 'Advanced Property Analysis and Risk Assessment AI',
      greeting: 'Hello! I\'m PropGuard AI, your intelligent property analysis assistant. I can help you with property valuations, risk assessments, market analysis, and investment insights.',
      ownerID: ownerId,
      slug: `propguard-${name.toLowerCase().replace(/\s+/g, '-')}`,
      llm: {
        model: 'gpt-4o',
        systemMessage: `You are PropGuard AI, an expert property analysis assistant specializing in real estate valuations, risk assessments, and market intelligence. You provide accurate, data-driven insights to help users make informed property decisions. Always include risk analysis, market context, and investment potential in your responses.`
      },
      private: false,
      purpose: 'Property analysis and real estate intelligence',
      tags: ['real-estate', 'property-analysis', 'risk-assessment', 'valuation', 'propguard'],
      suggestedQuestions: [
        'What\'s the current valuation of this property?',
        'What are the environmental risks for this address?',
        'How is the local real estate market performing?',
        'Is this a good investment opportunity?',
        'What should I know before buying this property?'
      ]
    });
  }

  /**
   * Get property-focused analytics
   */
  async getPropertyAnalytics(replicaUUID: string) {
    const [historical, sources] = await Promise.all([
      this.api.getHistoricalConversationAnalytics(replicaUUID),
      this.api.getSourceAnalytics(replicaUUID)
    ]);

    return {
      historical,
      sources,
      insights: {
        totalConversations: historical.items.length > 0 
          ? historical.items[historical.items.length - 1].cumulativeConversations 
          : 0,
        engagementSources: sources.items,
        growthTrend: historical.items.length > 30 
          ? this.calculateGrowthTrend(historical.items.slice(-30))
          : 'insufficient data'
      }
    };
  }

  /**
   * Analyze user intent for property-related queries
   */
  analyzePropertyIntent(message: string): {
    intent: 'valuation' | 'risk' | 'market' | 'general';
    confidence: number;
    entities: Record<string, any>;
  } {
    const messageLower = message.toLowerCase();
    const valuationKeywords = ['value', 'worth', 'price', 'valuation', 'estimate'];
    const riskKeywords = ['risk', 'danger', 'safe', 'hazard', 'dangerous', 'flood', 'fire'];
    const marketKeywords = ['market', 'trend', 'growth', 'comparison', 'investment'];

    let intent: 'valuation' | 'risk' | 'market' | 'general' = 'general';
    let confidence = 0;

    // Check intent keywords
    valuationKeywords.forEach(keyword => {
      if (messageLower.includes(keyword)) {
        confidence += 0.2;
        if (intent === 'general') intent = 'valuation';
      }
    });

    riskKeywords.forEach(keyword => {
      if (messageLower.includes(keyword)) {
        confidence += 0.2;
        intent = 'risk';
      }
    });

    marketKeywords.forEach(keyword => {
      if (messageLower.includes(keyword)) {
        confidence += 0.2;
        if (intent === 'general') intent = 'market';
      }
    });

    // Extract entities
    const addressMatch = message.match(/\d+\s+[\w\s]+(?:street|st|avenue|ave|road|rd|drive|dr|lane|ln|way|blvd|boulevard)/i);
    const locationMatch = message.match(/in\s+([A-Za-z\s]+)/i);

    return {
      intent,
      confidence: Math.min(confidence, 1),
      entities: {
        address: addressMatch ? addressMatch[0] : undefined,
        location: locationMatch ? locationMatch[1].trim() : undefined
      }
    };
  }

  private buildPropertyQueryMessage(address: string, analysisType: string): string {
    const templates = {
      valuation: `Please provide a comprehensive property valuation analysis for ${address}. Include estimated market value, comparable sales, and investment potential.`,
      risk: `Please conduct a thorough risk assessment for the property at ${address}. Analyze environmental risks, market risks, and any potential hazards.`,
      market: `Please provide detailed market analysis and trends for the area around ${address}. Include local market conditions, price trends, and future outlook.`
    };

    return templates[analysisType as keyof typeof templates] || templates.valuation;
  }

  private calculateGrowthTrend(data: Array<{ date: string; cumulativeConversations: number }>): 'increasing' | 'decreasing' | 'stable' {
    if (data.length < 2) return 'stable';
    
    const first = data[0].cumulativeConversations;
    const last = data[data.length - 1].cumulativeConversations;
    const change = last - first;
    
    if (change > 5) return 'increasing';
    if (change < -5) return 'decreasing';
    return 'stable';
  }
}

export const propGuardSensayWrapper = new PropGuardSensayWrapper();

// Export types for external use
export type {
  SensayCredentials,
  SensayBasicReplica,
  SensayDetailedReplica,
  SensayUser,
  SensayConversation,
  SensayMessage,
  SensayKnowledgeBaseEntry,
  SensayHistoricalAnalytics,
  SensaySourceAnalytics,
  SensayUsageData,
  SensayChatCompletionRequest,
  SensayChatCompletionResponse,
  SensayInviteRedeemRequest,
  SensayInviteRedeemResponse
};
