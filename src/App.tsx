import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { EnhancedDashboard } from "@/components/propguard/EnhancedDashboard";
import LandingPage from "@/components/LandingPage";
import Index from "@/pages/Index";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { PropertySearchPage } from "@/pages/PropertySearchPage";
import { PropertyDetailPage } from "@/pages/PropertyDetailPage";
import { MarketAnalysisPage } from "@/pages/MarketAnalysisPage";
import { ValuationReportPage } from "@/pages/ValuationReportPage";
  import { SensayIntegrationPage } from "@/pages/SensayIntegrationPage";
  import SensayLeadGenerationPage from "@/pages/SensayLeadGenerationPage";
  import { HeyGenTestPage } from "@/pages/HeyGenTestPage";
  import { MultimodalTestPage } from "@/pages/MultimodalTestPage";
import NotFound from "./pages/NotFound";
import { EnhancedChatWidget } from "@/components/EnhancedChatWidget";
import { PropertyShowcase } from "@/components/PropertyShowcase";
import { SmartFAQ } from "@/components/SmartFAQ";
import { VirtualTourBooking } from "@/components/VirtualTourBooking";
import { LeadDashboard } from "@/components/LeadDashboard";
import { AppointmentManager } from "@/components/AppointmentManager";
import { PropGuardAIChatbot } from "@/pages/PropGuardAIChatbot";
import { SensayHackathonShowcase } from "@/components/SensayHackathonShowcase";
import { KnowledgeMonitoringDashboard } from "@/components/KnowledgeMonitoringDashboard";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<Index />} />
            <Route path="/dashboard" element={<EnhancedDashboard />} />
            <Route path="/search" element={<PropertySearchPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/market-analysis" element={<MarketAnalysisPage />} />
              <Route path="/report/:reportId" element={<ValuationReportPage />} />
              <Route path="/sensay" element={<SensayIntegrationPage />} />
              <Route path="/sensay-leads" element={<SensayLeadGenerationPage />} />
              <Route path="/heygen-test" element={<HeyGenTestPage />} />
              <Route path="/multimodal-test" element={<MultimodalTestPage />} />
            <Route path="/property-showcase" element={<PropertyShowcase />} />
            <Route path="/smart-faq" element={<SmartFAQ />} />
            <Route path="/virtual-tours" element={<VirtualTourBooking />} />
            <Route path="/leads" element={<LeadDashboard />} />
            <Route path="/appointments" element={<AppointmentManager />} />
            <Route path="/propguard-chatbot" element={<PropGuardAIChatbot />} />
            <Route path="/sensay-showcase" element={<SensayHackathonShowcase />} />
            <Route path="/knowledge-dashboard" element={<KnowledgeMonitoringDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
