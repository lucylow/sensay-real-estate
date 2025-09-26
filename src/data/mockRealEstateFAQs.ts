/**
 * Comprehensive Real Estate FAQ Database
 * Covers general real estate, PropGuard AI, investment strategies, and technical questions
 */

export interface FAQItem {
  id: string;
  category: string;
  subcategory?: string;
  question: string;
  answer: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  related_questions?: string[];
  last_updated: string;
}

export const mockRealEstateFAQs: FAQItem[] = [
  // General Real Estate Questions
  {
    id: 'faq_001',
    category: 'General Real Estate',
    subcategory: 'Buying Process',
    question: 'What is the process of buying a property?',
    answer: 'The property buying process typically involves several key steps: defining your budget and needs, getting pre-approved for a mortgage, searching for properties, making an offer, conducting inspections and appraisals, securing financing, and finally, closing the deal. PropGuard AI can assist by providing detailed risk assessments and valuations for properties you are considering.',
    tags: ['buying', 'process', 'steps', 'mortgage', 'inspection'],
    difficulty: 'beginner',
    related_questions: ['faq_002', 'faq_003', 'faq_004'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_002',
    category: 'General Real Estate',
    subcategory: 'Selling Process',
    question: 'What is the process of selling a property?',
    answer: 'Selling a property generally includes preparing your home for sale, choosing a real estate agent, setting a competitive price, listing the property, showing it to potential buyers, negotiating offers, and completing the necessary legal and financial paperwork to transfer ownership. PropGuard AI can help agents and sellers understand the market value and potential risks associated with their property.',
    tags: ['selling', 'process', 'agent', 'pricing', 'listing'],
    difficulty: 'beginner',
    related_questions: ['faq_001', 'faq_005', 'faq_006'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_003',
    category: 'General Real Estate',
    subcategory: 'Financing',
    question: 'What is a mortgage and how does it work?',
    answer: 'A mortgage is a loan used to purchase a home or other real estate. The property itself serves as collateral for the loan. You make regular payments to the lender, which typically include principal and interest. PropGuard AI assists lenders by providing advanced collateral revaluation and risk assessment to manage their mortgage portfolios more effectively.',
    tags: ['mortgage', 'loan', 'financing', 'collateral', 'payments'],
    difficulty: 'beginner',
    related_questions: ['faq_001', 'faq_004', 'faq_038'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_004',
    category: 'General Real Estate',
    subcategory: 'Costs',
    question: 'What are the typical costs associated with buying a home?',
    answer: 'Beyond the purchase price, home buyers typically incur costs such as stamp duty, legal fees, loan application fees, building and pest inspection costs, and potentially mortgage insurance. It\'s important to budget for these additional expenses, which can range from 3-5% of the purchase price.',
    tags: ['costs', 'stamp_duty', 'legal_fees', 'inspection', 'insurance'],
    difficulty: 'beginner',
    related_questions: ['faq_001', 'faq_003', 'faq_050'],
    last_updated: '2024-01-25'
  },

  // PropGuard AI Specific Questions
  {
    id: 'faq_005',
    category: 'PropGuard AI',
    subcategory: 'Overview',
    question: 'What is PropGuard AI?',
    answer: 'PropGuard AI is an advanced property risk assessment and valuation platform that leverages artificial intelligence, real-time data, and blockchain technology. It provides comprehensive analysis for lenders, investors, and real estate professionals, focusing on accurate property valuations and identifying potential risks like environmental hazards.',
    tags: ['propguard', 'ai', 'valuation', 'risk_assessment', 'blockchain'],
    difficulty: 'beginner',
    related_questions: ['faq_006', 'faq_007', 'faq_008', 'faq_009'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_006',
    category: 'PropGuard AI',
    subcategory: 'Valuation',
    question: 'How does PropGuard AI determine property valuations?',
    answer: 'PropGuard AI uses sophisticated TensorFlow models that analyze a wide array of data points, including property tracking data, real-time market trends, environmental risk maps (e.g., NASA FIRMS data for flood and fire risk), and local employment data. This multi-modal AI approach allows for rapid and accurate property value assessments.',
    tags: ['valuation', 'tensorflow', 'ai_models', 'data_analysis', 'market_trends'],
    difficulty: 'intermediate',
    related_questions: ['faq_005', 'faq_023', 'faq_024', 'faq_049'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_007',
    category: 'PropGuard AI',
    subcategory: 'LVR Certificates',
    question: 'What are Dynamic LVR Certificates?',
    answer: 'Dynamic LVR (Loan-to-Value Ratio) Certificates are digitally signed documents generated by PropGuard AI. They provide a real-time mortgage risk assessment by incorporating the dynamic risk profile of a property, offering a transparent and immutable audit trail through blockchain verification.',
    tags: ['lvr', 'certificates', 'blockchain', 'risk_assessment', 'mortgage'],
    difficulty: 'intermediate',
    related_questions: ['faq_005', 'faq_008', 'faq_009', 'faq_019'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_008',
    category: 'PropGuard AI',
    subcategory: 'Risk Assessment',
    question: 'How does PropGuard AI assess environmental risks?',
    answer: 'PropGuard AI integrates real-time climate data from sources like NASA FIRMS to assess environmental risks such as flood, fire, and coastal erosion. It also provides 10-year projections and analyzes the potential impact of these factors on property value and insurance costs.',
    tags: ['environmental_risk', 'nasa_firms', 'climate_data', 'flood', 'fire'],
    difficulty: 'intermediate',
    related_questions: ['faq_005', 'faq_021', 'faq_043', 'faq_044'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_009',
    category: 'PropGuard AI',
    subcategory: 'Compliance',
    question: 'Can PropGuard AI help with regulatory compliance?',
    answer: 'Yes, PropGuard AI is designed with regulatory compliance in mind, particularly for Australian APRA CPS 230 requirements. It provides automated reporting, LVR analysis, and uses blockchain for immutable audit trails, helping financial institutions meet their compliance obligations.',
    tags: ['compliance', 'apra', 'cps_230', 'reporting', 'audit_trail'],
    difficulty: 'advanced',
    related_questions: ['faq_005', 'faq_007', 'faq_019', 'faq_035'],
    last_updated: '2024-01-25'
  },

  // Property Search and Analysis
  {
    id: 'faq_010',
    category: 'Property Search',
    subcategory: 'Search Process',
    question: 'How can I search for properties using this chatbot?',
    answer: 'You can search for properties by providing your preferences such as location (city/neighborhood), budget range, property type (house, condo, commercial), and any special requirements (e.g., number of bedrooms, proximity to schools). The chatbot will then use PropGuard AI to provide recommendations, often including a risk analysis.',
    tags: ['search', 'location', 'budget', 'property_type', 'requirements'],
    difficulty: 'beginner',
    related_questions: ['faq_011', 'faq_012', 'faq_027'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_011',
    category: 'Property Search',
    subcategory: 'Valuation',
    question: 'Can I get a live valuation for a specific property?',
    answer: 'Yes, you can request a live valuation by providing the full address of the property. PropGuard AI will then process the request, analyzing various data points to provide an estimated value, confidence score, and identified risk factors, often within minutes.',
    tags: ['live_valuation', 'address', 'estimated_value', 'confidence_score', 'risk_factors'],
    difficulty: 'beginner',
    related_questions: ['faq_006', 'faq_010', 'faq_023', 'faq_026'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_012',
    category: 'Property Search',
    subcategory: 'Market Data',
    question: 'What kind of market data and trend insights can the chatbot provide?',
    answer: 'The chatbot can provide insights into current market trends, including sentiment analysis derived from news feeds and social media, historical transaction data for comparative analysis, and neighborhood growth projections. This helps users understand the investment potential and market volatility.',
    tags: ['market_data', 'trends', 'sentiment_analysis', 'transaction_data', 'growth_projections'],
    difficulty: 'intermediate',
    related_questions: ['faq_010', 'faq_018', 'faq_048', 'faq_033'],
    last_updated: '2024-01-25'
  },

  // Investment and Property Management
  {
    id: 'faq_016',
    category: 'Investment',
    subcategory: 'Strategy',
    question: 'How can PropGuard AI assist real estate investors?',
    answer: 'PropGuard AI provides investors with critical insights into property values, potential risks (environmental, market, financial), and future projections. This data-driven approach helps investors make informed decisions, identify undervalued assets, and mitigate risks in their portfolios.',
    tags: ['investment', 'property_values', 'risk_mitigation', 'data_driven', 'portfolio'],
    difficulty: 'intermediate',
    related_questions: ['faq_036', 'faq_037', 'faq_038', 'faq_039'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_036',
    category: 'Investment',
    subcategory: 'Strategy',
    question: 'What\'s a better investment strategy: \'flipping\' houses or buying for long-term rental income?',
    answer: 'Both have merits and risks. House flipping can yield quick profits but is subject to market volatility, renovation costs, and capital gains tax. Long-term rentals provide steady cash flow and build equity over time but require dealing with tenants and property maintenance. PropGuard AI can analyze a specific property\'s renovation cost estimates, projected rental yields, and long-term value appreciation potential to help you compare these strategies objectively.',
    tags: ['flipping', 'rental_income', 'strategy', 'cash_flow', 'renovation'],
    difficulty: 'intermediate',
    related_questions: ['faq_037', 'faq_016', 'faq_038', 'faq_047'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_037',
    category: 'Investment',
    subcategory: 'Calculations',
    question: 'How do I calculate the potential rental yield on an investment property?',
    answer: 'The gross rental yield is calculated as (Annual Rental Income / Property Purchase Price) x 100. For a more accurate picture, calculate the net yield by subtracting annual expenses (like strata fees, council rates, insurance, and maintenance) from the rental income. You can ask me, "Calculate the rental yield for [Property Address]," and I\'ll use PropGuard AI to provide a detailed breakdown using current market rent data.',
    tags: ['rental_yield', 'calculation', 'annual_income', 'expenses', 'net_yield'],
    difficulty: 'beginner',
    related_questions: ['faq_036', 'faq_016', 'faq_038', 'faq_039'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_038',
    category: 'Investment',
    subcategory: 'Tax Strategy',
    question: 'What is negative gearing and how can it benefit an investor?',
    answer: 'Negative gearing occurs when the costs of owning a rental property (interest on the loan, maintenance, etc.) exceed the income it generates. This loss can often be deducted from your overall taxable income, reducing your tax bill. It\'s a strategy that bets on the property\'s capital growth outweighing the annual loss. Please note: I can explain the concept, but for advice specific to your tax situation, always consult a qualified tax advisor.',
    tags: ['negative_gearing', 'tax_deduction', 'rental_costs', 'capital_growth', 'tax_strategy'],
    difficulty: 'intermediate',
    related_questions: ['faq_037', 'faq_016', 'faq_003', 'faq_050'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_039',
    category: 'Investment',
    subcategory: 'Growth Indicators',
    question: 'What are the key indicators of a high-growth potential suburb?',
    answer: 'PropGuard AI monitors several key indicators, including: Infrastructure Development (new transport links, schools, or hospitals), Employment Data (growing local job markets and major company investments), Demographic Trends (an influx of young families or professionals), Market Sentiment & Sales Velocity (increasing prices and faster selling times), and Zoning Changes (potential for future development). Ask for a "suburb growth report" for any area of interest.',
    tags: ['growth_potential', 'infrastructure', 'employment', 'demographics', 'market_sentiment'],
    difficulty: 'intermediate',
    related_questions: ['faq_016', 'faq_012', 'faq_048', 'faq_033'],
    last_updated: '2024-01-25'
  },

  // Commercial Real Estate
  {
    id: 'faq_040',
    category: 'Commercial Real Estate',
    subcategory: 'Metrics',
    question: 'What\'s the difference between a capitalization rate (cap rate) and a rental yield?',
    answer: 'While both measure return on investment, they are used differently. Rental Yield is typically used for residential properties and is based on the purchase price. Cap Rate is used for commercial real estate and is based on the property\'s value generated by its net operating income (NOI). It helps investors compare the relative value of different commercial properties. The formula is Cap Rate = NOI / Current Market Value.',
    tags: ['cap_rate', 'rental_yield', 'commercial', 'noi', 'roi'],
    difficulty: 'intermediate',
    related_questions: ['faq_041', 'faq_042', 'faq_037'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_041',
    category: 'Commercial Real Estate',
    subcategory: 'Leases',
    question: 'What are the main types of commercial property leases?',
    answer: 'The most common are: Gross Lease (tenant pays a fixed rent; landlord pays all operating expenses, common in offices), Net Lease (Single, Double, Triple - tenant pays rent plus some or all property expenses like taxes, insurance, maintenance. A Triple Net (NNN) lease puts most costs on the tenant), and Percentage Lease (tenant pays base rent plus a percentage of their gross sales, common in retail).',
    tags: ['commercial_leases', 'gross_lease', 'net_lease', 'nnn_lease', 'percentage_lease'],
    difficulty: 'intermediate',
    related_questions: ['faq_040', 'faq_042'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_042',
    category: 'Commercial Real Estate',
    subcategory: 'Valuation',
    question: 'How is the value of a commercial property determined differently from a home?',
    answer: 'Residential property value is often based on comparable sales ("comps"). Commercial property valuation focuses more on the income approach—calculating the present value of the future income stream the property is expected to generate. PropGuard AI\'s models can incorporate both local comps and detailed income/expense projections for a comprehensive valuation.',
    tags: ['commercial_valuation', 'income_approach', 'comparable_sales', 'income_stream', 'comps'],
    difficulty: 'advanced',
    related_questions: ['faq_040', 'faq_041', 'faq_006'],
    last_updated: '2024-01-25'
  },

  // Sustainability and Climate Risks
  {
    id: 'faq_043',
    category: 'Sustainability',
    subcategory: 'Energy Efficiency',
    question: 'What is a NatHERS rating and why is it important?',
    answer: 'The Nationwide House Energy Rating Scheme (NatHERS) assesses a home\'s energy efficiency on a scale of 0 to 10 stars. A higher star rating means the home is more comfortable to live in and cheaper to run, with lower heating and cooling costs. PropGuard AI can highlight the NatHERS rating of properties and explain how it impacts long-term ownership costs.',
    tags: ['nathers', 'energy_efficiency', 'star_rating', 'heating_cooling', 'ownership_costs'],
    difficulty: 'beginner',
    related_questions: ['faq_044', 'faq_045', 'faq_008'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_044',
    category: 'Sustainability',
    subcategory: 'Climate Risks',
    question: 'Besides floods and fires, what other climate risks should I consider?',
    answer: 'PropGuard AI also analyzes risks like: Coastal Erosion (for properties near coastlines), Soil Subsidence (ground movement that can damage foundations), Bushfire Attack Level (BAL - a specific rating that determines construction requirements in bushfire-prone areas), and Heatwave Frequency (impacts livability and cooling costs).',
    tags: ['climate_risks', 'coastal_erosion', 'soil_subsidence', 'bal', 'heatwaves'],
    difficulty: 'intermediate',
    related_questions: ['faq_043', 'faq_045', 'faq_008', 'faq_021'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_045',
    category: 'Sustainability',
    subcategory: 'Future-Proofing',
    question: 'How can I "future-proof" my property investment against climate change?',
    answer: 'Consider properties with features like elevated construction in flood zones, modern fire-resistant materials in bushfire zones, and high energy efficiency ratings to handle temperature extremes. Using PropGuard AI\'s 10-year risk projections can help you identify properties that are more resilient to long-term climate shifts.',
    tags: ['future_proofing', 'climate_change', 'elevated_construction', 'fire_resistant', 'energy_efficiency'],
    difficulty: 'intermediate',
    related_questions: ['faq_043', 'faq_044', 'faq_032', 'faq_008'],
    last_updated: '2024-01-25'
  },

  // Advanced PropGuard AI Features
  {
    id: 'faq_046',
    category: 'PropGuard AI',
    subcategory: 'Model Updates',
    question: 'How often are PropGuard AI\'s valuation models updated?',
    answer: 'Our AI models are continuously learning. We ingest real-time data feeds daily, and our core valuation models are retrained regularly to reflect the latest market trends, ensuring our estimates remain highly accurate and current.',
    tags: ['model_updates', 'continuous_learning', 'real_time_data', 'retraining', 'accuracy'],
    difficulty: 'advanced',
    related_questions: ['faq_006', 'faq_024', 'faq_035'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_047',
    category: 'PropGuard AI',
    subcategory: 'Development Analysis',
    question: 'Can PropGuard AI analyze development potential or a property\'s value after renovations?',
    answer: 'Yes, this is an advanced feature. By analyzing zoning laws, typical construction costs in the area, and comparable sales of renovated properties, PropGuard AI can provide a "post-renovation valuation" estimate. Ask me, "What is the potential value of [address] after adding a second story?"',
    tags: ['development_potential', 'renovation', 'post_renovation_valuation', 'zoning', 'construction_costs'],
    difficulty: 'advanced',
    related_questions: ['faq_006', 'faq_036', 'faq_024'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_048',
    category: 'PropGuard AI',
    subcategory: 'Sentiment Analysis',
    question: 'How does PropGuard AI\'s sentiment analysis work for real estate?',
    answer: 'Our AI scans and analyzes thousands of data points from news articles, social media, and economic reports related to specific suburbs or property types. It identifies positive, negative, or neutral sentiment to gauge market confidence, which can be a leading indicator of price movements.',
    tags: ['sentiment_analysis', 'news_articles', 'social_media', 'market_confidence', 'price_movements'],
    difficulty: 'advanced',
    related_questions: ['faq_012', 'faq_018', 'faq_033'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_049',
    category: 'PropGuard AI',
    subcategory: 'Valuation Types',
    question: 'What\'s the difference between your \'estimated value\' and a formal bank valuation?',
    answer: 'PropGuard AI\'s "estimated value" is a powerful, data-driven estimate perfect for research, initial offers, and portfolio management. A formal bank valuation is conducted by a certified valuer for lending purposes and is the final figure a bank will use for a mortgage. Our estimates are designed to be highly accurate and can help you prepare for the formal valuation.',
    tags: ['estimated_value', 'bank_valuation', 'certified_valuer', 'lending', 'research'],
    difficulty: 'intermediate',
    related_questions: ['faq_006', 'faq_011', 'faq_023'],
    last_updated: '2024-01-25'
  },

  // Regional and Legal Specifics (Australia)
  {
    id: 'faq_050',
    category: 'Legal & Compliance',
    subcategory: 'Taxes',
    question: 'What is stamp duty and are there any exemptions?',
    answer: 'Stamp duty (or Transfer Duty) is a state government tax paid when you purchase a property. Exemptions or concessions often apply for first-home buyers below a certain purchase price threshold. The rules vary significantly by state. I can provide a general estimate for a property, but I\'ll always recommend verifying with the relevant state revenue office.',
    tags: ['stamp_duty', 'transfer_duty', 'first_home_buyers', 'concessions', 'state_tax'],
    difficulty: 'beginner',
    related_questions: ['faq_004', 'faq_038', 'faq_051'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_051',
    category: 'Legal & Compliance',
    subcategory: 'Documentation',
    question: 'What is a Section 32 or Vendor\'s Statement?',
    answer: 'In Victoria, Australia, a Section 32 is a legal document the seller must provide to the buyer before a contract of sale is signed. It contains essential information about the property, including title details, mortgages, zoning, and any covenants. It\'s crucial to have a conveyancer or lawyer review this document.',
    tags: ['section_32', 'vendor_statement', 'legal_document', 'title_details', 'conveyancer'],
    difficulty: 'intermediate',
    related_questions: ['faq_052', 'faq_050'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_052',
    category: 'Legal & Compliance',
    subcategory: 'Professionals',
    question: 'What is the role of a conveyancer?',
    answer: 'A conveyancer (or solicitor) specializes in the legal aspects of transferring property ownership. They conduct searches, prepare and review contracts, liaise with the bank, and ensure the settlement process complies with all laws. Their involvement is critical for a smooth and secure transaction.',
    tags: ['conveyancer', 'solicitor', 'property_transfer', 'contracts', 'settlement'],
    difficulty: 'beginner',
    related_questions: ['faq_051', 'faq_001', 'faq_002'],
    last_updated: '2024-01-25'
  },

  // Benefits and Future Aspects
  {
    id: 'faq_031',
    category: 'Benefits',
    subcategory: 'Cost Savings',
    question: 'What are the cost savings associated with using PropGuard AI?',
    answer: 'PropGuard AI significantly reduces the cost of property assessments. Compared to traditional manual valuations that can cost around $500, PropGuard AI can perform an AI valuation for approximately $5, leading to substantial cost savings for financial institutions and individuals.',
    tags: ['cost_savings', 'manual_valuation', 'ai_valuation', 'financial_institutions', 'efficiency'],
    difficulty: 'beginner',
    related_questions: ['faq_005', 'faq_020', 'faq_035'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_032',
    category: 'Benefits',
    subcategory: 'Sustainability',
    question: 'How does PropGuard AI contribute to a more sustainable real estate market?',
    answer: 'By integrating detailed environmental risk assessments, PropGuard AI helps stakeholders understand and mitigate climate-related risks to properties. This encourages more sustainable development practices and investment decisions, contributing to a more resilient real estate market in the face of climate change.',
    tags: ['sustainability', 'environmental_risk', 'climate_risks', 'sustainable_development', 'resilience'],
    difficulty: 'intermediate',
    related_questions: ['faq_008', 'faq_045', 'faq_021'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_033',
    category: 'Benefits',
    subcategory: 'Future Vision',
    question: 'What is the future vision for PropGuard AI?',
    answer: 'The future vision for PropGuard AI includes continued expansion into international markets, further integration of advanced AI models for predictive analytics, and enhancing its capabilities to support a wider range of real estate professionals and consumers. The goal is to remain at the forefront of AI-driven property risk assessment and valuation.',
    tags: ['future_vision', 'international_expansion', 'predictive_analytics', 'ai_models', 'innovation'],
    difficulty: 'beginner',
    related_questions: ['faq_005', 'faq_029', 'faq_034'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_034',
    category: 'Benefits',
    subcategory: 'Customization',
    question: 'Can PropGuard AI be customized for specific business needs?',
    answer: 'Yes, for enterprise clients, PropGuard AI offers custom solutions, including white-label deployment options and API endpoints for seamless integration into existing business workflows. This allows organizations to tailor the platform to their specific operational requirements and branding.',
    tags: ['customization', 'enterprise', 'white_label', 'api_endpoints', 'integration'],
    difficulty: 'advanced',
    related_questions: ['faq_033', 'faq_035', 'faq_005'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_035',
    category: 'Benefits',
    subcategory: 'Accuracy',
    question: 'How does PropGuard AI ensure the accuracy of its risk models?',
    answer: 'PropGuard AI ensures the accuracy of its risk models through continuous learning, rigorous backtesting (e.g., demonstrating a 40% default reduction over 2022-2023 simulations), and ongoing validation against real-world data. The multi-modal AI approach and integration of diverse data sources also contribute to the robustness and reliability of its assessments.',
    tags: ['accuracy', 'continuous_learning', 'backtesting', 'validation', 'multi_modal_ai'],
    difficulty: 'advanced',
    related_questions: ['faq_006', 'faq_024', 'faq_046', 'faq_030'],
    last_updated: '2024-01-25'
  },

  // Additional Technical Questions
  {
    id: 'faq_021',
    category: 'PropGuard AI',
    subcategory: 'Environmental Analysis',
    question: 'What specific environmental risks does PropGuard AI analyze?',
    answer: 'PropGuard AI analyzes a range of environmental risks including flood risk (using government environmental data and NASA FIRMS), wildfire probability models, sea level rise projections for coastal properties, and air quality indexes. This comprehensive analysis helps in understanding the long-term viability and insurance implications of a property.',
    tags: ['environmental_risks', 'flood_risk', 'wildfire', 'sea_level_rise', 'air_quality'],
    difficulty: 'intermediate',
    related_questions: ['faq_008', 'faq_044', 'faq_045'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_022',
    category: 'PropGuard AI',
    subcategory: 'XNode Computing',
    question: 'How does XNode distributed computing contribute to PropGuard AI?',
    answer: 'XNode distributed computing enables PropGuard AI to perform parallel processing for valuation calculations and handle high-volume assessments scalably. It integrates live market data and provides a global network of decentralized computing nodes for consensus-based valuations, enhancing accuracy and resilience.',
    tags: ['xnode', 'distributed_computing', 'parallel_processing', 'scalability', 'consensus'],
    difficulty: 'advanced',
    related_questions: ['faq_005', 'faq_006', 'faq_035'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_023',
    category: 'PropGuard AI',
    subcategory: 'Confidence Scores',
    question: 'What does the confidence score in a PropGuard AI valuation signify?',
    answer: 'The confidence score indicates the AI model\'s certainty in its estimated property valuation. A higher confidence score (e.g., 92%) suggests that the model has a strong basis in its data and analysis for the given property, providing users with a reliable indicator of the valuation\'s robustness.',
    tags: ['confidence_score', 'ai_certainty', 'valuation_robustness', 'data_basis', 'reliability'],
    difficulty: 'beginner',
    related_questions: ['faq_006', 'faq_011', 'faq_049'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_024',
    category: 'PropGuard AI',
    subcategory: 'Multi-Modal AI',
    question: 'Can the chatbot explain the multi-modal AI approach used by PropGuard AI?',
    answer: 'Yes, PropGuard AI\'s multi-modal AI approach combines various data types, such as satellite imagery analysis (CNN), market sentiment from news feeds (Transformer models), property price prediction (LSTM networks), and real-time environmental data. This integrated analysis provides a more holistic and accurate risk assessment and valuation than single-source methods.',
    tags: ['multi_modal_ai', 'satellite_imagery', 'cnn', 'transformer_models', 'lstm'],
    difficulty: 'advanced',
    related_questions: ['faq_006', 'faq_048', 'faq_035'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_025',
    category: 'PropGuard AI',
    subcategory: 'Security',
    question: 'How does PropGuard AI ensure data privacy and security?',
    answer: 'PropGuard AI is built with enterprise-grade security, including bank-grade security and end-to-end encryption. It also incorporates regulatory compliance standards like GDPR and CCPA for data privacy protection, ensuring that user and property data are handled securely and responsibly.',
    tags: ['data_privacy', 'security', 'encryption', 'gdpr', 'ccpa'],
    difficulty: 'intermediate',
    related_questions: ['faq_005', 'faq_009', 'faq_034'],
    last_updated: '2024-01-25'
  },

  // User Interaction and Practical Applications
  {
    id: 'faq_026',
    category: 'User Experience',
    subcategory: 'Speed',
    question: 'How quickly can I get a property valuation from PropGuard AI?',
    answer: 'PropGuard AI is designed for speed. You can typically receive a comprehensive property valuation and risk assessment within minutes, significantly faster than traditional appraisal methods which can take days or weeks.',
    tags: ['speed', 'quick_valuation', 'minutes', 'traditional_appraisal', 'efficiency'],
    difficulty: 'beginner',
    related_questions: ['faq_011', 'faq_006', 'faq_031'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_027',
    category: 'User Experience',
    subcategory: 'Comparison',
    question: 'Can I compare different properties using PropGuard AI?',
    answer: 'Yes, the chatbot can facilitate comparisons between multiple properties. By providing addresses for different properties, you can receive comparative valuations, risk assessments, and market insights to help you make an informed decision.',
    tags: ['comparison', 'multiple_properties', 'comparative_valuation', 'risk_assessment', 'decision_making'],
    difficulty: 'beginner',
    related_questions: ['faq_010', 'faq_011', 'faq_012'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_028',
    category: 'User Experience',
    subcategory: 'Support',
    question: 'What kind of support is available if I have a complex query that the chatbot can\'t handle?',
    answer: 'For complex or highly specific inquiries that the chatbot cannot fully address, a seamless human escalation path is available. The chatbot will offer to connect you with a human expert who can provide more in-depth assistance.',
    tags: ['support', 'human_escalation', 'expert_assistance', 'complex_queries', 'in_depth_help'],
    difficulty: 'beginner',
    related_questions: ['faq_015', 'faq_034'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_029',
    category: 'User Experience',
    subcategory: 'International',
    question: 'Is PropGuard AI suitable for international property markets?',
    answer: 'While PropGuard AI currently has a strong focus on the Australian market, its scalable architecture and multi-modal AI capabilities are designed for international expansion. The underlying technology can be adapted to integrate with various regional data sources and regulatory frameworks.',
    tags: ['international', 'australian_market', 'scalable_architecture', 'regional_data', 'regulatory_frameworks'],
    difficulty: 'intermediate',
    related_questions: ['faq_033', 'faq_034', 'faq_005'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_030',
    category: 'User Experience',
    subcategory: 'Risk Reduction',
    question: 'How does PropGuard AI help reduce loan defaults for lenders?',
    answer: 'By providing real-time, accurate property valuations and comprehensive risk assessments (including climate, market, and financial risks), PropGuard AI enables lenders to make more informed lending decisions. This proactive risk mitigation can lead to a significant reduction in loan defaults, as demonstrated by backtest results showing a 40% default reduction.',
    tags: ['loan_defaults', 'risk_mitigation', 'accurate_valuations', 'informed_decisions', '40_percent_reduction'],
    difficulty: 'advanced',
    related_questions: ['faq_007', 'faq_008', 'faq_035'],
    last_updated: '2024-01-25'
  },

  // Additional Investment Strategies
  {
    id: 'faq_018',
    category: 'Market Analysis',
    subcategory: 'Sentiment',
    question: 'What is the significance of market sentiment analysis in real estate?',
    answer: 'Market sentiment analysis, as performed by PropGuard AI using LLM models, helps gauge the overall mood and perception of the real estate market from news, social media, and other textual data. This can indicate potential shifts in demand, buyer confidence, and emerging trends, providing a leading indicator for market timing and investment strategies.',
    tags: ['market_sentiment', 'llm_models', 'news_analysis', 'buyer_confidence', 'market_timing'],
    difficulty: 'advanced',
    related_questions: ['faq_048', 'faq_012', 'faq_033'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_019',
    category: 'Technology',
    subcategory: 'Blockchain',
    question: 'How does blockchain verification enhance property transactions?',
    answer: 'Blockchain verification, utilized by PropGuard AI for Dynamic LVR Certificates and Property NFTs, creates an immutable and transparent audit trail for property-related data and transactions. This enhances trust, reduces fraud, and streamlines regulatory compliance by providing verifiable records that cannot be altered.',
    tags: ['blockchain', 'verification', 'immutable', 'audit_trail', 'fraud_reduction'],
    difficulty: 'intermediate',
    related_questions: ['faq_007', 'faq_009', 'faq_025'],
    last_updated: '2024-01-25'
  },
  {
    id: 'faq_020',
    category: 'Benefits',
    subcategory: 'Comparison',
    question: 'What are the benefits of using PropGuard AI compared to traditional appraisal methods?',
    answer: 'PropGuard AI offers significant advantages over traditional appraisal methods, including speed (valuations in minutes vs. days), cost-effectiveness (lower operational costs), accuracy (multi-modal AI analysis), and comprehensive risk assessment (integrating climate and market data). It also provides continuous monitoring and regulatory compliance features that traditional methods lack.',
    tags: ['traditional_appraisal', 'speed', 'cost_effectiveness', 'accuracy', 'continuous_monitoring'],
    difficulty: 'beginner',
    related_questions: ['faq_006', 'faq_031', 'faq_035'],
    last_updated: '2024-01-25'
  }
];

// Helper functions for FAQ management
export const getFAQsByCategory = (category: string): FAQItem[] => {
  return mockRealEstateFAQs.filter(faq => faq.category === category);
};

export const getFAQsBySubcategory = (category: string, subcategory: string): FAQItem[] => {
  return mockRealEstateFAQs.filter(faq => 
    faq.category === category && faq.subcategory === subcategory
  );
};

export const getFAQsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): FAQItem[] => {
  return mockRealEstateFAQs.filter(faq => faq.difficulty === difficulty);
};

export const searchFAQs = (query: string): FAQItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockRealEstateFAQs.filter(faq => 
    faq.question.toLowerCase().includes(lowercaseQuery) ||
    faq.answer.toLowerCase().includes(lowercaseQuery) ||
    faq.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRelatedFAQs = (faqId: string): FAQItem[] => {
  const faq = mockRealEstateFAQs.find(f => f.id === faqId);
  if (!faq || !faq.related_questions) return [];
  
  return faq.related_questions
    .map(relatedId => mockRealEstateFAQs.find(f => f.id === relatedId))
    .filter((relatedFAQ): relatedFAQ is FAQItem => relatedFAQ !== undefined);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(mockRealEstateFAQs.map(faq => faq.category));
  return Array.from(categories).sort();
};

export const getSubcategoriesByCategory = (category: string): string[] => {
  const subcategories = new Set(
    mockRealEstateFAQs
      .filter(faq => faq.category === category && faq.subcategory)
      .map(faq => faq.subcategory!)
  );
  return Array.from(subcategories).sort();
};

export const getAllTags = (): string[] => {
  const allTags = new Set(
    mockRealEstateFAQs.flatMap(faq => faq.tags)
  );
  return Array.from(allTags).sort();
};
