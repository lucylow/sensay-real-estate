import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Home, 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  DollarSign,
  TrendingUp,
  Shield,
  Eye,
  Download
} from 'lucide-react';

interface PropertyDetailsProps {
  property: any;
  valuation?: {
    current_valuation: number;
    confidence: number;
    risk_score: number;
    analysis_result?: any;
  };
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ 
  property, 
  valuation 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'destructive';
    if (score >= 40) return 'secondary';
    return 'default';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'valuation', label: 'Valuation', icon: DollarSign },
    { id: 'analysis', label: 'Analysis', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Property Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Property Image */}
            <div className="lg:w-1/2">
              <div className="relative h-64 lg:h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden">
                {property?.media?.[0] ? (
                  <img 
                    src={property.media[0].url} 
                    alt={property.address}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Home className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Property Image</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {property?.propertyType || 'Property'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="lg:w-1/2 space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {property?.address || 'Property Address'}
                </h1>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {property?.coordinates ? 
                      `${property.coordinates.lat.toFixed(4)}, ${property.coordinates.lng.toFixed(4)}` 
                      : 'Coordinates unavailable'
                    }
                  </span>
                </div>
              </div>

              {/* Property Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property?.bedrooms || 'N/A'} beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property?.bathrooms || 'N/A'} baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property?.landSize || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property?.carSpaces || 'N/A'} cars</span>
                </div>
              </div>

              {/* Valuation Summary - Removed */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Card>
        <CardHeader>
          <div className="flex space-x-1 border-b">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className="rounded-b-none"
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Property Description</h3>
                <p className="text-muted-foreground">
                  {property?.description || 'Detailed property description not available.'}
                </p>
              </div>
              
              {property?.features && property.features.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.slice(0, 8).map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'valuation' && valuation && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Valuation Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Base Property Value</span>
                      <span className="font-medium">
                        {formatCurrency(valuation.current_valuation * 1.1)}
                      </span>
                    </div>
                    <div className="flex justify-between text-orange-600">
                      <span>Risk Adjustment</span>
                      <span>-{formatCurrency(valuation.current_valuation * 0.1)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                      <span>Final Valuation</span>
                      <span className="text-primary">
                        {formatCurrency(valuation.current_valuation)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Confidence Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>AI Confidence</span>
                        <span>{valuation.confidence}%</span>
                      </div>
                      <Progress value={valuation.confidence} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Data Quality</span>
                        <span>89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Market Coverage</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Investment Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">5.2%</div>
                    <div className="text-sm text-muted-foreground">Expected Yield</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">7.4%</div>
                    <div className="text-sm text-muted-foreground">Capital Growth</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">8.8</div>
                    <div className="text-sm text-muted-foreground">Investment Score</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Market Insights</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="font-medium text-green-800">Positive Indicators</div>
                    <ul className="text-sm text-green-700 mt-1 space-y-1">
                      <li>• Strong rental demand in area</li>
                      <li>• Infrastructure development nearby</li>
                      <li>• Below market average days on market</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="font-medium text-orange-800">Risk Factors</div>
                    <ul className="text-sm text-orange-700 mt-1 space-y-1">
                      <li>• Climate risk exposure</li>
                      <li>• Market volatility in segment</li>
                      <li>• Interest rate sensitivity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="flex-1">
          <Shield className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
        <Button variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
        <Button variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          View Comparable
        </Button>
      </div>
    </div>
  );
};