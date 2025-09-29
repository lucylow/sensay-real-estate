import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundaryEnhanced } from "@/components/ui/ErrorBoundaryEnhanced";
import { EnhancedPageLayout } from "@/components/ui/EnhancedPageLayout";
import { LoadingState } from "@/components/ui/LoadingState";
import { Suspense } from "react";

// Core Pages - Essential navigation flow
import LandingPage from "@/components/LandingPage";
import Index from "@/pages/Index";
import NotFound from "./pages/NotFound";

// Main Application Pages - Core real estate functionality
import { EnhancedDashboard } from "@/components/propguard/EnhancedDashboard";
import PropertySearchPage from "@/pages/PropertySearchPage";
import PropertyDetailPage from "@/pages/PropertyDetailPage";
import { MarketAnalysisPage } from "@/pages/MarketAnalysisPage";
import { ValuationReportPage } from "@/pages/ValuationReportPage";

// AI & Chatbot - Consolidated Sensay integration
import { SensayIntegrationPage } from "@/pages/SensayIntegrationPage";
import { PropGuardAIChatbot } from "@/pages/PropGuardAIChatbot";

// Essential Features - Most important to users
import { PropertyShowcase } from "@/components/PropertyShowcase";
import { LeadDashboard } from "@/components/LeadDashboard";
import { AppointmentManager } from "@/components/AppointmentManager";

// Simplified Chat Widget
import SensayEnhancedChatWidget from "@/components/SensayEnhancedChatWidget";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john@propguard.ai',
  notifications: 3,
  subscription: 'pro' as const
};

// Enhanced wrapper for pages that need the layout
const PageWrapper: React.FC<{
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}> = ({ children, title, description, actions }) => (
  <EnhancedPageLayout
    user={mockUser}
    pageTitle={title}
    pageDescription={description}
    actions={actions}
    className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen"
  >
    <Suspense fallback={<LoadingState type="page" />}>
      {children}
    </Suspense>
  </EnhancedPageLayout>
);

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
const AppSimplified: React.FC = () => (
  <ErrorBoundaryEnhanced>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page - Marketing and introduction */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Main App Entry Point - Clear transition from landing */}
            <Route 
              path="/app" 
              element={
                <PageWrapper 
                  title="PropGuard AI Dashboard"
                  description="Your intelligent real estate command center"
                >
                  <Index />
                </PageWrapper>
              } 
            />
            
            {/* Core Real Estate Functionality */}
            <Route 
              path="/dashboard" 
              element={
                <PageWrapper 
                  title="Dashboard" 
                  description="Overview of your properties and analytics"
                >
                  <EnhancedDashboard />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/search" 
              element={
                <PageWrapper 
                  title="Property Search"
                  description="Find and analyze properties with AI-powered insights"
                >
                  <PropertySearchPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/property/:id" 
              element={
                < PageWrapper 
                  title="Property Details"
                  description="Comprehensive property analysis and valuation"
                >
                  <PropertyDetailPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/market-analysis" 
              element={
                <PageWrapper 
                  title="Market Analysis"
                  description="Real-time market insights and trends"
                >
                  <MarketAnalysisPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/report/:reportId" 
              element={
                <PageWrapper 
                  title="Report"
                  description="Property valuation and analysis report"
                >
                  <ValuationReportPage />
                </PageWrapper>
              } 
            />
            
            {/* AI Integration - Consolidated Sensay functionality */}
            <Route 
              path="/sensay" 
              element={
                <PageWrapper 
                  title="Sensay Integration"
                  description="Deploy AI across multiple channels with Sensay"
                >
                  <SensayIntegrationPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/chat" 
              element={
                <PageWrapper 
                  title="AI Assistant"
                  description="Chat with your PropGuard AI assistant powered by Sensay"
                >
                  <PropGuardAIChatbot />
                </PageWrapper>
              } 
            />
            
            {/* Essential Real Estate Features */}
            <Route 
              path="/showcase" 
              element={
                <PageWrapper 
                  title="Property Showcase"
                  description="Showcase your properties with interactive tours"
                >
                  <PropertyShowcase />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/leads" 
              element={
                <PageWrapper 
                  title="Lead Management"
                  description="Track and manage real estate leads"
                >
                  <LeadDashboard />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/appointments" 
              element={
                <PageWrapper 
                  title="Appointments"
                  description="Manage property viewing appointments"
                >
                  <AppointmentManager />
                </PageWrapper>
              } 
            />
            
            {/* Catch-all Route */}
            <Route 
              path="*" 
              element={
                <PageWrapper 
                  title="Page Not Found"
                  description="Sorry, the page you're looking for doesn't exist"
                >
                  <NotFound />
                </PageWrapper>
              } 
            />
          </Routes>
          
          {/* Sensay Enhanced Chat Widget - Available on all pages */}
          <SensayEnhancedChatWidget />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundaryEnhanced>
);

export default AppSimplified;
