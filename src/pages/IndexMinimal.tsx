import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Building, TrendingUp, BarChart3, Map, FileText, Coins, CheckCircle, AlertTriangle, Clock, Search, Globe, Zap, Users, Bot, Sparkles } from 'lucide-react';

const IndexMinimal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PropGuard AI Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Your intelligent real estate command center
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Property Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Property Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Find and analyze properties with AI-powered insights
              </p>
              <Link to="/search">
                <Button className="w-full">Search Properties</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Market Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Market Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Comprehensive market intelligence and trends
              </p>
              <Link to="/market-analysis">
                <Button className="w-full">View Analysis</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Sensay Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Sensay AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Advanced AI assistant with voice and avatar
              </p>
              <Link to="/sensay">
                <Button className="w-full">Try Sensay</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Overview of your properties and analytics
              </p>
              <Link to="/dashboard">
                <Button className="w-full">View Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Test Page */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Test Page
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Simple test page to verify functionality
              </p>
              <Link to="/test">
                <Button className="w-full">Test Components</Button>
              </Link>
            </CardContent>
          </Card>

          {/* API Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                API Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Check API configuration and status
              </p>
              <Badge variant="outline" className="mb-4">
                Supabase Connected
              </Badge>
              <div className="text-sm text-gray-500">
                APIs configured through Supabase Edge Functions
              </div>
            </CardContent>
          </Card>

          {/* Page Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                All Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Navigate to all available pages in the application
              </p>
              <Link to="/navigation">
                <Button className="w-full">View All Pages</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recent Updates
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">Fixed API configuration to use Supabase Edge Functions</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">Updated ElevenLabs and HeyGen integration</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">Improved error handling and user feedback</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexMinimal;
