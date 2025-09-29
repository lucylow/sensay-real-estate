const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Generating Sensay API SDK...');

try {
  // Ensure the SDK directory exists
  const sdkDir = path.join(__dirname, '../src/sdk');
  if (!fs.existsSync(sdkDir)) {
    fs.mkdirSync(sdkDir, { recursive: true });
  }

  // Generate SDK from Sensay API OpenAPI specification
  const command = `
    openapi-typescript-codegen --input https://api.sensay.io/openapi.json --output ${sdkDir} --client axios --version 5.49.0 --useRxJS false --indent 2 --filenameCase camel
  `;

  console.log('📥 Fetching Sensay API OpenAPI specification...');
  execSync(command.trim(), { stdio: 'inherit' });

  console.log('✅ Sensay API SDK generated successfully!');
  console.log('📁 SDK location: src/sdk');
  console.log('');
  console.log('💡 Usage:');
  console.log('  import { Client } from "@/src/sdk";');
  console.log('  const client = new Client({ ... });');
  console.log('');
  console.log('🔄 Next steps:');
  console.log('  1. Set your SENSAY_API_KEY environment variable');
  console.log('  2. Initialize the client with your credentials');
  console.log('  3. Start building your chat application');

} catch (error) {
  console.error('❌ Failed to generate SDK:', error.message);
  
  // Fallback: create a basic SDK structure for development
  console.log('🛠️  Creating fallback SDK structure...');
  
  const fallbackClientPath = path.join(sdkDir, 'Client.ts');
  const fallbackConfig = `// Sensay API Client - Fallback Implementation
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
`;

  fs.writeFileSync(fallbackClientPath, fallbackConfig);
  console.log('✅ Fallback SDK created at src/sdk/Client.ts');
  console.log('⚠️  You need to run npm run generate-sdk with valid Sensay API access');
}
