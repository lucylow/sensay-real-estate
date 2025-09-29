import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TestPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Page</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a test page to verify that basic components are working.</p>
          <Button className="mt-4">Test Button</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestPage;


