// Mock conversation data for PropGuard AI Real Estate Chatbot
export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    intent?: string;
    entities?: Record<string, any>;
    confidence?: number;
    actions?: string[];
    suggestions?: string[];
    propertyData?: any;
    marketData?: any;
    riskData?: any;
  };
}

export interface ConversationFlow {
  id: string;
  title: string;
  description: string;
  scenario: 'buyer' | 'seller' | 'investor' | 'agent' | 'general';
  language: string;
  messages: ConversationMessage[];
  outcome: string;
  tags: string[];
}

// Mock Property Data for Conversations
const mockProperties = {
  sanFrancisco: [
    {
      id: 'sf-001',
      address: '123 Market Street, San Francisco, CA',
      price: 1400000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      type: 'House',
      features: ['Modern kitchen', 'Hardwood floors', 'Near parks', 'Public transport'],
      images: ['https://example.com/property1.jpg'],
      marketTrend: 'Rising 8% annually',
      daysOnMarket: 12,
      riskScore: 0.2
    },
    {
      id: 'sf-002',
      address: '456 Castro Ave, San Francisco, CA',
      price: 1300000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1650,
      type: 'House',
      features: ['Garden', 'Family-friendly', 'Quiet street', 'Updated bathroom'],
      images: ['https://example.com/property2.jpg'],
      marketTrend: 'Rising 6% annually',
      daysOnMarket: 8,
      riskScore: 0.15
    },
    {
      id: 'sf-003',
      address: '789 Bay View, San Francisco, CA',
      price: 1450000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1950,
      type: 'House',
      features: ['Spacious', 'Close to schools', 'Bay views', 'Garage'],
      images: ['https://example.com/property3.jpg'],
      marketTrend: 'Rising 10% annually',
      daysOnMarket: 15,
      riskScore: 0.25
    }
  ],
  miami: [
    {
      id: 'mia-001',
      address: '123 Ocean Drive, Miami, FL',
      price: 550000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: 'Condo',
      features: ['Ocean view', 'Renovated kitchen', 'Balcony', 'Gym access'],
      images: ['https://example.com/condo1.jpg'],
      marketTrend: 'Rising 4% annually',
      daysOnMarket: 30,
      riskScore: 0.35
    }
  ],
  newYork: [
    {
      id: 'ny-001',
      address: '456 Park Avenue, New York, NY',
      price: 2800000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1400,
      type: 'Apartment',
      features: ['Central Park views', 'Doorman', 'Gym', 'Concierge'],
      images: ['https://example.com/apartment1.jpg'],
      marketTrend: 'Stable 2% annually',
      daysOnMarket: 45,
      riskScore: 0.1
    }
  ]
};

// Mock Market Data
const mockMarketData = {
  sanFrancisco: {
    medianPrice: 1350000,
    priceGrowth: 8.2,
    daysOnMarket: 28,
    inventory: 'Low',
    marketCondition: 'Seller\'s market',
    riskFactors: ['High cost of living', 'Earthquake risk', 'Traffic congestion'],
    opportunities: ['Tech industry growth', 'Public transportation', 'Cultural amenities']
  },
  miami: {
    medianPrice: 520000,
    priceGrowth: 4.1,
    daysOnMarket: 35,
    inventory: 'Moderate',
    marketCondition: 'Balanced market',
    riskFactors: ['Hurricane risk', 'Sea level rise', 'Seasonal market'],
    opportunities: ['Tourism growth', 'Tax benefits', 'International buyers']
  },
  newYork: {
    medianPrice: 950000,
    priceGrowth: 2.8,
    daysOnMarket: 42,
    inventory: 'High',
    marketCondition: 'Buyer\'s market',
    riskFactors: ['High taxes', 'Regulatory changes', 'Market volatility'],
    opportunities: ['Cultural hub', 'Financial center', 'Diverse neighborhoods']
  }
};

// Mock Risk Assessment Data
const mockRiskData = {
  flood: {
    score: 0.2,
    level: 'Low',
    description: 'Minimal flood risk based on historical data and elevation'
  },
  earthquake: {
    score: 0.7,
    level: 'High',
    description: 'Located in seismic zone with moderate earthquake risk'
  },
  market: {
    score: 0.3,
    level: 'Low',
    description: 'Stable market with consistent growth patterns'
  },
  investment: {
    score: 0.4,
    level: 'Medium',
    description: 'Good investment potential with moderate risk'
  }
};

// Conversation Flows
export const mockConversationFlows: ConversationFlow[] = [
  // 1. San Francisco Buyer Journey
  {
    id: 'sf-buyer-001',
    title: 'San Francisco House Hunter',
    description: 'User looking for 3-bedroom house under $1.5M in San Francisco',
    scenario: 'buyer',
    language: 'en',
    outcome: 'Scheduled viewing and received valuation report',
    tags: ['buyer', 'san-francisco', 'house', 'valuation'],
    messages: [
      {
        id: 'msg-001',
        role: 'assistant',
        content: "Hi! I'm your PropGuard AI assistant, here to help you find your dream property, get instant valuations, and schedule viewings. How can I assist you today?",
        timestamp: new Date('2024-01-15T10:00:00Z'),
        metadata: {
          intent: 'greeting',
          actions: ['property_search', 'valuation', 'viewing_booking'],
          suggestions: ['Find properties', 'Get valuation', 'Schedule viewing', 'Market analysis']
        }
      },
      {
        id: 'msg-002',
        role: 'user',
        content: "I'm looking for a 3-bedroom house in San Francisco under $1.5 million.",
        timestamp: new Date('2024-01-15T10:01:00Z'),
        metadata: {
          intent: 'property_search',
          entities: {
            bedrooms: 3,
            location: 'San Francisco',
            maxPrice: 1500000,
            propertyType: 'house'
          },
          confidence: 0.95
        }
      },
      {
        id: 'msg-003',
        role: 'assistant',
        content: "Great! Based on your preferences, I found 3 excellent listings in San Francisco with 3 bedrooms under $1.5M. Would you like to see a quick overview or detailed information on any of these?",
        timestamp: new Date('2024-01-15T10:01:30Z'),
        metadata: {
          intent: 'property_results',
          propertyData: mockProperties.sanFrancisco,
          actions: ['view_overview', 'view_details', 'schedule_viewing'],
          suggestions: ['Show overview', 'View details', 'Schedule viewing', 'Get market insights']
        }
      },
      {
        id: 'msg-004',
        role: 'user',
        content: "Show me the overview.",
        timestamp: new Date('2024-01-15T10:02:00Z'),
        metadata: {
          intent: 'view_overview',
          confidence: 0.9
        }
      },
      {
        id: 'msg-005',
        role: 'assistant',
        content: `Here you go:

🏠 **123 Market Street** - $1.4M - Modern 3 bed, 2 bath near parks
🏠 **456 Castro Ave** - $1.3M - Cozy family home with garden  
🏠 **789 Bay View** - $1.45M - Spacious, close to schools

All properties are in excellent neighborhoods with strong market growth. Would you like to schedule a viewing for any of these or get a virtual tour link?`,
        timestamp: new Date('2024-01-15T10:02:30Z'),
        metadata: {
          intent: 'property_overview',
          propertyData: mockProperties.sanFrancisco,
          marketData: mockMarketData.sanFrancisco,
          actions: ['schedule_viewing', 'virtual_tour', 'get_details'],
          suggestions: ['Schedule viewing', 'Virtual tour', 'Get details', 'Market analysis']
        }
      },
      {
        id: 'msg-006',
        role: 'user',
        content: "Schedule a viewing for 123 Market Street.",
        timestamp: new Date('2024-01-15T10:03:00Z'),
        metadata: {
          intent: 'schedule_viewing',
          entities: {
            propertyAddress: '123 Market Street'
          },
          confidence: 0.9
        }
      },
      {
        id: 'msg-007',
        role: 'assistant',
        content: "Perfect! What date and time work best for you? Here are some available slots this week:

📅 **Wednesday 3 PM**
📅 **Friday 10 AM** 
📅 **Saturday 1 PM**

Which option works for you?",
        timestamp: new Date('2024-01-15T10:03:30Z'),
        metadata: {
          intent: 'viewing_slots',
          actions: ['select_time', 'request_other_times'],
          suggestions: ['Wednesday 3 PM', 'Friday 10 AM', 'Saturday 1 PM', 'Other times']
        }
      },
      {
        id: 'msg-008',
        role: 'user',
        content: "Friday 10 AM works.",
        timestamp: new Date('2024-01-15T10:04:00Z'),
        metadata: {
          intent: 'confirm_viewing',
          entities: {
            date: 'Friday',
            time: '10 AM'
          },
          confidence: 0.95
        }
      },
      {
        id: 'msg-009',
        role: 'assistant',
        content: "You're all set! I've booked your viewing for 123 Market Street on Friday at 10 AM. You'll get a reminder a day before with directions and contact information. Anything else I can help with?",
        timestamp: new Date('2024-01-15T10:04:30Z'),
        metadata: {
          intent: 'viewing_confirmed',
          actions: ['get_valuation', 'market_analysis', 'mortgage_info'],
          suggestions: ['Get valuation report', 'Market analysis', 'Mortgage options', 'Property comparison']
        }
      },
      {
        id: 'msg-010',
        role: 'user',
        content: "Can I get an instant valuation risk report for that property?",
        timestamp: new Date('2024-01-15T10:05:00Z'),
        metadata: {
          intent: 'request_valuation',
          confidence: 0.9
        }
      },
      {
        id: 'msg-011',
        role: 'assistant',
        content: `Sure thing! Fetching the latest AI-driven valuation and risk assessment from PropGuard...

📊 **Instant Valuation Report for 123 Market Street**

💰 **Estimated Market Value:** $1.42M
📈 **Price Trend:** Rising 8% annually
⏱️ **Days on Market:** 12 days

🛡️ **Risk Assessment:**
• **Loan-to-Value Risk:** Low (20% down payment recommended)
• **Flood Risk:** Minimal
• **Earthquake Risk:** Moderate (standard for SF)
• **Market Risk:** Low (stable growth area)

📋 **Investment Grade:** B+ (Good potential with moderate risk)

Would you like me to email you the detailed report or discuss mortgage options?`,
        timestamp: new Date('2024-01-15T10:05:30Z'),
        metadata: {
          intent: 'valuation_report',
          propertyData: mockProperties.sanFrancisco[0],
          riskData: mockRiskData,
          marketData: mockMarketData.sanFrancisco,
          actions: ['email_report', 'mortgage_info', 'risk_details'],
          suggestions: ['Email report', 'Mortgage options', 'Risk details', 'Investment analysis']
        }
      }
    ]
  },

  // 2. Miami Seller Journey
  {
    id: 'miami-seller-001',
    title: 'Miami Condo Seller',
    description: 'User wants to sell condo in Miami and needs valuation plus market insights',
    scenario: 'seller',
    language: 'en',
    outcome: 'Listed property and scheduled virtual tour',
    tags: ['seller', 'miami', 'condo', 'listing'],
    messages: [
      {
        id: 'msg-012',
        role: 'assistant',
        content: "Hello! Welcome to PropGuard AI. If you're looking to sell your property, get instant valuations, and connect with potential buyers, you're in the right place. How can I assist you today?",
        timestamp: new Date('2024-01-16T14:00:00Z'),
        metadata: {
          intent: 'greeting',
          actions: ['property_valuation', 'market_analysis', 'listing_creation'],
          suggestions: ['Get property valuation', 'Market analysis', 'Create listing', 'Find buyers']
        }
      },
      {
        id: 'msg-013',
        role: 'user',
        content: "I want to sell my condo in Miami and need to know its market value.",
        timestamp: new Date('2024-01-16T14:01:00Z'),
        metadata: {
          intent: 'request_valuation',
          entities: {
            location: 'Miami',
            propertyType: 'condo',
            action: 'sell'
          },
          confidence: 0.95
        }
      },
      {
        id: 'msg-014',
        role: 'assistant',
        content: "Great! Please provide the address and any details like number of bedrooms, bathrooms, and square footage.",
        timestamp: new Date('2024-01-16T14:01:30Z'),
        metadata: {
          intent: 'request_property_details',
          actions: ['provide_details', 'search_by_address'],
          suggestions: ['Enter address', 'Search by location', 'Provide details']
        }
      },
      {
        id: 'msg-015',
        role: 'user',
        content: "123 Ocean Drive, Miami. It's a 2 bed, 2 bath, 1,200 sq ft condo.",
        timestamp: new Date('2024-01-16T14:02:00Z'),
        metadata: {
          intent: 'provide_property_details',
          entities: {
            address: '123 Ocean Drive, Miami',
            bedrooms: 2,
            bathrooms: 2,
            area: 1200,
            propertyType: 'condo'
          },
          confidence: 0.9
        }
      },
      {
        id: 'msg-016',
        role: 'assistant',
        content: `Thanks! Retrieving the latest AI-driven valuation and market trends for 123 Ocean Drive...

📊 **Property Valuation Report**

💰 **Estimated Market Value:** $550,000
📈 **Recent Sale Prices Nearby:** $530K - $580K
📊 **Market Trend:** Prices rising 4% annually in your area
⏱️ **Average Days on Market:** 30 days

🏖️ **Miami Market Insights:**
• Strong demand from international buyers
• Seasonal market with peak activity in winter
• Oceanfront properties in high demand
• Hurricane season considerations

Would you like a detailed valuation report emailed to you or help drafting a compelling property listing?`,
        timestamp: new Date('2024-01-16T14:02:30Z'),
        metadata: {
          intent: 'valuation_results',
          propertyData: mockProperties.miami[0],
          marketData: mockMarketData.miami,
          actions: ['email_report', 'create_listing', 'market_analysis'],
          suggestions: ['Email report', 'Create listing', 'Market insights', 'Pricing strategy']
        }
      },
      {
        id: 'msg-017',
        role: 'user',
        content: "Email me the report and help with listing.",
        timestamp: new Date('2024-01-16T14:03:00Z'),
        metadata: {
          intent: 'request_report_and_listing',
          confidence: 0.9
        }
      },
      {
        id: 'msg-018',
        role: 'assistant',
        content: "Report is on its way! To create your listing, please share key highlights such as recent upgrades, amenities, and any unique features.",
        timestamp: new Date('2024-01-16T14:03:30Z'),
        metadata: {
          intent: 'request_listing_details',
          actions: ['provide_features', 'upload_photos', 'set_price'],
          suggestions: ['Recent upgrades', 'Amenities', 'Unique features', 'Upload photos']
        }
      },
      {
        id: 'msg-019',
        role: 'user',
        content: "Recently renovated kitchen, ocean view balcony, gym access.",
        timestamp: new Date('2024-01-16T14:04:00Z'),
        metadata: {
          intent: 'provide_features',
          entities: {
            features: ['renovated kitchen', 'ocean view balcony', 'gym access']
          },
          confidence: 0.9
        }
      },
      {
        id: 'msg-020',
        role: 'assistant',
        content: `Perfect! Here's a draft listing for your review:

🏠 **Modern 2-Bedroom Oceanfront Condo - $550,000**

"Stunning 2-bedroom, 2-bath condo with recently renovated kitchen, breathtaking ocean-view balcony, and full amenities including state-of-the-art gym. Located in the heart of Miami's vibrant Ocean Drive with rising market values and strong rental potential."

**Key Features:**
• Recently renovated kitchen with modern appliances
• Private ocean-view balcony
• Access to building gym and amenities
• Prime Miami location
• Strong investment potential

Would you like to post this now or edit it further?`,
        timestamp: new Date('2024-01-16T14:04:30Z'),
        metadata: {
          intent: 'listing_draft',
          actions: ['post_listing', 'edit_listing', 'preview_listing'],
          suggestions: ['Post now', 'Edit listing', 'Preview', 'Add photos']
        }
      },
      {
        id: 'msg-021',
        role: 'user',
        content: "Post it now.",
        timestamp: new Date('2024-01-16T14:05:00Z'),
        metadata: {
          intent: 'confirm_posting',
          confidence: 0.95
        }
      },
      {
        id: 'msg-022',
        role: 'assistant',
        content: "Your property listing is live on our partner platforms! I'll notify you as soon as prospective buyers show interest, and you can schedule viewings easily through me. Would you like help setting up virtual tours and showings?",
        timestamp: new Date('2024-01-16T14:05:30Z'),
        metadata: {
          intent: 'listing_posted',
          actions: ['setup_virtual_tour', 'schedule_showings', 'buyer_alerts'],
          suggestions: ['Setup virtual tour', 'Schedule showings', 'Buyer alerts', 'Market updates']
        }
      },
      {
        id: 'msg-023',
        role: 'user',
        content: "Yes, please.",
        timestamp: new Date('2024-01-16T14:06:00Z'),
        metadata: {
          intent: 'confirm_virtual_tour',
          confidence: 0.9
        }
      },
      {
        id: 'msg-024',
        role: 'assistant',
        content: `Virtual tour setup is scheduled! Here's what I've arranged:

📹 **Virtual Tour Features:**
• 360° property walkthrough
• Interactive floor plan
• Ocean view highlights
• Kitchen renovation showcase

📅 **Showing Management:**
• Automated booking system
• Buyer screening and pre-qualification
• Reminder notifications
• Feedback collection

📊 **Next Steps:**
• Professional photoshoot scheduled for tomorrow
• Virtual tour will be ready in 48 hours
• You'll receive buyer inquiries via email and SMS

Need mortgage or pricing advice next?`,
        timestamp: new Date('2024-01-16T14:06:30Z'),
        metadata: {
          intent: 'virtual_tour_setup',
          actions: ['mortgage_advice', 'pricing_strategy', 'market_updates'],
          suggestions: ['Mortgage advice', 'Pricing strategy', 'Market updates', 'Investment analysis']
        }
      }
    ]
  },

  // 3. New York Investor Journey
  {
    id: 'ny-investor-001',
    title: 'New York Property Investor',
    description: 'Investor looking for rental property with ROI analysis',
    scenario: 'investor',
    language: 'en',
    outcome: 'Found investment property with detailed ROI analysis',
    tags: ['investor', 'new-york', 'rental', 'roi'],
    messages: [
      {
        id: 'msg-025',
        role: 'assistant',
        content: "Welcome to PropGuard AI! I'm here to help you find profitable investment opportunities, analyze rental yields, and assess market risks. What type of investment are you considering?",
        timestamp: new Date('2024-01-17T09:00:00Z'),
        metadata: {
          intent: 'greeting',
          actions: ['investment_search', 'roi_analysis', 'market_research'],
          suggestions: ['Find investments', 'ROI analysis', 'Market research', 'Risk assessment']
        }
      },
      {
        id: 'msg-026',
        role: 'user',
        content: "I'm looking for a rental property in Manhattan with good ROI potential.",
        timestamp: new Date('2024-01-17T09:01:00Z'),
        metadata: {
          intent: 'investment_search',
          entities: {
            location: 'Manhattan',
            propertyType: 'rental',
            goal: 'ROI'
          },
          confidence: 0.9
        }
      },
      {
        id: 'msg-027',
        role: 'assistant',
        content: `Great choice! Manhattan offers strong rental demand. Let me analyze current market conditions and find properties with optimal ROI potential.

📊 **Manhattan Market Overview:**
• Average rental yield: 3.2%
• Median price: $950K
• Average rent: $4,200/month
• Market condition: Buyer's market (good for investors)

🏠 **Top Investment Opportunities:**

**456 Park Avenue - $2.8M**
• 2 bed, 2 bath, 1,400 sq ft
• Estimated rent: $8,500/month
• Rental yield: 3.6%
• ROI projection: 8.2% annually

Would you like detailed ROI analysis for this property or see more options?`,
        timestamp: new Date('2024-01-17T09:01:30Z'),
        metadata: {
          intent: 'investment_opportunities',
          propertyData: mockProperties.newYork[0],
          marketData: mockMarketData.newYork,
          actions: ['detailed_roi', 'more_properties', 'risk_analysis'],
          suggestions: ['Detailed ROI', 'More properties', 'Risk analysis', 'Market trends']
        }
      },
      {
        id: 'msg-028',
        role: 'user',
        content: "Show me the detailed ROI analysis for the Park Avenue property.",
        timestamp: new Date('2024-01-17T09:02:00Z'),
        metadata: {
          intent: 'request_roi_analysis',
          entities: {
            propertyAddress: '456 Park Avenue'
          },
          confidence: 0.95
        }
      },
      {
        id: 'msg-029',
        role: 'assistant',
        content: `📈 **Detailed ROI Analysis - 456 Park Avenue**

💰 **Financial Projections:**
• Purchase Price: $2,800,000
• Down Payment (20%): $560,000
• Monthly Mortgage: $12,500
• Estimated Monthly Rent: $8,500
• Monthly Expenses: $2,200 (taxes, insurance, maintenance)
• Net Monthly Cash Flow: -$6,200

📊 **ROI Breakdown:**
• **Cash Flow ROI:** -13.3% (negative cash flow initially)
• **Total ROI (with appreciation):** 8.2% annually
• **5-year appreciation projection:** 15%
• **Break-even point:** Year 3 (with rent increases)

⚠️ **Risk Assessment:**
• Market Risk: Medium (NYC market volatility)
• Vacancy Risk: Low (prime location)
• Maintenance Risk: Low (well-maintained building)

🎯 **Investment Grade:** B (Good for long-term appreciation)

Would you like to explore financing options or see properties with positive cash flow?`,
        timestamp: new Date('2024-01-17T09:02:30Z'),
        metadata: {
          intent: 'roi_analysis',
          propertyData: mockProperties.newYork[0],
          marketData: mockMarketData.newYork,
          riskData: mockRiskData,
          actions: ['financing_options', 'positive_cashflow', 'market_forecast'],
          suggestions: ['Financing options', 'Positive cash flow', 'Market forecast', 'Risk mitigation']
        }
      }
    ]
  },

  // 4. Multilingual Spanish Conversation
  {
    id: 'spanish-buyer-001',
    title: 'Comprador en Español',
    description: 'Usuario hispanohablante buscando casa en Miami',
    scenario: 'buyer',
    language: 'es',
    outcome: 'Encontró propiedades y programó visita',
    tags: ['buyer', 'miami', 'spanish', 'multilingual'],
    messages: [
      {
        id: 'msg-030',
        role: 'assistant',
        content: "¡Hola! Soy tu asistente PropGuard AI, aquí para ayudarte a encontrar tu propiedad ideal, obtener valoraciones instantáneas y programar visitas. ¿Cómo puedo asistirte hoy?",
        timestamp: new Date('2024-01-18T11:00:00Z'),
        metadata: {
          intent: 'greeting',
          actions: ['buscar_propiedades', 'valoracion', 'programar_visita'],
          suggestions: ['Buscar propiedades', 'Obtener valoración', 'Programar visita', 'Análisis de mercado']
        }
      },
      {
        id: 'msg-031',
        role: 'user',
        content: "Estoy buscando una casa de 3 habitaciones en Miami por menos de $800,000.",
        timestamp: new Date('2024-01-18T11:01:00Z'),
        metadata: {
          intent: 'buscar_propiedades',
          entities: {
            habitaciones: 3,
            ubicacion: 'Miami',
            precioMaximo: 800000,
            tipoPropiedad: 'casa'
          },
          confidence: 0.95
        }
      },
      {
        id: 'msg-032',
        role: 'assistant',
        content: "¡Excelente! Basándome en tus preferencias, encontré 4 propiedades excelentes en Miami con 3 habitaciones bajo $800K. ¿Te gustaría ver un resumen rápido o información detallada de alguna de estas?",
        timestamp: new Date('2024-01-18T11:01:30Z'),
        metadata: {
          intent: 'resultados_propiedades',
          actions: ['ver_resumen', 'ver_detalles', 'programar_visita'],
          suggestions: ['Ver resumen', 'Ver detalles', 'Programar visita', 'Análisis de mercado']
        }
      }
    ]
  },

  // 5. General Market Inquiry
  {
    id: 'market-inquiry-001',
    title: 'Market Trends Inquiry',
    description: 'User asking about general market trends and insights',
    scenario: 'general',
    language: 'en',
    outcome: 'Provided comprehensive market analysis',
    tags: ['market', 'trends', 'analysis', 'general'],
    messages: [
      {
        id: 'msg-033',
        role: 'user',
        content: "What are the current real estate market trends?",
        timestamp: new Date('2024-01-19T15:00:00Z'),
        metadata: {
          intent: 'market_trends',
          confidence: 0.9
        }
      },
      {
        id: 'msg-034',
        role: 'assistant',
        content: `📊 **Current Real Estate Market Trends (January 2024)**

🌍 **Global Overview:**
• **Interest Rates:** Stabilizing after recent increases
• **Inventory:** Low in most markets, creating seller advantage
• **Price Growth:** Slowing but still positive in most regions
• **Investment Activity:** Strong in rental markets

🏠 **Regional Highlights:**

**North America:**
• US: Mixed signals, coastal markets cooling
• Canada: Strong demand, limited supply
• Mexico: Growing international interest

**Europe:**
• UK: Market stabilizing post-Brexit
• Germany: Strong rental demand
• Spain: Tourism-driven growth

**Asia-Pacific:**
• Australia: Cooling after peak growth
• Singapore: Stable luxury market
• Japan: Urban demand strong

Would you like detailed analysis for a specific region or property type?`,
        timestamp: new Date('2024-01-19T15:01:00Z'),
        metadata: {
          intent: 'market_analysis',
          actions: ['regional_analysis', 'property_type_analysis', 'investment_opportunities'],
          suggestions: ['Regional analysis', 'Property type analysis', 'Investment opportunities', 'Risk assessment']
        }
      }
    ]
  }
];

// Helper functions for conversation management
export const getConversationById = (id: string): ConversationFlow | undefined => {
  return mockConversationFlows.find(flow => flow.id === id);
};

export const getConversationsByScenario = (scenario: string): ConversationFlow[] => {
  return mockConversationFlows.filter(flow => flow.scenario === scenario);
};

export const getConversationsByLanguage = (language: string): ConversationFlow[] => {
  return mockConversationFlows.filter(flow => flow.language === language);
};

export const getRandomConversation = (): ConversationFlow => {
  const randomIndex = Math.floor(Math.random() * mockConversationFlows.length);
  return mockConversationFlows[randomIndex];
};

export const searchConversations = (query: string): ConversationFlow[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockConversationFlows.filter(flow => 
    flow.title.toLowerCase().includes(lowercaseQuery) ||
    flow.description.toLowerCase().includes(lowercaseQuery) ||
    flow.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Mock conversation analytics
export const mockConversationAnalytics = {
  totalConversations: 1247,
  averageSessionLength: 8.5, // messages
  topScenarios: [
    { scenario: 'buyer', count: 456, percentage: 36.6 },
    { scenario: 'seller', count: 321, percentage: 25.8 },
    { scenario: 'investor', count: 234, percentage: 18.8 },
    { scenario: 'general', count: 236, percentage: 18.9 }
  ],
  topLanguages: [
    { language: 'en', count: 892, percentage: 71.5 },
    { language: 'es', count: 234, percentage: 18.8 },
    { language: 'pt', count: 89, percentage: 7.1 },
    { language: 'zh', count: 32, percentage: 2.6 }
  ],
  commonIntents: [
    { intent: 'property_search', count: 567, percentage: 45.5 },
    { intent: 'valuation', count: 234, percentage: 18.8 },
    { intent: 'schedule_viewing', count: 189, percentage: 15.2 },
    { intent: 'market_analysis', count: 156, percentage: 12.5 },
    { intent: 'investment_analysis', count: 101, percentage: 8.1 }
  ],
  userSatisfaction: 4.7, // out of 5
  averageResponseTime: 1.2, // seconds
  conversionRate: 23.4 // percentage
};

