import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SensayWisdomChatbot from '@/components/SensayWisdomChatbot';

export default function SensayWisdomChatbotPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/sensay-wisdom">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Wisdom
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Sensay Wisdom Engine</h1>
                  <p className="text-sm text-gray-600">Advanced AI-powered real estate assistant</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-xs">
                Organization ID: E0b1218c-e817-4994-a45b-43e092bd6d4b
              </Badge>
              <Badge className="bg-green-100 text-green-800 text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chatbot */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-blue-600" />
                  Live Chat with Sensay Wisdom
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <SensayWisdomChatbot className="h-full" />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organization Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  API Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm mb-1">Organization ID</h4>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block">
                    E0b1218c-e817-4994-a45b-43e092bd6d4b
                  </code>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">API Version</h4>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block">
                    2025-03-25
                  </code>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Status</h4>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active & Integrated
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Active Features */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Wisdom Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge className="bg-blue-100 text-blue-800 w-full justify-start">
                    <Brain className="h-3 w-3 mr-1" />
                    Enhanced AI
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 w-full justify-start">
                    <Brain className="h-3 w-3 mr-1" />
                    Market Intelligence
                  </Badge>
                  <Badge className="bg-red-100 text-red-800 w-full justify-start">
                    <Brain className="h-3 w-3 mr-1" />
                    Risk Assessment
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 w-full justify-start">
                    <Brain className="h-3 w-3 mr-1" />
                    Smart Reports
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-800 w-full justify-start">
                    <Brain className="h-3 w-3 mr-1" />
                    Voice & Audio
                  </Badge>
                  <Badge className="bg-pink-100 text-pink-800 w-full justify-start">
                    <Brain className="h-3 w-3 mr-1" />
                    Video Avatars
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link to="/sensay-analytics">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Brain className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </Link>
                  <Link to="/sensay-features">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Brain className="h-4 w-4 mr-2" />
                      All Features
                    </Button>
                  </Link>
                  <Link to="/sensay-dashboard">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Brain className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <Badge variant="outline" className="text-xs">
                      < 2s
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Accuracy</span>
                    <Badge variant="outline" className="text-xs">
                      95%+
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Languages</span>
                    <Badge variant="outline" className="text-xs">
                      50+
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Uptime</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      99.9%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
