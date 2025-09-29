import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Home, 
  Bot, 
  Shield, 
  Globe, 
  TestTube,
  ExternalLink,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MenuPage {
  id: string;
  name: string;
  path: string;
  description: string;
  category: string;
  lastUpdated?: string;
  usage?: number;
  isNew?: boolean;
  isPopular?: boolean;
}

const menuPages: MenuPage[] = [
  // Property Tools
  { id: 'property-search', name: 'Property Search', path: '/search', description: 'Search and discover properties with AI-powered insights', category: 'Property Tools', lastUpdated: '2 days ago', usage: 342, isPopular: true },
  { id: 'property-detail', name: 'Property Details', path: '/property/:id', description: 'Detailed property analysis and comprehensive reports', category: 'Property Tools', lastUpdated: '1 day ago', usage: 187 },
  { id: 'market-analysis', name: 'Market Analysis', path: '/market-analysis', description: 'Real-time market insights and trend analysis', category: 'Property Tools', lastUpdated: '3 hours ago', usage: 156, isNew: true },
  { id: 'valuation-report', name: 'Valuation Reports', path: '/report/:reportId', description: 'AI-powered property valuation and investment analysis', category: 'Property Tools', lastUpdated: '4 days ago', usage: 89 },
  { id: 'property-showcase', name: 'Property Showcase', path: '/property-showcase', description: 'Interactive property showcases with virtual tours', category: 'Property Tools', lastUpdated: '1 week ago', usage: 45 },

  // Sensay AI
  { id: 'sensay-integration', name: 'Sensay Integration', path: '/sensay', description: 'Configure Sensay API and deploy across channels', category: 'Sensay AI', lastUpdated: '5 hours ago', usage: 78 },
  { id: 'sensay-chatbot', name: 'AI Chatbot', path: '/sensay-chatbot', description: 'Interactive Sensay-powered chatbot interface', category: 'Sensay AI', lastUpdated: '2 hours ago', usage: 234, isPopular: true },
  { id: 'sensay-leads', name: 'Lead Generation', path: '/sensay-leads', description: 'Automated lead capture and nurture campaigns', category: 'Sensay AI', lastUpdated: '6 hours ago', usage: 167 },
  { id: 'sensay-analytics', name: 'Conversation Analytics', path: '/sensay-analytics', description: 'Track chatbot performance and conversation insights', category: 'Sensay AI', lastUpdated: '1 hour ago', usage: 92 },
  { id: 'sensay-features', name: 'Sensay Features', path: '/sensay-features', description: 'Explore Sensay AI capabilities and demo scenarios', category: 'Sensay AI', lastUpdated: '1 day ago', usage: 56 },
  { id: 'sensay-wisdom', name: 'Sensay Wisdom', path: '/sensay-wisdom', description: 'Advanced AI knowledge base and wisdom features', category: 'Sensay AI', lastUpdated: '2 days ago', usage: 43 },
  { id: 'sensay-wisdom-chatbot', name: 'Wisdom Chatbot', path: '/sensay-wisdom-chatbot', description: 'Enhanced chatbot with Sensay Wisdom integration', category: 'Sensay AI', lastUpdated: '3 days ago', usage: 34 },
  { id: 'sensay-showcase', name: 'Demo Showcase', path: '/sensay-showcase', description: 'Interactive demo of Sensay platform features', category: 'Sensay AI', lastUpdated: '4 days ago', usage: 67 },
  { id: 'sensay-dashboard', name: 'Sensay Dashboard', path: '/sensay-dashboard', description: 'Comprehensive Sensay management dashboard', category: 'Sensay AI', lastUpdated: '5 days ago', usage: 23 },

  // PropGuard AI
  { id: 'propguard-chatbot', name: 'PropGuard Chatbot', path: '/propguard-chatbot', description: 'Interactive AI assistant for property insights', category: 'PropGuard AI', lastUpdated: '3 hours ago', usage: 145, isPopular: true },
  { id: 'ai-services', name: 'AI Services', path: '/ai-services', description: 'Comprehensive AI services for real estate', category: 'PropGuard AI', lastUpdated: '1 day ago', usage: 78 },
  { id: 'knowledge-dashboard', name: 'Knowledge Dashboard', path: '/knowledge-dashboard', description: 'Monitor and manage AI knowledge base', category: 'PropGuard AI', lastUpdated: '2 days ago', usage: 45 },
  { id: 'smart-faq', name: 'Smart FAQ', path: '/smart-faq', description: 'AI-powered frequently asked questions', category: 'PropGuard AI', lastUpdated: '1 week ago', usage: 67 },
  { id: 'virtual-tours', name: 'Virtual Tours', path: '/virtual-tours', description: 'Schedule and manage virtual property tours', category: 'PropGuard AI', lastUpdated: '4 days ago', usage: 34 },
  { id: 'leads', name: 'Lead Management', path: '/leads', description: 'Track and manage real estate leads', category: 'PropGuard AI', lastUpdated: '6 hours ago', usage: 98 },
  { id: 'appointments', name: 'Appointment Manager', path: '/appointments', description: 'Manage property viewing appointments', category: 'PropGuard AI', lastUpdated: '8 hours ago', usage: 56 },

  // Platform Features
  { id: 'blockchain', name: 'Blockchain Integration', path: '/blockchain', description: 'NFT property certificates and Web3 features', category: 'Platform Features', lastUpdated: '1 week ago', usage: 12, isNew: true },
  { id: 'platform-demos', name: 'Platform Demos', path: '/platform-demos', description: 'Interactive demonstrations of PropGuard features', category: 'Platform Features', lastUpdated: '3 days ago', usage: 89 },

  // Testing & Development
  { id: 'heygen-test', name: 'HeyGen Avatar Test', path: '/heygen-test', description: 'Testing HeyGen video avatar integration', category: 'Testing & Development', lastUpdated: '5 days ago', usage: 23 },
  { id: 'multimodal-test', name: 'Multimodal Test', path: '/multimodal-test', description: 'Testing multimodal AI capabilities', category: 'Testing & Development', lastUpdated: '3 days ago', usage: 18 },
  { id: 'avatar-features', name: 'Enhanced Avatar Features', path: '/avatar-features' , description: 'Enhanced avatar and voice features', category: 'Testing & Development', lastUpdated: '1 week ago', usage: 15 }
];

const getIconForCategory = (category: string) => {
  switch (category) {
    case 'Property Tools': return Home;
    case 'Sensay AI': return Bot;
    case 'PropGuard AI': return Shield;
    case 'Platform Features': return Globe;
    case 'Testing & Development': return TestTube;
    default: return Home;
  }
};

export const MenuDirectory: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Property Tools', 'Sensay AI', 'PropGuard AI', 'Platform Features', 'Testing & Development'];
  
  const filteredPages = menuPages.filter(page => {
    const matchesSearch = !searchQuery || 
      page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || page.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalPages = menuPages.length;
  const totalViews = menuPages.reduce((sum, page) => sum + (page.usage || 0), 0);
  const mostPopular = menuPages.reduce((prev, current) => 
    (current.usage || 0) > (prev.usage || 0) ? current : prev
  );

  const handlePageClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Directory</h1>
          <p className="text-lg text-gray-600">
            Comprehensive site map with {totalPages} pages across {categories.length - 1} categories
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 font-medium">Total Pages</p>
                  <p className="text-3xl font-bold">{totalPages}</p>
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
                  <p className="text-3xl font-bold">{totalViews}</p>
                </div>
                <Home className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 font-medium">Most Popular</p>
                  <p className="text-lg font-bold truncate">{mostPopular.name}</p>
                </div>
                <Bot className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
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
              
              <div className="flex gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                    <Badge variant="secondary" className="ml-2">
                      {category === 'All' ? totalPages : menuPages.filter(p => p.category === category).length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredPages.length} of {totalPages} pages
          </h2>
        </div>

        {/* Pages Grid */}
        {filteredPages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPages.map((page) => {
              const IconComponent = getIconForCategory(page.category);
              
              return (
                <Card 
                  key={page.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => handlePageClick(page.path)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-3 p-2 bg-gray-100 rounded-lg w-fit">
                      <IconComponent className="h-8 w-8 text-gray-600" />
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-2">{page.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {page.description}
                      </p>
                    </div>
                    
                    {page.isNew && (
                      <Badge variant="outline" className="border-green-500 text-green-700 mb-2">
                        New
                      </Badge>
                    )}
                    {page.isPopular && (
                      <Badge variant="secondary" className="mb-2">
                        Popular
                      </Badge>
                    )}
                    
                    <div className="text-xs text-gray-500 mb-3">
                      <Badge variant="outline" className="mr-1">{page.category}</Badge>
                      <span>{page.lastUpdated}</span>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full group"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePageClick(page.path);
                      }}
                    >
                      Open Page
                      <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or category filter.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
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