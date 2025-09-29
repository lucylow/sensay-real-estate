import { useState, useEffect, useCallback } from 'react';
import { propGuardAPI } from '@/services/api/propguard';
import { getMainStreetSystemHealth } from '@/data/mockData';

interface SystemHealth {
  propguard: Record<string, unknown> | null;
  llm: Record<string, unknown> | null;
  blockchain: Record<string, unknown> | null;
  xnode: Record<string, unknown> | null;
  pipeline: Record<string, unknown> | null;
}

export const useSystemHealth = () => {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkHealth = useCallback(async () => {
    setIsLoading(true);
    try {
      // Use mock health data for demo purposes
      const healthData = getMainStreetSystemHealth();
      setHealth(healthData);
    } catch (error) {
      console.error('Health check failed:', error);
      // Fallback to mock data
      const healthData = getMainStreetSystemHealth();
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

  const getServiceStatus = (service: Record<string, unknown> | null) => {
    if (!service) return 'offline';
    return (service.success as boolean) ? 'online' : 'error';
  };

  return {
    health,
    isLoading,
    checkHealth,
    getServiceStatus
  };
};