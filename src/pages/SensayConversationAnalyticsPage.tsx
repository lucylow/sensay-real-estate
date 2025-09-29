import React from 'react';
import { SensayConversationAnalytics } from '@/components/SensayConversationAnalytics';
import { SensayConversationViewer } from '@/components/SensayConversationViewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, MessageSquare, Activity } from 'lucide-react';

export default function SensayConversationAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Sensay Conversation Analytics
              </h1>
              <p className="text-gray-600">
                Advanced conversation analysis and real-time insights powered by Sensay API
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="flex items-center space-x-2">
              <span>Organization ID:</span>
              <code className="text-xs">E0b1218c-e817-4994-a45b-43e092bd6d4b</code>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-2">
              <span>API Version:</span>
              <code className="text-xs">2025-03-25</code>
            </Badge>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Historical Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                30-day conversation growth trends with cumulative data and daily growth calculations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <span>Source Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Platform distribution across web, telegram, discord, embed, and other sources
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Activity className="h-5 w-5 text-purple-600" />
                <span>Real-time Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Live conversation tracking with cursor-based pagination and placeholder expansion
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="conversations" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Conversation Viewer</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <SensayConversationAnalytics />
          </TabsContent>

          <TabsContent value="conversations">
            <SensayConversationViewer />
          </TabsContent>
        </Tabs>

        {/* API Documentation Reference */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>API Implementation Details</CardTitle>
            <CardDescription>
              Comprehensive Sensay API integration with cursor-based pagination and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Conversation Features</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Cursor-based pagination with beforeUUID/afterUUID</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Mention groups with replica interactions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Placeholder expansion for collapsed messages</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Real-time message loading and caching</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Analytics Features</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>30-day historical conversation trends</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Source distribution across platforms</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Daily growth calculations and trends</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Interactive charts and visualizations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Sensay API Endpoints Used</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <code className="bg-white px-2 py-1 rounded text-xs block mb-2">
                    GET /v1/replicas/{'{replicaUUID}'}/conversations/{'{conversationUUID}'}/mentions
                  </code>
                  <span className="text-gray-600">Retrieve conversation mentions with pagination</span>
                </div>
                <div>
                  <code className="bg-white px-2 py-1 rounded text-xs block mb-2">
                    GET /v1/replicas/{'{replicaUUID}'}/conversations/{'{conversationUUID}'}/messages
                  </code>
                  <span className="text-gray-600">Expand placeholder messages</span>
                </div>
                <div>
                  <code className="bg-white px-2 py-1 rounded text-xs block mb-2">
                    GET /v1/replicas/{'{replicaUUID}'}/analytics/conversations/historical
                  </code>
                  <span className="text-gray-600">30-day conversation history</span>
                </div>
                <div>
                  <code className="bg-white px-2 py-1 rounded text-xs block mb-2">
                    GET /v1/replicas/{'{replicaUUID}'}/analytics/conversations/sources
                  </code>
                  <span className="text-gray-600">Source distribution analytics</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
