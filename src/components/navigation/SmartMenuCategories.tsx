import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Home, 
  Bot, 
  Shield, 
  Layers, 
  TestTube, 
  TrendingUp,
  Settings,
  Users,
  Brain,
  Zap,
  Globe,
  FileText,
  BarChart3,
  MessageCircle,
  Search,
  DollarSign,
  Eye,
  Calendar,
  ChevronDown,
  Sparkles,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  pages: MenuPage[];
  isExpanded?: boolean;
}

export interface MenuPage {
  id: string;
  name: string;
  path: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  lastUpdated?: string;
  usage?: number;
  isNew?: boolean;
  isPopular?: boolean;
}

const menuCategories: MenuCategory[] = [
  {
    id: 'property-tools',
    name: 'Property Tools',
    description: 'Core property search, analysis, and valuation tools',
    icon: Home,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    pages: [
      {
        id: 'property-search',
        name: 'Property Search',
        path: '/search',
        description: 'Search and discover properties with AI-powered insights',
        icon: Search,
        lastUpdated: '2 days ago',
        usage: 342,
        isPopular: true
      },
      {
        id: 'property-detail',
        name: 'Property Details',
        path: '/property/:id',
        description: 'Detailed property analysis and comprehensive reports',
        icon: FileText,
        lastUpdated: '1 day ago',
        usage: 187
      },
      {
        id: 'market-analysis',
        name: 'Market Analysis',
        path: '/market-analysis',
        description: 'Real-time market insights and trend analysis',
        icon: BarChart3,
        lastUpdated: '3 hours ago',
        usage: 156,
        isNew: true
      },
      {
        id: 'valuation-report',
        name: 'Valuation Reports',
        path: '/report/:reportId',
        description: 'AI-powered property valuation and investment analysis',
        icon: DollarSign,
        lastUpdated: '4 days ago',
        usage: 89
      },
      {
        id: 'property-showcase',
        name: 'Property Showcase',
        path: '/property-showcase',
        description: 'Interactive property showcases with virtual tours',
        icon: Eye,
        lastUpdated: '1 week ago',
        usage: 45
      }
    ]
  },
  {
    id: 'sensay-ai',
    name: 'Sensay AI',
    description: 'Advanced AI conversation and multi-channel deployment',
    icon: Bot,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100',
    pages: [
      {
        id: 'sensay-integration',
        name: 'Sensay Integration',
        path: '/sensay',
        description: 'Configure Sensay API and deploy across channels',
        icon: Layers,
        lastUpdated: '5 hours ago',
        usage: 78
      },
      {
        id: 'sensay-chatbot',
        name: 'AI Chatbot',
        path: '/sensay-chatbot',
        description: 'Interactive Sensay-powered chatbot interface',
        icon: MessageCircle,
        lastUpdated: '2 hours ago',
        usage: 234,
        isPopular: true
      },
      {
        id: 'sensay-leads',
        name: 'Lead Generation',
        path: '/sensay-leads',
        description: 'Automated lead capture and nurture campaigns',
        icon: Users,
        lastUpdated: '6 hours ago',
        usage: 167
      },
      {
        id: 'sensay-analytics',
        name: 'Conversation Analytics',
        path: '/sensay-analytics',
        description: 'Track chatbot performance and conversation insights',
        icon: BarChart3,
        lastUpdated: '1 hour ago',
        usage: 92
      },
      {
        id: 'sensay-features',
        name: 'Sensay Features',
        path: '/sensay-features',
        description: 'Explore Sensay AI capabilities and demo scenarios',
        icon: Sparkles,
        lastUpdated: '1 day ago',
        usage: 56
      },
      {
        id: 'sensay-wisdom',
        name: 'Sensay Wisdom',
        path: '/sensay-wisdom',
        description: 'Advanced AI knowledge base and wisdom features',
        icon: Brain,
        lastUpdated: '2 days ago',
        usage: 43
      },
      {
        id: 'sensay-wisdom-chatbot',
        name: 'Wisdom Chatbot',
        path: '/sensay-wisdom-chatbot',
        description: 'Enhanced chatbot with Sensay Wisdom integration',
        icon: Bot,
        lastUpdated: '3 days ago',
        usage: 34
      },
      {
        id: 'sensay-showcase',
        name: 'Demo Showcase',
        path: '/sensay-showcase',
        description: 'Interactive demo of Sensay platform features',
        icon: Eye,
        lastUpdated: '4 days ago',
        usage: 67
      },
      {
        id: 'sensay-dashboard',
        name: 'Sensay Dashboard',
        path: '/sensay-dashboard',
        description: 'Comprehensive Sensay management dashboard',
        icon: BarChart3,
        lastUpdated: '5 days ago',
        usage: 23
      }
    ]
  },
  {
    id: 'propguard-services',
    name: 'PropGuard AI',
    description: 'PropGuard AI services and advanced features',
    icon: Shield,
    color: 'text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100',
    pages: [
      {
        id: 'propguard-chatbot',
        name: 'PropGuard Chatbot',
        path: '/propguard-chatbot',
        description: 'Interactive AI assistant for property insights',
        icon: MessageCircle,
        lastUpdated: '3 hours ago',
        usage: 145,
        isPopular: true
      },
      {
        id: 'ai-services',
        name: 'AI Services',
        path: '/ai-services',
        description: 'Comprehensive AI services for real estate',
        icon: Zap,
        lastUpdated: '1 day ago',
        usage: 78
      },
      {
        id: 'knowledge-dashboard',
        name: 'Knowledge Dashboard',
        path: '/knowledge-dashboard',
        description: 'Monitor and manage AI knowledge base',
        icon: Brain,
        lastUpdated: '2 days ago',
        usage: 45
      },
      {
        id: 'smart-faq',
        name: 'Smart FAQ',
        path: '/smart-faq',
        description: 'AI-powered frequently asked questions',
        icon: HelpCircle,
        lastUpdated: '1 week ago',
        usage: 67
      },
      {
        id: 'virtual-tours',
        name: 'Virtual Tours',
        path: '/virtual-tours',
        description: 'Schedule and manage virtual property tours',
        icon: Calendar,
        lastUpdated: '4 days ago',
        usage: 34
      },
      {
        id: 'leads',
        name: 'Lead Management',
        path: '/leads',
        description: 'Track and manage real estate leads',
        icon: Users,
        lastUpdated: '6 hours ago',
        usage: 98
      },
      {
        id: 'appointments',
        name: 'Appointment Manager',
        path: '/appointments',
        description: 'Manage property viewing appointments',
        icon: Calendar,
        lastUpdated: '8 hours ago',
        usage: 56
      }
    ]
  },
  {
    id: 'platform-features',
    name: 'Platform Features',
    description: 'Platform demos, blockchain, and advanced integrations',
    icon: Globe,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 hover:bg-orange-100',
    pages: [
      {
        id: 'blockchain',
        name: 'Blockchain Integration',
        path: '/blockchain',
        description: 'NFT property certificates and Web3 features',
        icon: Layers,
        lastUpdated: '1 week ago',
        usage: 12,
        isNew: true
      },
      {
        id: 'platform-demos',
        name: 'Platform Demos',
        path: '/platform-demos',
        description: 'Interactive demonstrations of PropGuard features',
        icon: Eye,
        lastUpdated: '3 days ago',
        usage: 89
      },
      {
        id: 'multi-channel',
        name: 'Multi-Channel Deployment',
        path: '/sensay-integration',
        description: 'Deploy Sensay across WhatsApp, website, and other channels',
        icon: Globe,
        lastUpdated: '2 days ago',
        usage: 156,
        isPopular: true
      }
    ]
  },
  {
    id: 'testing-development',
    name: 'Testing & Development',
    description: 'Quality assurance, testing tools, and development utilities',
    icon: TestTube,
    color: 'text-red-600',
    bgColor: 'bg-red-50 hover:bg-red-100',
    pages: [
      {
        id: 'heygen-test',
        name: 'HeyGen Avatar Test',
        path: '/heygen-test',
        description: 'Testing HeyGen video avatar integration',
        icon: Eye,
        lastUpdated: '5 days ago',
        usage: 23
      },
      {
        id: 'multimodal-test',
        name: 'Multimodal Test',
        path: '/multimodal-test',
        description: 'Testing multimodal AI capabilities',
        icon: TestTube,
        lastUpdated: '3 days ago',
        usage: 18
      },
      {
        id: 'avatar-features',
        name: 'Enhanced Avatar Features',
        path: '/avatar-features',
        description: 'Enhanced avatar and voice features',
        icon: Users,
        lastUpdated: '1 week ago',
        usage: 15
      }
    ]
  }
];

export const SmartMenuCategories: React.FC = () => {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePageClick = (path: string) => {
    navigate(path);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const filteredCategories = menuCategories.map(category => ({
    ...category,
    pages: category.pages.filter(page =>
      page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.pages.length > 0);

  const formatUsage = (usage: number) => {
    if (usage >= 100) return `${Math.floor(usage / 100)}k+`;
    return usage.toString();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Menu Navigation</h1>
        <p className="text-gray-600">
          Organized overview of all {menuCategories.reduce((acc, cat) => acc + cat.pages.length, 0)} platform pages
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
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

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className={`${category.bgColor} transition-all duration-200`}>
            <CardHeader 
              className="cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-white ${category.color}`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>
                </div>
                {expandedCategory === category.id ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </div>
            </CardHeader>

            <AnimatePresence>
              {expandedCategory === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {category.pages.map((page) => (
                        <motion.div
                          key={page.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Card 
                            className={`p-3 cursor-pointer hover:shadow-md transition-shadow bg-white border border-gray-200 hover:border-gray-300`}
                            onClick={() => handlePageClick(page.path)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-1 rounded bg-gray-100">
                                  <page.icon className="h-4 w-4 text-gray-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm">{page.name}</h4>
                                  <p className="text-xs text-gray-500">{page.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
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
                                <Badge variant="outline" className="text-xs">
                                  {formatUsage(page.usage || 0)}
                                </Badge>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-medium">Total Pages</p>
                <p className="text-2xl font-bold text-blue-800">
                  {menuCategories.reduce((acc, cat) => acc + cat.pages.length, 0)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 font-medium">Most Popular</p>
                <p className="text-lg font-bold text-green-800">Property Search</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 font-medium">AI Features</p>
                <p className="text-lg font-bold text-purple-800">12 Pages</p>
              </div>
              <Bot className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 font-medium">Content Updates</p>
                <p className="text-lg font-bold text-orange-800">Today: 3</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartMenuCategories;
