import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import SensayEnhancedChatWidget from "@/components/SensayEnhancedChatWidget";

// Core Pages
import LandingPage from "@/components/LandingPage";
import Index from "@/pages/Index";
import NotFound from "./pages/NotFound";

// Main Application Pages
import { EnhancedDashboard } from "@/components/propguard/EnhancedDashboard";
import { PropertySearchPage } from "@/pages/PropertySearchPage";
import { PropertyDetailPage } from "@/pages/PropertyDetailPage";
import { MarketAnalysisPage } from "@/pages/MarketAnalysisPage";
import { ValuationReportPage } from "@/pages/ValuationReportPage";

// Sensay Integration Pages
import { SensayIntegrationPage } from "@/pages/SensayIntegrationPage";
import SensayFeaturesPage from "@/pages/SensayFeaturesPage";
import SensayWisdomPage from "@/pages/SensayWisdomPage";
import AIServicesPage from "@/pages/AIServicesPage";
import SensayLeadGenerationPage from "@/pages/SensayLeadGenerationPage";
import SensayChatbotIntegrationPage from "@/pages/SensayChatbotIntegrationPage";
import SensayConversationAnalyticsPage from "@/pages/SensayConversationAnalyticsPage";
import SensayWisdomChatbotPage from "@/pages/SensayWisdomChatbotPage";
import { SensayFeaturesDashboard } from "@/components/sensay/SensayFeaturesDashboard";

// AI & Chatbot Pages
import { PropGuardAIChatbot } from "@/pages/PropGuardAIChatbot";
import { SensayHackathonShowcase } from "@/components/SensayHackathonShowcase";
import { KnowledgeMonitoringDashboard } from "@/components/KnowledgeMonitoringDashboard";

// Feature Pages
import { PropertyShowcase } from "@/components/PropertyShowcase";
import { SmartFAQ } from "@/components/SmartFAQ";
import { VirtualTourBooking } from "@/components/VirtualTourBooking";
import { LeadDashboard } from "@/components/LeadDashboard";
import { AppointmentManager } from "@/components/AppointmentManager";

// Additional Pages
import { BlockchainIntegrationPage } from "@/pages/BlockchainIntegrationPage";
import { PlatformDemosPage } from "@/pages/PlatformDemosPage";
import MenuDirectory from "@/pages/MenuDirectory";
import { HeyGenTestPage } from "@/pages/HeyGenTestPage";
import { MultimodalTestPage } from "@/pages/MultimodalTestPage";
import EnhancedAvatarFeatures from "@/pages/EnhancedAvatarFeatures";
import TestPage from "@/pages/TestPage";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Core Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<Index />} />
            
            {/* Main Application Routes */}
            <Route path="/dashboard" element={<EnhancedDashboard />} />
            <Route path="/search" element={<PropertySearchPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/market-analysis" element={<MarketAnalysisPage />} />
            <Route path="/report/:reportId" element={<ValuationReportPage />} />
            
            {/* Sensay Integration Routes */}
            <Route path="/sensay" element={<SensayIntegrationPage />} />
                   <Route path="/sensay-features" element={<SensayFeaturesPage />} />
                   <Route path="/sensay-wisdom" element={<SensayWisdomPage />} />
                   <Route path="/ai-services" element={<AIServicesPage />} />
            <Route path="/sensay-leads" element={<SensayLeadGenerationPage />} />
            <Route path="/sensay-chatbot" element={<SensayChatbotIntegrationPage />} />
            <Route path="/sensay-wisdom-chatbot" element={<SensayWisdomChatbotPage />} />
            <Route path="/sensay-analytics" element={<SensayConversationAnalyticsPage />} />
            <Route path="/sensay-showcase" element={<SensayHackathonShowcase />} />
            <Route path="/sensay-dashboard" element={<SensayFeaturesDashboard />} />
            
            {/* AI & Chatbot Routes */}
            <Route path="/propguard-chatbot" element={<PropGuardAIChatbot />} />
            <Route path="/knowledge-dashboard" element={<KnowledgeMonitoringDashboard />} />
            
            {/* Feature Routes */}
            <Route path="/page-directory" element={<MenuDirectory />} />
            <Route path="/property-showcase" element={<PropertyShowcase />} />
            <Route path="/smart-faq" element={<SmartFAQ />} />
            <Route path="/virtual-tours" element={<VirtualTourBooking />} />
            <Route path="/leads" element={<LeadDashboard />} />
            <Route path="/appointments" element={<AppointmentManager />} />
            <Route path="/blockchain" element={<BlockchainIntegrationPage />} />
            <Route path="/platform-demos" element={<PlatformDemosPage />} />
            
            {/* Test & Development Routes */}
            <Route path="/heygen-test" element={<HeyGenTestPage />} />
            <Route path="/multimodal-test" element={<MultimodalTestPage />} />
            <Route path="/avatar-features" element={<EnhancedAvatarFeatures />} />
            <Route path="/test" element={<TestPage />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Sensay Enhanced Chat Widget - Available on all pages */}
          <SensayEnhancedChatWidget />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
