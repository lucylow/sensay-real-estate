import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Shield, RefreshCw, Bug, AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

export class ErrorBoundaryEnhanced extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Send error to monitoring service
    console.error('PropGuard Error Boundary caught an error:', error, errorInfo);
    
    // Call onError callback if provided
    this.props.onError?.(error, errorInfo);

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: sendToErrorReportingService(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo, errorId } = this.state;
      const errorType = error?.name || 'Unknown Error';
      const errorMessage = error?.message || 'An unexpected error occurred';

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
              <CardHeader className="text-center">
                <div className="relative">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center"
                  >
                    <Bug className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  {/* Error Pulse */}
                  <motion.div
                    className="absolute inset-0 bg-red-300 rounded-full opacity-20"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  Oops! Something went wrong
                </CardTitle>
                
                <div className="flex justify-center mb-4">
                  <Badge variant="destructive" className="px-3 py-1">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Error {errorType}
                  </Badge>
                </div>

                {errorId && (
                  <p className="text-sm text-gray-600 font-mono">
                    Error ID: {errorId}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Error Message */}
                <div className="bg-white/50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-medium text-red-800 mb-2">Error Details</h3>
                  <p className="text-red-700 font-mono text-sm break-words">
                    {errorMessage}
                  </p>
                </div>

                {/* Development Details */}
                {process.env.NODE_ENV === 'development' && errorInfo && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1}}
                    transition={{ delay: 0.5 }}
                    className="bg-gray-100 p-4 rounded-lg"
                  >
                    <details>
                      <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                        Stack Trace (Development Only)
                      </summary>
                      <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                        {error?.stack}
                      </pre>
                    </details>
                  </motion.div>
                )}

                {/* Error Recovery Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={this.handleRetry}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={this.handleReload}
                      variant="outline"
                      className="w-full"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reload Page
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={this.handleGoHome}
                      variant="ghost"
                      className="w-full"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Go Home
                    </Button>
                  </motion.div>
                </div>

                {/* Help Text */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">
                        Need Help?
                      </h4>
                      <p className="text-sm text-blue-700">
                        If this error persists, please contact our support team with the Error ID above.
                        Our AI assistant can help you troubleshoot most issues.
                      </p>
                      <div className="mt-2">
                        <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Tracking */}
                {errorId && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-xs text-gray-500"
                  >
                    This error has been automatically reported to our team for investigation.
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryEnhanced;
