import React from 'react';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { PropertyShowcase } from '@/components/PropertyShowcase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const EnhancedDashboard = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Tabs defaultValue="showcase" className="w-full">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="showcase">Property Showcase</TabsTrigger>
            <TabsTrigger value="dashboard">Analytics</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="showcase" className="mt-0">
          <PropertyShowcase />
        </TabsContent>
        
        <TabsContent value="dashboard" className="mt-0">
          <Dashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedDashboard;