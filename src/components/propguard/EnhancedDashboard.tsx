import React, { useState } from 'react';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { PropertyShowcase } from '@/components/PropertyShowcase';
// Navigation is now provided by the shared NavigationLayout wrapper
// Remove local navigation to avoid duplicate headers/footers
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Home, 
  TrendingUp, 
  FileText, 
  Activity,
  BarChart3,
  PieChart,
  Eye
} from 'lucide-react';

export const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabOptions = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'Property portfolio overview',
      color: 'blue'
    },
    {
      id: 'showcase',
      label: 'Property Showcase',
      icon: Home,
      description: 'Browse and showcase properties',
      color: 'green'
    },
    {
      id: 'analytics',
      label: 'Analytics Dashboard',
      icon: BarChart3,
      description: 'Advanced analytics and insights',
      color: 'purple'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      description: 'Generate and view reports',
      color: 'orange'
    }
  ];

  const quickStats = [
    {
      title: 'Total Properties',
      value: '124',
      change: '+12%',
      trend: 'up',
      icon: Home,
      color: 'text-blue-600'
    },
    {
      title: 'Active Listings',
      value: '89',
      change: '上8%',
      trend: 'up',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Market Value',
      value: '$2.4M',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'AI Insights',
      value: '156',
      change: '+24%',
      trend: 'up',
      icon: Activity,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <h1 className="text-3xl font-bold">PropGuard Dashboard</h1>
              </div>
              <p className="text-blue-100 mt-1">
                Manage your property portfolio with AI-powered insights and analytics
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-500/20 text-green-100 border-green-300/30">
                <Activity className="h-3 w-3 mr-1" />
                All Systems Operational
              </Badge>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Eye className="h-4 w-4 mr-2" />
                View All Properties
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <AnimatePresence>
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-1">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 mb-2">
                            {stat.value}
                          </p>
                          <Badge 
                            className={`text-xs font-medium ${
                              stat.trend === 'up' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {stat.change}
                          </Badge>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                          <Icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8">
              <TabsList className="grid w-full max-w-4xl grid-cols-4 bg-gray-100 p-1 rounded-lg">
                {tabOptions.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id}
                      className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 text-gray-600 font-medium"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

              <TabsContent value="overview" className="mt-0">
                <div className="space-y-8">
                  {/* Welcome Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LayoutDashboard className="h-5 w-5" />
                        Welcome to PropGuard AI
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none text-muted-foreground">
                        <p>
                          Your intelligent real estate command center is ready. 
                          Explore properties, analyze markets, and leverage AI insights 
                          to make informed investment decisions.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <Button variant="outline" onClick={() => setActiveTab('showcase')}>
                            Browse Properties →
                          </Button>
                          <Button onClick={() => setActiveTab('analytics')}>
                            View Analytics →
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="showcase" className="mt-0">
                <PropertyShowcase />
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <Dashboard />
              </TabsContent>

              <TabsContent value="reports" className="mt-0">
                <div className="text-center py-20">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Reports Coming Soon
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced reporting features are in development.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;