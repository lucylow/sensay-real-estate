import React from 'react';
import { Outlet } from 'react-router-dom';
import { EnhancedNavigation } from '@/components/navigation/EnhancedNavigation';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { BreadcrumbNavigation } from '@/components/navigation/BreadcrumbNavigation';

interface NavigationLayoutProps {
  children?: React.ReactNode;
  showBreadcrumbs?: boolean;
  showQuickStats?: boolean;
}

/**
 * Universal Navigation Layout Component
 * 
 * Provides consistent navigation structure across all pages
 * with responsive design and intelligent breadcrumb navigation.
 */
export const NavigationLayout: React.FC<NavigationLayoutProps> = ({
  children,
  showBreadcrumbs = true,
  showQuickStats = false
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation - Desktop Only */}
      <div className="hidden md:block">
        <EnhancedNavigation />
      </div>
      
      {/* Mobile Navigation - Mobile Only */}
      <MobileNavigation />

      {/* Breadcrumb Navigation with Context */}
      {showBreadcrumbs && (
        <BreadcrumbNavigation showNavigationAction={true} />
      )}

      {/* Main Content Area */}
      <main className="min-h-[calc(100vh-200px)] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default NavigationLayout;
