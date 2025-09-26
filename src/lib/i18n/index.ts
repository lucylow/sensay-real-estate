import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Language configuration
export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' }
];

// Translation keys
export interface TranslationKeys {
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    view: string;
    search: string;
    filter: string;
    sort: string;
    refresh: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    reset: string;
    yes: string;
    no: string;
    ok: string;
  };
  
  // Navigation
  navigation: {
    home: string;
    dashboard: string;
    properties: string;
    leads: string;
    analytics: string;
    settings: string;
    profile: string;
    logout: string;
    login: string;
    register: string;
  };
  
  // Chatbot
  chatbot: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    typing: string;
    online: string;
    offline: string;
    welcome: string;
    goodbye: string;
    error: string;
    retry: string;
    clear: string;
    export: string;
    import: string;
  };
  
  // Property
  property: {
    title: string;
    address: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    squareFeet: string;
    lotSize: string;
    yearBuilt: string;
    propertyType: string;
    status: string;
    description: string;
    features: string;
    amenities: string;
    location: string;
    neighborhood: string;
    schoolDistrict: string;
    commute: string;
    walkScore: string;
    transitScore: string;
    bikeScore: string;
  };
  
  // Lead
  lead: {
    title: string;
    name: string;
    email: string;
    phone: string;
    source: string;
    status: string;
    score: string;
    notes: string;
    lastContact: string;
    nextFollowUp: string;
    assignedTo: string;
    createdAt: string;
    updatedAt: string;
  };
  
  // Analytics
  analytics: {
    title: string;
    overview: string;
    performance: string;
    trends: string;
    insights: string;
    reports: string;
    metrics: string;
    charts: string;
    filters: string;
    dateRange: string;
    export: string;
    share: string;
  };
  
  // Settings
  settings: {
    title: string;
    general: string;
    notifications: string;
    privacy: string;
    security: string;
    account: string;
    billing: string;
    integrations: string;
    api: string;
    support: string;
    about: string;
  };
}

// Default English translations
const defaultTranslations: TranslationKeys = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success!',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    refresh: 'Refresh',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    yes: 'Yes',
    no: 'No',
    ok: 'OK'
  },
  navigation: {
    home: 'Home',
    dashboard: 'Dashboard',
    properties: 'Properties',
    leads: 'Leads',
    analytics: 'Analytics',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    login: 'Login',
    register: 'Register'
  },
  chatbot: {
    title: 'AI Assistant',
    subtitle: 'Your intelligent real estate assistant',
    placeholder: 'Type your message here...',
    send: 'Send',
    typing: 'Typing...',
    online: 'Online',
    offline: 'Offline',
    welcome: 'Welcome! How can I help you today?',
    goodbye: 'Thank you for using our service!',
    error: 'Sorry, I encountered an error. Please try again.',
    retry: 'Retry',
    clear: 'Clear',
    export: 'Export',
    import: 'Import'
  },
  property: {
    title: 'Property',
    address: 'Address',
    price: 'Price',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    squareFeet: 'Square Feet',
    lotSize: 'Lot Size',
    yearBuilt: 'Year Built',
    propertyType: 'Property Type',
    status: 'Status',
    description: 'Description',
    features: 'Features',
    amenities: 'Amenities',
    location: 'Location',
    neighborhood: 'Neighborhood',
    schoolDistrict: 'School District',
    commute: 'Commute',
    walkScore: 'Walk Score',
    transitScore: 'Transit Score',
    bikeScore: 'Bike Score'
  },
  lead: {
    title: 'Lead',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    source: 'Source',
    status: 'Status',
    score: 'Score',
    notes: 'Notes',
    lastContact: 'Last Contact',
    nextFollowUp: 'Next Follow-up',
    assignedTo: 'Assigned To',
    createdAt: 'Created At',
    updatedAt: 'Updated At'
  },
  analytics: {
    title: 'Analytics',
    overview: 'Overview',
    performance: 'Performance',
    trends: 'Trends',
    insights: 'Insights',
    reports: 'Reports',
    metrics: 'Metrics',
    charts: 'Charts',
    filters: 'Filters',
    dateRange: 'Date Range',
    export: 'Export',
    share: 'Share'
  },
  settings: {
    title: 'Settings',
    general: 'General',
    notifications: 'Notifications',
    privacy: 'Privacy',
    security: 'Security',
    account: 'Account',
    billing: 'Billing',
    integrations: 'Integrations',
    api: 'API',
    support: 'Support',
    about: 'About'
  }
};

// Spanish translations
const spanishTranslations: TranslationKeys = {
  ...defaultTranslations,
  common: {
    ...defaultTranslations.common,
    loading: 'Cargando...',
    error: 'Ocurrió un error',
    success: '¡Éxito!',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    view: 'Ver',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    refresh: 'Actualizar',
    close: 'Cerrar',
    back: 'Atrás',
    next: 'Siguiente',
    previous: 'Anterior',
    submit: 'Enviar',
    reset: 'Restablecer',
    yes: 'Sí',
    no: 'No',
    ok: 'OK'
  },
  navigation: {
    ...defaultTranslations.navigation,
    home: 'Inicio',
    dashboard: 'Panel',
    properties: 'Propiedades',
    leads: 'Clientes Potenciales',
    analytics: 'Análisis',
    settings: 'Configuración',
    profile: 'Perfil',
    logout: 'Cerrar Sesión',
    login: 'Iniciar Sesión',
    register: 'Registrarse'
  },
  chatbot: {
    ...defaultTranslations.chatbot,
    title: 'Asistente IA',
    subtitle: 'Tu asistente inteligente de bienes raíces',
    placeholder: 'Escribe tu mensaje aquí...',
    send: 'Enviar',
    typing: 'Escribiendo...',
    online: 'En línea',
    offline: 'Desconectado',
    welcome: '¡Bienvenido! ¿Cómo puedo ayudarte hoy?',
    goodbye: '¡Gracias por usar nuestro servicio!',
    error: 'Lo siento, encontré un error. Por favor intenta de nuevo.',
    retry: 'Reintentar',
    clear: 'Limpiar',
    export: 'Exportar',
    import: 'Importar'
  }
};

// Chinese translations
const chineseTranslations: TranslationKeys = {
  ...defaultTranslations,
  common: {
    ...defaultTranslations.common,
    loading: '加载中...',
    error: '发生错误',
    success: '成功！',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    view: '查看',
    search: '搜索',
    filter: '筛选',
    sort: '排序',
    refresh: '刷新',
    close: '关闭',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    submit: '提交',
    reset: '重置',
    yes: '是',
    no: '否',
    ok: '确定'
  },
  navigation: {
    ...defaultTranslations.navigation,
    home: '首页',
    dashboard: '仪表板',
    properties: '房产',
    leads: '潜在客户',
    analytics: '分析',
    settings: '设置',
    profile: '个人资料',
    logout: '退出登录',
    login: '登录',
    register: '注册'
  },
  chatbot: {
    ...defaultTranslations.chatbot,
    title: 'AI助手',
    subtitle: '您的智能房地产助手',
    placeholder: '在此输入您的消息...',
    send: '发送',
    typing: '正在输入...',
    online: '在线',
    offline: '离线',
    welcome: '欢迎！今天我能为您做些什么？',
    goodbye: '感谢您使用我们的服务！',
    error: '抱歉，我遇到了错误。请重试。',
    retry: '重试',
    clear: '清除',
    export: '导出',
    import: '导入'
  }
};

// Translation storage
const translations: Record<string, TranslationKeys> = {
  en: defaultTranslations,
  es: spanishTranslations,
  zh: chineseTranslations,
  fr: defaultTranslations, // Fallback to English for now
  pt: defaultTranslations, // Fallback to English for now
  de: defaultTranslations, // Fallback to English for now
  ja: defaultTranslations, // Fallback to English for now
  ko: defaultTranslations, // Fallback to English for now
  ar: defaultTranslations, // Fallback to English for now
  hi: defaultTranslations  // Fallback to English for now
};

// i18n Context
interface I18nContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  supportedLanguages: LanguageInfo[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// i18n Provider
interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && SUPPORTED_LANGUAGES.some(lang => lang.code === savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        // Fallback to English
        value = translations.en;
        for (const fallbackKey of keys) {
          value = value?.[fallbackKey];
          if (value === undefined) {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    supportedLanguages: SUPPORTED_LANGUAGES
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

// useTranslation hook
export const useTranslation = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};

// i18n instance for non-React usage
export const i18n = {
  language: 'en',
  setLanguage: (language: string) => {
    i18n.language = language;
  },
  t: (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[i18n.language] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        // Fallback to English
        value = translations.en;
        for (const fallbackKey of keys) {
          value = value?.[fallbackKey];
          if (value === undefined) {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  },
  supportedLanguages: SUPPORTED_LANGUAGES
};

// Export types
export type { TranslationKeys, LanguageInfo };
