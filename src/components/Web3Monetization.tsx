import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Coins, Crown, Zap, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PricingTier {
  name: string;
  priceAUD: number;
  priceETH: number;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Explorer",
    priceAUD: 0,
    priceETH: 0,
    features: ["Basic valuation", "Standard risk score", "1 report/month"],
    icon: <Zap className="h-6 w-6" />
  },
  {
    name: "Investor",
    priceAUD: 29,
    priceETH: 0.012,
    features: ["Advanced valuation", "Risk breakdown", "10 reports/month", "Portfolio tracking"],
    popular: true,
    icon: <Crown className="h-6 w-6" />
  },
  {
    name: "Professional", 
    priceAUD: 99,
    priceETH: 0.04,
    features: ["Unlimited valuations", "API access", "APRA compliance", "Priority support"],
    icon: <Shield className="h-6 w-6" />
  }
];

export default function Web3Monetization() {
  const [selectedTier, setSelectedTier] = useState<PricingTier>(PRICING_TIERS[1]);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'stripe' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleCryptoPayment = async () => {
    setIsProcessing(true);
    // Simulate Web3 payment
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const handleStripePayment = async () => {
    setIsProcessing(true);
    // Simulate Stripe payment
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            ✅
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Welcome to the <span className="font-semibold text-primary">{selectedTier.name}</span> plan
        </p>
        <Button onClick={() => window.location.reload()} size="lg">
          Start Using Premium Features
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-lg text-muted-foreground">
          Unlock premium property intelligence with flexible payment options
        </p>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRICING_TIERS.map((tier) => (
          <motion.div
            key={tier.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`relative cursor-pointer transition-all ${
                selectedTier.name === tier.name 
                  ? 'ring-2 ring-primary border-primary' 
                  : 'hover:border-primary/50'
              } ${tier.popular ? 'border-primary' : ''}`}
              onClick={() => setSelectedTier(tier)}
            >
              {tier.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                  {tier.icon}
                </div>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">
                    {tier.priceAUD === 0 ? 'Free' : `$${tier.priceAUD}`}
                    {tier.priceAUD > 0 && <span className="text-sm text-muted-foreground">/month</span>}
                  </div>
                  {tier.priceAUD > 0 && (
                    <div className="text-sm text-muted-foreground">
                      or {tier.priceETH} ETH
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Payment Section */}
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Complete Purchase</CardTitle>
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span>Plan:</span>
              <span className="font-semibold">{selectedTier.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-bold text-primary">
                {selectedTier.priceAUD === 0 ? 'Free' : `$${selectedTier.priceAUD} AUD`}
              </span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {selectedTier.priceAUD > 0 ? (
            <>
              <Button
                onClick={handleCryptoPayment}
                disabled={isProcessing}
                className="w-full"
                variant="default"
              >
                <Coins className="h-4 w-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Pay with Crypto'}
              </Button>
              
              <Button
                onClick={handleStripePayment}
                disabled={isProcessing}
                className="w-full"
                variant="outline"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Pay with Card'}
              </Button>
              
              <div className="text-center text-xs text-muted-foreground">
                🔒 Secure payments powered by Stripe & Web3
              </div>
            </>
          ) : (
            <Button 
              onClick={() => setPaymentSuccess(true)}
              className="w-full"
            >
              Get Free Plan
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="text-center p-6 rounded-lg bg-muted/20">
          <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 className="font-semibold mb-2">APRA Compliant</h3>
          <p className="text-sm text-muted-foreground">Meet regulatory requirements</p>
        </div>
        
        <div className="text-center p-6 rounded-lg bg-muted/20">
          <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Instant Results</h3>
          <p className="text-sm text-muted-foreground">Get valuations in seconds</p>
        </div>
        
        <div className="text-center p-6 rounded-lg bg-muted/20">
          <Crown className="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Premium Data</h3>
          <p className="text-sm text-muted-foreground">Australia-wide coverage</p>
        </div>
      </div>
    </div>
  );
}