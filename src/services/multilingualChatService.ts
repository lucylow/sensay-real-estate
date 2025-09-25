// Enhanced Multilingual Chat Service for PropGuard AI
import { sensayAPI } from './api/sensay';
import { i18n, useTranslation } from '@/lib/i18n';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  language: string;
  confidence?: number;
  metadata?: any;
}

interface CulturalContext {
  country: string;
  currency: string;
  units: 'imperial' | 'metric';
  localTerms: Record<string, string>;
  marketNorms: Record<string, any>;
}

export class MultilingualChatService {
  private translationCache = new Map<string, string>();
  private conversationHistory: ChatMessage[] = [];
  private culturalContext: CulturalContext | null = null;

  constructor() {
    this.setupCulturalContext();
  }

  // Language Detection with Context Awareness
  async detectLanguageWithContext(text: string, userLocation?: string): Promise<{
    language: string;
    confidence: number;
    context: string;
    suggestions: string[];
  }> {
    try {
      // Use Sensay's enhanced language detection
      const detection = await sensayAPI.detectLanguage(text);
      
      // Add cultural context based on location
      const context = this.getCulturalContext(detection.language, userLocation);
      
      // Get localized suggestions
      const suggestions = this.getLocalizedSuggestions(detection.language);
      
      return {
        language: detection.language,
        confidence: detection.confidence,
        context: context.description,
        suggestions
      };
    } catch (error) {
      console.error('Language detection error:', error);
      return {
        language: 'en',
        confidence: 0.5,
        context: 'Default English context',
        suggestions: this.getLocalizedSuggestions('en')
      };
    }
  }

  // Enhanced Translation with Real Estate Context
  async translateWithContext(
    text: string, 
    targetLanguage: string, 
    context: 'property_description' | 'market_analysis' | 'valuation' | 'general' = 'general'
  ): Promise<string> {
    const cacheKey = `${text}-${targetLanguage}-${context}`;
    
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey)!;
    }

    try {
      // Use Sensay's context-aware translation
      const translatedText = await sensayAPI.translateText(text, targetLanguage);
      
      // Apply real estate specific adaptations
      const adaptedText = this.adaptRealEstateTerminology(translatedText, targetLanguage, context);
      
      this.translationCache.set(cacheKey, adaptedText);
      return adaptedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original
    }
  }

  // Process Chat Message with Full Multilingual Support
  async processChatMessage(
    message: string, 
    userLanguage?: string,
    userLocation?: string
  ): Promise<{
    response: string;
    language: string;
    confidence: number;
    localizedData?: any;
    culturalTips?: string[];
  }> {
    try {
      // 1. Detect language if not provided
      const languageInfo = userLanguage ? 
        { language: userLanguage, confidence: 1.0 } : 
        await this.detectLanguageWithContext(message, userLocation);

      // 2. Translate input if needed
      const processedMessage = languageInfo.language !== 'en' ? 
        await this.translateWithContext(message, 'en', 'general') : 
        message;

      // 3. Get AI response from Sensay
      const aiResponse = await sensayAPI.chat(processedMessage, {
        sessionId: `multilingual_${Date.now()}`,
        userInfo: { language: languageInfo.language, location: userLocation }
      });

      // 4. Translate response back to user's language
      const localizedResponse = languageInfo.language !== 'en' ?
        await this.translateWithContext(aiResponse.response, languageInfo.language, 'general') :
        aiResponse.response;

      // 5. Add cultural context and tips
      const culturalTips = this.getCulturalTips(languageInfo.language, userLocation);
      const localizedData = this.localizeResponseData(aiResponse.metadata, languageInfo.language);

      // 6. Store in conversation history
      this.addToHistory(message, 'user', languageInfo.language);
      this.addToHistory(localizedResponse, 'assistant', languageInfo.language);

      return {
        response: localizedResponse,
        language: languageInfo.language,
        confidence: aiResponse.confidence || 0.9,
        localizedData,
        culturalTips
      };
    } catch (error) {
      console.error('Chat processing error:', error);
      return {
        response: 'I apologize, but I\'m having trouble processing your request right now.',
        language: userLanguage || 'en',
        confidence: 0.1,
        culturalTips: []
      };
    }
  }

  // Get Property-Specific Localized Information
  async getLocalizedPropertyInfo(
    propertyData: any, 
    targetLanguage: string, 
    userLocation?: string
  ): Promise<any> {
    const culturalContext = this.getCulturalContext(targetLanguage, userLocation);
    
    return {
      ...propertyData,
      // Localize price with proper currency and formatting
      localizedPrice: this.formatPrice(propertyData.price, culturalContext.currency, targetLanguage),
      
      // Localize measurements
      localizedArea: this.formatArea(propertyData.area, culturalContext.units, targetLanguage),
      
      // Localize property type
      localizedPropertyType: this.localizePropertyType(propertyData.type, targetLanguage),
      
      // Localize description with cultural context
      localizedDescription: await this.translateWithContext(
        propertyData.description, 
        targetLanguage, 
        'property_description'
      ),
      
      // Add local market context
      localMarketContext: this.getLocalMarketContext(culturalContext),
      
      // Localize features
      localizedFeatures: propertyData.features.map((feature: string) =>
        this.localizeFeature(feature, targetLanguage)
      )
    };
  }

  // Cultural Context Setup
  private setupCulturalContext(): void {
    this.culturalContext = {
      country: 'US',
      currency: 'USD',
      units: 'imperial',
      localTerms: {},
      marketNorms: {}
    };
  }

  private getCulturalContext(language: string, location?: string): CulturalContext {
    const contexts = {
      'es': { country: 'ES', currency: 'EUR', units: 'metric' as const },
      'pt': { country: 'BR', currency: 'BRL', units: 'metric' as const },
      'zh': { country: 'CN', currency: 'CNY', units: 'metric' as const },
      'fr': { country: 'FR', currency: 'EUR', units: 'metric' as const },
      'de': { country: 'DE', currency: 'EUR', units: 'metric' as const },
      'ja': { country: 'JP', currency: 'JPY', units: 'metric' as const },
      'ko': { country: 'KR', currency: 'KRW', units: 'metric' as const },
      'ar': { country: 'SA', currency: 'SAR', units: 'metric' as const },
      'hi': { country: 'IN', currency: 'INR', units: 'metric' as const },
      'ru': { country: 'RU', currency: 'RUB', units: 'metric' as const }
    };

    return {
      ...contexts[language] || contexts['es'],
      description: this.getCulturalDescription(language),
      localTerms: this.getLocalTerms(language),
      marketNorms: this.getMarketNorms(language)
    };
  }

  private getCulturalDescription(language: string): string {
    const descriptions = {
      'es': 'Mercado inmobiliario español con regulaciones específicas',
      'pt': 'Mercado imobiliário brasileiro com características únicas',
      'zh': '中国房地产市场具有独特的投资特点',
      'fr': 'Marché immobilier français avec traditions établies',
      'de': 'Deutscher Immobilienmarkt mit starken regulativen Rahmenbedingungen',
      'ja': '日本の不動産市場は独自の特徴を持っています',
      'ko': '한국 부동산 시장의 특별한 특성들',
      'ar': 'السوق العقاري السعودي مع لوائح محددة',
      'hi': 'भारतीय रियल एस्टेट बाजार की विशेषताएं',
      'ru': 'Российский рынок недвижимости с уникальными особенностями'
    };
    return descriptions[language] || descriptions['es'];
  }

  private getLocalTerms(language: string): Record<string, string> {
    const terms = {
      'es': {
        'condominium': 'condominio',
        'townhouse': 'casa adosada',
        'open house': 'jornada de puertas abiertas',
        'mortgage': 'hipoteca',
        'down payment': 'enganche',
        'property tax': 'impuesto predial'
      },
      'pt': {
        'condominium': 'condomínio',
        'townhouse': 'casa geminada',
        'open house': 'visita aberta',
        'mortgage': 'financiamento',
        'down payment': 'entrada',
        'property tax': 'IPTU'
      },
      'zh': {
        'condominium': '公寓',
        'townhouse': '联排别墅',
        'open house': '开放日',
        'mortgage': '抵押贷款',
        'down payment': '首付',
        'property tax': '房产税'
      }
    };
    return terms[language] || terms['es'];
  }

  private getMarketNorms(language: string): Record<string, any> {
    const norms = {
      'es': {
        negotiation: '5-10% below asking price is common',
        downPayment: '20-30% typical',
        closing: '2-3 months typical',
        inspections: 'Standard practice'
      },
      'pt': {
        negotiation: '5-15% below asking price',
        downPayment: '10-20% typical',
        closing: '1-2 months typical',
        inspections: 'Highly recommended'
      },
      'zh': {
        negotiation: 'Minimal negotiation expected',
        downPayment: '30% minimum required',
        closing: '2-4 months typical',
        inspections: 'Optional but recommended'
      }
    };
    return norms[language] || norms['es'];
  }

  // Real Estate Terminology Adaptation
  private adaptRealEstateTerminology(
    text: string, 
    language: string, 
    context: string
  ): string {
    const localTerms = this.getLocalTerms(language);
    
    let adaptedText = text;
    
    // Replace English terms with localized equivalents
    Object.entries(localTerms).forEach(([english, local]) => {
      const regex = new RegExp(`\\b${english}\\b`, 'gi');
      adaptedText = adaptedText.replace(regex, local);
    });

    // Add context-specific adaptations
    if (context === 'property_description') {
      adaptedText = this.adaptPropertyDescription(adaptedText, language);
    } else if (context === 'market_analysis') {
      adaptedText = this.adaptMarketAnalysis(adaptedText, language);
    }

    return adaptedText;
  }

  private adaptPropertyDescription(text: string, language: string): string {
    // Add cultural preferences for property descriptions
    const adaptations = {
      'zh': text.replace(/beautiful/gi, '优雅的').replace(/modern/gi, '现代的'),
      'es': text.replace(/beautiful/gi, 'hermoso').replace(/modern/gi, 'moderno'),
      'pt': text.replace(/beautiful/gi, 'bonito').replace(/modern/gi, 'moderno')
    };
    return adaptations[language] || text;
  }

  private adaptMarketAnalysis(text: string, language: string): string {
    // Add market-specific terminology
    const adaptations = {
      'zh': text.replace(/market trends/gi, '市场趋势').replace(/investment/gi, '投资'),
      'es': text.replace(/market trends/gi, 'tendencias del mercado').replace(/investment/gi, 'inversión'),
      'pt': text.replace(/market trends/gi, 'tendências do mercado').replace(/investment/gi, 'investimento')
    };
    return adaptations[language] || text;
  }

  // Formatting Functions
  private formatPrice(amount: number, currency: string, language: string): string {
    const formatter = new Intl.NumberFormat(this.getLocaleCode(language), {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(amount);
  }

  private formatArea(area: number, units: 'imperial' | 'metric', language: string): string {
    if (units === 'metric') {
      const areaSqm = area * 0.092903;
      return `${Math.round(areaSqm)} m²`;
    }
    return `${area} sq ft`;
  }

  private localizePropertyType(type: string, language: string): string {
    const types = {
      'condominium': { 'es': 'condominio', 'pt': 'condomínio', 'zh': '公寓' },
      'townhouse': { 'es': 'casa adosada', 'pt': 'casa geminada', 'zh': '联排别墅' },
      'apartment': { 'es': 'apartamento', 'pt': 'apartamento', 'zh': '公寓' }
    };
    return types[type]?.[language] || type;
  }

  private localizeFeature(feature: string, language: string): string {
    const features = {
      'swimming pool': { 'es': 'piscina', 'pt': 'piscina', 'zh': '游泳池' },
      'garden': { 'es': 'jardín', 'pt': 'jardim', 'zh': '花园' },
      'parking': { 'es': 'estacionamiento', 'pt': 'estacionamento', 'zh': '停车位' }
    };
    return features[feature]?.[language] || feature;
  }

  // Helper Functions
  private getLocaleCode(language: string): string {
    const locales = {
      'en': 'en-US', 'es': 'es-ES', 'pt': 'pt-BR', 'zh': 'zh-CN',
      'fr': 'fr-FR', 'de': 'de-DE', 'ja': 'ja-JP', 'ko': 'ko-KR',
      'ar': 'ar-SA', 'hi': 'hi-IN', 'ru': 'ru-RU'
    };
    return locales[language] || 'en-US';
  }

  private getLocalizedSuggestions(language: string): string[] {
    const suggestions = {
      'en': [
        'Tell me about this property',
        'What\'s the market value?',
        'Show me risk factors',
        'Get investment analysis'
      ],
      'es': [
        'Cuéntame sobre esta propiedad',
        '¿Cuál es el valor de mercado?',
        'Muéstrame los factores de riesgo',
        'Obtén análisis de inversión'
      ],
      'pt': [
        'Conte-me sobre esta propriedade',
        'Qual é o valor de mercado?',
        'Mostre-me os fatores de risco',
        'Obtenha análise de investimento'
      ],
      'zh': [
        '告诉我这个房产的情况',
        '市场价值是多少？',
        '显示风险因素',
        '获取投资分析'
      ]
    };
    return suggestions[language] || suggestions['en'];
  }

  private getCulturalTips(language: string, location?: string): string[] {
    const tips = {
      'es': [
        'En España, los precios se negocian normalmente un 5-10% por debajo del precio de venta.',
        'Los contratos de alquiler suelen ser por 1 año mínimo.'
      ],
      'pt': [
        'No Brasil, os contratos de aluguel geralmente exigem um fiador ou seguro fiança.',
        'O IPTU é pago anualmente e varia por região.'
      ],
      'zh': [
        '在中国，购房通常需要支付30%的首付款。',
        '房产税按年缴纳，税率因地区而异。'
      ]
    };
    return tips[language] || [];
  }

  private getLocalMarketContext(context: CulturalContext): any {
    return {
      currency: context.currency,
      units: context.units,
      negotiationStyle: context.marketNorms.negotiation,
      typicalDownPayment: context.marketNorms.downPayment,
      closingTime: context.marketNorms.closing
    };
  }

  private localizeResponseData(data: any, language: string): any {
    if (!data) return null;
    
    return {
      ...data,
      localizedMetrics: this.localizeMetrics(data.metrics, language),
      localizedRisks: this.localizeRisks(data.risks, language),
      localizedRecommendations: this.localizeRecommendations(data.recommendations, language)
    };
  }

  private localizeMetrics(metrics: any, language: string): any {
    if (!metrics) return null;
    
    return {
      ...metrics,
      localizedLabels: this.getLocalizedLabels(language),
      formattedValues: this.formatMetricValues(metrics, language)
    };
  }

  private localizeRisks(risks: string[], language: string): string[] {
    if (!risks) return [];
    
    return risks.map(risk => this.translateRiskTerm(risk, language));
  }

  private localizeRecommendations(recommendations: string[], language: string): string[] {
    if (!recommendations) return [];
    
    return recommendations.map(rec => this.translateRecommendation(rec, language));
  }

  private getLocalizedLabels(language: string): Record<string, string> {
    const labels = {
      'es': {
        'price': 'Precio',
        'area': 'Área',
        'risk': 'Riesgo',
        'growth': 'Crecimiento'
      },
      'pt': {
        'price': 'Preço',
        'area': 'Área',
        'risk': 'Risco',
        'growth': 'Crescimento'
      },
      'zh': {
        'price': '价格',
        'area': '面积',
        'risk': '风险',
        'growth': '增长'
      }
    };
    return labels[language] || labels['es'];
  }

  private formatMetricValues(metrics: any, language: string): any {
    const formatted: any = {};
    
    Object.entries(metrics).forEach(([key, value]) => {
      if (typeof value === 'number') {
        if (key.includes('price') || key.includes('cost')) {
          formatted[key] = this.formatPrice(value, this.getCurrencyForLanguage(language), language);
        } else if (key.includes('area') || key.includes('size')) {
          formatted[key] = this.formatArea(value, this.getUnitsForLanguage(language), language);
        } else {
          formatted[key] = new Intl.NumberFormat(this.getLocaleCode(language)).format(value);
        }
      } else {
        formatted[key] = value;
      }
    });
    
    return formatted;
  }

  private getCurrencyForLanguage(language: string): string {
    const currencies = {
      'es': 'EUR', 'pt': 'BRL', 'zh': 'CNY', 'fr': 'EUR',
      'de': 'EUR', 'ja': 'JPY', 'ko': 'KRW', 'ar': 'SAR',
      'hi': 'INR', 'ru': 'RUB'
    };
    return currencies[language] || 'USD';
  }

  private getUnitsForLanguage(language: string): 'imperial' | 'metric' {
    return ['es', 'pt', 'zh', 'fr', 'de', 'ja', 'ko', 'ar', 'hi', 'ru'].includes(language) ? 
      'metric' : 'imperial';
  }

  private translateRiskTerm(risk: string, language: string): string {
    const riskTerms = {
      'flood risk': { 'es': 'riesgo de inundación', 'pt': 'risco de inundação', 'zh': '洪水风险' },
      'earthquake risk': { 'es': 'riesgo sísmico', 'pt': 'risco sísmico', 'zh': '地震风险' },
      'market volatility': { 'es': 'volatilidad del mercado', 'pt': 'volatilidade do mercado', 'zh': '市场波动性' }
    };
    return riskTerms[risk]?.[language] || risk;
  }

  private translateRecommendation(rec: string, language: string): string {
    const recommendations = {
      'consider insurance': { 'es': 'considere seguro', 'pt': 'considere seguro', 'zh': '考虑保险' },
      'monitor market': { 'es': 'monitoree el mercado', 'pt': 'monitore o mercado', 'zh': '监控市场' },
      'get inspection': { 'es': 'obtenga inspección', 'pt': 'obtenha inspeção', 'zh': '进行检查' }
    };
    return recommendations[rec]?.[language] || rec;
  }

  // Conversation History Management
  private addToHistory(content: string, role: 'user' | 'assistant' | 'system', language: string): void {
    this.conversationHistory.push({
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
      language
    });
    
    // Keep only last 50 messages
    if (this.conversationHistory.length > 50) {
      this.conversationHistory = this.conversationHistory.slice(-50);
    }
  }

  public getConversationHistory(): ChatMessage[] {
    return this.conversationHistory;
  }

  public clearHistory(): void {
    this.conversationHistory = [];
  }

  public clearCache(): void {
    this.translationCache.clear();
  }
}

// Export singleton instance
export const multilingualChatService = new MultilingualChatService();
