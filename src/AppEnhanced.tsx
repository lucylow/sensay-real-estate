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

// Core Pages
import LandingPage from "@/components/LandingPage";
import Index from "@/pages/Index";
import NotFound from "./pages/NotFound";

// Main Application Pages
import { EnhancedDashboard } from "@/components/propguard/EnhancedDashboard";
import PropertySearchPage from "@/pages/PropertySearchPage";
import PropertyDetailPage from "@/pages/PropertyDetailPage";
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
import { AppointmentManager } from "@/components/AppointmentManager";
import { LeadDashboard } from "@/components/LeadDashboard";
import { BlockchainIntegrationPage } from "@/pages/BlockchainIntegrationPage";
import { PlatformDemosPage } from "@/pages/PlatformDemosPage";

// Test & Development Routes
import HeyGenTestPage from "@/pages/HeyGenTestPage";
import MultimodalTestPage from "@/pages/MultimodalTestPage";
import EnhancedAvatarFeatures from "@/pages/EnhancedAvatarFeatures";

// Chat Widget
import SensayEnhancedChatWidget from "@/components/SensayEnhancedChatWidget";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Mock user data - replace with actual auth system
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

const AppEnhanced: React.FC = () => (
  <ErrorBoundaryEnhanced>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page - No Layout */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Main Application with Layout */}
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
                <PageWrapper 
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
            
            {/* Sensay Integration Routes */}
            <Route 
              path="/sensay" 
              element={
                <PageWrapper 
                  title="Sensay Integration"
                  description="Deploy AI across multiple channels"
                >
                  <SensayIntegrationPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/sensay-features" 
              element={
                <PageWrapper 
                  title="Sensay Features"
                  description="Discover the power of Sensay AI"
                >
                  <SensayFeaturesPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/sensay-wisdom" 
              element={
                <PageWrapper 
                  title="Sensay Wisdom"
                  description="Advanced AI capabilities and insights"
                >
                  <SensayWisdomPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/ai-services" 
              element={
                <PageWrapper 
                  title="AI Services"
                  description="Comprehensive AI services for real estate"
                >
                  <AIServicesPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/sensay-leads" 
              element={
                <PageWrapper 
                  title="Lead Generation"
                  description="Automate lead capture and nurturing"
                >
                  <SensayLeadGenerationPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/sensay-chatbot" 
              element={
                <PageWrapper 
                  title="AI Assistant"
                  description="Chat with your Sensay-powered assistant"
                >
                  <SensayChatbotIntegrationPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/sensay-wisdom-chatbot" 
              element={
                <PageWrapper 
                  title="Wisdom Chatbot"
                  description="Advanced conversational AI experience"
                >
                  <SensayWisdomChatbotPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/sensay-analytics" 
              element={
                <PageWrapper 
                  title="Analytics"
                  description="Track conversation performance and insights"
                >
                  <SensayConversationAnalyticsPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/sensay-showcase" 
              element={
                <PageWrapper 
                  title="Sensay Showcase"
                  description="See Sensay features in action"
                >
                  <SensayHackathonShowcase />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/sensay-dashboard" 
              element={
                <PageWrapper 
                  title="Sensay Dashboard"
                  description="Manage your Sensay integrations"
                >
                  <SensayFeaturesDashboard />
                </PageWrapper>
              } 
            />
            
            {/* AI & Chatbot Routes */}
            <Route 
              path="/propguard-chatbot" 
              element={
                <PageWrapper 
                  title="PropGuard Chatbot"
                  description="Interactive AI assistant for property insights"
                >
                  <PropGuardAIChatbot />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/knowledge-dashboard" 
              element={
                <PageWrapper 
                  title="Knowledge Dashboard"
                  description="Monitor and manage knowledge base"
                >
                  <KnowledgeMonitoringDashboard />
                </PageWrapper>
              } 
            />
            
            {/* Feature Routes */}
            <Route 
              path="/property-showcase" 
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
              path="/smart-faq" 
              element={
                <PageWrapper 
                  title="Smart FAQ"
                  description="AI-powered frequently asked questions"
                >
                  <SmartFAQ />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/virtual-tours" 
              element={
                <PageWrapper 
                  title="Virtual Tours"
                  description="Schedule and manage virtual property tours"
                >
                  <VirtualTourBooking />
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
            
            <Route path="/blockchain" 
              element={
                <PageWrapper 
                  title="Blockchain Integration"
                  description="NFT property certificates and Web3 features"
                >
                  <BlockchainIntegrationPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/platform-demos" 
              element={
                <PageWrapper 
                  title="Platform Demos"
                  description="Interactive demonstrations of PropGuard features"
                >
                  <PlatformDemosPage />
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
            
            {/* Test & Development Routes */}
            <Route 
              path="/heygen-test" 
              element={
                <PageWrapper 
                  title="HeyGen Test"
                  description="Testing HeyGen video avatar integration"
                >
                  <HeyGenTestPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/multimodal-test" 
              element={
                <PageWrapper 
                  title="Multimodal Test"
                  description="Testing multimodal AI capabilities"
                >
                  <MultimodalTestPage />
                </PageWrapper>
              } 
            />
            
            <Route 
              path="/avatar-features" 
              element={
                <PageWrapper 
                  title="Avatar Features"
                  description="Enhanced avatar and voice features"
                >
                  <EnhancedAvatarFeatures />
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

export default AppEnhanced;
