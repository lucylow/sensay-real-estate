import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Home, 
  BarChart3, 
  Bot, 
  Building, 
  Map, 
  FileText, 
  Users, 
  Calendar, 
  Video, 
  Mic, 
  Globe, 
  Zap, 
  Shield,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface PageInfo {
  path: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  status: 'working' | 'testing' | 'development';
}

const pages: PageInfo[] = [
  // Core Pages
  { path: '/', title: 'Landing Page', description: 'Main landing page', icon: Home, category: 'Core', status: 'working' },
  { path: '/app', title: 'Dashboard', description: 'Main application dashboard', icon: BarChart3, category: 'Core', status: 'working' },
  { path: '/test', title: 'Test Page', description: 'Simple test page', icon: Shield, category: 'Core', status: 'working' },
  
  // Main Application
  { path: '/dashboard', title: 'Enhanced Dashboard', description: 'Advanced dashboard with analytics', icon: BarChart3, category: 'Application', status: 'testing' },
  { path: '/search', title: 'Property Search', description: 'Search and analyze properties', icon: Search, category: 'Application', status: 'testing' },
  { path: '/market-analysis', title: 'Market Analysis', description: 'Market intelligence and trends', icon: BarChart3, category: 'Application', status: 'testing' },
  { path: '/property/:id', title: 'Property Details', description: 'Detailed property information', icon: Building, category: 'Application', status: 'testing' },
  { path: '/report/:reportId', title: 'Valuation Report', description: 'Property valuation reports', icon: FileText, category: 'Application', status: 'testing' },
  
  // Sensay Integration
  { path: '/sensay', title: 'Sensay Integration', description: 'Main Sensay integration page', icon: Bot, category: 'Sensay', status: 'testing' },
  { path: '/sensay-features', title: 'Sensay Features', description: 'Sensay features showcase', icon: Zap, category: 'Sensay', status: 'testing' },
  { path: '/sensay-wisdom', title: 'Sensay Wisdom', description: 'Sensay wisdom engine', icon: Bot, category: 'Sensay', status: 'testing' },
  { path: '/ai-services', title: 'AI Services', description: 'AI services overview', icon: Bot, category: 'Sensay', status: 'testing' },
  { path: '/sensay-leads', title: 'Sensay Leads', description: 'Lead generation with Sensay', icon: Users, category: 'Sensay', status: 'testing' },
  { path: '/sensay-chatbot', title: 'Sensay Chatbot', description: 'Sensay chatbot integration', icon: Bot, category: 'Sensay', status: 'testing' },
  { path: '/sensay-wisdom-chatbot', title: 'Wisdom Chatbot', description: 'Wisdom-powered chatbot', icon: Bot, category: 'Sensay', status: 'testing' },
  { path: '/sensay-analytics', title: 'Conversation Analytics', description: 'Chat conversation analytics', icon: BarChart3, category: 'Sensay', status: 'testing' },
  { path: '/sensay-showcase', title: 'Hackathon Showcase', description: 'Sensay hackathon showcase', icon: Globe, category: 'Sensay', status: 'testing' },
  { path: '/sensay-dashboard', title: 'Features Dashboard', description: 'Sensay features dashboard', icon: BarChart3, category: 'Sensay', status: 'testing' },
  
  // Features
  { path: '/property-showcase', title: 'Property Showcase', description: 'Property showcase component', icon: Building, category: 'Features', status: 'testing' },
  { path: '/smart-faq', title: 'Smart FAQ', description: 'Intelligent FAQ system', icon: FileText, category: 'Features', status: 'testing' },
  { path: '/virtual-tours', title: 'Virtual Tours', description: 'Virtual property tours', icon: Video, category: 'Features', status: 'testing' },
  { path: '/leads', title: 'Lead Dashboard', description: 'Lead management dashboard', icon: Users, category: 'Features', status: 'testing' },
  { path: '/appointments', title: 'Appointment Manager', description: 'Appointment scheduling', icon: Calendar, category: 'Features', status: 'testing' },
  { path: '/blockchain', title: 'Blockchain Integration', description: 'Blockchain features', icon: Shield, category: 'Features', status: 'testing' },
  { path: '/platform-demos', title: 'Platform Demos', description: 'Platform demonstration', icon: Globe, category: 'Features', status: 'testing' },
  
  // AI & Chatbots
  { path: '/propguard-chatbot', title: 'PropGuard AI', description: 'PropGuard AI chatbot', icon: Bot, category: 'AI', status: 'testing' },
  { path: '/knowledge-dashboard', title: 'Knowledge Dashboard', description: 'Knowledge monitoring', icon: BarChart3, category: 'AI', status: 'testing' },
  
  // Test & Development
  { path: '/heygen-test', title: 'HeyGen Test', description: 'HeyGen API testing', icon: Video, category: 'Development', status: 'development' },
  { path: '/multimodal-test', title: 'Multimodal Test', description: 'Multimodal features testing', icon: Mic, category: 'Development', status: 'development' },
  { path: '/avatar-features', title: 'Avatar Features', description: 'Avatar feature testing', icon: Video, category: 'Development', status: 'development' },
];

const PageNavigation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Core']);
  const location = useLocation();

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedPages = filteredPages.reduce((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = [];
    }
    acc[page.category].push(page);
    return acc;
  }, {} as Record<string, PageInfo[]>);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'bg-green-100 text-green-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'development': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Navigation
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Navigate to all available pages in the application
          </p>
          
          <div className="mb-6">
            <Input
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(groupedPages).map(([category, categoryPages]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  <span>{category}</span>
                  {expandedCategories.includes(category) ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </CardTitle>
              </CardHeader>
              {expandedCategories.includes(category) && (
                <CardContent>
                  <div className="space-y-3">
                    {categoryPages.map((page) => {
                      const isActive = location.pathname === page.path;
                      const Icon = page.icon;
                      
                      return (
                        <Link
                          key={page.path}
                          to={page.path}
                          className={`block p-3 rounded-lg border transition-all hover:shadow-md ${
                            isActive 
                              ? 'bg-blue-50 border-blue-200' 
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <Icon className="h-5 w-5 mt-0.5 text-gray-600" />
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {page.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {page.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(page.status)}>
                                {page.status}
                              </Badge>
                              <ExternalLink className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Status Legend
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800">Working</Badge>
              <span className="text-gray-700">Fully functional and tested</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-yellow-100 text-yellow-800">Testing</Badge>
              <span className="text-gray-700">In testing phase</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-800">Development</Badge>
              <span className="text-gray-700">Under development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNavigation;

