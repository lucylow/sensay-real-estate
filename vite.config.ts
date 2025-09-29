import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    viteStaticCopy({
      targets: [
        // Videos will be copied if directory exists
      ]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['video.js'],
    exclude: []
  },
  define: {
    global: 'globalThis',
  },
  assets: {
    include: ['**/*.mp4', '**/*.webm', '**/*.ogg', '**/*.ogv', '**/*.mov', '**/*.avi']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
          'utils-vendor': ['lucide-react', 'clsx', 'tailwind-merge'],
          
          // Feature chunks
          'sensay-features': [
            './src/components/EnhancedSensayAssistant.tsx',
            './src/components/SensayRealEstateChatbot.tsx',
            './src/components/MultilingualChatInterface.tsx'
          ],
          'dashboard-features': [
            './src/components/dashboard/Dashboard.tsx',
            './src/components/propguard/EnhancedDashboard.tsx'
          ],
          'property-features': [
            './src/pages/PropertySearchPage.tsx',
            './src/pages/PropertyDetailPage.tsx',
            './src/components/PropertyShowcase.tsx'
          ],
          'analysis-features': [
            './src/components/EnhancedRiskAnalysis.tsx',
            './src/components/BlockchainDashboard.tsx',
            './src/components/APRAComplianceDashboard.tsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.ogg', '**/*.ogv']
}));
