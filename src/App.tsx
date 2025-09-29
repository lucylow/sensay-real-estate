import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Core Pages - Essential navigation flow
import LandingPageSimple from "@/components/LandingPageSimple";
import IndexSimple from "@/pages/IndexSimple";
import NotFound from "./pages/NotFound";

// Main Application Pages - Core real estate functionality
import { EnhancedDashboard } from "@/components/propguard/EnhancedDashboard";
import { PropertySearchPageSimple } from "@/pages/PropertySearchPageSimple";
import { PropertyDetailPageSimple } from "@/pages/PropertyDetailPageSimple";
import { MarketAnalysisPageSimple } from "@/pages/MarketAnalysisPageSimple";
import { ValuationReportPageSimple } from "@/pages/ValuationReportPageSimple";

// AI & Chatbot - Consolidated Sensay integration
import { SensayIntegrationPage } from "@/pages/SensayIntegrationPage";
import { PropGuardAIChatbot } from "@/pages/PropGuardAIChatbot";

// Essential Features - Most important to users
import { PropertyShowcase } from "@/components/PropertyShowcase";
import { LeadDashboard } from "@/components/LeadDashboard";
import { AppointmentManager } from "@/components/AppointmentManager";

// Shared Navigation Layout
import { NavigationLayout } from "@/components/layout/NavigationLayout";

const queryClient = new QueryClient();

/**
 * Simplified Application with Clear Navigation Flow:
 * 
 * 1. Landing Page (/) - Introduction and marketing
 * 2. App Dashboard (/app) - Main entry point after landing
 * 3. Core Features:
 *    - Dashboard (/dashboard) - Overview and analytics
 *    - Search (/search) - Property search
 *    - Property Details (/property/:id) - Individual property view
 *    - Market Analysis (/market-analysis) - Market insights
 *    - Reports (/report/:reportId) - Valuation reports
 * 4. AI Integration:
 *    - Sensay Integration (/sensay) - Configure Sensay AI
 *    - AI Chatbot (/chat) - Main chatbot interface
 * 5. Essential Features:
 *    - Property Showcase (/showcase) - Property listings
 *    - Leads (/leads) - Lead management
 *    - Appointments (/appointments) - Schedule management
 */
const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page - Marketing and introduction (no shared layout) */}
            <Route path="/" element={<LandingPageSimple />} />

            {/* All application pages use a single shared layout to avoid duplicate headers/footers */}
            <Route element={<NavigationLayout />}> 
              {/* Main App Entry Point - Clear transition from landing */}
              <Route path="/app" element={<IndexSimple />} />
              
              {/* Core Real Estate Functionality */}
              <Route path="/dashboard" element={<EnhancedDashboard />} />
              <Route path="/search" element={<PropertySearchPageSimple />} />
              <Route path="/property/:id" element={<PropertyDetailPageSimple />} />
              <Route path="/market-analysis" element={<MarketAnalysisPageSimple />} />
              <Route path="/report/:reportId" element={<ValuationReportPageSimple />} />
              
              {/* AI Integration - Consolidated Sensay functionality */}
              <Route path="/sensay" element={<SensayIntegrationPage />} />
              <Route path="/chat" element={<PropGuardAIChatbot />} />
              
              {/* Essential Real Estate Features */}
              <Route path="/showcase" element={<PropertyShowcase />} />
              <Route path="/leads" element={<LeadDashboard />} />
              <Route path="/appointments" element={<AppointmentManager />} />

              {/* Catch-all Route within layout */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;