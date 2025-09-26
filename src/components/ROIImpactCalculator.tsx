import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Users, 
  Target, 
  Calculator,
  BarChart3,
  PieChart,
  Calendar,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

interface AgentMetrics {
  currentLeadsPerMonth: number;
  currentConversionRate: number;
  currentTimePerLead: number; // hours
  currentCommissionPerDeal: number;
  currentDealsPerMonth: number;
  currentRevenuePerMonth: number;
}

interface ImpactMetrics {
  leadConversionImprovement: number; // percentage
  timesSaved: number; // hours per week
  revenueIncrease: number; // estimated additional commissions
  leadQualityScore: number; // vs industry average
  complianceScore: number; // regulatory adherence
  customerSatisfaction: number; // percentage
  marketShareGrowth: number; // percentage
}

interface ROICalculation {
  monthlySavings: number;
  annualSavings: number;
  additionalRevenue: number;
  totalROI: number;
  paybackPeriod: number; // months
  netPresentValue: number;
  breakEvenPoint: number; // months
}

interface CaseStudy {
  id: string;
  agentName: string;
  location: string;
  beforeMetrics: AgentMetrics;
  afterMetrics: AgentMetrics;
  impactMetrics: ImpactMetrics;
  roiCalculation: ROICalculation;
  testimonial: string;
  implementationTime: number; // weeks
}

const ROIImpactCalculator: React.FC = () => {
  const [agentMetrics, setAgentMetrics] = useState<AgentMetrics>({
    currentLeadsPerMonth: 50,
    currentConversionRate: 20,
    currentTimePerLead: 2,
    currentCommissionPerDeal: 15000,
    currentDealsPerMonth: 10,
    currentRevenuePerMonth: 150000
  });

  const [impactMetrics, setImpactMetrics] = useState<ImpactMetrics>({
    leadConversionImprovement: 40,
    timesSaved: 20,
    revenueIncrease: 25,
    leadQualityScore: 85,
    complianceScore: 95,
    customerSatisfaction: 90,
    marketShareGrowth: 15
  });

  const [roiCalculation, setROICalculation] = useState<ROICalculation | null>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    calculateROI();
    loadCaseStudies();
  }, [agentMetrics, impactMetrics]);

  const calculateROI = () => {
    // Calculate improved metrics
    const improvedConversionRate = agentMetrics.currentConversionRate * (1 + impactMetrics.leadConversionImprovement / 100);
    const improvedDealsPerMonth = agentMetrics.currentLeadsPerMonth * (improvedConversionRate / 100);
    const additionalDealsPerMonth = improvedDealsPerMonth - agentMetrics.currentDealsPerMonth;
    
    // Time savings calculation
    const timeSavedPerLead = agentMetrics.currentTimePerLead * 0.6; // 60% time reduction
    const totalTimeSavedPerMonth = agentMetrics.currentLeadsPerMonth * timeSavedPerLead;
    
    // Revenue calculations
    const additionalRevenuePerMonth = additionalDealsPerMonth * agentMetrics.currentCommissionPerDeal;
    const monthlySavings = totalTimeSavedPerMonth * 50; // $50/hour value of time
    
    // Annual calculations
    const annualSavings = monthlySavings * 12;
    const annualAdditionalRevenue = additionalRevenuePerMonth * 12;
    
    // ROI calculations
    const totalAnnualBenefit = annualSavings + annualAdditionalRevenue;
    const implementationCost = 5000; // Estimated implementation cost
    const monthlyCost = 500; // Monthly subscription cost
    const annualCost = implementationCost + (monthlyCost * 12);
    
    const totalROI = ((totalAnnualBenefit - annualCost) / annualCost) * 100;
    const paybackPeriod = implementationCost / (monthlySavings + additionalRevenuePerMonth);
    const netPresentValue = totalAnnualBenefit - annualCost;
    const breakEvenPoint = implementationCost / (monthlySavings + additionalRevenuePerMonth);

    setROICalculation({
      monthlySavings,
      annualSavings,
      additionalRevenue: annualAdditionalRevenue,
      totalROI,
      paybackPeriod,
      netPresentValue,
      breakEvenPoint
    });
  };

  const loadCaseStudies = () => {
    // Mock case studies - in production, load from database
    setCaseStudies([
      {
        id: 'case_1',
        agentName: 'Sarah Johnson',
        location: 'San Francisco, CA',
        beforeMetrics: {
          currentLeadsPerMonth: 40,
          currentConversionRate: 15,
          currentTimePerLead: 3,
          currentCommissionPerDeal: 20000,
          currentDealsPerMonth: 6,
          currentRevenuePerMonth: 120000
        },
        afterMetrics: {
          currentLeadsPerMonth: 40,
          currentConversionRate: 25,
          currentTimePerLead: 1.2,
          currentCommissionPerDeal: 20000,
          currentDealsPerMonth: 10,
          currentRevenuePerMonth: 200000
        },
        impactMetrics: {
          leadConversionImprovement: 67,
          timesSaved: 25,
          revenueIncrease: 67,
          leadQualityScore: 90,
          complianceScore: 98,
          customerSatisfaction: 95,
          marketShareGrowth: 20
        },
        roiCalculation: {
          monthlySavings: 3000,
          annualSavings: 36000,
          additionalRevenue: 96000,
          totalROI: 1840,
          paybackPeriod: 2.5,
          netPresentValue: 132000,
          breakEvenPoint: 2.5
        },
        testimonial: 'The Sensay chatbot has transformed my business. I\'m closing 67% more deals while working 25 hours less per week. The AI-powered lead qualification is incredibly accurate.',
        implementationTime: 2
      },
      {
        id: 'case_2',
        agentName: 'Michael Chen',
        location: 'Austin, TX',
        beforeMetrics: {
          currentLeadsPerMonth: 60,
          currentConversionRate: 18,
          currentTimePerLead: 2.5,
          currentCommissionPerDeal: 12000,
          currentDealsPerMonth: 11,
          currentRevenuePerMonth: 132000
        },
        afterMetrics: {
          currentLeadsPerMonth: 60,
          currentConversionRate: 28,
          currentTimePerLead: 1,
          currentCommissionPerDeal: 12000,
          currentDealsPerMonth: 17,
          currentRevenuePerMonth: 204000
        },
        impactMetrics: {
          leadConversionImprovement: 56,
          timesSaved: 18,
          revenueIncrease: 55,
          leadQualityScore: 88,
          complianceScore: 96,
          customerSatisfaction: 92,
          marketShareGrowth: 18
        },
        roiCalculation: {
          monthlySavings: 2700,
          annualSavings: 32400,
          additionalRevenue: 86400,
          totalROI: 1376,
          paybackPeriod: 3,
          netPresentValue: 118800,
          breakEvenPoint: 3
        },
        testimonial: 'I was skeptical about AI chatbots, but the results speak for themselves. My lead quality improved dramatically and I have more time to focus on closing deals.',
        implementationTime: 3
      }
    ]);
  };

  const handleMetricsChange = (field: keyof AgentMetrics, value: number) => {
    setAgentMetrics(prev => ({ ...prev, [field]: value }));
  };

  const handleImpactChange = (field: keyof ImpactMetrics, value: number) => {
    setImpactMetrics(prev => ({ ...prev, [field]: value }));
  };

  const chartData = [
    { month: 'Jan', before: agentMetrics.currentRevenuePerMonth, after: agentMetrics.currentRevenuePerMonth * (1 + impactMetrics.revenueIncrease / 100) },
    { month: 'Feb', before: agentMetrics.currentRevenuePerMonth, after: agentMetrics.currentRevenuePerMonth * (1 + impactMetrics.revenueIncrease / 100) },
    { month: 'Mar', before: agentMetrics.currentRevenuePerMonth, after: agentMetrics.currentRevenuePerMonth * (1 + impactMetrics.revenueIncrease / 100) },
    { month: 'Apr', before: agentMetrics.currentRevenuePerMonth, after: agentMetrics.currentRevenuePerMonth * (1 + impactMetrics.revenueIncrease / 100) },
    { month: 'May', before: agentMetrics.currentRevenuePerMonth, after: agentMetrics.currentRevenuePerMonth * (1 + impactMetrics.revenueIncrease / 100) },
    { month: 'Jun', before: agentMetrics.currentRevenuePerMonth, after: agentMetrics.currentRevenuePerMonth * (1 + impactMetrics.revenueIncrease / 100) }
  ];

  const pieData = [
    { name: 'Time Savings', value: roiCalculation?.monthlySavings || 0, color: '#0088FE' },
    { name: 'Additional Revenue', value: (roiCalculation?.additionalRevenue || 0) / 12, color: '#00C49F' },
    { name: 'Current Revenue', value: agentMetrics.currentRevenuePerMonth, color: '#FFBB28' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ROI Impact Calculator</h1>
        <p className="text-gray-600">Calculate the potential impact of Sensay chatbot on your real estate business</p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">ROI Calculator</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Current Business Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="leads">Leads per Month</Label>
                  <Input
                    id="leads"
                    type="number"
                    value={agentMetrics.currentLeadsPerMonth}
                    onChange={(e) => handleMetricsChange('currentLeadsPerMonth', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="conversion">Conversion Rate (%)</Label>
                  <Slider
                    value={[agentMetrics.currentConversionRate]}
                    onValueChange={([value]) => handleMetricsChange('currentConversionRate', value)}
                    max={50}
                    min={5}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>5%</span>
                    <span>{agentMetrics.currentConversionRate}%</span>
                    <span>50%</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="time">Time per Lead (hours)</Label>
                  <Slider
                    value={[agentMetrics.currentTimePerLead]}
                    onValueChange={([value]) => handleMetricsChange('currentTimePerLead', value)}
                    max={10}
                    min={0.5}
                    step={0.5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0.5h</span>
                    <span>{agentMetrics.currentTimePerLead}h</span>
                    <span>10h</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="commission">Commission per Deal ($)</Label>
                  <Input
                    id="commission"
                    type="number"
                    value={agentMetrics.currentCommissionPerDeal}
                    onChange={(e) => handleMetricsChange('currentCommissionPerDeal', Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Expected Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Expected Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="conversion-improvement">Lead Conversion Improvement (%)</Label>
                  <Slider
                    value={[impactMetrics.leadConversionImprovement]}
                    onValueChange={([value]) => handleImpactChange('leadConversionImprovement', value)}
                    max={100}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0%</span>
                    <span>{impactMetrics.leadConversionImprovement}%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="time-saved">Time Saved per Week (hours)</Label>
                  <Slider
                    value={[impactMetrics.timesSaved]}
                    onValueChange={([value]) => handleImpactChange('timesSaved', value)}
                    max={40}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0h</span>
                    <span>{impactMetrics.timesSaved}h</span>
                    <span>40h</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="revenue-increase">Revenue Increase (%)</Label>
                  <Slider
                    value={[impactMetrics.revenueIncrease]}
                    onValueChange={([value]) => handleImpactChange('revenueIncrease', value)}
                    max={100}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0%</span>
                    <span>{impactMetrics.revenueIncrease}%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="quality-score">Lead Quality Score</Label>
                  <Slider
                    value={[impactMetrics.leadQualityScore]}
                    onValueChange={([value]) => handleImpactChange('leadQualityScore', value)}
                    max={100}
                    min={50}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>50</span>
                    <span>{impactMetrics.leadQualityScore}</span>
                    <span>100</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ROI Results */}
          {roiCalculation && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Savings</p>
                      <p className="text-2xl font-bold text-green-600">${roiCalculation.monthlySavings.toLocaleString()}</p>
                    </div>
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Additional Revenue</p>
                      <p className="text-2xl font-bold text-blue-600">${roiCalculation.additionalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total ROI</p>
                      <p className="text-2xl font-bold text-purple-600">{roiCalculation.totalROI.toFixed(0)}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Payback Period</p>
                      <p className="text-2xl font-bold text-orange-600">{roiCalculation.paybackPeriod.toFixed(1)} months</p>
                    </div>
                    <Target className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Detailed Breakdown */}
          {roiCalculation && (
            <Card>
              <CardHeader>
                <CardTitle>Detailed ROI Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Costs</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Implementation Cost</span>
                        <span>$5,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Subscription</span>
                        <span>$6,000</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total Annual Cost</span>
                        <span>$11,000</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Benefits</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Time Savings Value</span>
                        <span>${roiCalculation.annualSavings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Additional Revenue</span>
                        <span>${roiCalculation.additionalRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total Annual Benefit</span>
                        <span>${(roiCalculation.annualSavings + roiCalculation.additionalRevenue).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="case-studies" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {caseStudies.map((caseStudy) => (
              <Card key={caseStudy.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{caseStudy.agentName}</span>
                    <Badge variant="secondary">{caseStudy.location}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600">Before</h4>
                      <div className="space-y-1">
                        <div className="text-sm">Deals/Month: {caseStudy.beforeMetrics.currentDealsPerMonth}</div>
                        <div className="text-sm">Conversion: {caseStudy.beforeMetrics.currentConversionRate}%</div>
                        <div className="text-sm">Revenue: ${caseStudy.beforeMetrics.currentRevenuePerMonth.toLocaleString()}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600">After</h4>
                      <div className="space-y-1">
                        <div className="text-sm">Deals/Month: {caseStudy.afterMetrics.currentDealsPerMonth}</div>
                        <div className="text-sm">Conversion: {caseStudy.afterMetrics.currentConversionRate}%</div>
                        <div className="text-sm">Revenue: ${caseStudy.afterMetrics.currentRevenuePerMonth.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Conversion Improvement</span>
                      <Badge variant="default">+{caseStudy.impactMetrics.leadConversionImprovement}%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Time Saved</span>
                      <Badge variant="default">{caseStudy.impactMetrics.timesSaved}h/week</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Revenue Increase</span>
                      <Badge variant="default">+{caseStudy.impactMetrics.revenueIncrease}%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">ROI</span>
                      <Badge variant="default">{caseStudy.roiCalculation.totalROI.toFixed(0)}%</Badge>
                    </div>
                  </div>

                  <blockquote className="text-sm italic text-gray-600 border-l-4 border-blue-500 pl-4">
                    "{caseStudy.testimonial}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                    <Line type="monotone" dataKey="before" stroke="#8884d8" strokeWidth={2} name="Before" />
                    <Line type="monotone" dataKey="after" stroke="#82ca9d" strokeWidth={2} name="After" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <RechartsPieChart.Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </RechartsPieChart.Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ROIImpactCalculator;

