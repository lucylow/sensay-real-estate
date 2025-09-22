// Environment Configuration
export const ENV = {
  API_BASE_URL: 'https://mpbwpixpuonkczxgkjks.supabase.co/functions/v1',
  APP_NAME: 'PropGuard AI',
  ENABLE_BLOCKCHAIN: true,
  ENABLE_XNODE: true,
  ENVIRONMENT: import.meta.env.MODE || 'development',
  SUPABASE_URL: 'https://mpbwpixpuonkczxgkjks.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYndwaXhwdW9ua2N6eGdramtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NzMzMTUsImV4cCI6MjA3MDI0OTMxNX0.fBht4WXv01R_kWwAao_I9RDuBtDm57Xyb2VBaHVaQOc'
};

export const isProduction = ENV.ENVIRONMENT === 'production';
export const isDevelopment = ENV.ENVIRONMENT === 'development';