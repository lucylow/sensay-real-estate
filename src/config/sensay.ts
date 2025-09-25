// Sensay API Configuration
export const sensayConfig = {
  apiKey: import.meta.env.VITE_SENSAY_API_KEY || 'your_sensay_api_key_here',
  orgSecret: import.meta.env.VITE_SENSAY_ORG_SECRET || 'your_sensay_org_secret_here',
  replicaId: import.meta.env.VITE_SENSAY_REPLICA_ID || 'propguard-real-estate-agent',
  baseUrl: 'https://api.sensay.com/v1',
};

// Sensay API endpoints
export const sensayEndpoints = {
  chat: `${sensayConfig.baseUrl}/chat`,
  replicas: `${sensayConfig.baseUrl}/replicas`,
  conversations: `${sensayConfig.baseUrl}/conversations`,
};

// Sensay widget theme configuration
export const sensayTheme = {
  primaryColor: '#2563eb',
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, system-ui, sans-serif',
  borderRadius: '12px',
  shadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
};
