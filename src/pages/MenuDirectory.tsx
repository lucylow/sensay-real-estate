import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  Clock, 
  Users, 
  BarChart3,
  Grid,
  List,
  SortAsc,
  SortDesc,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SmartMenuCategories, { MenuCategory, MenuPage } from '@/components/navigation/SmartMenuCategories';

interface PageStats {
  totalPages: number;
  totalViews: number;
  mostPopular: MenuPage | null;
  recentlyUpdated: MenuPage[];
  categoryCounts: Record<string, number>;
}

interface MenuDirectoryProps {
  categories?: MenuCategory[];
}

export const MenuDirectory: React.FC<MenuDirectoryProps> = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'views' | 'updated' | 'category'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Import categories from SmartMenuCategories component
  const categories: MenuCategory[] = [
    {
      id: 'property-tools',
      name: 'Property Tools',
      description: 'Core property search, analysis, and valuation tools',
      pages: [
        { id: 'property-search', name: 'Property Search', path: '/search', description: 'Search and discover properties with AI-powered insights', lastUpdated: '2 days ago', usage: 342, isPopular: true },
        { id: 'property-detail', name: 'Property Details', path: '/property/:id', description: 'Detailed property analysis and comprehensive reports', lastUpdated: '1 day ago', usage: 187 },
        { id: 'market-analysis', name: 'Market Analysis', path: '/market-analysis', description: 'Real-time market insights and trend analysis', lastUpdated: '3 hours ago', usage: 156, isNew: true },
        { id: 'valuation-report', name: 'Valuation Reports', path: '/report/:reportId', description: 'AI-powered property valuation and investment analysis', lastUpdated: '4 days ago', usage: 89 },
        { id: 'property-showcase', name: 'Property Showcase', path: '/property-showcase', description: 'Interactive property showcases with virtual tours', lastUpdated: '1 week ago', usage: 45 }
      ]
    },
    {
      id: 'sensay-ai',
      name: 'Sensay AI',
      description: 'Advanced AI conversation and multi-channel deployment',
      pages: [
        { id: 'sensay-integration', name: 'Sensay Integration', path: '/sensay', description: 'Configure Sensay API and deploy across channels', lastUpdated: '5 hours ago', usage: 78 },
        { id: 'sensay-chatbot', name: 'AI Chatbot', path: '/sensay-chatbot', description: 'Interactive Sensay-powered chatbot interface', lastUpdated: '2 hours ago', usage: 234, isPopular: true },
        { id: 'sensay-leads', name: 'Lead Generation', path: '/sensay-leads', description: 'Automated lead capture and nurture campaigns', lastUpdated: '6 hours ago', usage: 167 },
        { id: 'sensay-analytics', name: 'Conversation Analytics', path: '/sensay-analytics', description: 'Track chatbot performance and conversation insights', lastUpdated: '1 hour ago', usage: 92 },
        { id: 'sensay-features', name: 'Sensay Features', path: '/sensay-features', description: 'Explore Sensay AI capabilities and demo scenarios', lastUpdated: '1 day ago', usage: 56 },
        { id: 'sensay-wisdom', name: 'Sensay Wisdom', path: '/sensay-wisdom', description: 'Advanced AI knowledge base and wisdom features', lastUpdated: '2 days ago', usage: 43 },
        { id: 'sensay-wisdom-chatbot', name: 'Wisdom Chatbot', path: '/sensay-wisdom-chatbot', description: 'Enhanced chatbot with Sensay Wisdom integration', lastUpdated: '3 days ago', usage: 34 },
        { id: 'sensay-showcase', name: 'Demo Showcase', path: '/sensay-showcase', description: 'Interactive demo of Sensay platform features', lastUpdated: '4 days ago', usage: 67 },
        { id: 'sensay-dashboard', name: 'Sensay Dashboard', path: '/sensay-dashboard', description: 'Comprehensive Sensay management dashboard', lastUpdated: '5 days ago', usage: 23 }
      ]
    }
  ];

  const allPages = useMemo(() => 
    categories.flatMap(category => category.pages), 
    [categories]
  );

  const pageStats: PageStats = useMemo(() => {
    const mostPopular = allPages.reduce((prev, current) => 
      (current.usage || 0) > (prev.usage || 0) ? current : prev
    );

    const recentlyUpdated = allPages
      .filter(page => page.lastUpdated?.includes('hour') || page.lastUpdated?.includes('day'))
      .slice(0, 5);

    const categoryCounts = categories.reduce((acc, category) => {
      acc[category.name] = category.pages.length;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalPages: allPages.length,
      totalViews: allPages.reduce((sum, page) => sum + (page.usage || 0), 0),
      mostPopular,
      recentlyUpdated,
      categoryCounts
    };
  }, [allPages, categories]);

  const filteredPages = useMemo(() => {
    let filtered = allPages;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(page =>
        page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      const category = categories.find(cat => cat.id === selectedCategory);
      if (category) {
        filtered = filtered.filter(page =>
          category.pages.some(catPage => catPage.id === page.id)
        );
      }
    }

    // Apply tag filter (based on new/popular status)
    if (selectedTags.includes('new')) {
      filtered = filtered.filter(page => page.isNew);
    }
    if (selectedTags.includes('popular')) {
      filtered = filtered.filter(page => page.isPopular);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a.name;
      let bValue: any = b.name;

      switch (sortBy) {
        case 'views':
          aValue = a.usage || 0;
          bValue = b.usage || 0;
          break;
        case 'updated':
          // Simple sorting by parsing time strings
          aValue = a.lastUpdated || '';
          bValue = b.lastUpdated || '';
          break;
        case 'category':
          const categoryA = categories.find(cat => cat.pages.some(p => p.id === a.id))?.name || '';
          const categoryB = categories.find(cat => cat.pages.some(p => p.id === b.id))?.name || '';
          aValue = categoryA;
          bValue = categoryB;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [allPages, searchQuery, selectedCategory, sortBy, sortOrder, selectedTags, categories]);

  const handlePageClick = (path: string) => {
    navigate(path);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const formatUsage = (usage: number) => {
    if (usage >= 1000) return `${(usage / 1000).toFixed(1)}k`;
    return usage.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Directory</h1>
          <p className="text-lg text-gray-600">
            Comprehensive site map with {pageStats.totalPages} pages across {categories.length} categories
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 font-medium">Total Pages</p>
                  <p className="text-3xl font-bold">{pageStats.totalPages}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 font-medium">Total Views</p>
                  <p className="text-3xl font-bold">{formatUsage(pageStats.totalViews)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 font-medium">Categories</p>
                  <p className="text-3xl font-bold">{categories.length}</p>
                </div>
                <Grid className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 font-medium">Most Popular</p>
                  <p className="text-lg font-bold truncate">{pageStats.mostPopular?.name || 'Property Search'}</p>
                </div>
                <Star className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search pages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.pages.length})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="updated">Updated</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Order */}
              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3"
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>

              {/* View Mode */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-gray-500 mr-2">Filter:</span>
              {[
                { tag: 'new', label: 'New Pages', count: allPages.filter(p => p.isNew).length },
                { tag: 'popular', label: 'Popular Pages', count: allPages.filter(p => p.isPopular).length }
              ].map(({ tag, label, count }) => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleTag(tag)}
                  className="text-xs"
                >
                  {label}
                  <Badge variant="secondary" className="ml-1">{count}</Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredPages.length} of {allPages.length} pages
          </h2>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Pages Grid/List */}
        {filteredPages.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredPages.map((page, index) => {
              const category = categories.find(cat => cat.pages.some(p => p.id === page.id));
              
              return (
                <motion.div
                  key={page.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className={`cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 ${
                      page.isNew ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' : ''
                    }`}
                    onClick={() => handlePageClick(page.path)}
                  >
                    <CardContent className={`p-${viewMode === 'list' ? '4' : '6'}`}>
                      <div className={viewMode === 'list' ? 'flex items-center space-x-4' : 'text-center'}>
                        <div className={`${category?.icon ? 'p-2 bg-gray-100 rounded-lg' : ''} ${viewMode === 'list' ? '' : 'mx-auto mb-3'}`}>
                          {category?.icon && <category.icon className={`${viewMode === 'list' ? 'h-5 w-5' : 'h-8 w-8'} text-gray-600`} />}
                        </div>
                        
                        <div className={`flex-1 ${viewMode === 'list' ? 'text-left' : ''}`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{page.name}</h3>
                            {page.isNew && (
                              <Badge variant="outline" className="border-green-500 text-green-700">
                                New
                              </Badge>
                            )}
                            {page.isPopular && (
                              <Badge variant="secondary">
                                Popular
                              </Badge>
                            )}
                          </div>
                          
                          <p className={`text-gray-600 ${viewMode === 'list' ? 'mb-2' : 'mb-4'} ${
                            viewMode === 'list' ? '' : 'line-clamp-2'
                          }`}>
                            {page.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{page.lastUpdated}</span>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>{formatUsage(page.usage || 0)} views</span>
                            </div>
                          </div>
                          
                          {category && (
                            <div className="mt-2">
                              <Badge variant="outline" className="text-xs">
                                {category.name}
                              </Badge>
                            </div>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-3 w-full group"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePageClick(page.path);
                            }}
                          >
                            Open Page
                            <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedTags([]);
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MenuDirectory;
