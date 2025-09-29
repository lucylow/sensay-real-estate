import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
}

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  score: number;
}

interface PerformanceMemory {
  usedJSHeapSize?: number;
}

export const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  children,
  fallback,
  threshold = 2 // seconds
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const startTime = performance.now();
    const startMemory = (performance as PerformanceMemory).memory?.usedJSHeapSize || 0;

    // Simulate async component loading
    const loadTimer = setTimeout(() => {
      const endTime = performance.now();
      const endMemory = (performance as PerformanceMemory).memory?.usedJSHeapSize || 0;
      
      const loadTime = endTime - startTime;
      const renderTime = performance.now() - startTime;
      const memoryUsage = endMemory - startMemory;

      // Calculate performance score (0-100)
      const score = Math.max(0, Math.min(100, 
        100 - (loadTime / threshold) * 10 - (memoryUsage / 1024 / 1024) * 0.1
      ));

      setMetrics({
        loadTime,
        renderTime,
        memoryUsage,
        score
      });

      setIsLoading(false);
    }, 100); // Minimum load time simulation

    return () => clearTimeout(loadTimer);
  }, [threshold]);

  const formatBytes = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  const formatTime = (time: number) => {
    return time.toFixed(2) + ' ms';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return '🚀';
    if (score >= 60) return '⚡';
    return '🐌';
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center p-8"
          >
            {fallback || (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-sm text-gray-600">Optimizing performance...</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {children}

            {/* Performance Indicator (Development Only) */}
            {process.env.NODE_ENV === 'development' && metrics && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{getScoreIcon(metrics.score)}</span>
                  <span className={`font-bold ${getScoreColor(metrics.score)}`}>
                    Score: {metrics.score.toFixed(0)}/100
                  </span>
                </div>
                <div className="space-y-1 text-gray-300">
                  <div>Load: {formatTime(metrics.loadTime)}</div>
                  <div>Render: {formatTime(metrics.renderTime)}</div>
                  <div>Memory: {formatBytes(metrics.memoryUsage)}</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hook for measuring component performance
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  const measurePerformance = (callback: () => void) => {
    const startTime = performance.now();
    const startMemory = (performance as PerformanceMemory).memory?.usedJSHeapSize || 0;

    requestAnimationFrame(() => {
      callback();
      
      requestAnimationFrame(() => {
        const endTime = performance.now();
        const endMemory = (performance as PerformanceMemory).memory?.usedJSHeapSize || 0;

        setMetrics({
          loadTime: endTime - startTime,
          renderTime: performance.now() - startTime,
          memoryUsage: endMemory - startMemory,
          score: Math.max(0, Math.min(100, 
            100 - ((endTime - startTime) / 2) * 10 - ((endMemory - startMemory) / 1024 / 1024) * 0.1
          ))
        });
      });
    });
  };

  return { metrics, measurePerformance };
};

export default PerformanceOptimizer;
