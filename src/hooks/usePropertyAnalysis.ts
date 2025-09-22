import { useState, useCallback } from 'react';
import { PropertyAnalysis, SentimentAnalysis, MarketSentiment } from '@/types/property';
import { propertyDataService, DataMode, FireRiskData } from '@/services/propertyDataService';

export const usePropertyAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<PropertyAnalysis | null>(null);
  const [sentiment, setSentiment] = useState<SentimentAnalysis | null>(null);
  const [marketSentiment, setMarketSentiment] = useState<MarketSentiment | null>(null);
  const [fireRisk, setFireRisk] = useState<FireRiskData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dataMode, setDataMode] = useState<DataMode>('demo');
  const [dataSource, setDataSource] = useState<string>('');
  const [apiHealth, setApiHealth] = useState<any>(null);

  const analyzeProperty = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      propertyDataService.setDataMode(dataMode);
      const result = await propertyDataService.analyzeProperty(query);
      
      setAnalysis(result.analysis);
      setSentiment(result.sentiment);
      setMarketSentiment(result.marketSentiment);
      setFireRisk(result.fireRisk);
      setDataSource(result.dataSource);
      setError(result.error);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsLoading(false);
    }
  }, [dataMode]);

  const clearAnalysis = useCallback(() => {
    setAnalysis(null);
    setSentiment(null);
    setMarketSentiment(null);
    setFireRisk(null);
    setError(null);
    setDataSource('');
  }, []);

  const checkAPIHealth = useCallback(async () => {
    try {
      const health = await propertyDataService.checkAPIHealth();
      setApiHealth(health);
    } catch (error) {
      console.error('Failed to check API health:', error);
      setApiHealth({ propguard: false, realtybase: false, supabase: false, nasa: false });
    }
  }, []);

  const handleDataModeChange = useCallback((mode: DataMode) => {
    setDataMode(mode);
    propertyDataService.setDataMode(mode);
  }, []);

  return {
    isLoading,
    analysis,
    sentiment,
    marketSentiment,
    fireRisk,
    error,
    dataMode,
    dataSource,
    apiHealth,
    analyzeProperty,
    clearAnalysis,
    checkAPIHealth,
    setDataMode: handleDataModeChange
  };
};