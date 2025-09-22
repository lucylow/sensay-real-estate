import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface MarketSentimentProps {
  sentiment?: {
    score: number;
    magnitude: number;
    keywords: [string, number][];
  };
  isLoading?: boolean;
}

export default function MarketSentiment({ sentiment, isLoading }: MarketSentimentProps) {
  if (isLoading) {
    return (
      <div className="bg-card rounded-xl p-6 border">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="font-medium">Market Sentiment</h3>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!sentiment) {
    return (
      <div className="bg-card rounded-xl p-6 border">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-medium text-muted-foreground">Market Sentiment</h3>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">Analyze a property to view market sentiment</p>
        </div>
      </div>
    );
  }

  const isPositive = sentiment.score > 0;
  const sentimentPercent = Math.abs(sentiment.score * 100);

  return (
    <motion.div 
      className="bg-card rounded-xl p-6 border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="font-medium">Market Sentiment</h3>
      </div>
      
      <div className="space-y-4">
        {/* Sentiment Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isPositive ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {isPositive ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div>
              <p className="font-semibold text-lg">
                {sentimentPercent.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">
                {isPositive ? 'Positive' : 'Negative'} sentiment
              </p>
            </div>
          </div>
        </div>

        {/* Sentiment Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Market Confidence</span>
            <span>{sentimentPercent.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${sentimentPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Keywords */}
        {sentiment.keywords && sentiment.keywords.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Trending Topics</p>
            <div className="flex flex-wrap gap-2">
              {sentiment.keywords.slice(0, 4).map(([keyword, score]) => (
                <motion.span 
                  key={keyword}
                  className={`px-2 py-1 rounded-full text-xs ${
                    isPositive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                  style={{ opacity: 0.4 + (score * 0.6) }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * score, duration: 0.3 }}
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Insights */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>AI Analysis:</strong> {isPositive 
              ? "Strong buyer interest and positive community sentiment detected through social media and forum analysis."
              : "Market caution detected with increased discussion around risk factors and price volatility."
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
}