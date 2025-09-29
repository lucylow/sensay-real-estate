import React, { useState } from 'react';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { PropertyShowcase } from '@/components/PropertyShowcase';
import { EnhancedNavigation } from '@/components/navigation/EnhancedNavigation';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { BreadcrumbNavigation } from '@/components/navigation/BreadcrumbNavigation';
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
      description: 'Property portfolio overview'
    },
    {
      id: 'showcase',
      label: 'Property Showcase',
      icon: Home,
      description: 'Browse and showcase properties'
    },
    {
      id: 'analytics',
      label: 'Analytics Dashboard',
      icon: BarChart3,
      description: 'Advanced analytics and insights'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      description: 'Generate and view reports'
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
    <div className="min-h-screen bg-gradient-subtle">
      {/* Enhanced Navigation */}
      <div className="hidden md:block">
        <EnhancedNavigation />
      </div>
      
      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Breadcrumbs */}
      <BreadcrumbNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="py-8">
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-foreground">
                PropGuard Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your property portfolio with AI-powered insights and analytics
              </p>
            </motion.div>
          </div>

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
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              {stat.title}
                            </p>
                            <p className="text-2xl font-bold text-foreground">
                              {stat.value}
                            </p>
                            <Badge 
                              variant={stat.trend === 'up' ? 'default' : 'secondary'}
                              className="mt-2 text-xs"
                            >
                              {stat.change}
                            </Badge>
                          </div>
                          <Icon className={`h-8 w-8 ${stat.color}`} />
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
              <div className="mb-6">
                <TabsList className="grid w-full max-w-4xl grid-cols-4">
                  {tabOptions.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <TabsTrigger 
                        key={tab.id} 
                        value={tab.id}
                        className="flex items-center gap-2"
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