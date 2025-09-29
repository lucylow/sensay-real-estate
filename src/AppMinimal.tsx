import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Core Pages
import LandingPage from "@/components/LandingPage";
import IndexMinimal from "@/pages/IndexMinimal";
import NotFound from "./pages/NotFound";
import TestPage from "@/pages/TestPage";

const queryClient = new QueryClient();

const AppMinimal = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Core Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<IndexMinimal />} />
            <Route path="/test" element={<TestPage />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default AppMinimal;
