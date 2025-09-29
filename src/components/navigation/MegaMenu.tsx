import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Home, 
  Bot, 
  Shield, 
  Layers, 
  TestTube, 
  Search,
  MessageCircle,
  TrendingUp,
  BarChart3,
  Users,
  DollarSign,
  Eye,
  Calendar,
  Settings,
  HelpCircle,
  Brain,
  Globe,
  Zap,
  ChevronRight,
  Star,
  Clock,
  Heart,
  Pin,
  Menu,
  X,
  ArrowUpDown,
  Keyboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SmartMenuCategories, MenuCategory, MenuPage } from './SmartMenuCategories';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: MenuCategory[];
  recentPages?: MenuPage[];
  favoritePages?: MenuPage[];
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onClose,
  categories,
  recentPages = [],
  favoritePages = []
}) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(categories[0]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      } else if (e.key === '/' && !isOpen) {
        setIsSearchMode(true);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handlePageClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearchMode(query.length > 0);
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    pages: category.pages.filter(page =>
      page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.pages.length > 0);

  const formatUsage = (usage: number) => {
    if (usage >= 1000) return `${(usage / 1000).toFixed(1)}k`;
    return usage.toString();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        >
          <motion.div
            ref={menuRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="absolute top-0 left-0 right-0 bg-white shadow-xl rounded-b-2xl mx-4 mt-2 max-w-7xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    <Menu className="h-6 w-6 text-white"/>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Navigation Hub</h1>
                    <p className="text-gray-600">Quick access to all platform features</p>
                  </div>
                </div>
                
                {/* Search */}
                <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search pages... (Press / to focus)"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 pr-4"
                    autoFocus
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery('');
                        setIsSearchMode(false);
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-12 gap-6">
                {/* Categories Sidebar */}
                <div className="col-span-3">
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-4">Categories</h3>
                      <div className="space-y-2">
                        {filteredCategories.map((category) => (
                          <Button
                            key={category.id}
                            variant={selectedCategory?.id === category.id ? "default" : "ghost"}
                            className={`w-full justify-start ${selectedCategory?.id === category.id ? 'bg-blue-600' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            <category.icon className="h-4 w-4 mr-2" />
                            {category.name}
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {category.pages.length}
                            </Badge>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Access */}
                  <Card className="mt-4">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-4">Quick Access</h3>
                      
                      {/* Recent Pages */}
                      {recentPages.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Recent
                          </h4>
                          <div className="space-y-1">
                            {recentPages.slice(0, 3).map((page) => (
                              <Button
                                key={page.id}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-xs"
                                onClick={() => handlePageClick(page.path)}
                              >
                                <page.icon className="h-3 w-3 mr-1" />
                                {page.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Favorites */}
                      {favoritePages.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            Favorites
                          </h4>
                          <div className="space-y-1">
                            {favoritePages.slice(0, 3).map((page) => (
                              <Button
                                key={page.id}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-xs"
                                onClick={() => handlePageClick(page.path)}
                              >
                                <page.icon className="h-3 w-3 mr-1" />
                                {page.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Content Area */}
                <div className="col-span-9">
                  {selectedCategory && (
                    <motion.div
                      key={selectedCategory.id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Category Header */}
                      <div className="flex items-center space-x-3 mb-6">
                        <div className={`p-3 rounded-lg ${selectedCategory.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                          <selectedCategory.icon className={`h-6 w-6 ${selectedCategory.color}`} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{selectedCategory.name}</h2>
                          <p className="text-gray-600">{selectedCategory.description}</p>
                        </div>
                      </div>

                      {/* Pages Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedCategory.pages.map((page) => (
                          <motion.div
                            key={page.id}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Card 
                              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                              onClick={() => handlePageClick(page.path)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start space-x-3">
                                  <div className="p-2 bg-gray-100 rounded-lg">
                                    <page.icon className="h-5 w-5 text-gray-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h3 className="font-semibold text-sm text-gray-900 truncate">
                                        {page.name}
                                      </h3>
                                      {page.isPopular && (
                                        <Badge variant="secondary" className="text-xs">
                                          Popular
                                        </Badge>
                                      )}
                                      {page.isNew && (
                                        <Badge variant="outline" className="text-xs border-green-500 text-green-700">
                                          New
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                      {page.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-gray-500">{page.lastUpdated}</span>
                                      <Badge variant="outline" className="text-xs">
                                        {formatUsage(page.usage || 0)} views
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Search className="h-3 w-3 mr-1" />
                      Search
                    </span>
                    <span className="flex items-center">
                      <ArrowUpDown className="h-3 w-3 mr-1" />
                      Navigate
                    </span>
                    <span className="flex items-center">
                      <Keyboard className="h-3 w-3 mr-1" />
                      Escape
                    </span>
                  </div>
                  <Button variant="ghost" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
