import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PropertyAnalyticsProps {
  analysisResult: any;
}

export const PropertyAnalytics: React.FC<PropertyAnalyticsProps> = ({ analysisResult }) => {
  if (!analysisResult?.property) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🏠</span>
            <span>Property Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-muted-foreground text-2xl">📊</span>
            </div>
            <p className="text-muted-foreground">No Property Analyzed</p>
            <p className="text-sm text-muted-foreground mt-2">
              Enter a property query to see AI-powered valuation metrics
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const property = analysisResult.property;
  const metrics = property.analysis_result || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>🏠</span>
          <span>Property Analytics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Valuation */}
          <div>
            <p className="text-sm text-muted-foreground">Current Valuation</p>
            <p className="text-2xl font-bold text-green-600">
              ${metrics.current_valuation?.toLocaleString() || 'N/A'}
            </p>
            <p className="text-sm text-muted-foreground">
              Range: ${metrics.valuation_range?.min?.toLocaleString()} - ${metrics.valuation_range?.max?.toLocaleString()}
            </p>
          </div>

          {/* Risk Score */}
          <div>
            <p className="text-sm text-muted-foreground">Risk Score</p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-destructive h-2 rounded-full" 
                  style={{ width: `${(metrics.risk_score || 0) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{((metrics.risk_score || 0) * 100).toFixed(0)}</span>
            </div>
          </div>

          {/* LVR */}
          {metrics.lvr && (
            <div>
              <p className="text-sm text-muted-foreground">Loan-to-Value Ratio</p>
              <p className="text-lg font-semibold">{(metrics.lvr * 100).toFixed(1)}%</p>
              <Badge variant={metrics.lvr > 0.8 ? "destructive" : "default"}>
                {metrics.lvr > 0.8 ? "High Risk" : "Standard"}
              </Badge>
            </div>
          )}

          {/* Confidence */}
          <div>
            <p className="text-sm text-muted-foreground">Analysis Confidence</p>
            <p className="text-lg font-semibold">{((metrics.confidence || 0.7) * 100).toFixed(0)}%</p>
          </div>

          {/* Sentiment */}
          {analysisResult.sentiment && (
            <div>
              <p className="text-sm text-muted-foreground">Property Sentiment</p>
              <div className="flex items-center space-x-2">
                <span className={`text-lg ${
                  analysisResult.sentiment.sentiment_analysis?.sentiment > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {analysisResult.sentiment.sentiment_analysis?.sentiment > 0 ? '📈' : '📉'}
                </span>
                <span className="font-medium">
                  {analysisResult.sentiment.sentiment_analysis?.sentiment?.toFixed(2) || 'N/A'}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};