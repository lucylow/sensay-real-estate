/**
 * Knowledge Management Service
 * TypeScript service for interacting with the PropGuard AI Knowledge Training System
 */

export interface KnowledgeStats {
  overall_stats: {
    total_items: number;
    total_embeddings: number;
    domains_covered: number;
    avg_confidence_threshold: number;
    oldest_item: string;
    newest_item: string;
  };
  domain_breakdown: {
    [domain: string]: {
      item_count: number;
      avg_confidence_threshold: number;
      oldest_update: string;
      newest_update: string;
      data_sources: string[];
    };
  };
}

export interface FreshnessReport {
  summary: {
    total_items: number;
    stale_items: number;
    freshness_percentage: number;
    domains_needing_attention: string[];
  };
  detailed_report: {
    [domain: string]: {
      average_age_days: number;
      total_items: number;
      stale_items_count: number;
      stale_item_ids: string[];
      status: 'FRESH' | 'AGING' | 'STALE';
      last_update: string;
    };
  };
  timestamp: string;
}

export interface PerformanceMetrics {
  timestamp: string;
  knowledge_coverage: {
    overall_coverage_percent: number;
    domain_breakdown: {
      [domain: string]: {
        item_count: number;
        estimated_coverage: number;
      };
    };
    total_knowledge_items: number;
  };
  response_accuracy: {
    overall_accuracy: number;
    accuracy_by_domain: { [domain: string]: number };
    trending: 'improving' | 'declining' | 'stable';
    last_updated: string;
  };
  user_satisfaction: {
    average_rating: number;
    rating_distribution: { [rating: string]: number };
    satisfaction_trend: 'improving' | 'declining' | 'stable';
    nps_score: number;
    last_updated: string;
  };
  bias_metrics: {
    overall_bias_score: number;
    bias_alerts_this_week: number;
    bias_items_addressed: number;
    bias_audit_status: string;
    last_bias_audit: string;
  };
  learning_progress: {
    total_tasks: number;
    pending_tasks: number;
    completed_tasks: number;
    high_priority_pending: number;
    completion_rate: number;
  };
}

export interface QueryResult {
  success: boolean;
  query: string;
  match?: {
    id: string;
    domain: string;
    question: string;
    answer: string;
    confidence: number;
    tags: string[];
    last_updated: string;
  };
  related_items?: string[];
  message?: string;
  suggestions?: string[];
}

export interface SimilarItem {
  id: string;
  domain: string;
  question: string;
  answer: string;
  similarity: number;
  tags: string[];
}

export interface FeedbackSubmission {
  session_id: string;
  user_id?: string;
  original_query: string;
  ai_response: string;
  user_feedback: string;
  rating?: number;
  feedback_type?: 'positive' | 'negative' | 'correction' | 'suggestion' | 'bug_report' | 'feature_request';
  metadata?: Record<string, any>;
}

export interface BiasAuditResult {
  bias_audit_results: {
    overall_bias_score: number;
    category_scores: Record<string, number>;
    problematic_items: Array<{
      item_id: string;
      bias_score: number;
      bias_types: string[];
      suggested_fixes: string[];
    }>;
    recommendations: string[];
    bias_patterns: Record<string, number>;
  };
  timestamp: string;
  status: string;
}

export interface Recommendation {
  type: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  action: string;
}

export interface Domain {
  value: string;
  name: string;
  description: string;
}

export interface EdgeCaseAnalysis {
  query: string;
  edge_case_analysis: {
    is_edge_case: boolean;
    handling_strategy?: string;
    response?: string;
    requires_human_escalation: boolean;
    edge_case_type?: string;
  };
  timestamp: string;
}

export interface AmbiguityAnalysis {
  ambiguity_analysis: {
    low_confidence_matches: number;
    frequent_clarifications: number;
    unresolved_queries: number;
    common_ambiguous_phrases: Array<[string, number]>;
    problem_queries: Array<{
      query: string;
      confidence: number;
      timestamp: string;
    }>;
  };
  timestamp: string;
  logs_analyzed: number;
}

export interface HealthStatus {
  status: 'healthy' | 'warning' | 'error';
  knowledge_items: number;
  embeddings_cached: number;
  domains_covered: number;
  last_updated: string;
  system_components: {
    trainer: 'operational' | 'degraded' | 'down';
    bottleneck_manager: 'operational' | 'degraded' | 'down';
    learning_engine: 'operational' | 'degraded' | 'down';
  };
}

class KnowledgeManagementService {
  private readonly baseURL: string;

  constructor(baseURL: string = '/api/propguard/knowledge') {
    this.baseURL = baseURL;
  }

  /**
   * Check system health
   */
  async getHealth(): Promise<HealthStatus> {
    const response = await fetch(`${this.baseURL}/health`);
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Query the knowledge base
   */
  async queryKnowledge(query: string, domain?: string): Promise<QueryResult> {
    const response = await fetch(`${this.baseURL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, domain }),
    });
    
    if (!response.ok) {
      throw new Error(`Knowledge query failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get knowledge base statistics
   */
  async getKnowledgeStats(): Promise<KnowledgeStats> {
    const response = await fetch(`${this.baseURL}/knowledge-base/stats`);
    if (!response.ok) {
      throw new Error(`Failed to fetch knowledge stats: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Check data freshness
   */
  async getDataFreshness(): Promise<FreshnessReport> {
    const response = await fetch(`${this.baseURL}/bottlenecks/freshness`);
    if (!response.ok) {
      throw new Error(`Failed to fetch freshness data: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Analyze ambiguity patterns
   */
  async analyzeAmbiguity(conversationLogs: any[]): Promise<AmbiguityAnalysis> {
    const response = await fetch(`${this.baseURL}/bottlenecks/ambiguity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conversation_logs: conversationLogs }),
    });
    
    if (!response.ok) {
      throw new Error(`Ambiguity analysis failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Analyze edge case handling
   */
  async analyzeEdgeCase(query: string, context: Record<string, any> = {}): Promise<EdgeCaseAnalysis> {
    const response = await fetch(`${this.baseURL}/edge-cases/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, context }),
    });
    
    if (!response.ok) {
      throw new Error(`Edge case analysis failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Submit user feedback
   */
  async submitFeedback(feedback: FeedbackSubmission): Promise<any> {
    const response = await fetch(`${this.baseURL}/feedback/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    });
    
    if (!response.ok) {
      throw new Error(`Feedback submission failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get performance metrics
   */
  async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    const response = await fetch(`${this.baseURL}/learning/performance`);
    if (!response.ok) {
      throw new Error(`Failed to fetch performance metrics: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Run bias audit
   */
  async runBiasAudit(): Promise<BiasAuditResult> {
    const response = await fetch(`${this.baseURL}/learning/bias-audit`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(`Bias audit failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get improvement recommendations
   */
  async getRecommendations(): Promise<{
    recommendations: Recommendation[];
    total_recommendations: number;
    high_priority: number;
    timestamp: string;
  }> {
    const response = await fetch(`${this.baseURL}/learning/recommendations`);
    if (!response.ok) {
      throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Update knowledge item
   */
  async updateKnowledgeItem(itemId: string, updates: Record<string, any>): Promise<any> {
    const response = await fetch(`${this.baseURL}/knowledge-base/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id: itemId, updates }),
    });
    
    if (!response.ok) {
      throw new Error(`Knowledge item update failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * List available domains
   */
  async getDomains(): Promise<{ domains: Domain[]; total_domains: number }> {
    const response = await fetch(`${this.baseURL}/domains`);
    if (!response.ok) {
      throw new Error(`Failed to fetch domains: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Find similar knowledge items
   */
  async findSimilarItems(
    query: string, 
    options: { limit?: number; min_confidence?: number } = {}
  ): Promise<{
    query: string;
    similar_items: SimilarItem[];
    total_found: number;
    parameters: { limit: number; min_confidence: number };
  }> {
    const response = await fetch(`${this.baseURL}/search/similar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query, 
        limit: options.limit || 5,
        min_confidence: options.min_confidence || 0.3 
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Similar items search failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Enhanced query with conversation context
   */
  async queryWithContext(
    query: string,
    context: {
      session_id?: string;
      conversation_history?: Array<{ role: 'user' | 'assistant'; content: string }>;
      user_preferences?: Record<string, any>;
      domain_focus?: string;
    } = {}
  ): Promise<QueryResult & { context_used: boolean; suggestions?: string[] }> {
    // First try standard query
    const result = await this.queryKnowledge(query, context.domain_focus);
    
    // If no good match and we have context, try to enhance the query
    if (!result.success && context.conversation_history) {
      const enhancedQuery = this.enhanceQueryWithContext(query, context.conversation_history);
      if (enhancedQuery !== query) {
        const enhancedResult = await this.queryKnowledge(enhancedQuery, context.domain_focus);
        if (enhancedResult.success) {
          return {
            ...enhancedResult,
            context_used: true,
            suggestions: [`Interpreted your query as: "${enhancedQuery}"`]
          };
        }
      }
    }

    return { ...result, context_used: false };
  }

  /**
   * Enhance query with conversation context
   */
  private enhanceQueryWithContext(
    query: string, 
    history: Array<{ role: 'user' | 'assistant'; content: string }>
  ): string {
    // Simple context enhancement - in a real implementation, this would be more sophisticated
    const recentContext = history
      .slice(-3) // Last 3 exchanges
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .join(' ');

    // Look for property-related terms that might need context
    const propertyTerms = ['property', 'house', 'apartment', 'valuation', 'price', 'risk'];
    const hasPropertyTerm = propertyTerms.some(term => 
      query.toLowerCase().includes(term) || recentContext.toLowerCase().includes(term)
    );

    if (hasPropertyTerm && !query.toLowerCase().includes('propguard')) {
      return `${query} PropGuard AI property valuation`;
    }

    return query;
  }

  /**
   * Submit conversation feedback for learning
   */
  async submitConversationFeedback(
    conversationId: string,
    exchanges: Array<{
      user_query: string;
      ai_response: string;
      user_rating?: number;
      feedback?: string;
    }>
  ): Promise<any> {
    const feedbackPromises = exchanges.map((exchange, index) =>
      this.submitFeedback({
        session_id: `${conversationId}_${index}`,
        original_query: exchange.user_query,
        ai_response: exchange.ai_response,
        user_feedback: exchange.feedback || '',
        rating: exchange.user_rating,
        metadata: {
          conversation_id: conversationId,
          exchange_index: index,
          total_exchanges: exchanges.length
        }
      })
    );

    return Promise.all(feedbackPromises);
  }

  /**
   * Get comprehensive dashboard data
   */
  async getDashboardData(): Promise<{
    health: HealthStatus;
    stats: KnowledgeStats;
    freshness: FreshnessReport;
    performance: PerformanceMetrics;
    recommendations: Recommendation[];
  }> {
    try {
      const [health, stats, freshness, performance, recommendationsData] = await Promise.all([
        this.getHealth(),
        this.getKnowledgeStats(),
        this.getDataFreshness(),
        this.getPerformanceMetrics(),
        this.getRecommendations()
      ]);

      return {
        health,
        stats,
        freshness,
        performance,
        recommendations: recommendationsData.recommendations
      };
    } catch (error) {
      throw new Error(`Failed to fetch dashboard data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instance
export const knowledgeService = new KnowledgeManagementService();
export default knowledgeService;
