/**
 * Sensay API Client Initialization
 * Following the tutorial pattern for organization and user authentication
 */

export interface SensayCredentials {
  apiKey: string;
  organizationId?: string;
}

export interface SensayUser {
  id: string;
  name?: string;
  email?: string;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface SensayReplica {
  uuid: string;
  name: string;
  shortDescription?: string;
  greeting?: string;
  ownerID: string;
  private: boolean;
  slug: string;
  llm: {
    provider: string;
    model: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatCompletionRequest {
  replicaUuid: string;
  content: string;
  conversationId?: string;
}

export interface ChatCompletionResponse {
  success: boolean;
  content: string;
  conversationId?: string;
  suggestion?: string;
  metadata?: Record<string, any>;
}

export interface SensayAuthenticationError {
  status: number;
  message: string;
}

// Try to import the generated SDK, fallback to basic client if not available
let SensayClient: any;

try {
  // const sdk = await import('@sensay/sdk');
  // SensayClient = sdk.Client || sdk.default.Client;
  throw new Error('SDK not available');
} catch (error) {
  console.warn('Sensay SDK not found, using fallback client');
  // Fallback client for development
  class FallbackClient {
    private baseUrl = 'https://api.sensay.io';
    private apiKey: string;
    private organizationId?: string;

    constructor(config: { BASE?: string; HEADERS?: Record<string, string> } = {}) {
      this.baseUrl = config.BASE || this.baseUrl;
      this.apiKey = config.HEADERS?.['X-ORGANIZATION-SECRET'] || '';
      this.organizationId = config.HEADERS?.['X-ORGANIZATION-ID'];
    }

    private async makeRequest(endpoint: string, data: any = {}, method: 'GET' | 'POST' = 'POST') {
      const url = `${this.baseUrl}${endpoint}`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this.apiKey) {
        headers['X-ORGANIZATION-SECRET'] = this.apiKey;
      }
      if (this.organizationId) {
        headers['X-ORGANIZATION-ID'] = this.organizationId;
      }

      const response = await fetch(url, {
        method,
        headers,
        body: method !== 'GET' ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { status: response.status, message: errorData.message || response.statusText };
      }

      return response.json();
    }

    get users() {
      return {
        async getUsersGet(params: { id: string }): Promise<SensayUser> {
          return this.makeRequest(`/v1/users/${params.id}`, {}, 'GET');
        },
        
        async createUsersPost(data: { id: string; name?: string; email?: string; metadata?: Record<string, any> }): Promise<SensayUser> {
          return this.makeRequest('/v1/users', data);
        }
      };
    }

    get replicas() {
      return {
        async listReplicasGet(): Promise<{ items: SensayReplica[] }> {
          return this.makeRequest('/v1/replicas', {}, 'GET');
        },
        
        async createReplicaPost(data: Partial<SensayReplica>): Promise<SensayReplica> {
          return this.makeRequest('/v1/replicas', data);
        }
      };
    }

    get replicaChatCompletions() {
      return {
        async createChatCompletionPost(data: ChatCompletionRequest): Promise<ChatCompletionResponse> {
          return this.makeRequest(`/v1/replicas/${data.replicaUuid}/chat/completions`, {
            content: data.content,
            conversation_id: data.conversationId
          });
        }
      };
    }
  }

  SensayClient = FallbackClient;
}

/**
 * Sensay API Client Factory
 * Implements the authentication flow from the tutorial
 */
export class SensayAPIClient {
  private apiKey: string;
  private organizationId?: string;
  private baseUrl: string = 'https://api.sensay.io';

  constructor(credentials?: SensayCredentials) {
    this.apiKey = credentials?.apiKey || import.meta.env.VITE_SENSAY_API_KEY || '';
    this.organizationId = credentials?.organizationId || import.meta.env.VITE_SENSAY_ORG_ID;
    this.baseUrl = import.meta.env.VITE_SENSAY_BASE_URL || this.baseUrl;
  }

  /**
   * Create organization-level client for admin operations
   */
  createOrganizationClient(): any {
    return new SensayClient({
      BASE: this.baseUrl,
      HEADERS: {
        'X-ORGANIZATION-SECRET': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Create user-level client for user operations
   */
  createUserClient(userId: string): any {
    return new SensayClient({
      BASE: this.baseUrl,
      HEADERS: {
        'X-ORGANIZATION-SECRET': this.apiKey,
        'X-USER-ID': userId,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Validate API credentials
   */
  async validateCredentials(): Promise<boolean> {
    if (!this.apiKey) {
      return false;
    }

    try {
      const client = this.createOrganizationClient();
      // Try to access a basic endpoint to validate credentials
      await client.replicas.listReplicasGet();
      return true;
    } catch (error: any) {
      console.error('API validation failed:', error);
      return false;
    }
  }
}

/**
 * Utility functions for user and replica management
 */
export class SensayUtils {
  /**
   * Ensure user exists, creating one if necessary
   * Follows the tutorial pattern for user management
   */
  static async ensureUserExists(userId: string, client: any): Promise<SensayUser> {
    try {
      const user = await client.users.getUsersGet({ id: userId });
      console.log('User exists:', user);
      return user;
    } catch (error: any) {
      if (error.status === 404) {
        // Create user if not found
        console.log('Creating new user:', userId);
        const newUser = await client.users.createUsersPost({
          id: userId,
          name: `User ${userId.split('_').pop()}`,
          email: `user+${userId}@example.com`,
          metadata: {
            createdVia: 'sensay-chat-tutorial',
            createdAt: new Date().toISOString()
          }
        });
        console.log('Created new user:', newUser);
        return newUser;
      }
      throw error;
    }
  }

  /**
   * Ensure replica exists, creating one if necessary
   * Follows the tutorial pattern for replica management
   */
  static async ensureReplicaExists(userId: string, client: any): Promise<string> {
    try {
      // List replicas for the user
      const replicas = await client.replicas.listReplicasGet();

      if (replicas.items.length === 0) {
        // Create a new replica if none exists
        console.log('Creating new replica for user:', userId);
        const newReplica = await client.replicas.createReplicaPost({
          name: `Sample Replica ${Date.now()}`,
          shortDescription: 'A helpful assistant for demonstration purposes',
          greeting: 'Hello! I am a sample replica created for the Sensay tutorial. How can I help you today?',
          ownerID: userId,
          private: false,
          slug: `sample-replica-${Date.now()}`,
          llm: {
            provider: 'openai',
            model: 'gpt-4o',
          },
          metadata: {
            createdVia: 'sensay-chat-tutorial',
            createdAt: new Date().toISOString()
          }
        });
        console.log('Created new replica:', newReplica);
        return newReplica.uuid;
      }

      // Use the first available replica
      console.log('Using existing replica:', replicas.items[0].uuid);
      return replicas.items[0].uuid;
    } catch (error) {
      console.error('Error managing replicas:', error);
      throw error;
    }
  }

  /**
   * Send a chat message and get a response
   * Follows the tutorial pattern for chat interaction
   */
  static async sendMessage(
    replicaId: string, 
    message: string, 
    client: any,
    conversationId?: string
  ): Promise<ChatCompletionResponse> {
    try {
      const response = await client.replicaChatCompletions.createChatCompletionPost({
        replicaUuid: replicaId,
        content: message,
        conversationId
      });

      if (response.success) {
        return response;
      } else {
        throw new Error('Chat completion failed');
      }
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }
}

// Export factory instance
export const sensayFactory = new SensayAPIClient();
