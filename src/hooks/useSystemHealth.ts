import { useState, useEffect, useCallback } from 'react';
import { propGuardAPI } from '@/services/api/propguard';
import { getCollinsStreetSystemHealth } from '@/data/mockData';

interface SystemHealth {
  propguard: any;
  llm: any;
  blockchain: any;
  xnode: any;
  pipeline: any;
}

export const useSystemHealth = () => {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkHealth = useCallback(async () => {
    setIsLoading(true);
    try {
      // Use mock health data for demo purposes
      const healthData = getCollinsStreetSystemHealth();
      setHealth(healthData);
    } catch (error) {
      console.error('Health check failed:', error);
      // Fallback to mock data
      const healthData = getCollinsStreetSystemHealth();
      setHealth(healthData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [checkHealth]);

  const getServiceStatus = (service: any) => {
    if (!service) return 'offline';
    return service.success ? 'online' : 'error';
  };

  return {
    health,
    isLoading,
    checkHealth,
    getServiceStatus
  };
};