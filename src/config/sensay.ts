// Sensay API Configuration
export const sensayConfig = {
  apiKey: import.meta.env.VITE_SENSAY_API_KEY || 'your_sensay_api_key_here',
  organizationId: import.meta.env.VITE_SENSAY_ORG_ID || 'your_sensay_org_id_here',
  replicaId: import.meta.env.VITE_SENSAY_REPLICA_ID || 'propguard-real-estate-agent',
  baseUrl: 'https://api.sensay.io/v1',
  supabaseFunctionUrl: `${import.meta.env.VITE_SUPABASE_URL || 'https://mpbwpixpuonkczxgkjks.supabase.co'}/functions/v1/sensay-chat`,
};

// Sensay API endpoints based on official documentation
export const sensayEndpoints = {
  // Core chat endpoints
  chat: `${sensayConfig.baseUrl}/chat`,
  conversations: `${sensayConfig.baseUrl}/conversations`,
  
  // Replica management
  replicas: `${sensayConfig.baseUrl}/replicas`,
  replica: (replicaId: string) => `${sensayConfig.baseUrl}/replicas/${replicaId}`,
  
  // User management
  users: `${sensayConfig.baseUrl}/users`,
  user: (userId: string) => `${sensayConfig.baseUrl}/users/${userId}`,
  
  // Knowledge base management
  knowledgeBase: (replicaId: string) => `${sensayConfig.baseUrl}/replicas/${replicaId}/knowledge-base`,
  knowledgeEntry: (replicaId: string, entryId: string) => `${sensayConfig.baseUrl}/replicas/${replicaId}/knowledge-base/${entryId}`,
  
  // Training and content management
  training: (replicaId: string) => `${sensayConfig.baseUrl}/replicas/${replicaId}/training`,
  content: (replicaId: string) => `${sensayConfig.baseUrl}/replicas/${replicaId}/content`,
  
  // Analytics and insights
  analytics: `${sensayConfig.baseUrl}/analytics`,
  insights: (replicaId: string) => `${sensayConfig.baseUrl}/replicas/${replicaId}/insights`,
  
  // Health and status
  health: `${sensayConfig.baseUrl}/health`,
  status: `${sensayConfig.baseUrl}/status`,
};

// Sensay widget theme configuration
export const sensayTheme = {
  primaryColor: '#2563eb',
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, system-ui, sans-serif',
  borderRadius: '12px',
  shadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
};
