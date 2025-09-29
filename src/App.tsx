import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { EnhancedChatWidget } from "@/components/EnhancedChatWidget";

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
import SensayLeadGenerationPage from "@/pages/SensayLeadGenerationPage";
import SensayChatbotIntegrationPage from "@/pages/SensayChatbotIntegrationPage";

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

// Test & Development Pages
import { HeyGenTestPage } from "@/pages/HeyGenTestPage";
import { MultimodalTestPage } from "@/pages/MultimodalTestPage";

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
            <Route path="/sensay-leads" element={<SensayLeadGenerationPage />} />
            <Route path="/sensay-chatbot" element={<SensayChatbotIntegrationPage />} />
            <Route path="/sensay-showcase" element={<SensayHackathonShowcase />} />
            
            {/* AI & Chatbot Routes */}
            <Route path="/propguard-chatbot" element={<PropGuardAIChatbot />} />
            <Route path="/knowledge-dashboard" element={<KnowledgeMonitoringDashboard />} />
            
            {/* Feature Routes */}
            <Route path="/property-showcase" element={<PropertyShowcase />} />
            <Route path="/smart-faq" element={<SmartFAQ />} />
            <Route path="/virtual-tours" element={<VirtualTourBooking />} />
            <Route path="/leads" element={<LeadDashboard />} />
            <Route path="/appointments" element={<AppointmentManager />} />
            
            {/* Test & Development Routes */}
            <Route path="/heygen-test" element={<HeyGenTestPage />} />
            <Route path="/multimodal-test" element={<MultimodalTestPage />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Enhanced Chat Widget - Available on all pages */}
          <EnhancedChatWidget />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
