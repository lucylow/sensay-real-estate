import React, { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { GlobalNavigation } from './GlobalNavigation';
import { Breadcrumb } from './Breadcrumb';
import { QuickActionsSidebar } from './QuickActionsSidebar';
import { OnboardingTour } from './OnboardingTour';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Command, 
  Menu 
} from 'lucide-react';

interface EnhancedPageLayoutProps {
  children: ReactNode;
  className?: string;
  showBreadcrumb?: boolean;
  showQuickActions?: boolean;
  showOnboarding?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    notifications: number;
    subscription?: 'free' | 'pro' | 'enterprise';
  };
  pageTitle?: string;
  pageDescription?: string;
  actions?: ReactNode;
}

export const EnhancedPageLayout: React.FC<EnhancedPageLayoutProps> = ({
  children,
  className = '',
  showBreadcrumb = true,
  showQuickActions = true,
  showOnboarding = true,
  user,
  pageTitle,
  pageDescription,
  actions
}) => {
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const handleKeyboardShortcut = (e: KeyboardEvent) => {
    // Cmd/Ctrl + K for quick actions
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsQuickActionsOpen(true);
    }
  };

  React.useEffect(() => {
    if (showQuickActions) {
      document.addEventListener('keydown', handleKeyboardShortcut);
      return () => document.removeEventListener('keydown', handleKeyboardShortcut);
    }
  }, [showQuickActions]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Navigation */}
      <GlobalNavigation user={user} />

      {/* Main Content Area */}
      <div className="pt-16">
        {/* Page Header */}
        {(pageTitle || pageDescription || actions) && (
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Breadcrumbs */}
                  {showBreadcrumb && (
                    <div className="mb-4">
                      <Breadcrumb />
                    </div>
                  )}

                  {/* Page Title */}
                  {pageTitle && (
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {pageTitle}
                    </h1>
                  )}

                  {/* Page Description */}
                  {pageDescription && (
                    <p className="text-lg text-gray-600 max-w-3xl">
                      {pageDescription}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  {actions}
                  
                  {showQuickActions && (
                    <>
                      <div className="hidden sm:block">
                        <kbd className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded border">
                          ⌘K
                        </kbd>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsQuickActionsOpen(true)}
                        className="ml-2"
                      >
                        <Menu className="h-4 w-4 mr-2" />
                        Quick Actions
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skip page header if no title provided */}
        {!pageTitle && showBreadcrumb && (
          <div className="bg-white border-b border-gray-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Breadcrumb />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className={className}>
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Quick Actions Sidebar */}
      {showQuickActions && (
        <QuickActionsSidebar
          isOpen={isQuickActionsOpen}
          onClose={() => setIsQuickActionsOpen(false)}
          user={user}
        />
      )}

      {/* Onboarding Tour */}
      {showOnboarding && (
        <OnboardingTour
          onComplete={() => console.log('Onboarding completed')}
        />
      )}

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 z-30 sm:hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            onClick={() => setIsQuickActionsOpen(true)}
            className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>

      {/* Feature Announcement Banner */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-auto sm:bottom-6 sm:right-28 z-20 sm:hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div>
                <div className="font-medium">Try our AI Assistant</div>
                <div className="text-sm opacity-90">Get instant property insights</div>
              </div>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-none"
            >
              Try Now
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedPageLayout;
