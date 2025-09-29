import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Search, 
  BarChart3, 
  Bot, 
  CheckCircle, 
  ArrowRight, 
  X, 
  Sparkles,
  Globe,
  MessageCircle,
  TrendingUp,
  Building
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: string;
  action?: {
    label: string;
    href: string;
  };
}

interface OnboardingTourProps {
  className?: string;
  onComplete?: () => void;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to PropGuard AI',
    description: 'Your intelligent real estate platform powered by Sensay\'s advanced AI technology.',
    icon: Shield,
    highlight: 'intelligent'
  },
  {
    id: 'dashboard',
    title: 'Your Command Center',
    description: 'Access analytics, property insights, and market trends all in one place.',
    icon: BarChart3,
    highlight: 'analytics'
  },
  {
    id: 'search',
    title: 'Smart Property Search',
    description: 'Find properties with AI-powered analysis, risk assessment, and valuation insights.',
    icon: Search,
    highlight: 'AI-powered'
  },
  {
    id: 'ai-assistant',
    title: 'Your AI Assistant',
    description: 'Get instant property insights, market analysis, and expert advice from our Sensay-powered chatbot.',
    icon: Bot,
    highlight: 'Instant'
  },
  {
    id: 'market-analysis',
    title: 'Market Intelligence',
    description: 'Stay ahead with real-time market trends, investment opportunities, and regional insights.',
    icon: TrendingUp,
    highlight: 'real-time'
  },
  {
    id: 'integrations',
    title: 'Multi-Channel Access',
    description: 'Access PropGuard AI through web, Telegram, Discord, and WhatsApp for maximum convenience.',
    icon: Globe,
    highlight: 'Multi-Channel'
  }
];

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ className, onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Check if onboarding has been completed
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('propguard-onboarding-completed');
    if (!hasCompletedOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    const step = onboardingSteps[currentStep];
    setCompletedSteps(prev => [...prev, step.id]);
    
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsOpen(false);
    localStorage.setItem('propguard-onboarding-completed', 'true');
    onComplete?.();
  };

  const currentOnboardingStep = onboardingSteps[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md"
            >
              <Card className="overflow-hidden">
                <CardHeader className="relative bg-gradient-to-br from-blue-50 to-indigo-50 pb-8">
                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4"
                    onClick={handleSkip}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  {/* Progress Bar */}
                  <div className="absolute top-14 left-4 right-4">
                    <div className="w-full bg-blue-100 rounded-full h-2">
                      <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-blue-600 font-medium">
                        Step {currentStep + 1} of {onboardingSteps.length}
                      </span>
                      <div className="flex space-x-1">
                        {onboardingSteps.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index <= currentStep ? 'bg-blue-600' : 'bg-blue-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Welcome Badge */}
                  {currentStep === 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                    >
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1">
                        <Sparkles className="h-3 w-3 mr-1" />
                        New Feature
                      </Badge>
                    </motion.div>
                  )}

                  {/* Icon and Title */}
                  <div className="text-center mt-8">
                    <motion.div
                      key={currentStep}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4"
                    >
                      <currentOnboardingStep.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    <motion.h2
                      key={`title-${currentStep}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold text-gray-900 mb-2"
                    >
                      {currentOnboardingStep.title}
                    </motion.h2>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <motion.p
                    key={`desc-${currentStep}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 text-center leading-relaxed mb-6"
                  >
                    {currentOnboardingStep.description.split(' ').map((word, index) => {
                      const isHighlight = word.replace(/[^\w]/g, '') === currentOnboardingStep.highlight?.replace(/[^\w]/g, '');
                      return (
                        <span
                          key={index}
                          className={isHighlight ? 'text-blue-600 font-semibold' : ''}
                        >
                          {word}{' '}
                        </span>
                      );
                    })}
                  </motion.p>

                  {/* Action Button for specific steps */}
                  {currentOnboardingStep.action && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-4"
                    >
                      <Button className="w-full" variant="outline" size="sm">
                        Try {currentOnboardingStep.action.label}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}

                  {/* Features Preview */}
                  {currentStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 0.5 }}
                      className="space-y-3 mb-6"
                    >
                      <div className="text-sm font-medium text-gray-700 mb-3">Key Features:</div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>Real Estate AI</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>Risk Analysis</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>Market Insights</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>Multi-Channel</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    {currentStep > 0 ? (
                      <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="text-gray-500"
                      >
                        ← Back
                      </Button>
                    ) : (
                      <div />
                    )}

                    <div className="flex space-x-2">
                      {currentStep < onboardingSteps.length - 1 ? (
                        <>
                          <Button variant="ghost" onClick={handleSkip}>
                            Skip Tour
                          </Button>
                          <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                            Next
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </>
                      ) : (
                        <Button onClick={handleComplete} className="bg-gradient-to-r from-green-600 to-emerald-600 w-full">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Get Started
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingTour;
