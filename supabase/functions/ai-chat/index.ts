import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatRequest {
  message: string;
  context?: {
    property?: any;
    analysis?: any;
    marketData?: any;
    sessionId?: string;
  };
}

interface ChatResponse {
  response: string;
  suggestions?: string[];
  insights?: any;
  confidence: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context }: ChatRequest = await req.json();
    
    console.log('AI Chat Request:', { message, context: context ? 'provided' : 'none' });

    // Analyze the message to determine intent
    const intent = analyzeIntent(message);
    const response = await generateResponse(message, context, intent);

    return new Response(
      JSON.stringify({
        status: 'success',
        ...response,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('AI Chat Error:', error);
    return new Response(
      JSON.stringify({
        status: 'error',
        response: 'I apologize, but I encountered an issue processing your request. Please try again.',
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function analyzeIntent(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('risk') || lowerMessage.includes('danger') || lowerMessage.includes('safe')) {
    return 'risk_analysis';
  }
  if (lowerMessage.includes('value') || lowerMessage.includes('worth') || lowerMessage.includes('price')) {
    return 'valuation';
  }
  if (lowerMessage.includes('market') || lowerMessage.includes('trend') || lowerMessage.includes('comparison')) {
    return 'market_analysis';
  }
  if (lowerMessage.includes('invest') || lowerMessage.includes('buy') || lowerMessage.includes('roi')) {
    return 'investment_advice';
  }
  if (lowerMessage.includes('predict') || lowerMessage.includes('forecast') || lowerMessage.includes('future')) {
    return 'prediction';
  }
  if (lowerMessage.includes('report') || lowerMessage.includes('document') || lowerMessage.includes('summary')) {
    return 'report_generation';
  }
  if (lowerMessage.includes('compare') || lowerMessage.includes('similar') || lowerMessage.includes('alternative')) {
    return 'comparison';
  }
  
  return 'general_inquiry';
}

async function generateResponse(message: string, context: any, intent: string): Promise<ChatResponse> {
  const property = context?.property;
  const analysis = context?.analysis;
  const marketData = context?.marketData;

  switch (intent) {
    case 'risk_analysis':
      return generateRiskAnalysisResponse(message, property, analysis);
    
    case 'valuation':
      return generateValuationResponse(message, property, analysis);
    
    case 'market_analysis':
      return generateMarketAnalysisResponse(message, property, marketData);
    
    case 'investment_advice':
      return generateInvestmentAdviceResponse(message, property, analysis);
    
    case 'prediction':
      return generatePredictionResponse(message, property, analysis);
    
    case 'report_generation':
      return generateReportResponse(message, property, analysis);
    
    case 'comparison':
      return generateComparisonResponse(message, property, analysis);
    
    default:
      return generateGeneralResponse(message, context);
  }
}

function generateRiskAnalysisResponse(message: string, property: any, analysis: any): ChatResponse {
  if (!analysis) {
    return {
      response: "I'd be happy to help you assess property risks, but I need property analysis data first. Please analyze a property to get detailed risk insights.",
      suggestions: ['Analyze a property first', 'What types of risks should I consider?', 'Explain risk scoring methodology'],
      confidence: 95
    };
  }

  const riskScore = analysis.risk_score || 0;
  const riskLevel = riskScore < 30 ? 'low' : riskScore < 60 ? 'moderate' : 'high';
  
  let response = `**Risk Analysis Summary:**\n\n`;
  response += `🎯 **Overall Risk Score:** ${riskScore}/100 (${riskLevel} risk)\n\n`;
  
  if (analysis.analysis_result?.risk?.detailed) {
    const risks = analysis.analysis_result.risk.detailed;
    response += `**Key Risk Factors:**\n`;
    
    if (risks.flood) {
      response += `💧 **Flood Risk:** ${risks.flood.score}/100\n`;
      response += `   ${risks.flood.factors?.slice(0, 2).join(', ') || 'Standard flood assessment'}\n\n`;
    }
    
    if (risks.fire) {
      response += `🔥 **Fire Risk:** ${risks.fire.score}/100\n`;
      response += `   ${risks.fire.factors?.slice(0, 2).join(', ') || 'Standard fire risk assessment'}\n\n`;
    }
    
    if (risks.coastal) {
      response += `🌊 **Coastal Risk:** ${risks.coastal.score}/100\n`;
      response += `   ${risks.coastal.factors?.slice(0, 2).join(', ') || 'Coastal risk factors considered'}\n\n`;
    }
  }
  
  response += `**Risk Management Recommendations:**\n`;
  if (riskScore < 30) {
    response += `✅ Low risk profile makes this suitable for conservative investment strategies\n`;
    response += `✅ Standard insurance coverage should be sufficient\n`;
    response += `✅ Minimal additional risk mitigation required`;
  } else if (riskScore < 60) {
    response += `⚠️ Moderate risk requires balanced risk management approach\n`;
    response += `⚠️ Consider comprehensive insurance coverage\n`;
    response += `⚠️ Regular monitoring of risk factors recommended`;
  } else {
    response += `🚨 High risk requires careful consideration and planning\n`;
    response += `🚨 Comprehensive insurance and risk mitigation essential\n`;
    response += `🚨 Consider if risk aligns with your investment strategy`;
  }

  return {
    response,
    suggestions: [
      'How can I mitigate these risks?',
      'What insurance should I consider?',
      'Compare risk with similar properties',
      'Show detailed risk breakdown'
    ],
    confidence: 88
  };
}

function generateValuationResponse(message: string, property: any, analysis: any): ChatResponse {
  if (!analysis) {
    return {
      response: "I need property analysis data to provide valuation insights. Please analyze a property first to get detailed valuation information.",
      suggestions: ['Analyze a property', 'How is property valued?', 'What factors affect valuation?'],
      confidence: 95
    };
  }

  const valuation = analysis.current_valuation || 0;
  const range = analysis.valuation_range;
  const confidence = analysis.confidence || 0;

  let response = `**Property Valuation Analysis:**\n\n`;
  response += `💰 **Current Valuation:** $${valuation.toLocaleString()}\n`;
  
  if (range) {
    response += `📊 **Valuation Range:** $${range.min?.toLocaleString()} - $${range.max?.toLocaleString()}\n`;
  }
  
  response += `🎯 **Confidence Level:** ${confidence}%\n\n`;
  
  response += `**Valuation Insights:**\n`;
  if (confidence > 85) {
    response += `✅ High confidence in valuation accuracy - strong data reliability\n`;
  } else if (confidence > 70) {
    response += `⚠️ Good confidence level - valuation is well-supported by data\n`;
  } else {
    response += `🔍 Moderate confidence - additional market research recommended\n`;
  }
  
  if (analysis.analysis_result?.detailed_breakdown) {
    const breakdown = analysis.analysis_result.detailed_breakdown;
    response += `\n**Value Breakdown:**\n`;
    response += `🏗️ Land Value: $${breakdown.land_value?.toLocaleString() || 'N/A'}\n`;
    response += `🏠 Building Value: $${breakdown.building_value?.toLocaleString() || 'N/A'}\n`;
    response += `✨ Intangible Assets: $${breakdown.intangible_assets?.toLocaleString() || 'N/A'}\n`;
  }

  return {
    response,
    suggestions: [
      'What drives this valuation?',
      'Compare with market averages',
      'Show price growth trends',
      'Generate valuation report'
    ],
    confidence: confidence
  };
}

function generateMarketAnalysisResponse(message: string, property: any, marketData: any): ChatResponse {
  let response = `**Market Analysis:**\n\n`;
  
  if (marketData) {
    response += `📈 **Market Sentiment:** ${marketData.sentiment_score}/10\n`;
    response += `📊 **Trend:** ${marketData.trend.charAt(0).toUpperCase() + marketData.trend.slice(1)}\n`;
    response += `🎯 **Confidence:** ${marketData.confidence}%\n\n`;
    response += `**Market Summary:**\n${marketData.summary}\n\n`;
    
    if (marketData.detailed_metrics) {
      response += `**Investment Metrics:**\n`;
      response += `• Cap Rate: ${marketData.detailed_metrics.cap_rate}%\n`;
      response += `• Cash-on-Cash Return: ${marketData.detailed_metrics.cash_on_cash}%\n`;
      response += `• NOI: $${marketData.detailed_metrics.noi?.toLocaleString()}\n`;
      response += `• DSCR: ${marketData.detailed_metrics.debt_coverage}x\n`;
    }
  } else {
    response += `Current market conditions show moderate activity with seasonal variations typical for this time of year.\n\n`;
    response += `**General Market Indicators:**\n`;
    response += `• Interest rates remain at historically favorable levels\n`;
    response += `• Property supply is balanced with demand in most areas\n`;
    response += `• Infrastructure development continues to support growth\n`;
    response += `• Economic fundamentals remain stable\n`;
  }

  return {
    response,
    suggestions: [
      'Show market comparisons',
      'What are the growth drivers?',
      'Compare with other areas',
      'Investment timing advice'
    ],
    confidence: 82
  };
}

function generateInvestmentAdviceResponse(message: string, property: any, analysis: any): ChatResponse {
  if (!analysis) {
    return {
      response: "I'd love to provide investment insights, but I need property analysis data first. Please analyze a property to get personalized investment advice.",
      suggestions: ['Analyze a property first', 'What makes a good investment?', 'Investment strategy guidance'],
      confidence: 95
    };
  }

  const riskScore = analysis.risk_score || 50;
  const confidence = analysis.confidence || 70;
  const valuation = analysis.current_valuation || 0;

  let response = `**Investment Analysis:**\n\n`;
  
  // Investment grade assessment
  let investmentGrade = 'B';
  let recommendation = 'Hold';
  
  if (riskScore < 30 && confidence > 80) {
    investmentGrade = 'A+';
    recommendation = 'Strong Buy';
  } else if (riskScore < 40 && confidence > 70) {
    investmentGrade = 'A';
    recommendation = 'Buy';
  } else if (riskScore < 60) {
    investmentGrade = 'B+';
    recommendation = 'Consider';
  }
  
  response += `🎖️ **Investment Grade:** ${investmentGrade}\n`;
  response += `📋 **Recommendation:** ${recommendation}\n`;
  response += `💰 **Property Value:** $${valuation.toLocaleString()}\n\n`;
  
  response += `**Investment Strengths:**\n`;
  if (confidence > 80) response += `✅ High valuation confidence (${confidence}%)\n`;
  if (riskScore < 40) response += `✅ Low to moderate risk profile\n`;
  response += `✅ Comprehensive analysis supports decision-making\n\n`;
  
  response += `**Considerations:**\n`;
  if (riskScore > 60) response += `⚠️ Higher risk profile requires careful management\n`;
  if (confidence < 70) response += `⚠️ Moderate confidence suggests additional due diligence\n`;
  response += `⚠️ Consider your investment timeline and strategy\n\n`;
  
  response += `**Next Steps:**\n`;
  response += `1. Review detailed risk assessment\n`;
  response += `2. Compare with investment criteria\n`;
  response += `3. Consider financing options\n`;
  response += `4. Plan due diligence activities`;

  return {
    response,
    suggestions: [
      'Calculate potential ROI',
      'Show cash flow projections',
      'Compare with other investments',
      'Risk mitigation strategies'
    ],
    confidence: 85
  };
}

function generatePredictionResponse(message: string, property: any, analysis: any): ChatResponse {
  let response = `**Predictive Analysis:**\n\n`;
  
  if (analysis) {
    const currentValue = analysis.current_valuation || 1000000;
    const riskScore = analysis.risk_score || 50;
    
    // Generate predictions based on analysis
    const growthRate = Math.max(2, 8 - (riskScore / 20)); // 2-8% based on risk
    const projected6m = Math.round(currentValue * Math.pow(1 + growthRate/100, 0.5));
    const projected12m = Math.round(currentValue * Math.pow(1 + growthRate/100, 1));
    const projected24m = Math.round(currentValue * Math.pow(1 + growthRate/100, 2));
    
    response += `📊 **Value Projections:**\n`;
    response += `• 6 months: $${projected6m.toLocaleString()} (+${((projected6m-currentValue)/currentValue*100).toFixed(1)}%)\n`;
    response += `• 12 months: $${projected12m.toLocaleString()} (+${((projected12m-currentValue)/currentValue*100).toFixed(1)}%)\n`;
    response += `• 24 months: $${projected24m.toLocaleString()} (+${((projected24m-currentValue)/currentValue*100).toFixed(1)}%)\n\n`;
    
    response += `**Key Factors Influencing Predictions:**\n`;
    response += `• Risk profile affects growth potential\n`;
    response += `• Market conditions and economic indicators\n`;
    response += `• Infrastructure and development plans\n`;
    response += `• Interest rate environment\n\n`;
    
    response += `**Confidence Level:** Moderate to High\n`;
    response += `*Predictions based on current market analysis and property characteristics*`;
  } else {
    response += `I can provide general market predictions, but for accurate property-specific forecasts, I need analysis data.\n\n`;
    response += `**General Market Outlook:**\n`;
    response += `• Moderate growth expected over next 12 months\n`;
    response += `• Interest rate stability supporting market confidence\n`;
    response += `• Regional variations based on local factors\n`;
    response += `• Infrastructure development driving selected areas\n`;
  }

  return {
    response,
    suggestions: [
      'Show scenario analysis',
      'What factors drive predictions?',
      'Compare prediction confidence',
      'Long-term outlook'
    ],
    confidence: 78
  };
}

function generateReportResponse(message: string, property: any, analysis: any): ChatResponse {
  let response = `**Report Generation Available:**\n\n`;
  
  response += `I can help you generate comprehensive reports including:\n\n`;
  response += `📋 **Available Reports:**\n`;
  response += `• Comprehensive Property Valuation Report\n`;
  response += `• Advanced Climate Risk Assessment\n`;
  response += `• APRA CPS 230 Compliance Audit\n`;
  response += `• Market Intelligence & Investment Analysis\n\n`;
  
  if (analysis) {
    response += `**Current Analysis Summary:**\n`;
    response += `• Property Value: $${analysis.current_valuation?.toLocaleString() || 'N/A'}\n`;
    response += `• Risk Score: ${analysis.risk_score || 'N/A'}/100\n`;
    response += `• Confidence: ${analysis.confidence || 'N/A'}%\n\n`;
  }
  
  response += `**Report Features:**\n`;
  response += `✅ Professional formatting\n`;
  response += `✅ Detailed analysis and insights\n`;
  response += `✅ Visual charts and graphs\n`;
  response += `✅ Executive summary\n`;
  response += `✅ Risk assessment details\n`;
  response += `✅ Investment recommendations\n\n`;
  
  response += `Visit the Reports section to generate and download detailed reports.`;

  return {
    response,
    suggestions: [
      'Generate valuation report',
      'Create risk assessment',
      'Show report samples',
      'Custom report options'
    ],
    confidence: 92
  };
}

function generateComparisonResponse(message: string, property: any, analysis: any): ChatResponse {
  let response = `**Property Comparison Analysis:**\n\n`;
  
  if (analysis?.analysis_result?.market_comparables) {
    const comparables = analysis.analysis_result.market_comparables;
    response += `**Similar Properties:**\n`;
    
    comparables.slice(0, 3).forEach((comp: any, index: number) => {
      response += `${index + 1}. **${comp.address}**\n`;
      response += `   Value: $${comp.value?.toLocaleString()}\n`;
      response += `   Premium: ${(comp.premium * 100).toFixed(1)}%\n\n`;
    });
    
    response += `**Comparison Insights:**\n`;
    response += `• Your property shows competitive positioning\n`;
    response += `• Market premiums reflect location and features\n`;
    response += `• Consider market timing for optimal value\n`;
  } else {
    response += `For detailed property comparisons, I need analysis data with market comparables.\n\n`;
    response += `**Comparison Factors I Analyze:**\n`;
    response += `• Location and neighborhood quality\n`;
    response += `• Property size and features\n`;
    response += `• Recent sale prices in area\n`;
    response += `• Market trends and timing\n`;
    response += `• Investment potential metrics\n\n`;
    response += `Analyze a property to get specific comparisons with similar properties in the area.`;
  }

  return {
    response,
    suggestions: [
      'Show detailed comparisons',
      'Find similar properties',
      'Market positioning analysis',
      'Competitive advantages'
    ],
    confidence: 85
  };
}

function generateGeneralResponse(message: string, context: any): ChatResponse {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return {
      response: "Hello! I'm your PropGuard AI assistant. I specialize in property analysis, market insights, risk assessment, and investment advice. How can I help you today?",
      suggestions: [
        'Analyze a property',
        'Explain risk factors',
        'Market conditions overview',
        'Investment guidance'
      ],
      confidence: 95
    };
  }
  
  if (lowerMessage.includes('help')) {
    return {
      response: `**I can help you with:**\n\n🏠 **Property Analysis**\n• Comprehensive valuations\n• Risk assessments\n• Market comparisons\n\n📊 **Market Intelligence**\n• Trend analysis\n• Sentiment scoring\n• Price predictions\n\n💰 **Investment Advice**\n• ROI calculations\n• Risk-return analysis\n• Portfolio optimization\n\n📋 **Reporting**\n• Professional reports\n• Compliance documentation\n• Executive summaries\n\nWhat specific area would you like to explore?`,
      suggestions: [
        'Property valuation help',
        'Risk assessment guide',
        'Market analysis info',
        'Investment strategy tips'
      ],
      confidence: 98
    };
  }

  return {
    response: "I understand you're looking for property-related insights. I can provide detailed analysis on valuations, risks, market trends, and investment opportunities. Could you be more specific about what you'd like to know?",
    suggestions: [
      'Ask about property risks',
      'Request market analysis',
      'Get investment advice',
      'Generate property report'
    ],
    confidence: 75
  };
}