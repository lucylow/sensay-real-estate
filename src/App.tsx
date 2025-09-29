import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import SensayEnhancedChatWidget from "@/components/SensayEnhancedChatWidget";

// Core Pages - Essential navigation flow
import LandingPage from "@/components/LandingPage";
import Index from "@/pages/Index";
import NotFound from "./pages/NotFound";

// Main Application Pages - Core real estate functionality
import { EnhancedDashboard } from "@/components/propguard/EnhancedDashboard";
import { PropertySearchPage } from "@/pages/PropertySearchPage";
import { PropertyDetailPage } from "@/pages/PropertyDetailPage";
import { MarketAnalysisPage } from "@/pages/MarketAnalysisPage";
import { ValuationReportPage } from "@/pages/ValuationReportPage";

// AI & Chatbot - Consolidated Sensay integration
import { SensayIntegrationPage } from "@/pages/SensayIntegrationPage";
import { PropGuardAIChatbot } from "@/pages/PropGuardAIChatbot";

// Essential Features - Most important to users
import { PropertyShowcase } from "@/components/PropertyShowcase";
import { LeadDashboard } from "@/components/LeadDashboard";
import { AppointmentManager } from "@/components/AppointmentManager";

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
            {/* Landing Page - Marketing and introduction */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Main App Entry Point - Clear transition from landing */}
            <Route path="/app" element={<Index />} />
            
            {/* Core Real Estate Functionality */}
            <Route path="/dashboard" element={<EnhancedDashboard />} />
            <Route path="/search" element={<PropertySearchPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/market-analysis" element={<MarketAnalysisPage />} />
            <Route path="/report/:reportId" element={<ValuationReportPage />} />
            
            {/* AI Integration - Consolidated Sensay functionality */}
            <Route path="/sensay" element={<SensayIntegrationPage />} />
            <Route path="/chat" element={<PropGuardAIChatbot />} />
            
            {/* Essential Real Estate Features */}
            <Route path="/showcase" element={<PropertyShowcase />} />
            <Route path="/leads" element={<LeadDashboard />} />
            <Route path="/appointments" element={<AppointmentManager />} />
            
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