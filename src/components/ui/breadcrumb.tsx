import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbProps {
  className?: string;
  customItems?: Array<{
    label: string;
    href?: string;
    current?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
}

// Breadcrumb mappings for different routes
const routeBreadcrumbs: Record<string, string> = {
  dashboard: 'Dashboard',
  search: 'Property Search',
  'property': 'Property Details',
  'market-analysis': 'Market Analysis',
  'reports': 'Reports',
  'sensay': 'Sensay Integration',
  'sensay-chatbot': 'AI Assistant',
  'sensay-leads': 'Lead Generation',
  'sensay-analytics': 'Analytics',
  'sensay-showcase': 'Sensay Showcase',
  'sensay-wisdom': 'Wisdom Engine',
  'ai-services': 'AI Services',
  'virtual-tours': 'Virtual Tours',
  'smart-faq': 'FAQ',
  'property-showcase': 'Property Showcase',
  'appointments': 'Appointments',
  'blockchain': 'Blockchain',
  'platform-demos': 'Platform Demos',
  'lead-dashboard': 'Lead Dashboard',
  'knowledge-dashboard': 'Knowledge Dashboard',
  'propguard-chatbot': 'PropGuard Chat',
  'valuation-report': 'Valuation Report',
  'risk-analysis': 'Risk Analysis',
  'compliance': 'Compliance'
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ className, customItems }) => {
  const location = useLocation();
  
  const generateBreadcrumbs = () => {
    if (customItems) return customItems;
    
    const segments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    // Always include Home
    breadcrumbs.push({
      label: 'Home',
      href: '/',
      icon: Home
    });
    
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      breadcrumbs.push({
        label: routeBreadcrumbs[segment] || 
               segment.split('-').map(word => 
                 word.charAt(0).toUpperCase() + word.slice(1)
               ).join(' '),
        href: isLast ? undefined : currentPath,
        current: isLast
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <motion.ol
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-1 text-sm text-gray-500"
      >
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1 || item.current;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-1 ${
                  isLast ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.icon && (
                  <item.icon className="h-4 w-4" />
                )}
                
                {item.href && !isLast ? (
                  <Link to={item.href} className="flex items-center hover:text-blue-600 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="flex items-center">
                    {item.label}
                  </span>
                )}
              </motion.div>
            </li>
          );
        })}
      </motion.ol>
    </nav>
  );
};

export default Breadcrumb;