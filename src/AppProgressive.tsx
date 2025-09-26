import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/components/LandingPage";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import NotFound from "./pages/NotFound";
import Index from "@/pages/Index";
import { EnhancedDashboard } from "@/components/propguard/EnhancedDashboard";
import { PropertySearchPage } from "@/pages/PropertySearchPage";
import { PropertyDetailPage } from "@/pages/PropertyDetailPage";
import { MarketAnalysisPage } from "@/pages/MarketAnalysisPage";
import { ValuationReportPage } from "@/pages/ValuationReportPage";
import { SensayIntegrationPage } from "@/pages/SensayIntegrationPage";
import SensayLeadGenerationPage from "@/pages/SensayLeadGenerationPage";

const queryClient = new QueryClient();

const AppProgressive = () => (
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default AppProgressive;
