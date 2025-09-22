import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Shield, AlertTriangle } from 'lucide-react';

interface RiskMetrics {
  flood?: number;
  fire?: number;
  coastalErosion?: number;
  subsidence?: number;
  market?: number;
}

interface ComplianceMetrics {
  status: 'APPROVED' | 'REVIEW' | 'REJECTED';
  reasons: string[];
  lvr?: number;
  dti?: number;
}

interface Metrics {
  valuation: number;
  risk: RiskMetrics;
  compliance: ComplianceMetrics;
  sentiment?: {
    score: number;
    magnitude: number;
    keywords: [string, number][];
  };
}

interface PropertyMetricsProps {
  metrics: Metrics;
}

const RiskIndicator = ({ label, value }: { label: string; value: number }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium capitalize">{label}</span>
      <span className="font-mono">{Math.round(value * 100)}%</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <motion.div 
        className={`h-full ${
          value > 0.7 ? 'bg-destructive' : 
          value > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
        }`}
        initial={{ width: 0 }}
        animate={{ width: `${value * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  </div>
);

const ComplianceStatus = ({ status }: { status: string }) => {
  let statusClass = '';
  let icon = null;
  
  switch(status) {
    case 'APPROVED':
      statusClass = 'bg-green-50 text-green-700 border-green-200';
      icon = <Shield className="w-3 h-3" />;
      break;
    case 'REVIEW':
      statusClass = 'bg-yellow-50 text-yellow-700 border-yellow-200';
      icon = <AlertTriangle className="w-3 h-3" />;
      break;
    case 'REJECTED':
      statusClass = 'bg-red-50 text-red-700 border-red-200';
      icon = <AlertTriangle className="w-3 h-3" />;
      break;
    default:
      statusClass = 'bg-muted text-muted-foreground border-border';
  }
  
  return (
    <div className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${statusClass}`}>
      {icon}
      {status}
    </div>
  );
};

export default function PropertyMetrics({ metrics }: PropertyMetricsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Valuation Card */}
      <motion.div 
        className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-xl p-5 border border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-primary">AI Valuation</h3>
            <p className="text-3xl font-bold mt-1 text-foreground">
              {formatCurrency(metrics.valuation)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Current market value estimate</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-lg">$</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-primary/10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-700">AI Confidence: 92%</span>
          </div>
        </div>
      </motion.div>
      
      {/* Risk Assessment */}
      <motion.div 
        className="bg-card rounded-xl p-5 border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-medium text-card-foreground mb-4">Climate Risk Assessment</h3>
        {metrics.risk && (
          <div>
            <RiskIndicator label="Flood Risk" value={metrics.risk.flood || 0} />
            <RiskIndicator label="Bushfire Risk" value={metrics.risk.fire || 0} />
            <RiskIndicator label="Market Volatility" value={metrics.risk.market || 0} />
            <RiskIndicator label="Subsidence Risk" value={metrics.risk.subsidence || 0} />
          </div>
        )}
      </motion.div>
      
      {/* Compliance & Sentiment */}
      <div className="grid grid-cols-1 gap-4">
        <motion.div 
          className="bg-card rounded-xl p-4 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-medium text-card-foreground mb-3">APRA Compliance</h3>
          <div className="flex items-center justify-between mb-3">
            <ComplianceStatus status={metrics.compliance.status} />
            <span className="text-xs text-muted-foreground">CPS 230</span>
          </div>
          
          {metrics.compliance.lvr && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-xs text-muted-foreground">Loan-to-Value Ratio</p>
                <p className="font-medium">{(metrics.compliance.lvr * 100).toFixed(1)}%</p>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${metrics.compliance.lvr * 100}%` }}
                />
              </div>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="bg-card rounded-xl p-4 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-medium text-card-foreground mb-3">Market Sentiment</h3>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              (metrics.sentiment?.score || 0) > 0 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {(metrics.sentiment?.score || 0) > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
            </div>
            <div className="ml-3">
              <p className="font-medium">
                {Math.abs((metrics.sentiment?.score || 0) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                {(metrics.sentiment?.score || 0) > 0 ? 'Positive' : 'Negative'}
              </p>
            </div>
          </div>
          
          {metrics.sentiment?.keywords && (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-2">Key Topics</p>
              <div className="flex flex-wrap gap-1">
                {metrics.sentiment.keywords.slice(0, 3).map(([keyword, score]) => (
                  <span 
                    key={keyword}
                    className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                    style={{ opacity: 0.3 + (score * 0.7) }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}