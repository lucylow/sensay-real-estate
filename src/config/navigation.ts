/**
 * Centralized Navigation Configuration
 * 
 * This file contains all the navigation structure for PropGuard AI,
 * making it easier to maintain paths and menu items consistently.
 */

import { 
  BarChart3, 
  Search, 
  Home, 
  TrendingUp, 
  FileText, 
  Bot, 
  Camera, 
  Users, 
  HelpCircle, 
  Play, 
  Wallet, 
  Shield, 
  Layers,
  Settings,
  Command,
  Zap,
  Clock,
  Star,
  Globe,
  Activity,
  PieChart
} from 'lucide-react';

export interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  description: string;
  category: NavigationCategory;
  hotkey?: string;
  featured?: boolean;
  beta?: boolean;
  hidden?: boolean;
  external?: boolean;
}

export type NavigationCategory = 'core' | 'ai' | 'business' | 'advanced' | 'admin' | 'tools';

export interface NavigationCategoryInfo {
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

// Path Constants
export const ROUTES = {
  // Core Pages
  HOME: '/',
  LANDING: '/',
  APP: '/app',
  
  // Core Platform
  DASHBOARD: '/dashboard',
  SEARCH: '/search',
  PROPERTY: '/property',
  PROPERTY_DETAIL: (id: string) => `/property/${id}`,
  MARKET_ANALYSIS: '/market-analysis',
  REPORTS: '/reports',
  REPORT_DETAIL: (id: string) => `/report/${id}`,
  SHOWCASE: '/showcase',
  
  // AI & Sensay Features
  CHAT: '/chat',
  SENSAY_INTEGRATION: '/sensay',
  AI_ASSISTANT: '/ai-assistant',
  KNOWLEDGE_DASHBOARD: '/knowledge-dashboard',
  
  // Business Tools
  LEADS: '/leads',
  APPOINTMENTS: '/appointments',
  VIRTUAL_TOURS: '/virtual-tours',
  SMART_FAQ: '/smart-faque',
  
  // Advanced Features
  BLOCKCHAIN: '/blockchain',
  RISK_ANALYSIS: '/risk-analysis',
  COMPLIANCE: '/compliance',
  
  // Admin & Tools
  PLATFORM_DEMOS: '/platform-demos',
  SETTINGS: '/settings',
  ADMIN: '/admin'
} as const;

// Complete Navigation Structure
export const NAVIGATION_ITEMS: NavigationItem[] = [
  // Core Platform
  {
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: BarChart3,
    description: 'Overview & Analytics',
    category: 'core',
    hotkey: 'd',
    featured: true
  },
  {
    label: 'Property Search',
    href: ROUTES.SEARCH,
    icon: Search,
    description: 'Find & Analyze Properties',
    category: 'core',
    hotkey: 's',
    featured: true
  },
  {
    label: 'Market Analysis',
    href: ROUTES.MARKET_ANALYSIS,
    icon: TrendingUp,
    description: 'Market Insights & Trends',
    category: 'core',
    hotkey: 'm'
  },
  {
    label: 'Property Showcase',
    href: ROUTES.SHOWCASE,
    icon: Home,
    description: 'Browse Listed Properties',
    category: 'core',
    hotkey: 'p'
  },
  
  // AI & Sensay Features
  {
    label: 'AI Assistant',
    href: ROUTES.CHAT,
    icon: Bot,
    description: 'Smart Conversation Assistant',
    category: 'ai',
    hotkey: 'a',
    featured: true
  },
  {
    label: 'Sensay Integration',
    href: ROUTES.SENSAY_INTEGRATION,
    icon: Zap,
    description: 'Configure AI Features',
    category: 'ai',
    hotkey: 'i'
  },
  {
    label: 'Knowledge Dashboard',
    href: ROUTES.KNOWLEDGE_DASHBOARD,
    icon: FileText,
    description: 'Monitor AI Knowledge Base',
    category: 'ai',
    beta: true
  },
  
  // Business Tools
  {
    label: 'Lead Management',
    href: ROUTES.LEADS,
    icon: Users,
    description: 'Track Prospects & Clients',
    category: 'business',
    hotkey: 'l'
  },
  {
    label: 'Appointments',
    href: ROUTES.APPOINTMENTS,
    icon: Clock,
    description: 'Schedule Management',
    category: 'business',
    hotkey: 't'
  },
  {
    label: 'Virtual Tours',
    href: ROUTES.VIRTUAL_TOURS,
    icon: Camera,
    description: 'Property Tours',
    category: 'business',
    hotkey: 'v'
  },
  
  // Advanced Features
  {
    label: 'Blockchain Integration',
    href: ROUTES.BLOCKCHAIN,
    icon: Wallet,
    description: 'NFT Property Certificates',
    category: 'advanced',
    beta: true
  },
  {
    label: 'Risk Analysis',
    href: ROUTES.RISK_ANALYSIS,
    icon: Shield,
    description: 'Property Risk Assessment',
    category: 'advanced'
  },
  
  // Admin & Development
  {
    label: 'Platform Demos',
    href: ROUTES.PLATFORM_DEMOS,
    icon: Play,
    description: 'Feature Demonstrations',
    category: 'admin'
  },
  {
    label: 'Smart FAQ',
    href: ROUTES.SMART_FAQ,
    icon: HelpCircle,
    description: 'AI-powered Support',
    category: 'admin',
    hidden: true // Only show in admin context
  }
];

// Category Information
export const NAVIGATION_CATEGORIES: Record<NavigationCategory, NavigationCategoryInfo> = {
  core: {
    label: '核心平台',
    icon: BarChart3,
    color: 'text-blue-600',
    description: 'Core real estate functionality'
  },
  ai: {
    label: 'AI 和 Sensay',
    icon: Bot,
    color: 'text-purple-600',
    description: 'AI-powered features and Sensay integration'
  },
  business: {
    label: '商业工具',
    icon: Users,
    color: 'text-green-600',
    description: 'Business management tools'
  },
  advanced: {
    label: '高级功能',
    icon: Zap,
    color: 'text-orange-600',
    description: 'Advanced platform features'
  },
  admin: {
    label: '管理面板',
    icon: Settings,
    color: 'text-gray-600',
    description: 'Administration and configuration'
  },
  tools: {
    label: '工具和实用程序',
    icon: Globe,
    color: 'text-cyan-600',
    description: 'Utility tools and integrations'
  }
};

// Quick Access Items (Featured + Frequently Used)
export const QUICK_ACCESS_ITEMS = NAVIGATION_ITEMS.filter(item => 
  item.featured || ['dashboard', 'search', 'chat', 'leads'].includes(item.href.split('/')[1])
);

// Searchable Navigation Items
export const SEARCHABLE_NAVIGATION = NAVIGATION_ITEMS.filter(item => !item.hidden);

// Mobile Navigation Items
export const MOBILE_NAVIGATION_ITEMS = NAVIGATION_ITEMS.filter(item => 
  !item.hidden && !item.beta
);

// Featured Items for Landing
export const FEATURED_LANDING_ITEMS = NAVIGATION_ITEMS.filter(item => 
  item.featured && ['dashboard', 'search', 'chat'].includes(item.href.split('/')[1])
);

// Helper Functions
export const getNavigationItem = (href: string): NavigationItem | undefined => 
  NAVIGATION_ITEMS.find(item => item.href === href);

export const getNavigationItemsByCategory = (category: NavigationCategory): NavigationItem[] =>
  NAVIGATION_ITEMS.filter(item => item.category === category && !item.hidden);

export const searchNavigationItems = (query: string): NavigationItem[] => {
  const lowerQuery = query.toLowerCase();
  return NAVIGATION_ITEMS.filter(item =>
    !item.hidden && (
      item.label.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    )
  );
};

export const generateBreadcrumbs = (pathname: string): Array<{label: string, href?: string}> => {
  const crumbs = [
    { label: 'PropGuard AI', href: '/' }
  ];

  // Find matching navigation item
  const matchedItem = NAVIGATION_ITEMS.find(item => pathname === item.href);
  if (matchedItem) {
    crumbs.push({ label: matchedItem.label });
  } else {
    // Parse path segments for dynamic routes
    const segments = pathname.split('/').filter(Boolean);
    let currentPath = '';
    
    for (const segment of segments) {
      currentPath += `/${segment}`;
      const item = NAVIGATION_ITEMS.find(navItem => 
        navItem.href.startsWith(currentPath) || 
        (navItem.href.includes(':') && pathname.match(navItem.href.replace(/:[^/]+/g, '[^/]+')))
      );
      
      if (item) {
        crumbs.push({ 
          label: item.label, 
          href: item.href.includes(':') ? undefined : item.href 
        });
      }
    }
  }

  return crumbs;
};

// Keyboard Shortcuts Mapping
export const KEYBOARD_SHORTCUTS: Record<string, NavigationItem> = {};
NAVIGATION_ITEMS.forEach(item => {
  if (item.hotkey) {
    KEYBOARD_SHORTCUTS[item.hotkey] = item;
  }
});

export default {
  ROUTES,
  NAVIGATION_ITEMS,
  NAVIGATION_CATEGORIES,
  QUICK_ACCESS_ITEMS,
  getNavigationItem,
  getNavigationItemsByCategory,
  searchNavigationItems,
  generateBreadcrumbs,
  KEYBOARD_SHORTCUTS
};
