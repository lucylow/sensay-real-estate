import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, CreditCard, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CheckoutDialogProps {
  trigger: React.ReactNode;
  plan: {
    name: string;
    price: string;
    period?: string;
    features: string[];
  };
}

export const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ trigger, plan }) => {
  const [checkoutStage, setCheckoutStage] = useState<'details' | 'processing' | 'success'>('details');
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const mockPaymentData = {
    orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    transactionId: 'txn_' + Math.random().toString(36).substr(2, 16),
    billingCycle: plan.period ? 'Monthly' : 'One-time',
    nextBilling: plan.period ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString() : null,
    paymentMethod: '**** **** **** 4242',
    receipt: 'https://pay.stripe.com/receipts/' + Math.random().toString(36).substr(2, 16)
  };

  const handleCheckout = async () => {
    setCheckoutStage('processing');
    setProgress(0);

    // Simulate payment processing
    const stages = [
      'Validating payment details...',
      'Processing with Stripe...',
      'Confirming subscription...',
      'Setting up your account...'
    ];

    for (let i = 0; i < stages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * 25);
    }

    setCheckoutStage('success');
    toast({
      title: "Payment Successful!",
      description: `Welcome to ${plan.name}! Your subscription is now active.`,
    });
  };

  const simulateStripeRedirect = () => {
    // This would normally redirect to Stripe Checkout
    toast({
      title: "Redirecting to Stripe...",
      description: "In a real implementation, this would open Stripe Checkout.",
    });
    
    // Simulate the redirect and return flow
    setTimeout(() => {
      handleCheckout();
    }, 1500);
  };

  const resetDialog = () => {
    setCheckoutStage('details');
    setProgress(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetDialog();
    }}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{plan.name} Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.period ? 'Monthly subscription' : 'One-time purchase'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{plan.price}</div>
                  {plan.period && <div className="text-sm text-muted-foreground">{plan.period}</div>}
                </div>
              </div>

              <div className="border-t pt-3">
                <h4 className="font-medium mb-2">Included Features:</h4>
                <ul className="space-y-1">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-sm text-muted-foreground">
                      +{plan.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>

              {plan.period && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">14-day free trial</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">
                    Cancel anytime during trial period. No charges until trial ends.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Checkout Stages */}
          {checkoutStage === 'details' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded mr-3"></div>
                          <span className="font-medium">Stripe Secure Checkout</span>
                        </div>
                        <Badge variant="secondary">Recommended</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Secure payment processing with 256-bit SSL encryption
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Lock className="w-4 h-4 mr-1" />
                        SSL Secured
                      </div>
                      <div>• PCI Compliant</div>
                      <div>• 30-day refund policy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={simulateStripeRedirect} className="w-full" size="lg">
                <CreditCard className="w-4 h-4 mr-2" />
                Continue to Stripe Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <p className="text-center text-xs text-muted-foreground">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          )}

          {/* Processing State */}
          {checkoutStage === 'processing' && (
            <div className="space-y-6 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Processing your payment...</h3>
                <p className="text-muted-foreground mb-4">
                  Please don't close this window. This may take a few moments.
                </p>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-800">Securing your subscription...</span>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {checkoutStage === 'success' && (
            <div className="space-y-6">
              <div className="text-center bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-green-700">
                  Welcome to {plan.name}! Your subscription is now active.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Order ID:</span>
                      <p className="font-mono">{mockPaymentData.orderId}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <p className="font-mono text-xs">{mockPaymentData.transactionId}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Payment Method:</span>
                      <p className="font-mono">{mockPaymentData.paymentMethod}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Billing Cycle:</span>
                      <p>{mockPaymentData.billingCycle}</p>
                    </div>
                    {mockPaymentData.nextBilling && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Next Billing Date:</span>
                        <p>{mockPaymentData.nextBilling}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => window.open(mockPaymentData.receipt, '_blank')}
                      className="flex-1"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Receipt
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => toast({ title: "Redirecting to dashboard..." })}
                      className="flex-1"
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={() => setIsOpen(false)} 
                className="w-full"
                variant="secondary"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};