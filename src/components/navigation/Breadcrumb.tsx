import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  '/': [],
  '/dashboard': [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
  ],
  '/search': [
    { label: 'Property Tools', href: '/search' },
    { label: 'Property Search', href: '/search' },
  ],
  '/property-detail': [
    { label: 'Property Tools', href: '/search' },
    { label: 'Property Details', href: '/property-detail' },
  ],
  '/market-analysis': [
    { label: 'Property Tools', href: '/search' },
    { label: 'Market Analysis', href: '/market-analysis' },
  ],
  '/valuation-report': [
    { label: 'Property Tools', href: '/search' },
    { label: 'Valuation Reports', href: '/valuation-report' },
  ],
  '/sensay-chatbot': [
    { label: 'Sensay Features', href: '/sensay-features' },
    { label: 'Chatbot Integration', href: '/sensay-chatbot' },
  ],
  '/sensay-leads': [
    { label: 'Sensay Features', href: '/sensay-features' },
    { label: 'Lead Generation', href: '/sensay-leads' },
  ],
  '/sensay-analytics': [
    { label: 'Sensay Features', href: '/sensay-features' },
    { label: 'Conversation Analytics', href: '/sensay-analytics' },
  ],
  '/sensay-features': [
    { label: 'Sensay Features', href: '/sensay-features' },
  ],
  '/sensay-wisdom': [
    { label: 'Sensay Features', href: '/sensay-features' },
    { label: 'Wisdom Chatbot', href: '/sensay-wisdom' },
  ],
  '/ai-services': [
    { label: 'AI Services', href: '/ai-services' },
  ],
  '/propguard-chatbot': [
    { label: 'AI Services', href: '/ai-services' },
    { label: 'PropGuard Chatbot', href: '/propguard-chatbot' },
  ],
  '/avatar-features': [
    { label: 'AI Services', href: '/ai-services' },
    { label: 'Avatar Features', href: '/avatar-features' },
  ],
  '/blockchain': [
    { label: 'Platform', href: '/platform-demos' },
    { label: 'Blockchain Integration', href: '/blockchain' },
  ],
  '/platform-demos': [
    { label: 'Platform', href: '/platform-demos' },
  ],
  '/demo': [
    { label: 'Platform', href: '/platform-demos' },
    { label: 'Demo Page', href: '/demo' },
  ],
  '/setup': [
    { label: 'Testing & Setup', href: '/setup' },
  ],
  '/chat-quality': [
    { label: 'Testing & Setup', href: '/setup' },
    { label: 'Chat Flow Quality', href: '/chat-quality' },
  ],
  '/multimodal-test': [
    { label: 'Testing & Setup', href: '/setup' },
    { label: 'Multimodal Test', href: '/multimodal-test' },
  ],
  '/heygen-test': [
    { label: 'Testing & Setup', href: '/setup' },
    { label: 'HeyGen Test', href: '/heygen-test' },
  ],
  '/navigation': [
    { label: 'Navigation', href: '/navigation' },
  ],
  '/test': [
    { label: 'Test', href: '/test' },
  ],
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const breadcrumbs = breadcrumbMap[location.pathname] || [];

  // Don't show breadcrumbs on the home page
  if (location.pathname === '/' || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 py-3 text-sm">
          {/* Home Link */}
          <li>
            <Link
              to="/"
              className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
          </li>

          {/* Breadcrumb Items */}
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const Icon = item.icon;

            return (
              <li key={item.href} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                {isLast ? (
                  <span className="flex items-center text-gray-900 font-medium">
                    {Icon && <Icon className="h-4 w-4 mr-1" />}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {Icon && <Icon className="h-4 w-4 mr-1" />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
