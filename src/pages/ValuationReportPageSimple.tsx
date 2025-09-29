import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Share2, 
  Shield, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Calendar,
  Zap,
  DollarSign,
  Home,
  BarChart3,
  Target
} from 'lucide-react';

interface ValuationReport {
  id: string;
  propertyAddress: string;
  valuationDate: string;
  estimatedValue: number;
  confidenceLevel: number;
  riskScore: number;
  marketTrend: 'up' | 'down' | 'stable';
  comparableProperties: Array<{
    address: string;
    salePrice: number;
    saleDate: string;
    similarity: number;
  }>;
  keyFactors: Array<{
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    weight: number;
  }>;
  recommendations: string[];
  compliance: {
    apraCompliant: boolean;
    lvr: number;
    riskCategory: string;
  };
}

const mockReport: ValuationReport = {
  id: '1',
  propertyAddress: '123 Main Street, Sydney NSW 2000',
  valuationDate: '2024-01-15',
  estimatedValue: 1250000,
  confidenceLevel: 92,
  riskScore: 72,
  marketTrend: 'up',
  comparableProperties: [
    {
      address: '120 Main Street, Sydney NSW 2000',
      salePrice: 1180000,
      saleDate: '2023-11-15',
      similarity: 95
    },
    {
      address: '125 Main Street, Sydney NSW 2000',
      salePrice: 1320000,
      saleDate: '2023-12-20',
      similarity: 88
    },
    {
      address: '130 Main Street, Sydney NSW 2000',
      salePrice: 1210000,
      saleDate: '2023-10-30',
      similarity: 82
    }
  ],
  keyFactors: [
    {
      factor: 'Location and proximity to CBD',
      impact: 'positive',
      weight: 25
    },
    {
      factor: 'Property condition and age',
      impact: 'positive',
      weight: 20
    },
    {
      factor: 'Market conditions',
      impact: 'positive',
      weight: 18
    },
    {
      factor: 'Comparable sales',
      impact: 'positive',
      weight: 15
    },
    {
      factor: 'Interest rate environment',
      impact: 'negative',
      weight: 12
    },
    {
      factor: 'Supply and demand',
      impact: 'positive',
      weight: 10
    }
  ],
  recommendations: [
    'Property represents good value in current market conditions',
    'Consider timing for optimal sale price given market trends',
    'Monitor interest rate changes for refinancing opportunities',
    'Property meets APRA lending standards for investment'
  ],
  compliance: {
    apraCompliant: true,
    lvr: 70,
    riskCategory: 'Standard'
  }
};

export const ValuationReportPageSimple: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ValuationReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReport(mockReport);
      setIsLoading(false);
    }, 1000);
  }, [reportId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading valuation report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Not Found</h2>
          <p className="text-gray-600 mb-4">The valuation report you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/search')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp className="h-4 w-4" />;
      case 'negative': return <AlertTriangle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/search')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Valuation Report</h1>
            <p className="text-gray-600">{report.propertyAddress}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Valuation Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Valuation Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      ${report.estimatedValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">Estimated Value</div>
                    <Badge className={`${report.confidenceLevel >= 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {report.confidenceLevel}% Confidence
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Risk Score</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{report.riskScore}/100</span>
                        <Badge className={`${report.riskScore >= 70 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {report.riskScore >= 70 ? 'Low Risk' : 'Medium Risk'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Market Trend</span>
                      <div className="flex items-center gap-2">
                        {report.marketTrend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="font-semibold capitalize">{report.marketTrend}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Report Date</span>
                      <span className="font-semibold">{new Date(report.valuationDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Key Valuation Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {report.keyFactors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getImpactColor(factor.impact)}`}>
                          {getImpactIcon(factor.impact)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{factor.factor}</div>
                          <div className="text-sm text-gray-600 capitalize">{factor.impact} impact</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{factor.weight}%</div>
                        <Progress value={factor.weight} className="w-20 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comparable Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Comparable Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {report.comparableProperties.map((property, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{property.address}</div>
                        <div className="text-sm text-gray-600">
                          Sold: {new Date(property.saleDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ${property.salePrice.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {property.similarity}% similar
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">APRA Compliant</span>
                    <Badge className={report.compliance.apraCompliant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {report.compliance.apraCompliant ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">LVR</span>
                    <span className="font-semibold">{report.compliance.lvr}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Risk Category</span>
                    <Badge variant="outline">{report.compliance.riskCategory}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Report Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Generated</div>
                      <div className="text-sm text-gray-600">
                        {new Date(report.valuationDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Property</div>
                      <div className="text-sm text-gray-600">{report.propertyAddress}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Report ID</div>
                      <div className="text-sm text-gray-600 font-mono">{report.id}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate New Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
