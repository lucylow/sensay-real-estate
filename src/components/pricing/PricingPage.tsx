import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckoutDialog } from './CheckoutDialog';

export const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for small teams getting started',
      features: [
        '5 valuations per month',
        'Basic risk assessment',
        'Email support',
        'Standard reporting'
      ],
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$299',
      period: '/month',
      description: 'Ideal for growing real estate businesses',
      features: [
        '100 valuations per month',
        'Advanced risk analysis',
        'Priority support',
        'Custom reporting',
        'API access',
        'APRA compliance reporting'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations with custom needs',
      features: [
        'Unlimited valuations',
        'AI-powered analytics',
        'Dedicated support',
        'White-label solution',
        'Advanced API access',
        'Custom integrations',
        'Blockchain NFT certificates',
        'Real-time monitoring'
      ],
      highlighted: false
    }
  ];

  const apiPricing = [
    { tier: 'Per Valuation Request', price: '$0.50', description: 'Pay as you go pricing' },
    { tier: 'NFT Minting', price: '$5.00', description: 'Blockchain certificate creation' },
    { tier: 'APRA Compliance Report', price: '$25.00', description: 'Regulatory compliance documentation' },
    { tier: 'Bulk Pricing (1000+ requests)', price: '$0.30', description: 'Volume discount available' }
  ];

  return (
    <div className="space-y-8">
      {/* Main Pricing Plans */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-muted-foreground">
            Start free, upgrade when you need more power
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.highlighted ? 'border-primary ring-2 ring-primary ring-opacity-20' : ''}`}>
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {plan.name === 'Enterprise' ? (
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => window.open('mailto:sales@propguard.ai', '_blank')}
                  >
                    Contact Sales
                  </Button>
                ) : plan.name === 'Starter' ? (
                  <Button 
                    className="w-full"
                    variant="outline"
                  >
                    Get Started Free
                  </Button>
                ) : (
                  <CheckoutDialog
                    plan={plan}
                    trigger={
                      <Button className="w-full">
                        Start Free Trial
                      </Button>
                    }
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* API Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>API Pricing</CardTitle>
          <p className="text-muted-foreground">
            Flexible pay-per-use pricing for developers and integrations
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apiPricing.map((item) => (
              <div key={item.tier} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{item.tier}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="text-xl font-bold text-primary">{item.price}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-center p-2">Starter</th>
                  <th className="text-center p-2">Professional</th>
                  <th className="text-center p-2">Enterprise</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="p-2">Monthly Valuations</td>
                  <td className="text-center p-2">5</td>
                  <td className="text-center p-2">100</td>
                  <td className="text-center p-2">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Risk Analysis</td>
                  <td className="text-center p-2">Basic</td>
                  <td className="text-center p-2">Advanced</td>
                  <td className="text-center p-2">AI-Powered</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">API Access</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">✅ Advanced</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Blockchain NFTs</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">APRA Compliance</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">✅ Enhanced</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Support</td>
                  <td className="text-center p-2">Email</td>
                  <td className="text-center p-2">Priority</td>
                  <td className="text-center p-2">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">How does the free trial work?</h4>
            <p className="text-sm text-muted-foreground">
              Get full access to Professional features for 14 days. No credit card required.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Can I change plans anytime?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards, bank transfers, and cryptocurrency payments.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Is there a setup fee?</h4>
            <p className="text-sm text-muted-foreground">
              No setup fees for any plan. Enterprise customers get dedicated onboarding support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};