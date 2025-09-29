import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Loader2, 
  BarChart3, 
  Building, 
  TrendingUp,
  Search,
  Bot,
  Globe
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LoadingStateProps {
  type?: 'page' | 'component' | 'minimal';
  message?: string;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  type = 'component', 
  message, 
  className = '',
  icon
}) => {
  const getDefaultMessage = () => {
    switch (type) {
      case 'page':
        return 'Loading PropGuard AI...';
      case 'component':
        return 'Processing...';
      case 'minimal':
        return 'Loading...';
      default:
        return message || 'Loading...';
    }
  };

  const getDefaultIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'page':
        return Shield;
      case 'component':
        return BarChart3;
      case 'minimal':
        return Loader2;
      default:
        return Loader2;
    }
  };

  const DisplayIcon = getDefaultIcon();
  const displayMessage = message || getDefaultMessage();

  if (type === 'minimal') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="h-4 w-4 text-blue-600" />
        </motion.div>
        {displayMessage && (
          <span className="ml-2 text-sm text-gray-600">{displayMessage}</span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Main Icon */}
            <motion.div
              className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
            >
              <DisplayIcon className="h-8 w-8 text-white" />
            </motion.div>

            {/* Rotating Orbital Elements */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute top-2 left-1/2 w-3 h-3 bg-blue-300 rounded-full transform -translate-x-1/2" />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-indigo-300 rounded-full" />
              <div className="absolute top-4 right-4 w-2 h-2 bg-purple-300 rounded-full" />
            </motion.div>

            {/* Pulse Animation */}
            <motion.div
              className="absolute inset-0 bg-blue-200 rounded-2xl opacity-20"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
            />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-semibold text-gray-900 mb-2"
          >
            {displayMessage}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <div className="flex justify-center space-x-1">
              {['PropGuard', 'Sensay AI', 'Analysis'].map((text, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                >
                  {text}
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ delay: 1, duration: 2, repeat: Infinity }}
              className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto"
            />
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingState;
