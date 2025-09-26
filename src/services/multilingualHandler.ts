export interface LanguageDetectionResult {
  language: string;
  confidence: number;
}

export interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence: number;
}

export class MultilingualHandler {
  private supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' }
  ];

  private realEstateTerms: Record<string, Record<string, string>> = {
    en: {
      property: 'property',
      house: 'house',
      apartment: 'apartment',
      price: 'price',
      bedroom: 'bedroom',
      bathroom: 'bathroom',
      location: 'location',
      valuation: 'valuation',
      market: 'market',
      investment: 'investment'
    },
    es: {
      property: 'propiedad',
      house: 'casa',
      apartment: 'apartamento',
      price: 'precio',
      bedroom: 'dormitorio',
      bathroom: 'baño',
      location: 'ubicación',
      valuation: 'valuación',
      market: 'mercado',
      investment: 'inversión'
    },
    fr: {
      property: 'propriété',
      house: 'maison',
      apartment: 'appartement',
      price: 'prix',
      bedroom: 'chambre',
      bathroom: 'salle de bain',
      location: 'emplacement',
      valuation: 'évaluation',
      market: 'marché',
      investment: 'investissement'
    },
    de: {
      property: 'Immobilie',
      house: 'Haus',
      apartment: 'Wohnung',
      price: 'Preis',
      bedroom: 'Schlafzimmer',
      bathroom: 'Badezimmer',
      location: 'Standort',
      valuation: 'Bewertung',
      market: 'Markt',
      investment: 'Investition'
    },
    zh: {
      property: '房产',
      house: '房子',
      apartment: '公寓',
      price: '价格',
      bedroom: '卧室',
      bathroom: '浴室',
      location: '位置',
      valuation: '估价',
      market: '市场',
      investment: '投资'
    },
    ja: {
      property: '不動産',
      house: '家',
      apartment: 'アパート',
      price: '価格',
      bedroom: '寝室',
      bathroom: 'バスルーム',
      location: '場所',
      valuation: '評価',
      market: '市場',
      investment: '投資'
    },
    ko: {
      property: '부동산',
      house: '집',
      apartment: '아파트',
      price: '가격',
      bedroom: '침실',
      bathroom: '욕실',
      location: '위치',
      valuation: '평가',
      market: '시장',
      investment: '투자'
    }
  };

  private commonPhrases: Record<string, Record<string, string>> = {
    en: {
      'looking for': 'looking for',
      'how much': 'how much',
      'what is the price': 'what is the price',
      'schedule viewing': 'schedule viewing',
      'property valuation': 'property valuation',
      'market trends': 'market trends'
    },
    es: {
      'looking for': 'buscando',
      'how much': 'cuánto cuesta',
      'what is the price': 'cuál es el precio',
      'schedule viewing': 'programar visita',
      'property valuation': 'valuación de propiedad',
      'market trends': 'tendencias del mercado'
    },
    fr: {
      'looking for': 'cherche',
      'how much': 'combien coûte',
      'what is the price': 'quel est le prix',
      'schedule viewing': 'planifier une visite',
      'property valuation': 'évaluation de propriété',
      'market trends': 'tendances du marché'
    },
    de: {
      'looking for': 'suche',
      'how much': 'wie viel kostet',
      'what is the price': 'was ist der Preis',
      'schedule viewing': 'Besichtigung planen',
      'property valuation': 'Immobilienbewertung',
      'market trends': 'Markttrends'
    }
  };

  async detectLanguage(text: string): Promise<string> {
    // Simple language detection based on common words and patterns
    const textLower = text.toLowerCase();
    
    // Check for specific language indicators
    const languageIndicators = {
      es: ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'una', 'es', 'con', 'por', 'para'],
      fr: ['le', 'la', 'de', 'et', 'est', 'un', 'une', 'dans', 'pour', 'avec', 'sur'],
      de: ['der', 'die', 'das', 'und', 'ist', 'in', 'mit', 'für', 'von', 'zu', 'auf'],
      it: ['il', 'la', 'di', 'e', 'è', 'un', 'una', 'in', 'con', 'per', 'da'],
      pt: ['o', 'a', 'de', 'e', 'é', 'um', 'uma', 'em', 'com', 'para', 'por'],
      zh: ['的', '是', '在', '有', '和', '了', '我', '你', '他', '她', '它'],
      ja: ['の', 'は', 'に', 'を', 'が', 'で', 'と', 'から', 'まで', 'です'],
      ko: ['의', '이', '가', '을', '를', '에', '에서', '와', '과', '이다'],
      ar: ['في', 'من', 'إلى', 'على', 'هذا', 'هذه', 'التي', 'الذي', 'مع', 'بدون'],
      hi: ['का', 'के', 'की', 'में', 'पर', 'से', 'को', 'तक', 'के', 'साथ'],
      ru: ['в', 'на', 'с', 'для', 'от', 'до', 'из', 'к', 'по', 'о']
    };

    let bestMatch = 'en';
    let maxMatches = 0;

    for (const [lang, indicators] of Object.entries(languageIndicators)) {
      const matches = indicators.filter(indicator => textLower.includes(indicator)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = lang;
      }
    }

    // Check for real estate specific terms
    for (const [lang, terms] of Object.entries(this.realEstateTerms)) {
      const matches = Object.values(terms).filter(term => textLower.includes(term)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = lang;
      }
    }

    // Fallback to character-based detection for Asian languages
    if (bestMatch === 'en') {
      const chineseChars = /[\u4e00-\u9fff]/;
      const japaneseChars = /[\u3040-\u309f\u30a0-\u30ff]/;
      const koreanChars = /[\uac00-\ud7af]/;
      const arabicChars = /[\u0600-\u06ff]/;
      const cyrillicChars = /[\u0400-\u04ff]/;

      if (chineseChars.test(text)) return 'zh';
      if (japaneseChars.test(text)) return 'ja';
      if (koreanChars.test(text)) return 'ko';
      if (arabicChars.test(text)) return 'ar';
      if (cyrillicChars.test(text)) return 'ru';
    }

    return bestMatch;
  }

  async translateMessage(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
    if (sourceLanguage === targetLanguage) {
      return text;
    }

    // Simple translation for real estate terms
    const sourceTerms = this.realEstateTerms[sourceLanguage] || {};
    const targetTerms = this.realEstateTerms[targetLanguage] || {};

    let translatedText = text;

    // Translate common real estate terms
    for (const [englishTerm, sourceTerm] of Object.entries(sourceTerms)) {
      const targetTerm = targetTerms[englishTerm];
      if (targetTerm && sourceTerm !== targetTerm) {
        const regex = new RegExp(`\\b${sourceTerm}\\b`, 'gi');
        translatedText = translatedText.replace(regex, targetTerm);
      }
    }

    // Translate common phrases
    const sourcePhrases = this.commonPhrases[sourceLanguage] || {};
    const targetPhrases = this.commonPhrases[targetLanguage] || {};

    for (const [englishPhrase, sourcePhrase] of Object.entries(sourcePhrases)) {
      const targetPhrase = targetPhrases[englishPhrase];
      if (targetPhrase && sourcePhrase !== targetPhrase) {
        const regex = new RegExp(sourcePhrase, 'gi');
        translatedText = translatedText.replace(regex, targetPhrase);
      }
    }

    // If no translation was made, return original text
    if (translatedText === text) {
      console.warn(`No translation available from ${sourceLanguage} to ${targetLanguage}`);
      return text;
    }

    return translatedText;
  }

  async translatePropertyDetails(property: any, targetLanguage: string): Promise<any> {
    if (targetLanguage === 'en') {
      return property;
    }

    const translatedProperty = { ...property };
    
    // Translate property type
    if (property.propertyType) {
      const translatedType = this.realEstateTerms[targetLanguage]?.[property.propertyType];
      if (translatedType) {
        translatedProperty.propertyType = translatedType;
      }
    }

    // Translate features
    if (property.features && Array.isArray(property.features)) {
      translatedProperty.features = property.features.map(feature => {
        const translatedFeature = this.realEstateTerms[targetLanguage]?.[feature.toLowerCase()];
        return translatedFeature || feature;
      });
    }

    return translatedProperty;
  }

  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  getLanguageByCode(code: string) {
    return this.supportedLanguages.find(lang => lang.code === code);
  }

  isLanguageSupported(code: string): boolean {
    return this.supportedLanguages.some(lang => lang.code === code);
  }

  async getLocalizedMarketInsights(insights: any, language: string): Promise<any> {
    if (language === 'en') {
      return insights;
    }

    const localizedInsights = { ...insights };

    // Translate market sentiment
    const sentimentTranslations: Record<string, Record<string, string>> = {
      es: { bullish: 'alcista', neutral: 'neutral', bearish: 'bajista' },
      fr: { bullish: 'haussière', neutral: 'neutre', bearish: 'baissière' },
      de: { bullish: 'steigend', neutral: 'neutral', bearish: 'fallend' }
    };

    if (localizedInsights.marketSentiment) {
      const translatedSentiment = sentimentTranslations[language]?.[localizedInsights.marketSentiment];
      if (translatedSentiment) {
        localizedInsights.marketSentiment = translatedSentiment;
      }
    }

    // Translate risk trends
    const riskTrendTranslations: Record<string, Record<string, string>> = {
      es: { increasing: 'creciente', stable: 'estable', decreasing: 'decreciente' },
      fr: { increasing: 'croissant', stable: 'stable', decreasing: 'décroissant' },
      de: { increasing: 'steigend', stable: 'stabil', decreasing: 'fallend' }
    };

    if (localizedInsights.riskTrend) {
      const translatedRiskTrend = riskTrendTranslations[language]?.[localizedInsights.riskTrend];
      if (translatedRiskTrend) {
        localizedInsights.riskTrend = translatedRiskTrend;
      }
    }

    return localizedInsights;
  }

  async generateLocalizedActions(actions: any[], language: string): Promise<any[]> {
    if (language === 'en') {
      return actions;
    }

    const actionTranslations: Record<string, Record<string, string>> = {
      es: {
        'View Properties': 'Ver Propiedades',
        'Schedule Viewing': 'Programar Visita',
        'Get Valuation': 'Obtener Valuación',
        'Market Analysis': 'Análisis de Mercado',
        'Download Report': 'Descargar Reporte'
      },
      fr: {
        'View Properties': 'Voir les Propriétés',
        'Schedule Viewing': 'Planifier une Visite',
        'Get Valuation': 'Obtenir une Évaluation',
        'Market Analysis': 'Analyse du Marché',
        'Download Report': 'Télécharger le Rapport'
      },
      de: {
        'View Properties': 'Immobilien Anzeigen',
        'Schedule Viewing': 'Besichtigung Planen',
        'Get Valuation': 'Bewertung Erhalten',
        'Market Analysis': 'Marktanalyse',
        'Download Report': 'Bericht Herunterladen'
      }
    };

    const translations = actionTranslations[language] || {};
    
    return actions.map(action => ({
      ...action,
      label: translations[action.label] || action.label
    }));
  }
}

