// Internationalization (i18n) system for global property platform
export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'zh' | 'ja' | 'ko' | 'ar' | 'hi' | 'ru';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' }
];

export interface Translations {
  // Common UI elements
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    search: string;
    filter: string;
    sort: string;
    view: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    reset: string;
    copy: string;
    copied: string;
    select: string;
    all: string;
    none: string;
    required: string;
    optional: string;
  };
  
  // Sensay Setup specific
  sensaySetup: {
    title: string;
    subtitle: string;
    hackathonBadge: string;
    welcomeTitle: string;
    welcomeDescription: string;
    viewDocumentation: string;
    step1Title: string;
    step1Description: string;
    inviteCodeLabel: string;
    inviteCodePlaceholder: string;
    redeemButton: string;
    redeemingButton: string;
    step2Title: string;
    step2Description: string;
    apiKeyLabel: string;
    apiKeyPlaceholder: string;
    orgIdLabel: string;
    orgIdPlaceholder: string;
    testCredentialsButton: string;
    testingButton: string;
    setupCompleteTitle: string;
    setupCompleteDescription: string;
    envVarTitle: string;
    envVarDescription: string;
    envVarApiKey: string;
    envVarOrgId: string;
    errors: {
      inviteCodeRequired: string;
      apiKeyRequired: string;
      orgIdRequired: string;
      redeemFailed: string;
      testFailed: string;
    };
  };
  
  // Property related
  property: {
    address: string;
    price: string;
    type: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    yearBuilt: string;
    location: string;
    valuation: string;
    analysis: string;
    risk: string;
    market: string;
    investment: string;
  };
  
  // Global regions
  regions: {
    northAmerica: string;
    southAmerica: string;
    europe: string;
    asia: string;
    africa: string;
    oceania: string;
    middleEast: string;
  };
}

// Default English translations
const defaultTranslations: Translations = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    view: 'View',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    copy: 'Copy',
    copied: 'Copied!',
    select: 'Select',
    all: 'All',
    none: 'None',
    required: 'Required',
    optional: 'Optional'
  },
  sensaySetup: {
    title: 'Sensay Wisdom API Setup',
    subtitle: 'Configure your global AI assistant',
    hackathonBadge: 'Global',
    welcomeTitle: 'Welcome to the Global Property Intelligence Platform!',
    welcomeDescription: 'You\'ve been invited to build AI-powered solutions using Sensay\'s Wisdom Engine for global property analysis. Follow the steps below to get started with your API access.',
    viewDocumentation: 'View API Documentation →',
    step1Title: 'Step 1: Redeem Your Invite Code',
    step1Description: 'Use the invite code from your Sensay email to get your API key.',
    inviteCodeLabel: 'Invite Code',
    inviteCodePlaceholder: 'Enter your invite code',
    redeemButton: 'Redeem',
    redeemingButton: 'Redeeming...',
    step2Title: 'Step 2: API Credentials Setup',
    step2Description: 'If you already have API credentials, enter them below. Otherwise, redeem your invite code above.',
    apiKeyLabel: 'API Key',
    apiKeyPlaceholder: 'Enter your Sensay API key',
    orgIdLabel: 'Organization ID',
    orgIdPlaceholder: 'Enter your Organization ID',
    testCredentialsButton: 'Test API Credentials',
    testingButton: 'Testing...',
    setupCompleteTitle: 'Setup Complete!',
    setupCompleteDescription: 'Your Sensay API key is now configured. You can now use the enhanced AI assistant with Sensay\'s Wisdom Engine for sophisticated global property analysis.',
    envVarTitle: 'Environment Variable Setup',
    envVarDescription: 'For production deployment, set the following environment variables:',
    envVarApiKey: 'VITE_SENSAY_API_KEY=your_api_key_here',
    envVarOrgId: 'VITE_SENSAY_ORG_ID=your_organization_id_here',
    errors: {
      inviteCodeRequired: 'Please enter your invite code',
      apiKeyRequired: 'Please enter both API key and Organization ID',
      orgIdRequired: 'Please enter both API key and Organization ID',
      redeemFailed: 'Failed to redeem invite code',
      testFailed: 'API credentials test failed'
    }
  },
  property: {
    address: 'Address',
    price: 'Price',
    type: 'Type',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    area: 'Area',
    yearBuilt: 'Year Built',
    location: 'Location',
    valuation: 'Valuation',
    analysis: 'Analysis',
    risk: 'Risk',
    market: 'Market',
    investment: 'Investment'
  },
  regions: {
    northAmerica: 'North America',
    southAmerica: 'South America',
    europe: 'Europe',
    asia: 'Asia',
    africa: 'Africa',
    oceania: 'Oceania',
    middleEast: 'Middle East'
  }
};

// Translation storage
const translations: Record<Language, Translations> = {
  en: defaultTranslations,
  es: {
    ...defaultTranslations,
    sensaySetup: {
      ...defaultTranslations.sensaySetup,
      title: 'Configuración de la API Sensay Wisdom',
      subtitle: 'Configure su asistente de IA global',
      hackathonBadge: 'Global',
      welcomeTitle: '¡Bienvenido a la Plataforma Global de Inteligencia Inmobiliaria!',
      welcomeDescription: 'Ha sido invitado a construir soluciones impulsadas por IA usando el Motor de Sabiduría de Sensay para análisis inmobiliario global. Siga los pasos a continuación para comenzar con su acceso API.',
      viewDocumentation: 'Ver Documentación API →',
      step1Title: 'Paso 1: Canjear Su Código de Invitación',
      step1Description: 'Use el código de invitación de su correo de Sensay para obtener su clave API.',
      inviteCodeLabel: 'Código de Invitación',
      inviteCodePlaceholder: 'Ingrese su código de invitación',
      redeemButton: 'Canjear',
      redeemingButton: 'Canjeando...',
      step2Title: 'Paso 2: Configuración de Credenciales API',
      step2Description: 'Si ya tiene credenciales API, ingréselas a continuación. De lo contrario, canjee su código de invitación arriba.',
      apiKeyLabel: 'Clave API',
      apiKeyPlaceholder: 'Ingrese su clave API de Sensay',
      orgIdLabel: 'ID de Organización',
      orgIdPlaceholder: 'Ingrese su ID de Organización',
      testCredentialsButton: 'Probar Credenciales API',
      testingButton: 'Probando...',
      setupCompleteTitle: '¡Configuración Completa!',
      setupCompleteDescription: 'Su clave API de Sensay está ahora configurada. Ahora puede usar el asistente de IA mejorado con el Motor de Sabiduría de Sensay para análisis inmobiliario global sofisticado.',
      envVarTitle: 'Configuración de Variables de Entorno',
      envVarDescription: 'Para el despliegue en producción, configure las siguientes variables de entorno:',
      envVarApiKey: 'VITE_SENSAY_API_KEY=su_clave_api_aqui',
      envVarOrgId: 'VITE_SENSAY_ORG_ID=su_id_organizacion_aqui',
      errors: {
        inviteCodeRequired: 'Por favor ingrese su código de invitación',
        apiKeyRequired: 'Por favor ingrese tanto la clave API como el ID de Organización',
        orgIdRequired: 'Por favor ingrese tanto la clave API como el ID de Organización',
        redeemFailed: 'Error al canjear código de invitación',
        testFailed: 'Error en la prueba de credenciales API'
      }
    }
  },
  fr: {
    ...defaultTranslations,
    sensaySetup: {
      ...defaultTranslations.sensaySetup,
      title: 'Configuration de l\'API Sensay Wisdom',
      subtitle: 'Configurez votre assistant IA global',
      hackathonBadge: 'Global',
      welcomeTitle: 'Bienvenue sur la Plateforme Globale d\'Intelligence Immobilière !',
      welcomeDescription: 'Vous avez été invité à construire des solutions alimentées par l\'IA en utilisant le Moteur de Sagesse de Sensay pour l\'analyse immobilière globale. Suivez les étapes ci-dessous pour commencer avec votre accès API.',
      viewDocumentation: 'Voir la Documentation API →',
      step1Title: 'Étape 1: Utiliser Votre Code d\'Invitation',
      step1Description: 'Utilisez le code d\'invitation de votre email Sensay pour obtenir votre clé API.',
      inviteCodeLabel: 'Code d\'Invitation',
      inviteCodePlaceholder: 'Entrez votre code d\'invitation',
      redeemButton: 'Utiliser',
      redeemingButton: 'Utilisation...',
      step2Title: 'Étape 2: Configuration des Identifiants API',
      step2Description: 'Si vous avez déjà des identifiants API, entrez-les ci-dessous. Sinon, utilisez votre code d\'invitation ci-dessus.',
      apiKeyLabel: 'Clé API',
      apiKeyPlaceholder: 'Entrez votre clé API Sensay',
      orgIdLabel: 'ID d\'Organisation',
      orgIdPlaceholder: 'Entrez votre ID d\'Organisation',
      testCredentialsButton: 'Tester les Identifiants API',
      testingButton: 'Test...',
      setupCompleteTitle: 'Configuration Terminée !',
      setupCompleteDescription: 'Votre clé API Sensay est maintenant configurée. Vous pouvez maintenant utiliser l\'assistant IA amélioré avec le Moteur de Sagesse de Sensay pour une analyse immobilière globale sophistiquée.',
      envVarTitle: 'Configuration des Variables d\'Environnement',
      envVarDescription: 'Pour le déploiement en production, définissez les variables d\'environnement suivantes :',
      envVarApiKey: 'VITE_SENSAY_API_KEY=votre_cle_api_ici',
      envVarOrgId: 'VITE_SENSAY_ORG_ID=votre_id_organisation_ici',
      errors: {
        inviteCodeRequired: 'Veuillez entrer votre code d\'invitation',
        apiKeyRequired: 'Veuillez entrer à la fois la clé API et l\'ID d\'Organisation',
        orgIdRequired: 'Veuillez entrer à la fois la clé API et l\'ID d\'Organisation',
        redeemFailed: 'Échec de l\'utilisation du code d\'invitation',
        testFailed: 'Échec du test des identifiants API'
      }
    }
  },
  // Add more languages as needed...
  de: defaultTranslations,
  it: defaultTranslations,
  pt: defaultTranslations,
  zh: defaultTranslations,
  ja: defaultTranslations,
  ko: defaultTranslations,
  ar: defaultTranslations,
  hi: defaultTranslations,
  ru: defaultTranslations
};

class I18nManager {
  private currentLanguage: Language = 'en';
  private listeners: Array<(language: Language) => void> = [];

  constructor() {
    // Try to detect language from browser or localStorage
    const savedLanguage = localStorage.getItem('sensay_language') as Language;
    const browserLanguage = navigator.language.split('-')[0] as Language;
    
    if (savedLanguage && SUPPORTED_LANGUAGES.find(lang => lang.code === savedLanguage)) {
      this.currentLanguage = savedLanguage;
    } else if (SUPPORTED_LANGUAGES.find(lang => lang.code === browserLanguage)) {
      this.currentLanguage = browserLanguage;
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  setLanguage(language: Language): void {
    if (SUPPORTED_LANGUAGES.find(lang => lang.code === language)) {
      this.currentLanguage = language;
      localStorage.setItem('sensay_language', language);
      this.listeners.forEach(listener => listener(language));
    }
  }

  getTranslations(): Translations {
    return translations[this.currentLanguage] || translations.en;
  }

  t(key: string): string {
    const keys = key.split('.');
    let value: any = this.getTranslations();
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value;
  }

  onLanguageChange(listener: (language: Language) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Utility method to format numbers based on locale
  formatNumber(number: number): string {
    return new Intl.NumberFormat(this.getCurrentLanguage()).format(number);
  }

  // Utility method to format currency based on locale and region
  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat(this.getCurrentLanguage(), {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Utility method to format dates based on locale
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat(this.getCurrentLanguage()).format(date);
  }

  // Get supported languages
  getSupportedLanguages(): LanguageInfo[] {
    return SUPPORTED_LANGUAGES;
  }

  // Detect language from text (basic implementation)
  detectLanguage(text: string): Language {
    // Simple language detection based on common words
    const patterns = {
      es: /\b(el|la|de|que|y|a|en|un|es|se|no|te|lo|le|da|su|por|son|con|para|al|lo|del|los|las|una|pero|sus|las|más|como|todo|sobre|también|después|otros|bien|hasta|desde|muy|sin|vez|año|más|hacer|solo|todos|nuevo|dos|puede|tanto|hacer|más|vida|donde|nuevo|puede|hacer|más|vida|donde|nuevo|puede|hacer|más|vida|donde|nuevo|puede|hacer|más|vida|donde)\b/i,
      fr: /\b(le|la|de|et|à|en|un|est|se|ne|te|lo|le|da|su|par|son|con|pour|au|lo|del|les|une|mais|ses|plus|comme|tout|sur|aussi|après|autres|bien|jusqu|depuis|très|sans|fois|année|plus|faire|seul|tous|nouveau|deux|peut|tant|faire|plus|vie|où|nouveau|peut|faire|plus|vie|où)\b/i,
      de: /\b(der|die|das|und|zu|in|ein|ist|sich|nicht|mit|auf|für|als|eine|von|auch|an|nach|oder|aber|aus|wenn|nur|noch|wie|so|dass|kann|alle|neue|zwei|mehr|haben|sein|werden|können|sollen|müssen|wollen|dürfen|mögen)\b/i,
      it: /\b(il|la|di|e|a|in|un|è|si|non|con|su|per|come|una|da|anche|al|dopo|o|ma|da|quando|solo|ancora|come|così|che|può|tutti|nuovo|due|più|avere|essere|diventare|potere|dovere|volere)\b/i,
      pt: /\b(o|a|de|e|em|um|é|se|não|com|para|como|uma|da|também|ao|após|ou|mas|de|quando|só|ainda|como|assim|que|pode|todos|novo|dois|mais|ter|ser|tornar|poder|dever|querer)\b/i,
      zh: /[\u4e00-\u9fff]/,
      ja: /[\u3040-\u309f\u30a0-\u30ff]/,
      ko: /[\uac00-\ud7af]/,
      ar: /[\u0600-\u06ff]/,
      hi: /[\u0900-\u097f]/,
      ru: /[\u0400-\u04ff]/
    };

    for (const [lang, pattern] of Object.entries(patterns)) {
      if (pattern.test(text)) {
        return lang as Language;
      }
    }

    return 'en'; // Default to English
  }
}

// Global instance
export const i18n = new I18nManager();

// React hook for using translations
export const useTranslation = () => {
  const [language, setLanguage] = React.useState(i18n.getCurrentLanguage());
  const [translations, setTranslations] = React.useState(i18n.getTranslations());

  React.useEffect(() => {
    const unsubscribe = i18n.onLanguageChange((newLanguage) => {
      setLanguage(newLanguage);
      setTranslations(i18n.getTranslations());
    });

    return unsubscribe;
  }, []);

  return {
    t: (key: string) => i18n.t(key),
    language,
    setLanguage: (lang: Language) => i18n.setLanguage(lang),
    translations,
    formatNumber: (num: number) => i18n.formatNumber(num),
    formatCurrency: (amount: number, currency?: string) => i18n.formatCurrency(amount, currency),
    formatDate: (date: Date) => i18n.formatDate(date),
    supportedLanguages: i18n.getSupportedLanguages()
  };
};

// Import React for the hook
import React from 'react';
