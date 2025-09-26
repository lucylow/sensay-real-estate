import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  TrendingUp, 
  DollarSign, 
  Home, 
  FileText, 
  Calculator,
  Shield,
  Clock,
  Users,
  MapPin,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Copy,
  Star,
  Filter,
  Target
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  notHelpful: number;
  lastUpdated: Date;
  relatedQuestions: string[];
  aiGenerated: boolean;
  confidence: number;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  questionCount: number;
}

interface SearchResult {
  item: FAQItem;
  relevanceScore: number;
  matchedTerms: string[];
}

export const SmartFAQ: React.FC = () => {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  useEffect(() => {
    loadFAQData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, faqItems]);

  const loadFAQData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const sampleCategories: FAQCategory[] = [
      {
        id: 'buying',
        name: 'Buying Process',
        icon: <Home className="h-5 w-5" />,
        description: 'Everything about purchasing property',
        questionCount: 25
      },
      {
        id: 'selling',
        name: 'Selling Process',
        icon: <TrendingUp className="h-5 w-5" />,
        description: 'Guide to selling your property',
        questionCount: 20
      },
      {
        id: 'financing',
        name: 'Financing & Mortgages',
        icon: <DollarSign className="h-5 w-5" />,
        description: 'Loan options and financing',
        questionCount: 30
      },
      {
        id: 'legal',
        name: 'Legal & Documentation',
        icon: <FileText className="h-5 w-5" />,
        description: 'Legal requirements and paperwork',
        questionCount: 15
      },
      {
        id: 'investment',
        name: 'Investment Properties',
        icon: <Calculator className="h-5 w-5" />,
        description: 'Real estate investment guidance',
        questionCount: 18
      },
      {
        id: 'market',
        name: 'Market Analysis',
        icon: <TrendingUp className="h-5 w-5" />,
        description: 'Market trends and insights',
        questionCount: 22
      }
    ];

    const sampleFAQItems: FAQItem[] = [
      {
        id: '1',
        question: 'How do I get pre-approved for a mortgage?',
        answer: 'Getting pre-approved for a mortgage is a crucial first step in the home buying process. Here\'s how:\n\n1. **Gather your financial documents** - Pay stubs, tax returns, bank statements, and employment verification\n2. **Check your credit score** - Aim for a score of 620 or higher for better rates\n3. **Compare lenders** - Get quotes from multiple lenders including banks, credit unions, and mortgage brokers\n4. **Submit your application** - Complete the pre-approval application with your chosen lender\n5. **Wait for approval** - This typically takes 1-3 business days\n\nPre-approval shows sellers you\'re a serious buyer and helps determine your budget.',
        category: 'financing',
        tags: ['mortgage', 'pre-approval', 'financing', 'home-buying'],
        helpful: 142,
        notHelpful: 8,
        lastUpdated: new Date('2024-01-15'),
        relatedQuestions: [
          'What documents do I need for a mortgage application?',
          'How long does mortgage pre-approval last?',
          'What\'s the difference between pre-qualification and pre-approval?'
        ],
        aiGenerated: true,
        confidence: 0.95
      },
      {
        id: '2',
        question: 'What are closing costs and how much should I expect to pay?',
        answer: 'Closing costs are fees paid at the end of the real estate transaction. They typically range from 2-5% of the home\'s purchase price.\n\n**Common closing costs include:**\n- Loan origination fees (0.5-1% of loan amount)\n- Title insurance and search fees\n- Appraisal and inspection fees\n- Attorney fees\n- Recording fees\n- Property taxes and insurance\n\n**For a $500,000 home, expect closing costs of $10,000-$25,000.**\n\nSome costs are negotiable, and you may be able to get the seller to cover some fees. Always review your Loan Estimate carefully.',
        category: 'buying',
        tags: ['closing-costs', 'fees', 'home-buying', 'financing'],
        helpful: 156,
        notHelpful: 12,
        lastUpdated: new Date('2024-01-20'),
        relatedQuestions: [
          'Can I negotiate closing costs with the seller?',
          'What\'s included in the Loan Estimate?',
          'Are there any closing cost assistance programs?'
        ],
        aiGenerated: true,
        confidence: 0.92
      },
      {
        id: '3',
        question: 'How do I determine the right listing price for my home?',
        answer: 'Pricing your home correctly is crucial for a successful sale. Here\'s how to determine the right price:\n\n**1. Get a Comparative Market Analysis (CMA)**\n- Compare your home to similar properties sold in the last 6 months\n- Look at active listings in your neighborhood\n- Consider location, size, condition, and features\n\n**2. Consider market conditions**\n- Seller\'s market: Price slightly above market value\n- Buyer\'s market: Price competitively or slightly below\n- Balanced market: Price at market value\n\n**3. Factor in your timeline**\n- Need to sell quickly? Price competitively\n- No rush? Can price higher and wait\n\n**4. Get a professional appraisal** for accurate valuation\n\nOverpricing can lead to longer time on market and lower final sale price.',
        category: 'selling',
        tags: ['listing-price', 'pricing', 'home-selling', 'market-analysis'],
        helpful: 134,
        notHelpful: 6,
        lastUpdated: new Date('2024-01-18'),
        relatedQuestions: [
          'What\'s the difference between listing price and market value?',
          'How often should I adjust my listing price?',
          'Should I use an online home value estimator?'
        ],
        aiGenerated: true,
        confidence: 0.89
      },
      {
        id: '4',
        question: 'What is a home inspection and what should I expect?',
        answer: 'A home inspection is a thorough examination of a property\'s condition, typically performed by a licensed inspector before purchase.\n\n**What inspectors check:**\n- Structural integrity (foundation, walls, roof)\n- Electrical systems and wiring\n- Plumbing and water systems\n- HVAC systems\n- Appliances and fixtures\n- Safety hazards and code violations\n\n**What to expect:**\n- Inspection takes 2-4 hours depending on home size\n- You can attend the inspection to ask questions\n- Receive a detailed written report within 24-48 hours\n- Report includes photos and recommendations\n\n**Cost:** Typically $300-$500, paid by the buyer\n\n**After inspection:** You can negotiate repairs, ask for credits, or withdraw your offer if major issues are found.',
        category: 'buying',
        tags: ['home-inspection', 'property-condition', 'buying-process', 'due-diligence'],
        helpful: 178,
        notHelpful: 4,
        lastUpdated: new Date('2024-01-22'),
        relatedQuestions: [
          'What if the home inspection reveals major problems?',
          'Do I need a separate inspection for pests or mold?',
          'Can I negotiate repairs after the inspection?'
        ],
        aiGenerated: true,
        confidence: 0.94
      },
      {
        id: '5',
        question: 'How do I calculate my debt-to-income ratio for mortgage qualification?',
        answer: 'Your debt-to-income (DTI) ratio is a key factor lenders use to determine mortgage eligibility.\n\n**DTI Calculation:**\nDTI = (Monthly Debt Payments + Proposed Mortgage Payment) ÷ Gross Monthly Income\n\n**Example:**\n- Gross monthly income: $8,000\n- Monthly debt payments: $1,200 (car loan, credit cards, student loans)\n- Proposed mortgage payment: $2,000\n- DTI = ($1,200 + $2,000) ÷ $8,000 = 40%\n\n**DTI Guidelines:**\n- **Conventional loans:** Maximum 43% DTI\n- **FHA loans:** Maximum 57% DTI (with compensating factors)\n- **VA loans:** Maximum 41% DTI\n- **Jumbo loans:** Maximum 45% DTI\n\n**To improve DTI:**\n- Pay down existing debt\n- Increase income\n- Consider a smaller loan amount\n- Look for properties with lower taxes/HOA fees',
        category: 'financing',
        tags: ['debt-to-income', 'DTI', 'mortgage-qualification', 'financing'],
        helpful: 167,
        notHelpful: 9,
        lastUpdated: new Date('2024-01-16'),
        relatedQuestions: [
          'What debts are included in DTI calculation?',
          'How can I improve my debt-to-income ratio?',
          'What\'s the difference between front-end and back-end DTI?'
        ],
        aiGenerated: true,
        confidence: 0.91
      }
    ];

    setCategories(sampleCategories);
    setFaqItems(sampleFAQItems);
    setIsLoading(false);
  };

  const performSearch = (query: string) => {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    
    const results: SearchResult[] = faqItems
      .map(item => {
        const questionMatch = searchTerms.some(term => 
          item.question.toLowerCase().includes(term)
        );
        const answerMatch = searchTerms.some(term => 
          item.answer.toLowerCase().includes(term)
        );
        const tagMatch = searchTerms.some(term => 
          item.tags.some(tag => tag.toLowerCase().includes(term))
        );

        const relevanceScore = (questionMatch ? 3 : 0) + (answerMatch ? 2 : 0) + (tagMatch ? 1 : 0);
        
        if (relevanceScore > 0) {
          return {
            item,
            relevanceScore,
            matchedTerms: searchTerms.filter(term => 
              item.question.toLowerCase().includes(term) ||
              item.answer.toLowerCase().includes(term) ||
              item.tags.some(tag => tag.toLowerCase().includes(term))
            )
          };
        }
        return null;
      })
      .filter((result): result is SearchResult => result !== null)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    setSearchResults(results);
  };

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleHelpful = (itemId: string, isHelpful: boolean) => {
    setFaqItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            helpful: isHelpful ? item.helpful + 1 : item.helpful,
            notHelpful: !isHelpful ? item.notHelpful + 1 : item.notHelpful
          }
        : item
    ));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const filteredFAQItems = selectedCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  const displayItems = searchQuery.trim() 
    ? searchResults.map(result => result.item)
    : filteredFAQItems;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Smart FAQ</h1>
        <Badge variant="secondary" className="ml-auto">
          <Zap className="h-3 w-3 mr-1" />
          AI-Powered Answers
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Categories</TabsTrigger>
          <TabsTrigger value="search">Search FAQ</TabsTrigger>
          <TabsTrigger value="ask">Ask Question</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className={`cursor-pointer hover:shadow-lg transition-shadow ${
                  selectedCategory === category.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {category.questionCount} questions
                    </Badge>
                    {selectedCategory === category.id && (
                      <Badge variant="default">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Selected
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {displayItems.length} Questions Found
              </h2>
              {searchQuery && (
                <Badge variant="secondary">
                  <Target className="h-3 w-3 mr-1" />
                  Search Results
                </Badge>
              )}
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {displayItems.map((item) => {
                  const isExpanded = expandedItems.has(item.id);
                  return (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div 
                            className="cursor-pointer"
                            onClick={() => toggleExpanded(item.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                                <div className="flex items-center gap-2 mb-3">
                                  <Badge variant="outline">
                                    {categories.find(c => c.id === item.category)?.name}
                                  </Badge>
                                  {item.aiGenerated && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                      <Zap className="h-3 w-3" />
                                      AI Generated
                                    </Badge>
                                  )}
                                  <Badge 
                                    variant={item.confidence > 0.9 ? "default" : "secondary"}
                                    className="flex items-center gap-1"
                                  >
                                    <Star className="h-3 w-3" />
                                    {Math.round(item.confidence * 100)}% confidence
                                  </Badge>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="space-y-4">
                              <div className="prose max-w-none">
                                <p className="whitespace-pre-line text-muted-foreground">
                                  {item.answer}
                                </p>
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>

                              {/* Related Questions */}
                              {item.relatedQuestions.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Related Questions:</h4>
                                  <div className="space-y-1">
                                    {item.relatedQuestions.map((relatedQ, index) => (
                                      <div key={index} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                                        • {relatedQ}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex items-center justify-between pt-4 border-t">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleHelpful(item.id, true)}
                                    className="flex items-center gap-1"
                                  >
                                    <ThumbsUp className="h-4 w-4" />
                                    Helpful ({item.helpful})
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleHelpful(item.id, false)}
                                    className="flex items-center gap-1"
                                  >
                                    <ThumbsDown className="h-4 w-4" />
                                    Not Helpful ({item.notHelpful})
                                  </Button>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(item.answer)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search FAQ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Search for questions, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                
                {searchQuery && searchResults.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {searchResults.length} Results Found
                      </h3>
                      <Badge variant="secondary">
                        <Target className="h-3 w-3 mr-1" />
                        Search Results
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      {searchResults.map((result, index) => (
                        <Card key={result.item.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <h4 className="font-semibold">{result.item.question}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {result.item.answer.substring(0, 200)}...
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {Math.round(result.relevanceScore * 20)}% match
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {categories.find(c => c.id === result.item.category)?.name}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {searchQuery && searchResults.length === 0 && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No results found for "{searchQuery}". Try different keywords or browse categories.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ask" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Ask a Question
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Question</label>
                  <Input
                    placeholder="What would you like to know about real estate?"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Details (Optional)</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-20"
                    placeholder="Provide any additional context or specific details..."
                  />
                </div>
                
                <Button className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Get AI Answer
                </Button>
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Our AI will analyze your question and provide a comprehensive answer based on current real estate knowledge and best practices.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartFAQ;