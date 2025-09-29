import React from 'react';
import { PlatformDemoShowcase } from '@/components/demos/PlatformDemoShowcase';

export const PlatformDemosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PlatformDemoShowcase />
      </div>
    </div>
  );
};

export default PlatformDemosPage;
