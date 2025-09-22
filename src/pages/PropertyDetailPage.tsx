import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  Home, 
  Bath, 
  Car, 
  Square, 
  MapPin, 
  FileText, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap
} from 'lucide-react';
import { realtyBaseAPI, PropertyDetails } from '@/services/api/realtybase';
import { useToast } from '@/hooks/use-toast';

export const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reportGenerating, setReportGenerating] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate('/search');
      return;
    }

    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        const propertyDetails = await realtyBaseAPI.getPropertyDetails(id);
        setProperty(propertyDetails);
      } catch (error) {
        toast({
          title: "Error Loading Property",
          description: "Unable to load property details. Please try again.",
          variant: "destructive",
        });
        console.error('Error fetching property:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate, toast]);

  const generateValuationReport = async () => {
    if (!property) return;

    try {
      setReportGenerating(true);
      const report = await realtyBaseAPI.generateValuationReport({
        listing_id: property.listing_id,
        include_blockchain: true,
      });
      
      navigate(`/report/${report.report_id}`);
      toast({
        title: "Report Generated",
        description: "Comprehensive valuation report created successfully.",
      });
    } catch (error) {
      toast({
        title: "Report Generation Failed",
        description: "Unable to generate report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setReportGenerating(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getRiskColor = (grade?: string) => {
    switch (grade?.toLowerCase()) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadgeColor = (grade?: string) => {
    switch (grade?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-6">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Property Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/search')}>
              Back to Search
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/search')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Button>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{property.suburb}, {property.state}</span>
        </div>

        {/* Property Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Property Image */}
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {property.photos && property.photos.length > 0 ? (
                  <img 
                    src={property.photos[0]} 
                    alt={property.address}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Home className="h-16 w-16 mb-2" />
                  </div>
                )}
              </div>

              {/* Property Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {property.address}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{property.suburb}, {property.state} {property.postcode}</span>
                  </div>
                  <Badge variant="outline" className="mb-4">
                    {property.property_type}
                  </Badge>
                </div>

                {/* Property Features */}
                <div className="grid grid-cols-2 gap-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-muted-foreground" />
                      <span>{property.bedrooms} bedrooms</span>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <span>{property.bathrooms} bathrooms</span>
                    </div>
                  )}
                  {property.car_spaces > 0 && (
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-muted-foreground" />
                      <span>{property.car_spaces} car spaces</span>
                    </div>
                  )}
                  {property.land_size > 0 && (
                    <div className="flex items-center gap-2">
                      <Square className="h-5 w-5 text-muted-foreground" />
                      <span>{property.land_size}m² land</span>
                    </div>
                  )}
                </div>

                {/* Price & Valuation */}
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">List Price</p>
                      <p className="text-3xl font-bold text-foreground">
                        {formatPrice(property.price)}
                      </p>
                    </div>
                    {property.propguard_valuation?.ai_valuation && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">AI Valuation</p>
                        <p className="text-2xl font-bold text-primary">
                          {formatPrice(property.propguard_valuation.ai_valuation)}
                        </p>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={generateValuationReport}
                    disabled={reportGenerating}
                    className="w-full"
                    size="lg"
                  >
                    {reportGenerating ? (
                      <>
                        <Zap className="h-4 w-4 mr-2 animate-pulse" />
                        Generating Report...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Full Valuation Report
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Valuation Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                AI Valuation Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {property.propguard_valuation ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">PropGuard Valuation</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatPrice(property.propguard_valuation.ai_valuation)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Confidence</p>
                      <p className="text-xl font-bold">
                        {Math.round(property.propguard_valuation.confidence_score * 100)}%
                      </p>
                    </div>
                  </div>
                  
                  {property.propguard_valuation.valuation_range && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Valuation Range</p>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span>{formatPrice(property.propguard_valuation.valuation_range.min)}</span>
                          <span>{formatPrice(property.propguard_valuation.valuation_range.max)}</span>
                        </div>
                        <Progress 
                          value={50} 
                          className="mt-2"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No valuation data available</p>
              )}
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              {property.propguard_risk ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Grade</p>
                      <Badge className={getRiskBadgeColor(property.propguard_risk.risk_grade)}>
                        {property.propguard_risk.risk_grade} Risk
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Overall Score</p>
                      <p className={`text-xl font-bold ${getRiskColor(property.propguard_risk.risk_grade)}`}>
                        {Math.round(property.propguard_risk.overall_score * 100)}/100
                      </p>
                    </div>
                  </div>

                  {/* Climate Risks */}
                  <div>
                    <p className="text-sm font-medium mb-3">Climate Risk Factors</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Flood</span>
                          <span className="text-sm">{Math.round(property.propguard_risk.climate_risks.flood * 100)}%</span>
                        </div>
                        <Progress value={property.propguard_risk.climate_risks.flood * 100} className="h-2" />
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Fire</span>
                          <span className="text-sm">{Math.round(property.propguard_risk.climate_risks.fire * 100)}%</span>
                        </div>
                        <Progress value={property.propguard_risk.climate_risks.fire * 100} className="h-2" />
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Coastal</span>
                          <span className="text-sm">{Math.round(property.propguard_risk.climate_risks.coastal * 100)}%</span>
                        </div>
                        <Progress value={property.propguard_risk.climate_risks.coastal * 100} className="h-2" />
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Geological</span>
                          <span className="text-sm">{Math.round(property.propguard_risk.climate_risks.geological * 100)}%</span>
                        </div>
                        <Progress value={property.propguard_risk.climate_risks.geological * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No risk assessment available</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Market Sentiment & Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Market Sentiment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Market Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              {property.propguard_market_sentiment ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge variant={
                      property.propguard_market_sentiment.trend === 'bullish' ? 'default' :
                      property.propguard_market_sentiment.trend === 'bearish' ? 'destructive' : 'secondary'
                    }>
                      {property.propguard_market_sentiment.trend.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(property.propguard_market_sentiment.confidence * 100)}% confidence
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {property.propguard_market_sentiment.summary}
                  </p>

                  {property.propguard_market_sentiment.indicators && (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="text-center p-2 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">Price Growth</p>
                        <p className="font-semibold text-green-600">
                          +{(property.propguard_market_sentiment.indicators.price_growth * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center p-2 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">Days on Market</p>
                        <p className="font-semibold">
                          {property.propguard_market_sentiment.indicators.days_on_market}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No market sentiment data available</p>
              )}
            </CardContent>
          </Card>

          {/* APRA Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                APRA Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {property.propguard_compliance ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {property.propguard_compliance.apra_cps230_compliant ? (
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-8 w-8 text-yellow-600" />
                    )}
                    <div>
                      <p className="font-medium">
                        {property.propguard_compliance.apra_cps230_compliant 
                          ? 'APRA CPS 230 Compliant' 
                          : 'Review Required'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Risk Category: {property.propguard_compliance.risk_category}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Compliance Score</span>
                      <span className="text-sm font-medium">
                        {Math.round(property.propguard_compliance.compliance_score * 100)}/100
                      </span>
                    </div>
                    <Progress value={property.propguard_compliance.compliance_score * 100} />
                  </div>

                  {property.propguard_compliance.lvr_thresholds && (
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm font-medium mb-2">LVR Thresholds</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>80% LVR:</span>
                          <span>{formatPrice(property.propguard_compliance.lvr_thresholds['80_percent'])}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>90% LVR:</span>
                          <span>{formatPrice(property.propguard_compliance.lvr_thresholds['90_percent'])}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>95% LVR:</span>
                          <span>{formatPrice(property.propguard_compliance.lvr_thresholds['95_percent'])}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No compliance data available</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Property Features */}
        {property.features && property.features.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Property Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};