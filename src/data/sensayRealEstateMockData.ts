/**
 * Comprehensive Mock Data for Sensay Real Estate Chatbot
 * Showcasing innovation, user experience quality, real-world impact, and smart Sensay platform usage
 * For Sensay Hackathon 2024 - PropGuard AI Integration
 */

// 1. PROPERTY LISTINGS DATA with PropGuard AI Risk Analysis
export const mockPropertyListings = [
  {
    id: "prop_001",
    address: "2847 Pacific Heights Boulevard",
    city: "San Francisco",
    state: "CA",
    zipCode: "94115",
    propertyType: "Single Family Home",
    listingPrice: 2850000,
    estimatedValue: 2920000,
    squareFootage: 3200,
    bedrooms: 4,
    bathrooms: 3.5,
    yearBuilt: 1925,
    lotSize: 0.15,
    agentId: "agent_001",
    listingDate: "2025-09-15",
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    virtualTourUrl: "https://matterport.com/virtual-tour-sample",
    features: {
      hasGarage: true,
      hasPool: false,
      hasBasement: true,
      oceanView: true,
      recentlyRenovated: true,
      smartHome: true
    },
    propguardRiskAnalysis: {
      overallRiskScore: 8.5,
      floodRisk: 2.1,
      fireRisk: 3.4,
      seismicRisk: 6.7,
      climateProjection: {
        valueImpact: 0.15,
        timeframe: "10 years",
        factors: ["sea level rise", "earthquake risk"]
      },
      marketVolatility: "low",
      investmentGrade: "A+",
      insuranceCostEstimate: 4200,
      environmentalHazards: ["Minor earthquake zone"],
      neighborhoodTrend: "rising",
      appreciation5Year: 0.18
    },
    marketInsights: {
      averageDaysOnMarket: 28,
      pricePerSqFt: 891,
      neighborhoodMedian: 2650000,
      marketTrend: "increasing",
      competitiveAnalysis: {
        similarListings: 3,
        pricePosition: "premium",
        uniqueSellingPoints: ["Ocean views", "Historic charm", "Prime location"]
      }
    }
  },
  {
    id: "prop_002", 
    address: "1423 Elm Street Loft",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    propertyType: "Condominium",
    listingPrice: 675000,
    estimatedValue: 685000,
    squareFootage: 1850,
    bedrooms: 2,
    bathrooms: 2,
    yearBuilt: 2018,
    lotSize: 0,
    agentId: "agent_002",
    listingDate: "2025-09-20",
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    ],
    virtualTourUrl: "https://matterport.com/modern-loft-tour",
    features: {
      hasGarage: true,
      hasPool: true,
      hasBasement: false,
      cityView: true,
      modernDesign: true,
      concierge: true
    },
    propguardRiskAnalysis: {
      overallRiskScore: 9.2,
      floodRisk: 1.2,
      fireRisk: 2.1,
      seismicRisk: 1.8,
      climateProjection: {
        valueImpact: 0.08,
        timeframe: "10 years",
        factors: ["urban heat island", "flooding"]
      },
      marketVolatility: "very low",
      investmentGrade: "A+",
      insuranceCostEstimate: 1800,
      environmentalHazards: ["Minimal flooding risk"],
      neighborhoodTrend: "rapidly rising",
      appreciation5Year: 0.22
    },
    marketInsights: {
      averageDaysOnMarket: 15,
      pricePerSqFt: 365,
      neighborhoodMedian: 620000,
      marketTrend: "rapidly increasing",
      competitiveAnalysis: {
        similarListings: 8,
        pricePosition: "competitive",
        uniqueSellingPoints: ["Downtown location", "Modern amenities", "Tech hub proximity"]
      }
    }
  },
  {
    id: "prop_003",
    address: "789 Sunset Strip Villa",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90069",
    propertyType: "Single Family Home",
    listingPrice: 4200000,
    estimatedValue: 4350000,
    squareFootage: 5400,
    bedrooms: 5,
    bathrooms: 6,
    yearBuilt: 2020,
    lotSize: 0.45,
    agentId: "agent_003",
    listingDate: "2025-09-18",
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"
    ],
    virtualTourUrl: "https://matterport.com/luxury-villa-tour",
    features: {
      hasGarage: true,
      hasPool: true,
      hasBasement: false,
      cityView: true,
      modernDesign: true,
      smartHome: true,
      guesthouse: true,
      winecellar: true
    },
    propguardRiskAnalysis: {
      overallRiskScore: 7.8,
      floodRisk: 1.5,
      fireRisk: 6.8,
      seismicRisk: 7.2,
      climateProjection: {
        valueImpact: 0.12,
        timeframe: "10 years",
        factors: ["wildfire risk", "drought conditions"]
      },
      marketVolatility: "medium",
      investmentGrade: "A",
      insuranceCostEstimate: 12500,
      environmentalHazards: ["High wildfire zone", "Earthquake area"],
      neighborhoodTrend: "stable premium",
      appreciation5Year: 0.14
    },
    marketInsights: {
      averageDaysOnMarket: 45,
      pricePerSqFt: 778,
      neighborhoodMedian: 3950000,
      marketTrend: "stable",
      competitiveAnalysis: {
        similarListings: 2,
        pricePosition: "premium",
        uniqueSellingPoints: ["Celebrity neighborhood", "Luxury finishes", "Entertainment space"]
      }
    }
  },
  {
    id: "prop_004",
    address: "234 Coral Gables Way",
    city: "Miami",
    state: "FL",
    zipCode: "33134",
    propertyType: "Condominium",
    listingPrice: 785000,
    estimatedValue: 795000,
    squareFootage: 1650,
    bedrooms: 2,
    bathrooms: 2,
    yearBuilt: 2019,
    lotSize: 0,
    agentId: "agent_004",
    listingDate: "2025-09-22",
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800"
    ],
    virtualTourUrl: "https://matterport.com/miami-condo-tour",
    features: {
      hasGarage: true,
      hasPool: true,
      hasBasement: false,
      oceanView: true,
      modernDesign: true,
      concierge: true,
      beachAccess: true
    },
    propguardRiskAnalysis: {
      overallRiskScore: 6.5,
      floodRisk: 7.8,
      fireRisk: 1.2,
      seismicRisk: 0.5,
      climateProjection: {
        valueImpact: 0.25,
        timeframe: "10 years",
        factors: ["sea level rise", "hurricane risk", "coastal erosion"]
      },
      marketVolatility: "high",
      investmentGrade: "B+",
      insuranceCostEstimate: 8500,
      environmentalHazards: ["Hurricane zone", "Flood risk area", "Sea level rise"],
      neighborhoodTrend: "volatile",
      appreciation5Year: 0.09
    },
    marketInsights: {
      averageDaysOnMarket: 32,
      pricePerSqFt: 476,
      neighborhoodMedian: 745000,
      marketTrend: "fluctuating",
      competitiveAnalysis: {
        similarListings: 12,
        pricePosition: "competitive",
        uniqueSellingPoints: ["Beach access", "Ocean views", "Resort-style amenities"]
      }
    }
  }
];

// 2. ADVANCED LEAD GENERATION DATA with AI Scoring
export const mockLeadData = [
  {
    id: "lead_001",
    name: "Sarah Chen",
    email: "sarah.chen.demo@email.com",
    phone: "+1 (555) 123-4567",
    leadSource: "website_chat",
    interestedIn: "buying",
    budget: {
      min: 800000,
      max: 1200000
    },
    preferredLocations: ["San Francisco", "Palo Alto"],
    propertyTypes: ["single_family", "townhome"],
    timeline: "3_months",
    financingStatus: "pre_approved",
    aiLeadScore: 92,
    scoreFactors: {
      budgetRealism: 95,
      timelineUrgency: 88,
      financingReadiness: 98,
      locationSpecificity: 90,
      engagementLevel: 94
    },
    conversationHistory: [
      {
        timestamp: "2025-09-25T14:30:00Z",
        userMessage: "Hi, I'm looking for a 3-bedroom home in SF under $1.2M",
        botResponse: "Hello Sarah! I'd be happy to help you find the perfect home. Based on your budget and preferences, I have several great options. Are you pre-approved for financing?",
        intent: "property_search",
        sentiment: "positive",
        platform: "web"
      },
      {
        timestamp: "2025-09-25T14:32:00Z",
        userMessage: "Yes, I'm pre-approved for up to $1.2M with Wells Fargo",
        botResponse: "Excellent! That puts you in a strong position. Let me show you some properties that match your criteria. I found 5 listings that could be perfect for you.",
        intent: "qualification",
        sentiment: "excited",
        platform: "web"
      }
    ],
    scheduledViewings: [
      {
        propertyId: "prop_001",
        date: "2025-09-28",
        time: "2:00 PM",
        type: "virtual",
        status: "confirmed"
      }
    ],
    nurturingSequence: "hot_lead_immediate",
    lastInteraction: "2025-09-25T14:35:00Z",
    preferredContactMethod: "email",
    tags: ["first_time_buyer", "tech_industry", "urgent"]
  },
  {
    id: "lead_002",
    name: "Michael Rodriguez",
    email: "m.rodriguez.demo@email.com", 
    phone: "+1 (555) 987-6543",
    leadSource: "whatsapp",
    interestedIn: "selling",
    currentPropertyValue: 950000,
    sellingReason: "upsizing",
    timeline: "6_months",
    aiLeadScore: 78,
    scoreFactors: {
      propertyValue: 85,
      timelineFlexibility: 70,
      sellingMotivation: 82,
      marketKnowledge: 75,
      engagementLevel: 80
    },
    conversationHistory: [
      {
        timestamp: "2025-09-24T16:15:00Z",
        userMessage: "Hola, quiero saber cuánto vale mi casa en Austin",
        botResponse: "¡Hola Michael! Me da mucho gusto ayudarte. Para darte una valuación precisa, ¿podrías darme la dirección de tu propiedad?",
        intent: "property_valuation",
        sentiment: "curious", 
        platform: "whatsapp",
        language: "spanish"
      },
      {
        timestamp: "2025-09-24T16:18:00Z",
        userMessage: "1456 South Lamar Blvd, Austin TX 78704",
        botResponse: "Perfecto! Déjame analizar tu propiedad con PropGuard AI... 📊\n\n🏠 Valuación estimada: $950,000\n📈 Tendencia del mercado: Creciendo +8%\n⚠️ Puntuación de riesgo: 7.2/10\n\n¿Te gustaría programar una evaluación completa?",
        intent: "valuation_response",
        sentiment: "satisfied",
        platform: "whatsapp",
        language: "spanish"
      }
    ],
    propertyToSell: {
      address: "1456 South Lamar Blvd",
      city: "Austin",
      state: "TX",
      estimatedValue: 950000,
      lastAppraisal: "2023-06-15"
    },
    nurturingSequence: "warm_lead_seller",
    preferredLanguage: "spanish",
    tags: ["spanish_speaker", "seller", "upsizing"]
  },
  {
    id: "lead_003",
    name: "Jennifer Park",
    email: "jennifer.park.demo@email.com",
    phone: "+1 (555) 456-7890",
    leadSource: "telegram",
    interestedIn: "investment",
    budget: {
      min: 300000,
      max: 600000
    },
    preferredLocations: ["Austin", "Houston", "Dallas"],
    propertyTypes: ["multifamily", "commercial"],
    timeline: "12_months",
    financingStatus: "exploring_options",
    aiLeadScore: 67,
    scoreFactors: {
      budgetRealism: 75,
      timelineUrgency: 45,
      financingReadiness: 60,
      locationSpecificity: 80,
      engagementLevel: 85
    },
    conversationHistory: [
      {
        timestamp: "2025-09-23T11:20:00Z",
        userMessage: "I'm interested in rental properties in Texas for passive income",
        botResponse: "Great choice! Texas has excellent rental markets. What's your target budget range and preferred cities? I can show you properties with strong cash flow potential.",
        intent: "investment_inquiry",
        sentiment: "interested",
        platform: "telegram"
      }
    ],
    investmentCriteria: {
      targetCashFlow: 2000,
      targetROI: 0.08,
      riskTolerance: "medium",
      investmentExperience: "beginner"
    },
    nurturingSequence: "investor_education",
    tags: ["investor", "passive_income", "texas_market"]
  },
  {
    id: "lead_004",
    name: "David Thompson",
    email: "david.thompson.demo@email.com",
    phone: "+1 (555) 321-0987",
    leadSource: "discord",
    interestedIn: "buying",
    budget: {
      min: 1500000,
      max: 2500000
    },
    preferredLocations: ["Los Angeles", "Orange County"],
    propertyTypes: ["single_family", "luxury_condo"],
    timeline: "6_months",
    financingStatus: "cash_buyer",
    aiLeadScore: 88,
    scoreFactors: {
      budgetRealism: 92,
      timelineUrgency: 75,
      financingReadiness: 98,
      locationSpecificity: 85,
      engagementLevel: 90
    },
    conversationHistory: [
      {
        timestamp: "2025-09-25T09:45:00Z",
        userMessage: "@PropGuardBot looking for luxury homes in LA, cash buyer, $2M budget",
        botResponse: "Excellent! As a cash buyer, you'll have a significant advantage in LA's luxury market. I found 12 properties that match your criteria. Would you like to see homes with the best PropGuard risk scores first?",
        intent: "luxury_search",
        sentiment: "confident",
        platform: "discord"
      }
    ],
    luxuryCriteria: {
      minSqFt: 3000,
      requiredFeatures: ["ocean_view", "modern_kitchen", "pool"],
      architecturalStyle: "contemporary"
    },
    nurturingSequence: "luxury_buyer_vip",
    tags: ["luxury_buyer", "cash_buyer", "high_value"]
  }
];

// 3. CONVERSATION FLOW DATA showcasing multi-platform excellence
export const mockConversationFlows = {
  buyerJourney: {
    greeting: {
      triggers: ["hello", "hi", "looking for property", "buy home", "house hunting"],
      responses: [
        "Hi there! 👋 I'm your PropGuard AI assistant. I can help you find your dream property, get instant valuations, and schedule viewings. What brings you here today?",
        "Welcome! 🏠 I'm here to make your property search effortless. Whether you're buying, selling, or just exploring the market, I've got you covered. How can I assist you?"
      ],
      quickReplies: ["Looking to Buy", "Want to Sell", "Get Valuation", "Market Info"],
      followUp: {
        "Looking to Buy": "Perfect! Let me help you find your ideal home. What's your budget range?",
        "Want to Sell": "Great! I can provide an instant AI valuation. What's your property address?",
        "Get Valuation": "I'll get you a comprehensive PropGuard AI valuation. Please share the property address.",
        "Market Info": "I can provide detailed market insights. Which area interests you?"
      }
    },
    propertySearch: {
      qualificationQuestions: [
        {
          question: "What's your budget range?",
          type: "multiple_choice",
          options: ["Under $500K", "$500K-$1M", "$1M-$2M", "$2M+", "Custom Range"],
          weight: 30,
          followUp: {
            "Custom Range": "Please share your minimum and maximum budget."
          }
        },
        {
          question: "How soon are you looking to move?",
          type: "multiple_choice", 
          options: ["Immediately", "Next 3 months", "3-6 months", "6+ months"],
          weight: 25,
          scoring: {
            "Immediately": 10,
            "Next 3 months": 8,
            "3-6 months": 6,
            "6+ months": 4
          }
        },
        {
          question: "Are you pre-approved for financing?",
          type: "multiple_choice",
          options: ["Yes, pre-approved", "Pre-qualified", "Need financing help", "Cash buyer"],
          weight: 20,
          scoring: {
            "Cash buyer": 10,
            "Yes, pre-approved": 9,
            "Pre-qualified": 7,
            "Need financing help": 5
          }
        },
        {
          question: "What type of property interests you most?",
          type: "multiple_select",
          options: ["Single Family Home", "Condo/Townhome", "Multi-family", "Luxury Properties", "Investment Properties"],
          weight: 15
        },
        {
          question: "Which areas are you considering?",
          type: "text_input",
          placeholder: "e.g., San Francisco, Austin, Miami",
          weight: 10
        }
      ],
      propertyPresentation: {
        template: "Here are {count} properties matching your criteria:\n\n🏠 **{address}** - ${price:,}\n📊 PropGuard Risk Score: {riskScore}/10 ⭐\n🏠 {bedrooms} bed, {bathrooms} bath, {sqft:,} sq ft\n📈 Market trend: {trend}\n💡 Key insight: {insight}\n\nWould you like to:\n[Schedule Viewing] [Virtual Tour] [Get Full Report] [See More Properties]",
        riskScoreColors: {
          "9-10": "🟢 Excellent",
          "7-8.9": "🟡 Good", 
          "5-6.9": "🟠 Fair",
          "0-4.9": "🔴 High Risk"
        }
      }
    },
    schedulingFlow: {
      viewingTypes: [
        {
          type: "in_person",
          label: "In-Person Viewing",
          duration: 60,
          requirements: ["agent_available", "property_accessible"]
        },
        {
          type: "virtual",
          label: "Virtual Tour",
          duration: 30,
          requirements: ["internet_connection"]
        },
        {
          type: "self_guided",
          label: "Self-Guided Tour",
          duration: 45,
          requirements: ["lockbox_available"]
        }
      ],
      confirmationTemplate: "✅ **Viewing Confirmed!**\n\n🏠 Property: {address}\n📅 Date: {date}\n🕐 Time: {time}\n👤 Agent: {agentName}\n📱 Contact: {agentPhone}\n\n📝 **What to bring:**\n• Government ID\n• Pre-approval letter\n• List of questions\n\n❓ Need to reschedule? Just reply 'reschedule' anytime."
    }
  },
  sellerJourney: {
    valuationFlow: {
      initialQuestions: [
        {
          question: "What's your property address?",
          type: "address_input",
          validation: "required",
          weight: 40
        },
        {
          question: "When was it last appraised or sold?",
          type: "date_input",
          weight: 20
        },
        {
          question: "Any recent renovations or improvements?",
          type: "multiple_select",
          options: ["Kitchen", "Bathrooms", "Flooring", "HVAC", "Roof", "Landscaping", "None"],
          weight: 25
        },
        {
          question: "What's your main reason for selling?",
          type: "multiple_choice",
          options: ["Upsizing", "Downsizing", "Relocating", "Investment", "Financial", "Other"],
          weight: 15
        }
      ],
      valuationResponse: {
        template: "🏡 **Instant AI Valuation Report**\n\n📍 {address}\n💰 **Estimated Value: ${estimatedValue:,}**\n📊 Confidence Score: {confidence}%\n📈 Market Trend: {trend}\n⚠️ Risk Score: {riskScore}/10\n\n**🔍 Market Comparison:**\n• Similar properties: ${comparableMin:,} - ${comparableMax:,}\n• Average days on market: {avgDays} days\n• Your property position: {position}\n\n**💡 PropGuard AI Insights:**\n{insights}\n\n**Next Steps:**\n[Schedule CMA] [Get Marketing Plan] [Connect with Agent] [Download Full Report]",
        insightTemplates: [
          "Property shows strong appreciation potential based on neighborhood trends",
          "Consider minor improvements to maximize value",
          "Excellent timing - seller's market conditions",
          "Low risk profile makes this highly marketable"
        ]
      }
    }
  },
  investorJourney: {
    screeningFlow: {
      experienceAssessment: [
        {
          question: "What's your real estate investment experience?",
          type: "multiple_choice",
          options: ["First-time investor", "1-3 properties", "4-10 properties", "10+ properties", "Professional investor"],
          scoring: { "First-time investor": 1, "1-3 properties": 2, "4-10 properties": 3, "10+ properties": 4, "Professional investor": 5 }
        },
        {
          question: "What's your investment strategy?",
          type: "multiple_select",
          options: ["Buy & Hold", "Fix & Flip", "BRRRR", "Short-term Rentals", "Commercial", "REITs"]
        }
      ],
      cashFlowAnalysis: {
        template: "📊 **Investment Analysis**\n\n🏠 {address} - ${price:,}\n💰 **Monthly Cash Flow: ${cashFlow:,}**\n📈 **ROI: {roi}%** | **Cap Rate: {capRate}%**\n🏦 **Financing:** ${downPayment:,} down (20%)\n\n**💡 Investment Metrics:**\n• Gross Rent Multiplier: {grm}\n• 1% Rule: {onePercentRule}\n• Price-to-Rent Ratio: {priceToRent}\n\n**🎯 PropGuard Investment Score: {investmentScore}/10**\n\n[Run Numbers] [Schedule Analysis] [Compare Properties] [Save to Portfolio]"
      }
    }
  }
};

// 4. ANALYTICS AND PERFORMANCE DATA showing real-world impact
export const mockAnalyticsData = {
  leadGenerationMetrics: {
    totalLeads: 1247,
    qualifiedLeads: 934,
    hotLeads: 312,
    conversionRate: 0.25,
    averageResponseTime: 1.8, // seconds
    leadsBySource: {
      website: 456,
      whatsapp: 234,
      telegram: 156, 
      email: 89,
      social: 312,
      discord: 67,
      sms: 43
    },
    leadsByIntent: {
      buying: 678,
      selling: 345,
      valuation: 123,
      investment: 89,
      market_info: 101,
      refinancing: 67
    },
    monthlyGrowth: 0.18,
    leadQualityDistribution: {
      hot: 0.25,
      warm: 0.45,
      cold: 0.30
    },
    averageLeadValue: 8750,
    leadToAppointmentRate: 0.31,
    appointmentToSaleRate: 0.28
  },
  conversationAnalytics: {
    totalConversations: 3456,
    uniqueUsers: 2789,
    returningUsers: 667,
    averageSessionLength: 12.5, // minutes
    messagesSent: 28934,
    messagesReceived: 15678,
    intentAccuracy: 0.94,
    sentimentDistribution: {
      positive: 0.72,
      neutral: 0.22,
      negative: 0.06
    },
    topIntents: [
      { intent: "property_search", count: 1234, accuracy: 0.96 },
      { intent: "schedule_viewing", count: 892, accuracy: 0.93 },
      { intent: "property_valuation", count: 567, accuracy: 0.95 },
      { intent: "market_inquiry", count: 445, accuracy: 0.91 },
      { intent: "investment_analysis", count: 334, accuracy: 0.89 },
      { intent: "financing_help", count: 278, accuracy: 0.87 }
    ],
    languageDistribution: {
      english: 0.68,
      spanish: 0.22,
      chinese: 0.08,
      french: 0.02
    },
    platformEngagement: {
      website: { sessions: 1456, avgDuration: 15.2, bounceRate: 0.23 },
      whatsapp: { sessions: 892, avgDuration: 8.7, responseRate: 0.89 },
      telegram: { sessions: 567, avgDuration: 11.3, responseRate: 0.82 },
      discord: { sessions: 234, avgDuration: 18.9, responseRate: 0.76 }
    }
  },
  businessImpact: {
    appointmentsScheduled: 892,
    appointmentShowRate: 0.78,
    leadToAppointmentRate: 0.31,
    estimatedRevenueGenerated: 2340000,
    avgDealSize: 485000,
    agentProductivityIncrease: 0.75,
    costSavingsPerMonth: 18750,
    clientSatisfactionScore: 4.7,
    responseTimeImprovement: 0.85,
    leadQualificationAccuracy: 0.89,
    marketingROI: 4.2,
    customerLifetimeValue: 12500
  },
  propguardIntegration: {
    valuationsGenerated: 2456,
    riskAnalysesCompleted: 1834,
    averageValuationAccuracy: 0.94,
    riskPredictionAccuracy: 0.91,
    clientsWhoUsedRiskAnalysis: 1234,
    avgTimeToValuation: 23, // seconds
    propertyRecommendationAccuracy: 0.88
  }
};

// 5. PROPGUARD AI INTEGRATION DATA showcasing innovation
export const mockPropGuardIntegration = {
  riskAssessmentAPI: {
    endpoints: {
      '/api/v1/property/risk-analysis': {
        method: 'POST',
        description: 'Get comprehensive risk analysis for a property',
        sampleRequest: {
          address: "123 Main Street, San Francisco, CA 94102",
          propertyType: "single_family",
          purchasePrice: 1500000
        },
        sampleResponse: {
          riskScore: 8.2,
          environmentalRisks: {
            flood: { score: 2.1, description: "Low flood risk area", dataSource: "FEMA flood maps" },
            fire: { score: 4.3, description: "Moderate wildfire risk", dataSource: "CAL FIRE data" },
            earthquake: { score: 7.8, description: "High seismic activity zone", dataSource: "USGS seismic data" }
          },
          marketRisks: {
            volatility: "low",
            appreciation: 0.12,
            liquidityScore: 8.5,
            marketCycle: "mid-cycle"
          },
          aiInsights: [
            "Property shows strong appreciation potential based on neighborhood development",
            "Consider earthquake insurance due to proximity to San Andreas fault",
            "Neighborhood experiencing rapid gentrification - expect continued growth"
          ],
          confidenceScore: 0.94,
          dataLastUpdated: "2025-09-25T10:30:00Z"
        }
      },
      '/api/v1/property/valuation': {
        method: 'POST',
        description: 'Get AI-powered property valuation',
        sampleResponse: {
          estimatedValue: 1485000,
          confidenceInterval: { low: 1425000, high: 1545000 },
          comparables: [
            { address: "125 Main Street", soldPrice: 1475000, soldDate: "2025-08-15", similarity: 0.92 },
            { address: "119 Main Street", soldPrice: 1510000, soldDate: "2025-07-22", similarity: 0.89 }
          ],
          marketFactors: {
            seasonalAdjustment: 0.03,
            marketTrend: "rising",
            demandSupplyRatio: 2.3,
            daysOnMarketTrend: -5
          }
        }
      }
    }
  },
  realTimeValuation: {
    algorithm: "PropGuard AI ML Model v3.2",
    accuracy: 0.94,
    dataPoints: 247,
    updateFrequency: "real-time",
    mlModelFeatures: [
      "property_characteristics", "location_data", "market_trends", 
      "comparable_sales", "economic_indicators", "neighborhood_analytics"
    ],
    sampleValuation: {
      property: "2847 Pacific Heights Blvd, San Francisco",
      estimatedValue: 2920000,
      confidence: 94,
      priceRange: {
        low: 2780000,
        high: 3060000
      },
      comparables: [
        { address: "2851 Pacific Heights Blvd", soldPrice: 2850000, soldDate: "2025-08-15", adjustments: ["+2% for view", "-1% for condition"] },
        { address: "2843 Pacific Heights Blvd", soldPrice: 2975000, soldDate: "2025-07-22", adjustments: ["+3% for renovations"] }
      ],
      marketFactors: {
        seasonalAdjustment: 0.03,
        marketTrend: "rising",
        demandSupplyRatio: 2.3,
        priceAppreciation3Month: 0.07
      },
      riskFactors: {
        overallRisk: "low",
        environmentalScore: 7.2,
        marketVolatility: "low"
      }
    }
  },
  predictiveAnalytics: {
    futureValueProjections: {
      "1_year": { value: 3066000, confidence: 0.87 },
      "3_year": { value: 3445000, confidence: 0.74 },
      "5_year": { value: 3812000, confidence: 0.62 }
    },
    investmentMetrics: {
      capRate: 0.045,
      cashOnCashReturn: 0.087,
      totalReturn: 0.132,
      paybackPeriod: 11.2
    }
  }
};

// 6. MULTI-CHANNEL CONVERSATION EXAMPLES
export const mockChannelConversations = {
  whatsapp: {
    conversationId: "whatsapp_conv_001",
    platform: "whatsapp",
    messages: [
      {
        from: "user",
        timestamp: "2025-09-25T10:30:00Z",
        message: "Hi, I need help finding a condo in Miami Beach under $800k",
        messageType: "text"
      },
      {
        from: "bot", 
        timestamp: "2025-09-25T10:30:05Z",
        message: "Hi! 👋 I'd love to help you find the perfect condo in Miami Beach. I found 7 properties under $800K that might interest you. Would you like to see them?",
        messageType: "text",
        quickReplies: ["Show me properties", "Schedule viewing", "Get market info"]
      },
      {
        from: "user",
        timestamp: "2025-09-25T10:30:30Z",
        message: "Show me properties",
        messageType: "quick_reply"
      },
      {
        from: "bot",
        timestamp: "2025-09-25T10:30:35Z",
        message: "🏖️ **Ocean View Condo** - $750K\n📍 1001 Collins Ave, Miami Beach\n🛏️ 2 bed, 2 bath, 1,200 sq ft\n📊 PropGuard Score: 8.9/10\n🔥 Beach access included!\n\n⚠️ Risk Note: Some flood risk due to coastal location",
        messageType: "property_card",
        attachments: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            caption: "Ocean view from living room"
          }
        ],
        actions: ["Schedule Tour", "Get Details", "Save Property", "See More"]
      },
      {
        from: "user",
        timestamp: "2025-09-25T10:31:15Z",
        message: "Schedule Tour",
        messageType: "action_button"
      },
      {
        from: "bot",
        timestamp: "2025-09-25T10:31:20Z",
        message: "Perfect! 📅 When would you like to tour this beautiful condo?\n\n**Available times:**\n🕐 Today 3:00 PM\n🕑 Tomorrow 10:00 AM\n🕒 Tomorrow 2:00 PM\n🕓 Saturday 11:00 AM",
        messageType: "text",
        quickReplies: ["Today 3:00 PM", "Tomorrow 10:00 AM", "Tomorrow 2:00 PM", "Saturday 11:00 AM", "Other time"]
      }
    ],
    leadScore: 88,
    nextAction: "schedule_viewing",
    userProfile: {
      name: "Maria Gonzalez",
      budget: { min: 650000, max: 800000 },
      preferences: ["ocean_view", "beach_access", "modern"]
    }
  },
  telegram: {
    conversationId: "telegram_conv_001", 
    platform: "telegram",
    chatId: "12345",
    language: "spanish",
    messages: [
      {
        from: "user",
        timestamp: "2025-09-25T15:45:00Z", 
        message: "Hola, busco casa para mi familia en Los Ángeles",
        messageType: "text"
      },
      {
        from: "bot",
        timestamp: "2025-09-25T15:45:03Z",
        message: "¡Hola! 👨‍👩‍👧‍👦 Me da mucho gusto ayudarte a encontrar la casa perfecta para tu familia en Los Ángeles.\n\n¿Podrías contarme un poco más sobre lo que necesitas?\n• ¿Cuántas habitaciones?\n• ¿Rango de presupuesto?\n• ¿Zona preferida?",
        messageType: "text",
        quickReplies: ["3 habitaciones", "4+ habitaciones", "Presupuesto flexible", "Zona escolar"]
      },
      {
        from: "user",
        timestamp: "2025-09-25T15:45:45Z",
        message: "4 habitaciones, presupuesto hasta $1.5M, zona con buenas escuelas",
        messageType: "text"
      },
      {
        from: "bot",
        timestamp: "2025-09-25T15:45:50Z",
        message: "¡Excelente elección! 🏫 Las buenas escuelas son muy importantes para las familias.\n\n🏠 **Casa Familiar en Beverly Hills** - $1.45M\n📍 456 Elm Street, Beverly Hills\n🛏️ 4 habitaciones, 3 baños, 2,800 sq ft\n📊 PropGuard Score: 9.1/10\n🎓 Escuela primaria: 10/10 rating\n\n¿Te interesa conocer más detalles?",
        messageType: "property_card",
        quickReplies: ["Ver más fotos", "Agendar visita", "Información escuelas", "Otras opciones"]
      }
    ],
    leadScore: 76,
    detectedLanguage: "es",
    userProfile: {
      name: "Carlos Mendoza",
      familySize: 4,
      priorities: ["school_district", "safety", "family_friendly"]
    }
  },
  discord: {
    serverId: "real_estate_community",
    channelId: "property_discussions",
    conversation: [
      {
        user: "homebuyer_mike",
        timestamp: "2025-09-25T20:15:00Z",
        message: "@PropGuardBot what's the market like for condos in Seattle right now?",
        messageType: "mention"
      },
      {
        user: "PropGuardBot",
        timestamp: "2025-09-25T20:15:08Z",
        message: "Hey @homebuyer_mike! 📊 Seattle condo market update:\n\n🏠 **Median price:** $565K (+3.2% vs last month)\n📈 **Inventory:** 1.2 months (seller's market)\n⏱️ **Average DOM:** 18 days\n🔥 **Hot neighborhoods:** Capitol Hill, Fremont, Ballard\n🎯 **PropGuard recommendation:** Act fast in this market!\n\nWant specific recommendations for your budget? DM me! 💬",
        messageType: "reply",
        reactions: ["📊", "👍", "🔥", "💯"],
        embeds: [
          {
            title: "Seattle Market Trends",
            image: "market_chart.png",
            fields: [
              { name: "Price Change", value: "+3.2%", inline: true },
              { name: "Inventory", value: "1.2 months", inline: true },
              { name: "Days on Market", value: "18 days", inline: true }
            ]
          }
        ]
      },
      {
        user: "investor_sarah",
        timestamp: "2025-09-25T20:16:30Z",
        message: "@PropGuardBot what about investment opportunities in that market?",
        messageType: "mention"
      },
      {
        user: "PropGuardBot",
        timestamp: "2025-09-25T20:16:35Z",
        message: "Great question @investor_sarah! 💰 Seattle investment outlook:\n\n📈 **Cap rates:** 4.2-5.8%\n🏠 **Best strategy:** Buy & hold\n📊 **ROI potential:** 8-12% annually\n⚠️ **Risks:** High entry cost, regulations\n\n**Top investment neighborhoods:**\n1. **Beacon Hill** - Emerging area, great potential\n2. **Georgetown** - Industrial to residential transition\n3. **Rainier Valley** - Light rail expansion\n\nNeed specific property analysis? Let me know! 🎯",
        messageType: "reply",
        reactions: ["💰", "📈", "🎯"]
      }
    ]
  },
  web_widget: {
    conversationId: "web_conv_001",
    platform: "web",
    sessionData: {
      userAgent: "Chrome/91.0",
      referrer: "google.com",
      pageUrl: "/properties/san-francisco",
      sessionDuration: 1847 // seconds
    },
    conversation: [
      {
        from: "user",
        timestamp: "2025-09-25T14:20:00Z",
        message: "I'm looking at this property on your site, can you tell me about the neighborhood?",
        messageType: "text",
        context: {
          currentProperty: "prop_001",
          pageViews: 3,
          timeOnPage: 145
        }
      },
      {
        from: "bot",
        timestamp: "2025-09-25T14:20:05Z",
        message: "I can see you're looking at **2847 Pacific Heights Blvd**! 🏠 Great choice.\n\n**Neighborhood Highlights:**\n📍 **Pacific Heights** - Premium SF location\n🏫 **Schools:** Top-rated (9/10 average)\n🚇 **Transportation:** Multiple bus lines, close to downtown\n🛒 **Amenities:** Upscale shopping, dining, parks\n📈 **Market trend:** +12% appreciation last year\n\n**PropGuard Insights:**\n• Low crime area (safer than 85% of SF)\n• Strong rental demand if you ever want to rent\n• Excellent resale potential\n\nWould you like to schedule a viewing or get more details? 🗓️",
        messageType: "rich_response",
        quickReplies: ["Schedule Viewing", "Get Full Report", "Compare Similar", "Ask About Financing"]
      }
    ],
    leadScore: 85,
    engagementMetrics: {
      pageViews: 7,
      totalTimeOnSite: 1847,
      propertiesViewed: 3,
      documentsDownloaded: 1
    }
  }
};

// 7. SUCCESS STORIES AND TESTIMONIALS
export const mockSuccessStories = [
  {
    id: "success_001",
    clientName: "Jennifer Martinez",
    clientType: "First-time buyer",
    outcome: "Found dream home in 2 weeks",
    savings: 25000,
    timeline: "14 days",
    testimonial: "The PropGuard AI chatbot made house hunting so easy! It understood exactly what I was looking for and the risk analysis helped me avoid a property with flood issues. Saved me $25K and weeks of searching!",
    agentName: "Sarah Johnson",
    propertyDetails: {
      address: "456 Maple Drive, Austin, TX",
      purchasePrice: 485000,
      originalAsk: 510000,
      propGuardScore: 8.7,
      riskFactorsAvoided: ["Flood zone", "Foundation issues"]
    },
    chatbotInteractions: 47,
    propertiesViewed: 3,
    leadScore: 94,
    keyFactors: [
      "Instant property alerts matched preferences perfectly",
      "Risk analysis revealed hidden issues in competing property",
      "Multilingual support helped navigate complex documents"
    ]
  },
  {
    id: "success_002", 
    clientName: "David & Lisa Chen",
    clientType: "Luxury buyers",
    outcome: "Purchased $2.3M home with confidence",
    timeline: "21 days",
    testimonial: "The AI's risk analysis and market insights were incredible. We felt confident in our $2.3M purchase knowing we had all the data. The multilingual support helped my parents understand everything too!",
    agentName: "Michael Torres",
    propertyDetails: {
      address: "2847 Pacific Heights Blvd, San Francisco, CA", 
      purchasePrice: 2300000,
      propGuardScore: 9.1,
      marketPosition: "Excellent value in luxury segment"
    },
    uniqueFeatures: ["Multilingual support", "Family involvement", "High-value transaction"],
    roi: {
      projected3Year: 0.28,
      comparableAppreciation: 0.18,
      riskAdjustedReturn: 0.24
    }
  },
  {
    id: "success_003",
    clientName: "Marcus Williams",
    clientType: "Real estate investor",
    outcome: "Built portfolio of 5 rental properties",
    timeline: "6 months",
    testimonial: "PropGuard AI's investment analysis is game-changing. I went from 0 to 5 properties in 6 months with complete confidence in each purchase. The cash flow predictions were spot-on!",
    agentName: "Amanda Rodriguez",
    portfolioDetails: {
      totalInvestment: 2750000,
      monthlyRentRevenue: 18500,
      averagePropGuardScore: 8.4,
      totalROI: 0.134
    },
    chatbotInteractions: 127,
    propertiesAnalyzed: 45,
    propertiesPurchased: 5,
    keyMetrics: {
      avgCapRate: 0.067,
      avgCashOnCash: 0.089,
      portfolioDiversification: "Multi-market strategy"
    }
  },
  {
    id: "success_004",
    clientName: "Sofia Rodriguez",
    clientType: "Seller",
    outcome: "Sold 15% above market estimate",
    timeline: "28 days",
    testimonial: "¡Increíble! The Spanish-language support made everything so easy for my family. PropGuard AI helped us price our home perfectly and we sold for $80K more than expected!",
    agentName: "Carlos Mendez",
    propertyDetails: {
      address: "789 Mission Street, San Antonio, TX",
      salePrice: 580000,
      originalEstimate: 505000,
      daysOnMarket: 18,
      propGuardScore: 8.9
    },
    language: "spanish",
    marketingStrategy: {
      aiOptimizedPricing: true,
      virtualStagging: true,
      targetedMarketing: true
    }
  }
];

// 8. AGENT PRODUCTIVITY METRICS
export const mockAgentMetrics = [
  {
    agentId: "agent_001",
    name: "Sarah Johnson", 
    timeUsingSensay: "6 months",
    specialization: "Luxury residential",
    beforeSensay: {
      leadsPerMonth: 23,
      qualificationTime: 45, // minutes
      appointmentRate: 0.18,
      monthlyRevenue: 28000,
      closingRate: 0.12
    },
    afterSensay: {
      leadsPerMonth: 67,
      qualificationTime: 12, // minutes
      appointmentRate: 0.34,
      monthlyRevenue: 52000,
      closingRate: 0.21
    },
    improvements: {
      leadIncrease: 1.91,
      timeReduction: 0.73,
      revenueGrowth: 0.86,
      clientSatisfaction: 4.8,
      closingRateImprovement: 0.75
    },
    testimonial: "PropGuard AI has transformed my business. I'm closing 85% more deals with half the effort! The lead quality is incredible.",
    clientFeedback: [
      { rating: 5, comment: "Sarah's AI tools made finding our home effortless!" },
      { rating: 5, comment: "The market analysis was spot-on, helped us make the right offer" },
      { rating: 4, comment: "Great experience, very knowledgeable about neighborhoods" }
    ]
  },
  {
    agentId: "agent_002",
    name: "Michael Torres",
    timeUsingSensay: "8 months", 
    specialization: "Investment properties",
    beforeSensay: {
      leadsPerMonth: 31,
      qualificationTime: 52,
      appointmentRate: 0.22,
      monthlyRevenue: 34000,
      closingRate: 0.15
    },
    afterSensay: {
      leadsPerMonth: 78,
      qualificationTime: 15,
      appointmentRate: 0.41,
      monthlyRevenue: 71000,
      closingRate: 0.28
    },
    improvements: {
      leadIncrease: 1.52,
      timeReduction: 0.71,
      revenueGrowth: 1.09,
      clientSatisfaction: 4.7,
      closingRateImprovement: 0.87
    },
    testimonial: "The investment analysis features are phenomenal. My investor clients love the detailed PropGuard risk assessments.",
    specialtyMetrics: {
      avgInvestorROI: 0.087,
      portfolioManagement: 23,
      repeatClientRate: 0.67
    }
  },
  {
    agentId: "agent_003",
    name: "Amanda Rodriguez",
    timeUsingSensay: "4 months",
    specialization: "First-time homebuyers",
    languages: ["English", "Spanish"],
    beforeSensay: {
      leadsPerMonth: 28,
      qualificationTime: 38,
      appointmentRate: 0.25,
      monthlyRevenue: 31000,
      closingRate: 0.19
    },
    afterSensay: {
      leadsPerMonth: 56,
      qualificationTime: 18,
      appointmentRate: 0.38,
      monthlyRevenue: 49000,
      closingRate: 0.29
    },
    improvements: {
      leadIncrease: 1.00,
      timeReduction: 0.53,
      revenueGrowth: 0.58,
      clientSatisfaction: 4.9,
      closingRateImprovement: 0.53
    },
    testimonial: "The multilingual support has been a game-changer for my Hispanic clients. They feel so much more comfortable with the AI helping in Spanish.",
    demographicImpact: {
      hispanicClientIncrease: 2.3,
      firstTimeBuyerSuccess: 0.84,
      referralRate: 0.71
    }
  }
];

// 9. MARKET INTELLIGENCE DATA
export const mockMarketIntelligence = {
  cityAnalytics: {
    sanFrancisco: {
      medianPrice: 1650000,
      priceChange3Month: 0.047,
      priceChange1Year: 0.124,
      daysOnMarket: 28,
      inventoryLevel: 1.8, // months
      pricePerSqFt: 1245,
      marketCondition: "seller_favorable",
      topNeighborhoods: [
        { name: "Pacific Heights", medianPrice: 2850000, trend: "rising" },
        { name: "SOMA", medianPrice: 1950000, trend: "stable" },
        { name: "Mission", medianPrice: 1450000, trend: "rising" }
      ],
      buyerDemand: "high",
      sellerActivity: "moderate"
    },
    austin: {
      medianPrice: 485000,
      priceChange3Month: 0.032,
      priceChange1Year: 0.089,
      daysOnMarket: 22,
      inventoryLevel: 2.4,
      pricePerSqFt: 245,
      marketCondition: "balanced",
      topNeighborhoods: [
        { name: "Downtown", medianPrice: 675000, trend: "rising" },
        { name: "South Austin", medianPrice: 465000, trend: "stable" },
        { name: "North Austin", medianPrice: 385000, trend: "rising" }
      ],
      buyerDemand: "high",
      sellerActivity: "high"
    },
    miami: {
      medianPrice: 545000,
      priceChange3Month: 0.018,
      priceChange1Year: 0.067,
      daysOnMarket: 35,
      inventoryLevel: 3.1,
      pricePerSqFt: 415,
      marketCondition: "buyer_favorable",
      seasonalTrends: {
        peakSeason: "December-April",
        seasonalPriceVariation: 0.08
      },
      internationalBuyers: 0.34
    }
  },
  predictiveModeling: {
    nextQuarter: {
      sanFrancisco: { priceChange: 0.025, confidence: 0.87 },
      austin: { priceChange: 0.031, confidence: 0.91 },
      miami: { priceChange: 0.012, confidence: 0.84 }
    },
    yearEnd: {
      sanFrancisco: { priceChange: 0.095, confidence: 0.79 },
      austin: { priceChange: 0.11, confidence: 0.85 },
      miami: { priceChange: 0.058, confidence: 0.76 }
    }
  }
};

// 10. COMPREHENSIVE PERFORMANCE DASHBOARD DATA
export const mockDashboardData = {
  overview: {
    totalUsers: 12847,
    activeChats: 234,
    propertiesAnalyzed: 5678,
    leadsGenerated: 1247,
    appointmentsScheduled: 892,
    successfulTransactions: 78
  },
  platformMetrics: {
    whatsapp: {
      users: 4523,
      messages: 28934,
      satisfaction: 4.6,
      conversionRate: 0.24
    },
    web: {
      users: 5234,
      messages: 31245,
      satisfaction: 4.4,
      conversionRate: 0.28
    },
    telegram: {
      users: 2156,
      messages: 12456,
      satisfaction: 4.7,
      conversionRate: 0.22
    },
    discord: {
      users: 934,
      messages: 5678,
      satisfaction: 4.8,
      conversionRate: 0.19
    }
  },
  aiPerformance: {
    intentAccuracy: 0.94,
    responseTime: 1.8,
    knowledgebaseAccuracy: 0.91,
    userSatisfaction: 4.6,
    escalationRate: 0.08
  }
};

// Export all mock data
export default {
  mockPropertyListings,
  mockLeadData,
  mockConversationFlows,
  mockAnalyticsData,
  mockPropGuardIntegration,
  mockChannelConversations,
  mockSuccessStories,
  mockAgentMetrics,
  mockMarketIntelligence,
  mockDashboardData
};
