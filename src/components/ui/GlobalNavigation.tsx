import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  BarChart3, 
  Search, 
  Bot, 
  Settings, 
  Menu, 
  X, 
  User, 
  Bell, 
  HelpCircle,
  ChevronDown,
  TrendingUp,
  Building,
  MessageCircle,
  Globe,
  Menu as MenuIcon,
  Command,
  Camera,
  Calendar,
  Play,
  FileText,
  Map,
  Users,
  Wallet,
  Zap,
  BookOpen,
  Monitor,
  Video,
  Layers,
  Activity,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Sparkles } from 'lucide-react';

interface GlobalNavigationProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    notifications: number;
  };
  className?: string;
}

export const GlobalNavigation: React.FC<GlobalNavigationProps> = ({ user, className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Comprehensive page structure
  const navigationCategories = [
    {
      title: 'Core Platform',
      items: [
        {
          label: 'Dashboard',
          href: '/dashboard',
          icon: BarChart3,
          description: 'Overview & Analytics',
          featured: true
        },
        {
          label: 'Property Search',
          href: '/search',
          icon: Search,
          description: 'Find Properties',
          featured: true
        },
        {
          label: 'Market Analysis',
          href: '/market-analysis',
          icon: TrendingUp,
          description: 'Market Insights',
          featured: true
        },
        {
          label: 'Valuation Reports',
          href: '/report/demo',
          icon: FileText,
          description: 'Property Reports'
        }
      ]
    },
    {
      title: 'AI & Sensay Features',
      items: [
        {
          label: 'AI Assistant',
          href: '/chat',
          icon: Bot,
          description: 'Chat with PropGuard AI',
          featured: true,
          badge: 'Popular'
        },
        {
          label: 'Lead Generation',
          href: '/leads',
          icon: MessageCircle,
          description: 'Automated lead capture'
        },
        {
          label: 'Analytics',
          href: '/dashboard',
          icon: Activity,
          description: 'Conversation insights'
        },
        {
          label: 'Multi-Channel',
          href: '/sensay',
          icon: Globe,
          description: 'Deploy everywhere',
          featured: true
        },
        {
          label: 'Wisdom Engine',
          href: '/sensay-wisdom',
          icon: BookOpen,
          description: 'Advanced AI capabilities'
        },
        {
          label: 'Showcase',
          href: '/showcase',
          icon: Zap,
          description: 'See Sensay in action'
        }
      ]
      },
    {
      title: 'Property Experiences',
      items: [
        {
          label: 'Virtual Tours',
          href: '/showcase',
          icon: Camera,
          description: 'Interactive property tours',
          featured: true,
          badge: 'New'
        },
        {
          label: 'Property Showcase',
          href: '/showcase',
          icon: Monitor,
          description: 'Present properties beautifully'
        },
        {
          label: 'Appointments',
          href: '/appointments',
          icon: Calendar,
          description: 'Schedule viewings'
        },
        {
          label: 'Property Details',
          href: '/search',
          icon: Building,
          description: 'Detailed property views'
        }
      ]
    },
    {
      title: 'Business Tools',
      items: [
        {
          label: 'Lead Management',
          href: '/leads',
          icon: Users,
          description: 'Track prospects'
        },
        {
          label: 'Smart FAQ',
          href: '/chat',
          icon: HelpCircle,
          description: 'AI-powered support'
        },
        {
          label: 'Platform Demos',
          href: '/app',
          icon: Play,
          description: 'Feature demonstrations'
        },
        {
          label: 'Knowledge Dashboard',
          href: '/dashboard',
          icon: PieChart,
          description: 'Monitor AI knowledge base'
        }
      ]
    },
    {
      title: 'Advanced Features',
      items: [
        {
          label: 'Blockchain Integration',
          href: '/dashboard',
          icon: Wallet,
          description: 'NFT property certificates'
        },
        {
          label: 'Risk Analysis',
          href: '/market-analysis',
          icon: Shield,
          description: 'Property risk assessment'
        },
        {
          label: 'Compliance',
          href: '/dashboard',
          icon: Layers,
          description: 'Regulatory compliance'
        }
      ]
    }
  ];

  // Main navigation items (simplified for desktop)
  const primaryNavItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: BarChart3
    },
    {
      label: 'Search',
      href: '/search',
      icon: Search
    },
    {
      label: 'AI Assistant',
      href: '/chat',
      icon: Bot
    },
    {
      label: 'Virtual Tours',
      href: '/showcase',
       icon: Camera
    }
  ];

  const quickActions = [
    { label: 'New Property Analysis', action: () => navigate('/search') },
    { label: 'Generate Report', action: () => navigate('/report/demo') },
    { label: 'Check Market Trends', action: () => navigate('/market-analysis') },
    { label: 'AI Assistant Help', action: () => navigate('/chat') }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveRoute = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  const getSearchSuggestions = () => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const suggestions = quickActions.filter(action => 
      action.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return suggestions.slice(0, 4);
  };

  const searchSuggestions = getSearchSuggestions();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white/90 backdrop-blur-sm'
    } ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                PropGuard AI
              </span>
              <div className="flex items-center space-x-2 -mt-1">
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
                  Powered by Sensay
                </Badge>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Primary Navigation */}
            {primaryNavItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActiveRoute(item.href)
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}

            {/* All Pages Mega Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                  <MenuIcon className="h-4 w-4" />
                  <span>All Pages</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[800px] p-6" align="start">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore All Features?</h3>
                  <p className="text-sm text-gray-600">Access every page and feature in PropGuard AI</p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-5 gap-6">
                  {navigationCategories.map((category, index) => (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-3"
                    >
                      <h4 className="font-medium text-gray-900 text-sm border-b border-gray-200 pb-1">
                        {category.title}
                      </h4>
                      <div className="space-y-1">
                        {category.items.map((item) => (
                          <DropdownMenuItem key={item.href} asChild className="p-0">
                            <Link 
                              to={item.href} 
                              className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-50 group"
                            >
                              <item.icon className="h-3 w-3 text-gray-500 group-hover:text-blue-500" />
                              <div className="flex-1">
                                <div className="flex items-center space-x-1">
                                  <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <Badge variant="secondary" className="text-xs px-1 py-0">
                                      {item.badge}
                                    </Badge>
                                  )}
                                  {item.featured && (
                                    <span className="text-blue-500 text-xs">★</span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {item.description}
                                </div>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                        <span className="text-xs text-gray-500">
                          {navigationCategories.reduce((acc, cat) => acc + cat.items.length, 0)} pages available
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Use search or �+K for quick access</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/app">
                        <Play className="h-3 w-3 mr-1" />
                        Demo All
                      </Link>
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search properties, reports, or ask AI..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
                    className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300 focus:ring-blue-200"
                  />
                  <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded border">
                    ↵
                  </kbd>
                </div>
              </form>

              {/* Search Suggestions */}
              <AnimatePresence>
                {isSearchFocused && searchSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="py-2">
                      <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quick Actions
                      </div>
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={suggestion.action}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Command className="h-3 w-3 text-gray-400" />
                          <span>{suggestion.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {user?.notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center">
                      {user.notifications}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>

            {/* Help */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/sensay-chatbot">
                    <HelpCircle className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get Help</p>
              </TooltipContent>
            </Tooltip>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden sm:block">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 max-h-[80vh] overflow-y-auto"
            >
              <div className="py-4 space-y-4">
                {/* Quick Access */}
                <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  Quick Access
                </div>
                
                {/* Featured Items */}
                {navigationCategories.flatMap(cat => cat.items.filter(item => item.featured)).slice(0, 6).map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActiveRoute(item.href)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}

                {/* All Categories */}
                {navigationCategories.map((category) => (
                  <div key={category.title} className="space-y-2">
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      {category.title}
                    </div>
                    
                    {category.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-6 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                      >
                        <item.icon className="h-4 w-4 text-gray-400" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                        {item.featured && (
                          <span className="text-blue-500 text-xs ml-auto">★</span>
                        )}
                      </Link>
                    ))}
                  </div>
                ))}

                {/* Footer */}
                <div className="border-t border-gray-200 pt-4 px-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">All pages accessible</p>
                      <p className="text-xs text-gray-400">Use search for quick access</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/platform-demos" onClick={() => setIsMobileMenuOpen(false)}>
                        <Play className="h-3 w-3 mr-1" />
                        Demos
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default GlobalNavigation;
