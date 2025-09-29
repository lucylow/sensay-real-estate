import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Bot, 
  BarChart3, 
  FileText, 
  Settings, 
  HelpCircle,
  X,
  ArrowRight,
  Sparkles,
  TrendingUp,
  MapPin,
  MessageCircle,
  Globe,
  Zap
} from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  badge?: string;
  color?: string;
}

interface QuickActionsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name: string;
    subscription?: 'free' | 'pro' | 'enterprise';
  };
}

export const QuickActionsSidebar: React.FC<QuickActionsSidebarProps> = ({ 
  isOpen, 
  onClose, 
  user 
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const quickActions: QuickAction[] = [
    {
      id: 'new-property',
      label: 'New Property Analysis',
      description: 'Analyze property valuation and risk',
      icon: Search,
      href: '/search',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      description: 'Chat with Sensay-powered AI',
      icon: Bot,
      href: '/sensay-chatbot',
      color: 'from-purple-500 to-purple-600',
      badge: 'New'
    },
    {
      id: 'market-analysis',
      label: 'Market Analysis',
      description: 'Get real-time market insights',
      icon: TrendingUp,
      href: '/market-analysis',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'report-generator',
      label: 'Generate Report',
      description: 'Create valuation report',
      icon: FileText,
      href: '/reports',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'deploy-chatbot',
      label: 'Deploy Chatbot',
      description: 'Multi-channel deployment',
      icon: Globe,
      href: '/sensay',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'lead-analysis',
      label: 'Lead Analytics',
      description: 'Track conversation metrics',
      icon: BarChart3,
      href: '/sensay-analytics',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const filteredActions = quickActions.filter(action =>
    action.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    action.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleActionClick = (action: QuickAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      navigate(action.href);
    }
    onClose();
  };

  const recentActions = [
    { label: 'Property Search', href: '/search', icon: Search },
    { label: 'Market Analysis', href: '/market-analysis', icon: TrendingUp },
    { label: 'AI Chat', href: '/sensay-chatbot', icon: Bot }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Access PropGuard AI features instantly
                </p>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search actions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* User Status */}
                  {user && (
                    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Welcome, {user.name}</div>
                          <div className="text-sm text-gray-600">
                            {user.subscription === 'pro' || user.subscription === 'enterprise' 
                              ? 'Pro Edition' 
                              : 'Free Edition'}
                          </div>
                        </div>
                        <Badge variant={user.subscription === 'pro' || user.subscription === 'enterprise' ? 'default' : 'secondary'}>
                          {user.subscription || 'free'}
                        </Badge>
                      </div>
                    </Card>
                  )}
}

                  {/* Quick Actions Grid */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      {searchQuery ? 'Search Results' : 'Popular Actions'}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {filteredActions.map((action) => (
                        <motion.button
                          key={action.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleActionClick(action)}
                          className={`p-4 text-left rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group ${
                            action.backgroundColor || 'bg-white'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                            <action.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="font-medium text-sm text-gray-900 mb-1">
                            {action.label}
                            {action.badge && (
                              <Badge className="ml-2 text-xs bg-purple-100 text-purple-700">
                                {action.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            {action.description}
                          </div>
                          <ArrowRight className="h-3 w-3 text-gray-400 mt-2 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Actions */}
                  {!searchQuery && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Actions</h3>
                      <div className="space-y-2">
                        {recentActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              navigate(action.href);
                              onClose();
                            }}
                            className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
                                <action.icon className="h-3 w-3 text-gray-600" />
                              </div>
                              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                {action.label}
                              </span>
                              <ArrowRight className="h-3 w-3 text-gray-400 ml-auto group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {searchQuery && filteredActions.length === 0 && (
                    <div className="text-center py-8">
                      <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <div className="text-sm text-gray-500">No actions found</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Try searching for "property", "AI", or "report"
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate('/help')}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </button>
                  <div className="h-4 w-px bg-gray-300" />
                  <button
                    onClick={() => navigate('/settings')}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickActionsSidebar;
