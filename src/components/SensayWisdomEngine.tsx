import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Bot, Server } from 'lucide-react';

const SensayWisdomEngine = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Sensay Wisdom Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                <span className="text-sm">Search Integration</span>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                <span className="text-sm">Data Processing</span>
                <Badge variant="outline">Active</Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600">
                AI-powered wisdom engine for property insights and recommendations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensayWisdomEngine;