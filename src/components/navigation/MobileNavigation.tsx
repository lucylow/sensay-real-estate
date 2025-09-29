import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Menu,
  X,
  ChevronRight,
  Star,
  Zap,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface MobileNavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  description: string;
  featured?: boolean;
  hotkey?: string;
}

const mobileNavItems: MobileNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
    description: 'Overview & Analytics',
    featured: true,
    hotkey: 'D'
  },
  {
    label: 'Search',
    href: '/search',
    icon: Search,
    description: 'Find Properties',
    featured: true,
    hotkey: 'S'
  },
  {
    label: 'AI Assistant',
    href: '/chat',
    icon: Bot,
    description: 'Smart Conversations',
    featured: true,
    hotkey: 'A'
  },
  {
    label: 'Market Analysis',
    href: '/market-analysis',
    icon: TrendingUp,
    description: 'Market Insights'
  },
  {
    label: 'Property Showcase',
    href: '/showcase',
    icon: Home,
    description: 'Browse Properties',
    hotkey: 'P'
  },
  {
    label: 'Lead Management',
    href: '/leads',
    icon: Users,
    description: 'Track Prospects',
    hotkey: 'L'
  },
  {
    label: 'Appointments',
    href: '/appointments',
    icon: Clock,
    description: 'Schedule Management'
  },
  {
    label: 'Virtual Tours',
    href: '/virtual-tours',
    icon: Camera,
    description: 'Property Tours'
  },
  {
    label: 'Sensay Integration',
    href: '/sensay',
    icon: Zap,
    description: 'Configure AI Features'
  },
  {
    label: 'Blockchain',
    href: '/blockchain',
    icon: Wallet,
    description: 'NFT Certificates'
  },
  {
    label: 'Risk Analysis',
    href: '/risk-analysis',
    icon: Shield,
    description: 'Property Risk'
  },
  {
    label: 'Platform Demos',
    href: '/platform-demos',
    icon: Play,
    description: 'Feature Demos'
  },
  {
    label: 'Smart FAQ',
    href: '/smart-faq',
    icon: HelpCircle,
    description: 'AI Support'
  }
];

interface MobileNavigationProps {
  className?: string;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  className = '' 
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const featuredItems = mobileNavItems.filter(item => item.featured);
  const regularItems = mobileNavItems.filter(item => !item.featured);

  const getCurrentPageTitle = () => {
    const currentItem = mobileNavItems.find(item => item.href === location.pathname);
    return currentItem ? currentItem.label : 'PropGuard AI';
  };

  return (
    <div className={`md:hidden ${className}`}>
      {/* Mobile Header */}
      <div className="glass-card border-0 border-b border-border/50 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">P</span>
              </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-propguard-blue to-propguard-orange bg-clip-text text-transparent">
                PropGuard AI
              </span>
            </div>
          </Link>

          {/* Navigation Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">P</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">PropGuard AI</div>
                      <div className="text-xs text-muted-foreground">Property Intelligence</div>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col h-full">
                {/* Quick Access */}
                <div className="p-4 border-b space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Quick Access
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {featuredItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                          {item.hotkey && (
                            <kbd className="ml-auto text-xs bg-background/50 px-1.5 rounded">
                              ⌘{item.hotkey}
                            </kbd>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Full Navigation */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-2">
                    {regularItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      
                      return (
                        <motion.div
                          key={item.href}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                              isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <div className="flex-1">
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {item.description}
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                            {item.hotkey && (
                              <kbd className="text-xs bg-background/50 px-1.5 rounded hidden">
                                ⌘{item.hotkey}
                              </kbd>
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-muted/30">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">
                      Powering the Future of Real Estate
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      🤖 Powered by Sensay
                    </Badge>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Current Page Indicator */}
        <div className="px-4 pb-3">
          <div className="text-sm font-medium text-foreground">
            {getCurrentPageTitle()}
          </div>
          <div className="text-xs text-muted-foreground">
            {location.pathname === '/dashboard' && 'Manage your property portfolio'}
            {location.pathname === '/search' && 'Find and analyze properties'}
            {location.pathname === '/chat' && 'Chat with AI assistant'}
            {location.pathname === '/market-analysis' && 'Market insights and trends'}
            {location.pathname === '/showcase' && 'Browse property listings'}
            {location.pathname === '/leads' && 'Track prospects and clients'}
            {location.pathname === '/appointments' && 'Schedule management'}
            {location.pathname === '/virtual-tours' && 'Property tour creation'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
