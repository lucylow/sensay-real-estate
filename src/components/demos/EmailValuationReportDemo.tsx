import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mail, 
  FileText, 
  Download, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Shield,
  Home,
  Building,
  MapPin,
  AlertTriangle,
  CheckCircle,
  BarChart3
} from 'lucide-react';

interface ValuationData {
  propertyAddress: string;
  currentValue: number;
  marketTrend: 'increasing' | 'decreasing' | 'stable';
  riskScore: number;
  risks: Array<{
    type: string;
    level: 'low' | 'medium' | 'high';
    description: string;
  }>;
  marketInsights: Array<{
    category: string;
    value: string;
    trend: string;
  }>;
  recommendations: string[];
  agentContact: string;
}

export const EmailValuationReportDemo: React.FC = () => {
  const [activeView, setActiveView] = useState<'email' | 'report' | 'data'>('email');

  const mockData: ValuationData = {
    propertyAddress: '123 Oak Street, Austin, TX 78701',
    currentValue: 485000,
    marketTrend: 'increasing',
    riskScore: 8.7,
    risks: [
      {
        type: 'Climate Risk',
        level: 'low',
        description: 'Low flood risk based on historical data and protective infrastructure'
      },
      {
        type: 'Market Volatility',
        level: 'low',
        description: 'Stable market with consistent price appreciation'
      },
      {
        type: 'Investment Safety',
        level: 'medium',
        description: 'Moderate risk due to single-asset concentration'
      }
    ],
    marketInsights: [
      { category: 'Market Trend', value: '+12.5%', trend: 'Year-over-year growth' },
      { category: 'Comparable Sales', value: '$468K', trend: 'Average in neighborhood' },
      { category: 'Rental Potential', value: '$2,400/mo', trend: '+8% rental yield' },
      { category: 'Development', value: 'Low', trend: 'Minimal construction nearby' }
    ],
    recommendations: [
      'Consider this property for mid-term investment (3-5 years)',
      'Strong rental yield potential in growing Austin market',
      'Monitor interest rate changes for optimal financing',
      'Schedule additional risk assessment updates quarterly'
    ],
    agentContact: 'Sarah Johnson - sarah@propguard.ai'
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderEmailTemplate = () => (
    <div className="space-y-4">
      <Card className="bg-gray-50 border">
        <CardContent className="p-6">
          {/* Email Header */}
          <div className="space-y-4">
            {/* From/To */}
            <div className="flex justify-between border-b pb-2">
              <div>
                <div className="text-sm font-medium">From: PropGuard AI Assistant</div>
                <div className="text-sm text-gray-600">assistant@propguard.ai</div>
              </div>
              <div>
                <div className="text-sm font-medium">To: [User Name]</div>
                <div className="text-sm text-gray-600">your-email@example.com</div>
              </div>
            </div>

            {/* Subject */}
            <div className="bg-white p-3 rounded border">
              <div className="text-sm font-medium text-gray-700">
                Re: Your Property Valuation Report - {mockData.propertyAddress}
              </div>
            </div>

            {/* Email Body */}
            <div className="bg-white p-4 rounded border">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700">
                  Hi [User Name],
                </p>
                <p className="text-gray-700">
                  Thank you for your interest in <strong>{mockData.propertyAddress}</strong>. Attached is your personalized AI-driven property valuation report including market trends and risk assessment.
                </p>
                
                {/* Quick Summary */}
                <div className="bg-blue-50 p-4 rounded-lg my-4">
                  <h3 className="font-semibold text-blue-800 mb-2">🚨 Executive Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-blue-600 font-medium">Estimated Value</div>
                      <div className="text-lg font-bold">${mockData.currentValue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-blue-600 font-medium">PropGuard Score</div>
                      <div className="text-lg font-bold">{mockData.riskScore}/10</div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700">
                  Would you like to schedule a visit or need mortgage advice? Reply anytime to chat with your PropGuard AI assistant.
                </p>

                <p className="text-gray-700">
                  Best regards,<br/>
                  PropGuard AI Assistant<br/>
                  Powered by Sensay Wisdom Engine
                </p>
              </div>

              {/* Attachments Indicator */}
              <div className="mt-4 p-3 bg-gray-50 rounded border-l-4 border-blue-500">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">📎 Attachments:</span>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• Property_Valuation_Report_123_Oak_Street.pdf</li>
                  <li>• Risk_Assessment_Analysis.pdf</li>
                  <li>• Market_Trends_Austin_TX.pdf</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderValuationReport = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            AI-Driven Property Valuation Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Property Header */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{mockData.propertyAddress}</h2>
                  <div className="text-sm text-gray-600 mt-1">Property Valuation Report</div>
                </div>
                <Badge className={`px-3 py-1 ${
                  mockData.marketTrend === 'increasing' ? 'text-green-800' : 
                  mockData.marketTrend === 'decreasing' ? 'text-red-800' : 'text-blue-800'
                }`}>
                  {mockData.marketTrend === 'increasing' ? '📈 Increasing' : 
                   mockData.marketTrend === 'decreasing' ? '📉 Decreasing' : '➡️ Stable'}
                </Badge>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-green-600">${mockData.currentValue.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Estimated Value</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{mockData.riskScore}/10</div>
                  <div className="text-xs text-gray-600">Risk Score</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">+12.5%</div>
                  <div className="text-xs text-gray-600">YOY Growth</div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-yellow-500" />
                Risk Assessment
              </h3>
              <div className="space-y-3">
                {mockData.risks.map((risk, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{risk.type}</span>
                      <Badge className={getRiskColor(risk.level)}>{risk.level.toUpperCase()}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{risk.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Market Intelligence
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {mockData.marketInsights.map((insight, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium text-sm text-gray-800">{insight.category}</div>
                    <div className="text-lg font-bold text-blue-600">{insight.value}</div>
                    <div className="text-xs text-gray-600">{insight.trend}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                AI Recommendations
              </h3>
              <div className="space-y-2">
                {mockData.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-green-50 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Contact */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Need Further Assistance?</h4>
              <p className="text-sm text-blue-700 mb-2">
                Contact your PropGuard AI specialist for personalized consultation.
              </p>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">{mockData.agentContact}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRawData = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-500" />
            Data Analytics Behind the Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Data Sources */}
            <div>
              <h3 className="font-semibold mb-3">📊 Data Sources Analyzed</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-2 bg-gray-50 rounded">✓ MLS Listing Data</div>
                <div className="p-2 bg-gray-50 rounded">✓ County Property Records</div>
                <div className="p-2 bg-gray-50 rounded">✓ Climate Risk Models</div>
                <div className="p-2 bg-gray-50 rounded">✓ Market Trend Analysis</div>
                <div className="p-2 bg-gray-50 rounded">✓ Satellite Imagery AI</div>
                <div className="p-2 bg-gray-50 rounded">✓ Economic Indicators</div>
                <div className="p-2 bg-gray-50 rounded">✓ School District Data</div>
                <div className="p-2 bg-gray-50 rounded">✓ Infrastructure Maps</div>
              </div>
            </div>

            {/* AI Processing Steps */}
            <div>
              <h3 className="font-semibold mb-3">🤖 AI Analysis Pipeline</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span className="text-sm">Data Ingestion & Normalization</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span className="text-sm">ML Model Risk Assessment</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                  <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="text-sm">Market Comparables Analysis</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                  <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <span className="text-sm">PropGuard Score Calculation</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                  <span className="text-sm">Report Generation & Validation</span>
                </div>
              </div>
            </div>

            {/* Confidence Metrics */}
            <div>
              <h3 className="font-semibold mb-3">🎯 Analysis Confidence</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Valuation Accuracy</span>
                    <span className="font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Risk Assessment Reliability</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Market Trend Prediction</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Email Valuation Report Demo</h2>
        <p className="text-gray-600">Automated email reports with AI-powered property analysis and risk assessment</p>
      </div>

      {/* View Controls */}
      <div className="flex justify-center gap-4">
        <Button
          variant={activeView === 'email' ? 'default' : 'outline'}
          onClick={() => setActiveView('email')}
        >
          Email Template
        </Button>
        <Button
          variant={activeView === 'report' ? 'default' : 'outline'}
          onClick={() => setActiveView('report')}
        >
          Valuation Report
        </Button>
        <Button
          variant={activeView === 'data' ? 'default' : 'outline'}
          onClick={() => setActiveView('data')}
        >
          Data Analytics
        </Button>
      </div>

      {/* Demo Content */}
      {activeView === 'email' && renderEmailTemplate()}
      {activeView === 'report' && renderValuationReport()}
      {activeView === 'data' && renderRawData()}
    </div>
  );
};
