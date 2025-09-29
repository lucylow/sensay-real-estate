import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';

const SystemHealth = () => {
  const services = [
    { name: 'PropGuard', status: 'healthy' },
    { name: 'LLM Service', status: 'healthy' },
    { name: 'Blockchain', status: 'warning' },
    { name: 'Analytics', status: 'healthy' }
  ];
  
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <span className="text-sm font-medium">{service.name}</span>
                <Badge 
                  variant={service.status === 'healthy' ? 'default' : 'destructive'}
                >
                  {service.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealth;