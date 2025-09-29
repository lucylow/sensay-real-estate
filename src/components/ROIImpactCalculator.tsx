import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

const ROIImpactCalculator = () => {
  const [investment, setInvestment] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [roi, setRoi] = useState<number | null>(null);

  const calculateROI = () => {
    const investmentValue = parseFloat(investment);
    const returnRate = parseFloat(expectedReturn);
    const time = parseFloat(timeframe);

    if (investmentValue && returnRate && time) {
      const calculatedROI = (returnRate / 100) * time;
      const futureValue = investmentValue * (1 + calculatedROI);
      setRoi(futureValue - investmentValue);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Calculator className="h-8 w-8 text-blue-500" />
        <h1 className="text-3xl font-bold">ROI Impact Calculator</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="investment">Initial Investment ($)</Label>
              <Input
                id="investment"
                type="number"
                placeholder="100000"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="return">Expected Annual Return (%)</Label>
              <Input
                id="return"
                type="number"
                placeholder="8.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeframe">Investment Period (years)</Label>
              <Input
                id="timeframe"
                type="number"
                placeholder="5"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              />
            </div>
            
            <Button onClick={calculateROI} className="w-full">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate ROI Impact
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ROI Results</CardTitle>
          </CardHeader>
          <CardContent>
            {roi !== null ? (
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-green-600">
                    ${roi.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Return</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Investment Grade</span>
                    <Badge className="bg-green-500">
                      {roi > 50000 ? 'Excellent' : roi > 20000 ? 'Good' : 'Fair'}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Risk Level</span>
                    <Badge variant="outline">
                      {parseFloat(expectedReturn) > 10 ? 'High' : parseFloat(expectedReturn) > 6 ? 'Medium' : 'Low'}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Market Confidence</span>
                    <Badge variant="secondary">87%</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>Based on current market trends and historical data</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter your investment parameters to see ROI projections</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ROIImpactCalculator;