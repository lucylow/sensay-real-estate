// Sensay API Client - Fallback Implementation
// This is a fallback client for development when the SDK generation fails
// Run 'npm run generate-sdk' when you have access to the Sensay API

export interface ClientConfig {
  BASE?: string;
  HEADERS?: Record<string, string>;
}

export interface ChatCompletionRequest {
  replicaUuid: string;
  content: string;
}

export interface ChatCompletionResponse {
  success: boolean;
  content: string;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  metadata?: Record<string, any>;
}

export interface Replica {
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
}

export class Client {
  private config: ClientConfig;

  constructor(config: ClientConfig = {}) {
    this.config = {
      BASE: config.BASE || 'https://api.sensay.io',
      HEADERS: {
        'Content-Type': 'application/json',
        ...config.HEADERS,
      },
    };
  }

  get users() {
    return {
      async getUsersGet(params: { id: string }): Promise<User> {
        throw new Error('SDK not generated. Please run: npm run generate-sdk');
      },
      
      async createUsersPost(data: { id: string; name?: string; email?: string; metadata?: Record<string, any> }): Promise<User> {
        throw new Error('SDK not generated. Please run: npm run generate-sdk');
      }
    };
  }

  get replicas() {
    return {
      async listReplicasGet(): Promise<{ items: Replica[] }> {
        throw new Error('SDK not generated. Please run: npm run generate-sdk');
      },
      
      async createReplicaPost(data: Partial<Replica>): Promise<Replica> {
        throw new Error('SDK not generated. Please run: npm run generate-sdk');
      }
    };
  }

  get replicaChatCompletions() {
    return {
      async createChatCompletionPost(data: ChatCompletionRequest): Promise<ChatCompletionResponse> {
        throw new Error('SDK not generated. Please run: npm run generate-sdk');
      }
    };
  }
}

export default Client;
