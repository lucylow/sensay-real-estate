// Internationalization (i18n) Configuration for PropGuard AI
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Translation {
  [key: string]: string | Translation;
}

export interface I18nContextType {
  t: (key: string, params?: Record<string, string | number>) => string;
  language: string;
  setLanguage: (lang: string) => void;
  availableLanguages: string[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Default translations
const translations: Record<string, Translation> = {
  en: {
    // Common translations
    common: {
      success: "Success!",
      error: "Error",
      loading: "Loading...",
      retry: "Retry",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      close: "Close",
      back: "Back",
      next: "Next",
      previous: "Previous",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      view: "View",
      download: "Download",
      upload: "Upload",
      refresh: "Refresh",
      settings: "Settings",
      help: "Help",
      about: "About",
      contact: "Contact",
      support: "Support",
      feedback: "Feedback",
      yes: "Yes",
      no: "No",
      ok: "OK",
      done: "Done",
      continue: "Continue",
      finish: "Finish",
      start: "Start",
      stop: "Stop",
      pause: "Pause",
      resume: "Resume"
    },
    
    // Chatflow Quality Engine
    chatflow: {
      greeting: {
        welcome: "Hello! I'm your PropGuard AI assistant. I can help you with:",
        services: {
          propertySearch: "Property search and recommendations",
          valuations: "Instant property valuations", 
          riskAssessment: "Risk assessment reports",
          scheduling: "Scheduling viewings",
          marketInsights: "Market trend insights"
        },
        prompt: "What would you like to start with?",
        quickActions: {
          propertySearch: "🏠 Search Properties",
          getValuation: "💰 Get Valuation", 
          marketInsights: "📈 Market Trends",
          riskAssessment: "⚠️ Risk Assessment",
          scheduleViewing: "📅 Schedule Viewing"
        }
      },
      
      needsAssessment: {
        prompt: "Let me help you find the perfect property! To give you the best recommendations, I'd like to know:",
        questions: {
          budget: "What's your target budget range?",
          location: "Which locations are you interested in?",
          propertyType: "What type of property are you looking for? (house, condo, etc.)",
          timeline: "What's your ideal timeline for purchasing?",
          bedrooms: "How many bedrooms do you need?",
          bathrooms: "How many bathrooms do you need?",
          features: "Any specific features you're looking for?"
        },
        clarification: "Could you provide a bit more detail about your preferences?"
      },
      
      propertySearch: {
        resultsFound: "Based on your preferences, here are some properties that match your criteria:",
        noResults: "I couldn't find properties matching your exact criteria. Let me suggest some alternatives:",
        refineSearch: "Would you like to refine your search criteria?",
        actionButtons: {
          scheduleViewing: "Schedule Viewing",
          getDetails: "More Details", 
          riskReport: "Risk Assessment",
          getValuation: "Get Valuation",
          saveProperty: "Save Property",
          shareProperty: "Share Property"
        }
      },
      
      valuation: {
        requestPrompt: "I'd be happy to provide a property valuation. Please provide the property address or details:",
        processing: "Analyzing property data and market conditions...",
        completed: "Here's your comprehensive property valuation:",
        confidence: "Confidence Level: {confidence}%",
        riskScore: "Risk Score: {score}/100",
        marketTrend: "Market Trend: {trend}",
        recommendations: "Investment Recommendations:"
      },
      
      riskAssessment: {
        analyzing: "Conducting comprehensive risk analysis...",
        environmental: "Environmental Risks",
        market: "Market Risks", 
        financial: "Financial Risks",
        mitigation: "Risk Mitigation Strategies",
        insurance: "Insurance Recommendations"
      },
      
      scheduling: {
        prompt: "Great choice! Let's get you scheduled for a viewing.",
        selectDate: "Please select your preferred date:",
        selectTime: "What time works best for you?",
        contactInfo: "Please provide your contact information:",
        confirmation: "Viewing scheduled successfully! You'll receive a confirmation email shortly."
      },
      
      transitions: {
        greetingToAssessment: "Great! Let's start by understanding your needs better.",
        assessmentToSearch: "Perfect! Now let me show you some properties that match your criteria.",
        searchToScheduling: "Excellent choice! Let's get you scheduled for a viewing.",
        searchToValuation: "I'll analyze this property for you right away.",
        valuationToRisk: "Let me also provide a comprehensive risk assessment."
      },
      
      fallbacks: {
        unclearIntent: "I want to make sure I understand correctly. Could you clarify what you're looking for?",
        incompleteInfo: "To help you better, I need a bit more information:",
        ambiguousReference: "Could you specify which property you're referring to?",
        errorOccurred: "I apologize, but I encountered an issue. Let me try a different approach.",
        noMatch: "I don't have information about that specific topic. Here are some things I can help with:"
      },
      
      quality: {
        excellent: "Excellent",
        good: "Good", 
        fair: "Fair",
        poor: "Poor",
        responseTime: "Response Time: {time}s",
        confidence: "Confidence: {confidence}%",
        satisfaction: "How satisfied are you with this response?",
        feedback: "Any feedback to help me improve?"
      }
    },
    
    // Sensay Setup translations
    sensaySetup: {
      title: "Sensay Wisdom API Setup",
      hackathon: "Hackathon",
      welcome: "Welcome to the Sensay Hackathon!",
      description: "You've been invited to build AI-powered solutions using Sensay's Wisdom Engine. Follow the steps below to get started with your API access.",
      viewDocs: "View API Documentation →",
      
      step1: {
        title: "Step 1: Redeem Your Invite Code",
        description: "Use the invite code from your Sensay Hackathon email to get your API credentials.",
        inviteCodeLabel: "Invite Code",
        inviteCodePlaceholder: "Enter your invite code",
        redeemButton: "Redeem",
        redeemingButton: "Redeeming..."
      },
      
      step2: {
        title: "Step 2: API Credentials Setup", 
        description: "If you already have API credentials, enter them below. Otherwise, redeem your invite code above.",
        apiKeyLabel: "API Key",
        apiKeyPlaceholder: "Enter your Sensay API key",
        orgIdLabel: "Organization ID",
        orgIdPlaceholder: "Enter your Organization ID",
        testButton: "Test API Credentials",
        testingButton: "Testing..."
      },
      
      errors: {
        inviteCodeRequired: "Please enter your invite code",
        apiKeyRequired: "Please enter both API key and Organization ID",
        redeemFailed: "Failed to redeem invite code",
        testFailed: "API credentials test failed"
      },
      
      success: {
        setupComplete: "Setup Complete!",
        setupMessage: "Your Sensay API credentials are now configured. You can now use the enhanced AI assistant with Sensay's Wisdom Engine for more sophisticated property analysis.",
        apiCredentialsValid: "API credentials are valid!"
      },
      
      environment: {
        title: "Environment Variable Setup",
        description: "For production deployment, set the following environment variables:",
        apiKeyVar: "VITE_SENSAY_API_KEY=your_api_key_here",
        orgIdVar: "VITE_SENSAY_ORG_ID=your_organization_id_here"
      }
    }
  },
  
  es: {
    common: {
      success: "¡Éxito!",
      error: "Error",
      loading: "Cargando...",
      retry: "Reintentar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      save: "Guardar",
      edit: "Editar",
      delete: "Eliminar",
      close: "Cerrar",
      back: "Atrás",
      next: "Siguiente",
      previous: "Anterior",
      search: "Buscar",
      filter: "Filtrar",
      sort: "Ordenar",
      view: "Ver",
      download: "Descargar",
      upload: "Subir",
      refresh: "Actualizar",
      settings: "Configuración",
      help: "Ayuda",
      about: "Acerca de",
      contact: "Contacto",
      support: "Soporte",
      feedback: "Comentarios",
      yes: "Sí",
      no: "No",
      ok: "OK",
      done: "Hecho",
      continue: "Continuar",
      finish: "Terminar",
      start: "Iniciar",
      stop: "Detener",
      pause: "Pausar",
      resume: "Reanudar"
    },
    
    chatflow: {
      greeting: {
        welcome: "¡Hola! Soy tu asistente PropGuard AI. Puedo ayudarte con:",
        services: {
          propertySearch: "Búsqueda y recomendaciones de propiedades",
          valuations: "Valoraciones instantáneas de propiedades",
          riskAssessment: "Informes de evaluación de riesgos",
          scheduling: "Programación de visitas",
          marketInsights: "Perspectivas de tendencias del mercado"
        },
        prompt: "¿Con qué te gustaría comenzar?",
        quickActions: {
          propertySearch: "🏠 Buscar Propiedades",
          getValuation: "💰 Obtener Valoración",
          marketInsights: "📈 Tendencias del Mercado",
          riskAssessment: "⚠️ Evaluación de Riesgos",
          scheduleViewing: "📅 Programar Visita"
        }
      }
    }
  }
};

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string>('en');
  const availableLanguages = ['en', 'es', 'fr', 'de', 'zh', 'ja'];

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: string | Translation = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations['en'];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if no translation found
          }
        }
        break;
      }
    }
    
    if (typeof value === 'string') {
      // Replace parameters in the string
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
          return params[paramKey]?.toString() || match;
        });
      }
      return value;
    }
    
    return key;
  };

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('propguard_language');
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('propguard_language', lang);
  };

  return (
    <I18nContext.Provider 
      value={{ 
        t, 
        language, 
        setLanguage: handleSetLanguage, 
        availableLanguages 
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}
