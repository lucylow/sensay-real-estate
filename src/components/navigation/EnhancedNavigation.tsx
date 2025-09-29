import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Command,
  ArrowUpRight,
  Star,
  Clock,
  Globe,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
// import { CommandMenu } from '@/components/ui/command';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  description: string;
  category: 'core' | 'ai' | 'business' | 'advanced' | 'admin';
  hotkey?: string;
  featured?: boolean;
  beta?: boolean;
}

const navigationStructure: NavigationItem[] = [
  // Core Platform
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
    description: 'Overview & Analytics',
    category: 'core',
    hotkey: 'd',
    featured: true
  },
  {
    label: 'Property Search',
    href: '/search',
    icon: Search,
    description: 'Find & Analyze Properties',
    category: 'core',
    hotkey: 's',
    featured: true
  },
  {
    label: 'Market Analysis',
    href: '/market-analysis',
    icon: TrendingUp,
    description: 'Market Insights & Trends',
    category: 'core',
    hotkey: 'm'
  },
  {
    label: 'Property Showcase',
    href: '/showcase',
    icon: Home,
    description: 'Browse Listed Properties',
    category: 'core',
    hotkey: 'p'
  },
  
  // AI & Sensay Features
  {
    label: 'AI Assistant',
    href: '/chat',
    icon: Bot,
    description: 'Smart Conversation Assistant',
    category: 'ai',
    hotkey: 'a',
    featured: true
  },
  {
    label: 'Sensay Integration',
      href: '/sensay',
      icon: Zap,
      description: 'Configure AI Features',
      category: 'ai',
      hotkey: 'i'
    },
    {
      label: 'Knowledge Dashboard',
      href: '/knowledge-dashboard',
      icon: FileText,
      description: 'Monitor AI Knowledge Base',
      category: 'ai',
      beta: true
    },
    
    // Business Tools
    {
      label: 'Lead Management',
      href: '/leads',
      icon: Users,
      description: 'Track Prospects & Clients',
      category: 'business',
      hotkey: 'l'
    },
    {
      label: 'Appointments',
      href: '/appointments',
      icon: Clock,
      description: 'Schedule Management',
      category: 'business',
      hotkey: 't'
    },
    {
      label: 'Virtual Tours',
      href: '/virtual-tours',
      icon: Camera,
      description: 'Property Tours',
      category: 'business',
      hotkey: 'v'
    },
    
    // Advanced Features
    {
      label: 'Blockchain Integration',
      href: '/blockchain',
      icon: Wallet,
      description: 'NFT Property Certificates',
      category: 'advanced',
      beta: true
    },
    {
      label: 'Risk Analysis',
      href: '/risk-analysis',
      icon: Shield,
      description: 'Property Risk Assessment',
      category: 'advanced'
    },
    
    // Admin
    {
      label: 'Platform Demos',
      href: '/platform-demos',
      icon: Play,
      description: 'Feature Demonstrations',
      category: 'admin'
    },
    {
      label: 'Smart FAQ',
      href: '/smart-faq',
      icon: HelpCircle,
      description: 'AI-powered Support',
      category: 'admin'
    }
  ];

  const categories = {
    core: { label: 'Core Platform', icon: BarChart3, color: 'text-blue-600' },
    ai: { label: 'AI & Sensay', icon: Bot, color: 'text-purple-600' },
    business: { label: 'Business Tools', icon: Users, color: 'text-green-600' },
    advanced: { label: 'Advanced', icon: Zap, color: 'text-orange-600' },
    admin: { label: 'Admin', icon: Settings, color: 'text-gray-600' }
  };

  interface EnhancedNavigationProps {
    className?: string;
  }

  export const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({ className = '' }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCommandOpen, setIsCommandOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>('core');
    const [searchQuery, setSearchQuery] = useState('');

    // Handle keyboard shortcuts
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey || event.metaKey) {
          switch (event.key.toLowerCase()) {
            case 'k':
              event.preventDefault();
              setIsCommandOpen(true);
              break;
            case 'd':
              navigate('/dashboard');
              break;
            case 's':
              navigate('/search');
              break;
            case 'a':
              navigate('/chat');
              break;
            case 'l':
              navigate('/leads');
              break;
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    const filteredNavigation = navigationStructure.filter(item =>
      searchQuery === '' || 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupedNavigation = filteredNavigation.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, NavigationItem[]>);

    const featuredItems = navigationStructure.filter(item => item.featured);

    const CommandMenuTrigger = () => (
      <Button
        variant="outline"
        className="relative h-8 w-full justify-start rounded-lg bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-64"
        onClick={() => setIsCommandOpen(true)}
      >
        <Command className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search commands...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    );

    return (
      <div className={`enhanced-navigation ${className}`}>
        {/* Quick Access Bar */}
        <div className="glass-card border-0 border-b border-border/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              {/* Brand */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-propguard-blue to-propguard-orange bg-clip-text text-transparent">
                    PropGuard AI
                  </span>
                  <div className="text-xs text-muted-foreground">Property Intelligence Platform</div>
                </div>
              </Link>

              {/* Search Command Menu */}
              <div className="hidden md:block">
                <CommandMenuTrigger />
              </div>

              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-4">
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  Active Session
                </Badge>
                <Badge variant="secondary" className="gradient-brand text-white border-0">
                  🤖 Sensay Powered
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="glass-card border-0 border-b border-border/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Featured Quick Access */}
            <div className="py-6 border-b border-border/30">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-yellow-500" />
                <h3 className="text-sm font-medium text-muted-foreground">Quick Access</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {featuredItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <motion.div
                      key={item.href}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.href}
                        className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all text-center ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-background hover:bg-muted hover:shadow-sm border border-border/50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs font-medium">{item.label}</span>
                        {item.hotkey && (
                          <kbd className="text-xs opacity-60">⌘{item.hotkey.toUpperCase()}</kbd>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Category Navigation */}
            <div className="py-4">
              <div className="flex flex-wrap gap-3">
                {Object.entries(categories).map(([categoryKey, categoryInfo]) => {
                  const items = groupedNavigation[categoryKey] || [];
                  const Icon = categoryInfo.icon;
                  const isExpanded = expandedCategory === categoryKey;
                  
                  return (
                    <motion.div
                      key={categoryKey}
                      className="relative"
                      initial={false}
                      animate={{ 
                        width: isExpanded ? 'auto' : 'auto',
                        height: 'auto'
                      }}
                    >
                      <Button
                        variant={isExpanded ? "default" : "ghost"}
                        className="flex items-center gap-2 h-9"
                        onClick={() => setExpandedCategory(isExpanded ? null : categoryKey)}
                      >
                        <Icon className={`h-4 w-4 ${categoryInfo.color}`} />
                        <span>{categoryInfo.label}</span>
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`} 
                        />
                        <Badge variant="secondary" className="ml-1 text-xs">
                          {items.length}
                        </Badge>
                      </Button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute top-full left-0 mt-2 w-80 z-50"
                          >
                            <Card className="shadow-lg border">
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Icon className={`h-4 w-4 ${categoryInfo.color}`} />
                                    <h4 className="font-medium">{categoryInfo.label}</h4>
                                  </div>
                                  <Separator />
                                  <div className="grid gap-2">
                                    {items.map((item) => {
                                      const ItemIcon = item.icon;
                                      const isActive = location.pathname === item.href;
                                      
                                      return (
                                        <Link
                                          key={item.href}
                                          to={item.href}
                                          className={`flex items-center gap-3 p-2 rounded-md transition-all ${
                                            isActive
                                              ? 'bg-primary text-primary-foreground'
                                              : 'hover:bg-muted'
                                          }`}
                                        >
                                          <ItemIcon className="h-4 w-4" />
                                          <div className="flex-1 min-w-0">
                                            <div className="font-medium">{item.label}</div>
                                            <div className="text-xs text-muted-foreground truncate">
                                              {item.description}
                                            </div>
                                          </div>
                                          <div className="flex gap-1">
                                            {item.beta && (
                                              <Badge variant="secondary" className="text-xs px-1">
                                                Beta
                                              </Badge>
                                            )}
                                            {item.hotkey && (
                                              <kbd className="text-xs opacity-60">
                                                ⌘{item.hotkey.toUpperCase()}
                                              </kbd>
                                            )}
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* Command Menu */}
        {/*<CommandMenu
          open={isCommandOpen}
          onOpenChange={setIsCommandOpen}
          navigationItems={navigationStructure}
        />*/}
      </div>
    );
  };

  export default EnhancedNavigation;
