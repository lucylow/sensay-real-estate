import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Navigation Components
import MainNavigation from './components/navigation/MainNavigation';
import Breadcrumb from './components/navigation/Breadcrumb';
import Footer from './components/navigation/Footer';

// Core Pages
import LandingPage from '@/components/LandingPage';
import IndexMinimal from '@/pages/IndexMinimal';
import NotFound from './pages/NotFound';
import TestPage from '@/pages/TestPage';
import PageNavigation from '@/components/PageNavigation';

// Main Application Pages - Lazy loaded
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage').catch(() => ({ default: () => <div>Dashboard loading...</div> })));
const PropertySearchPage = React.lazy(() => import('@/pages/PropertySearchPage').catch(() => ({ default: () => <div>Property Search loading...</div> })));
const PropertyDetailPage = React.lazy(() => import('@/pages/PropertyDetailPage').catch(() => ({ default: () => <div>Property Detail loading...</div> })));
const MarketAnalysisPage = React.lazy(() => import('@/pages/MarketAnalysisPage').catch(() => ({ default: () => <div>Market Analysis loading...</div> })));
const ValuationReportPage = React.lazy(() => import('@/pages/ValuationReportPage').catch(() => ({ default: () => <div>Valuation Report loading...</div> })));

// Sensay Integration Pages
const SensayIntegrationPage = React.lazy(() => import('@/pages/SensayIntegrationPage').catch(() => ({ default: () => <div>Sensay Integration loading...</div> })));
const SensayFeaturesPage = React.lazy(() => import('@/pages/SensayFeaturesPage').catch(() => ({ default: () => <div>Sensay Features loading...</div> })));
const SensayWisdomPage = React.lazy(() => import('@/pages/SensayWisdomPage').catch(() => ({ default: () => <div>Sensay Wisdom loading...</div> })));
const AIServicesPage = React.lazy(() => import('@/pages/AIServicesPage').catch(() => ({ default: () => <div>AI Services loading...</div> })));
const SensayLeadGenerationPage = React.lazy(() => import('@/pages/SensayLeadGenerationPage').catch(() => ({ default: () => <div>Sensay Leads loading...</div> })));
const SensayChatbotIntegrationPage = React.lazy(() => import('@/pages/SensayChatbotIntegrationPage').catch(() => ({ default: () => <div>Sensay Chatbot loading...</div> })));
const SensayConversationAnalyticsPage = React.lazy(() => import('@/pages/SensayConversationAnalyticsPage').catch(() => ({ default: () => <div>Sensay Analytics loading...</div> })));
const SensayWisdomChatbotPage = React.lazy(() => import('@/pages/SensayWisdomChatbotPage').catch(() => ({ default: () => <div>Sensay Wisdom Chatbot loading...</div> })));

// AI & Chatbot Pages
const PropGuardAIChatbot = React.lazy(() => import('@/pages/PropGuardAIChatbot').catch(() => ({ default: () => <div>PropGuard AI loading...</div> })));
const KnowledgeMonitoringDashboard = React.lazy(() => import('@/components/KnowledgeMonitoringDashboard').catch(() => ({ default: () => <div>Knowledge Dashboard loading...</div> })));

// Feature Pages
const PropertyShowcase = React.lazy(() => import('@/components/PropertyShowcase').catch(() => ({ default: () => <div>Property Showcase loading...</div> })));
const SmartFAQ = React.lazy(() => import('@/components/SmartFAQ').catch(() => ({ default: () => <div>Smart FAQ loading...</div> })));
const VirtualTourBooking = React.lazy(() => import('@/components/VirtualTourBooking').catch(() => ({ default: () => <div>Virtual Tours loading...</div> })));
const LeadDashboard = React.lazy(() => import('@/components/LeadDashboard').catch(() => ({ default: () => <div>Lead Dashboard loading...</div> })));
const AppointmentManager = React.lazy(() => import('@/components/AppointmentManager').catch(() => ({ default: () => <div>Appointment Manager loading...</div> })));

// Additional Pages
const BlockchainIntegrationPage = React.lazy(() => import('@/pages/BlockchainIntegrationPage').catch(() => ({ default: () => <div>Blockchain loading...</div> })));
const PlatformDemosPage = React.lazy(() => import('@/pages/PlatformDemosPage').catch(() => ({ default: () => <div>Platform Demos loading...</div> })));
const DemoPage = React.lazy(() => import('@/pages/DemoPage').catch(() => ({ default: () => <div>Demo loading...</div> })));
const ComprehensiveSetupPage = React.lazy(() => import('@/pages/ComprehensiveSetupPage').catch(() => ({ default: () => <div>Setup loading...</div> })));
const ChatflowQualityPage = React.lazy(() => import('@/pages/ChatflowQualityPage').catch(() => ({ default: () => <div>Chat Quality loading...</div> })));
const HeyGenTestPage = React.lazy(() => import('@/pages/HeyGenTestPage').catch(() => ({ default: () => <div>HeyGen Test loading...</div> })));
const MultimodalTestPage = React.lazy(() => import('@/pages/MultimodalTestPage').catch(() => ({ default: () => <div>Multimodal Test loading...</div> })));
const EnhancedAvatarFeatures = React.lazy(() => import('@/pages/EnhancedAvatarFeatures').catch(() => ({ default: () => <div>Avatar Features loading...</div> })));

// Components
const SensayFeaturesDashboard = React.lazy(() => import('@/components/sensay/SensayFeaturesDashboard').catch(() => ({ default: () => <div>Sensay Dashboard loading...</div> })));
const SensayHackathonShowcase = React.lazy(() => import('@/components/SensayHackathonShowcase').catch(() => ({ default: () => <div>Sensay Showcase loading...</div> })));

// Chat Widget
const SensayEnhancedChatWidget = React.lazy(() => import('@/components/SensayEnhancedChatWidget').catch(() => ({ default: () => null })));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

const AppWithNavigation = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <MainNavigation />
            <Breadcrumb />
            
            <main className="flex-1">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Core Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/app" element={<IndexMinimal />} />
                  <Route path="/navigation" element={<PageNavigation />} />
                  
                  {/* Main Application Routes */}
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/search" element={<PropertySearchPage />} />
                  <Route path="/property-detail" element={<PropertyDetailPage />} />
                  <Route path="/market-analysis" element={<MarketAnalysisPage />} />
                  <Route path="/valuation-report" element={<ValuationReportPage />} />
                  
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
                  <Route path="/property-showcase" element={<PropertyShowcase />} />
                  <Route path="/smart-faq" element={<SmartFAQ />} />
                  <Route path="/virtual-tours" element={<VirtualTourBooking />} />
                  <Route path="/leads" element={<LeadDashboard />} />
                  <Route path="/appointments" element={<AppointmentManager />} />
                  <Route path="/blockchain" element={<BlockchainIntegrationPage />} />
                  <Route path="/platform-demos" element={<PlatformDemosPage />} />
                  <Route path="/demo" element={<DemoPage />} />
                  
                  {/* Testing & Development Routes */}
                  <Route path="/setup" element={<ComprehensiveSetupPage />} />
                  <Route path="/chat-quality" element={<ChatflowQualityPage />} />
                  <Route path="/heygen-test" element={<HeyGenTestPage />} />
                  <Route path="/multimodal-test" element={<MultimodalTestPage />} />
                  <Route path="/avatar-features" element={<EnhancedAvatarFeatures />} />
                  <Route path="/test" element={<TestPage />} />
                  
                  {/* Catch-all Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            
            <Footer />
            
            {/* Sensay Enhanced Chat Widget - Available on all pages */}
            <Suspense fallback={null}>
              <SensayEnhancedChatWidget />
            </Suspense>
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default AppWithNavigation;


