import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronRight,
  Star,
  Clock,
  Home,
  Bot,
  Settings,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MenuCategory, MenuPage } from './SmartMenuCategories';

interface PageSidebarProps {
  categories: MenuCategory[];
  currentPath: string;
  className?: string;
}

export const PageSidebar: React.FC<PageSidebarProps> = ({
  categories,
  currentPath,
  className = ''
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['property-tools']);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePageClick = (path: string) => {
    navigate(path);
  };

  const getCurrentCategory = () => {
    return categories.find(category =>
      category.pages.some(page => location.pathname.includes(page.path.replace('/:id', '').replace('/:reportId', '')))
    );
  };

  const getRelatedPages = (category: MenuCategory) => {
    return category.pages.filter(page => 
      page.path !== currentPath && page.path !== location.pathname
    );
  };

  const getQuickActions = () => {
    const actions = [
      { name: 'Search Properties', path: '/search', icon: Home },
      { name: 'View Analytics', path: '/sensay-analytics', icon: Star },
      { name: 'Settings', path: '/settings', icon: Settings }
    ];
    return actions;
  };

  const currentCategory = getCurrentCategory();

  return (
    <div className={`w-80 bg-white border-r border-gray-200 overflow-y-auto ${className}`}>
      <div className="p-6">
        {/* Current Category Header */}
        {currentCategory && (
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600`}>
                <currentCategory.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{currentCategory.name}</h2>
                <p className="text-sm text-gray-600">{currentCategory.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="space-y-4">
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);
            const relatedPages = getRelatedPages(category);

            return (
              <Card key={category.id} className="overflow-hidden">
                <Button
                  variant="ghost"
                  className={`w-full justify-start p-3 hover:bg-gray-50 ${
                    isExpanded ? 'border-b border-gray-200' : ''
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center space-x-3">
                    <category.icon className="h-4 w-4" />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </Button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CardContent className="p-2">
                        <div className="space-y-1">
                          {relatedPages.slice(0, 5).map((page) => (
                            <Button
                              key={page.id}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-xs"
                              onClick={() => handlePageClick(page.path)}
                            >
                              <page.icon className="h-3 w-3 mr-2" />
                              <span className="truncate">{page.name}</span>
                              {page.isPopular && (
                                <Star className="h-3 w-3 ml-auto text-yellow-500" />
                              )}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {getQuickActions().map((action) => (
              <Button
                key={action.name}
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => handlePageClick(action.path)}
              >
                <action.icon className="h-4 w-4 mr-2" />
                {action.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSidebar;
