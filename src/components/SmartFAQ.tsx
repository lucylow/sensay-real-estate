import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  Calendar, 
  TrendingUp, 
  Shield, 
  Home,
  DollarSign,
  Users,
  FileText,
  CheckCircle
} from 'lucide-react';
import { sensayService } from '@/services/sensayService';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'financing' | 'legal' | 'market' | 'process';
  tags: string[];
}

interface LeadData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  interests: string[];
  budget?: string;
  location?: string;
  propertyType?: string;
  leadScore: number;
  lastInteraction: Date;
  status: 'new' | 'qualified' | 'nurturing' | 'hot' | 'converted';
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How does PropGuard AI assess property risk?',
    answer: 'PropGuard AI uses advanced machine learning models combined with real-time NASA climate data to assess flood, fire, and coastal erosion risks. Our system analyzes historical data, climate projections, and property-specific factors to provide comprehensive risk scores.',
    category: 'general',
    tags: ['risk', 'assessment', 'climate', 'ai']
  },
  {
    id: '2',
    question: 'What is APRA CPS 230 compliance?',
    answer: 'APRA CPS 230 is the Australian Prudential Regulation Authority\'s standard for operational risk management. PropGuard AI ensures full compliance by providing automated reporting, audit trails, and risk documentation required by Australian lenders.',
    category: 'legal',
    tags: ['apra', 'compliance', 'regulatory', 'lending']
  },
  {
    id: '3',
    question: 'How accurate are PropGuard AI valuations?',
    answer: 'Our AI-powered valuations achieve 92% accuracy compared to actual sale prices, using blockchain-verified data and consensus from multiple valuation models. Each valuation includes confidence scores and risk assessments.',
    category: 'market',
    tags: ['valuation', 'accuracy', 'blockchain', 'confidence']
  },
  {
    id: '4',
    question: 'What financing options are available?',
    answer: 'We work with all major Australian banks and lenders. Our platform provides pre-approval assistance, loan comparison tools, and connects you with qualified mortgage brokers who understand PropGuard AI risk assessments.',
    category: 'financing',
    tags: ['financing', 'loans', 'banks', 'pre-approval']
  },
  {
    id: '5',
    question: 'How long does the buying process take?',
    answer: 'The typical property purchase process takes 4-6 weeks from offer acceptance to settlement. PropGuard AI can accelerate this by providing instant risk assessments and pre-approved valuations, potentially reducing time by 30%.',
    category: 'process',
    tags: ['timeline', 'process', 'settlement', 'offer']
  }
];

const categoryIcons = {
  general: HelpCircle,
  financing: DollarSign,
  legal: Shield,
  market: TrendingUp,
  process: Calendar
};

export const SmartFAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFAQClick = async (faq: FAQItem) => {
    setIsLoading(true);
    try {
      const response = await sensayService.sendMessage(`Tell me more about: ${faq.question}`);
      
      const message = {
        id: Date.now().toString(),
        question: faq.question,
        answer: response.message,
        timestamp: new Date(),
        actions: response.actions || []
      };
      
      setChatMessages(prev => [...prev, message]);
      
      // Check if we should capture lead information
      if (response.message.includes('contact') || response.message.includes('email') || response.message.includes('phone')) {
        setShowLeadCapture(true);
      }
    } catch (error) {
      console.error('Error getting FAQ response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadCapture = (leadInfo: Partial<LeadData>) => {
    const newLead: LeadData = {
      id: Date.now().toString(),
      name: leadInfo.name || 'Anonymous',
      email: leadInfo.email || '',
      phone: leadInfo.phone,
      interests: leadInfo.interests || [],
      budget: leadInfo.budget,
      location: leadInfo.location,
      propertyType: leadInfo.propertyType,
      leadScore: calculateLeadScore(leadInfo),
      lastInteraction: new Date(),
      status: 'new'
    };
    
    setLeadData(newLead);
    setShowLeadCapture(false);
    
    // In a real app, this would save to your backend
    console.log('Lead captured:', newLead);
  };

  const calculateLeadScore = (leadInfo: Partial<LeadData>): number => {
    let score = 0;
    if (leadInfo.email) score += 20;
    if (leadInfo.phone) score += 15;
    if (leadInfo.budget) score += 25;
    if (leadInfo.location) score += 20;
    if (leadInfo.propertyType) score += 20;
    return Math.min(score, 100);
  };

  const getStatusColor = (status: LeadData['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-yellow-100 text-yellow-800';
      case 'nurturing': return 'bg-purple-100 text-purple-800';
      case 'hot': return 'bg-red-100 text-red-800';
      case 'converted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FAQ Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                Smart FAQ & Knowledge Base
              </CardTitle>
              <p className="text-gray-600">
                Get instant answers to common real estate questions powered by AI
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />

              {/* Category Filter */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="financing">Financing</TabsTrigger>
                  <TabsTrigger value="legal">Legal</TabsTrigger>
                  <TabsTrigger value="market">Market</TabsTrigger>
                  <TabsTrigger value="process">Process</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* FAQ List */}
              <div className="space-y-2">
                {filteredFAQs.map((faq) => {
                  const IconComponent = categoryIcons[faq.category];
                  return (
                    <Card key={faq.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4" onClick={() => handleFAQClick(faq)}>
                        <div className="flex items-start gap-3">
                          <IconComponent className="h-5 w-5 text-gray-500 mt-0.5" />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">{faq.question}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{faq.answer}</p>
                            <div className="flex gap-1 mt-2">
                              {faq.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <MessageCircle className="h-4 w-4 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Lead Capture Form */}
          {showLeadCapture && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">Get Personalized Help</CardTitle>
                <p className="text-blue-700">Share your details for customized assistance</p>
              </CardHeader>
              <CardContent>
                <LeadCaptureForm onCapture={handleLeadCapture} />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chat & Lead Management */}
        <div className="space-y-6">
          {/* Active Chat */}
          {chatMessages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  AI Assistant Responses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="space-y-2">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-900">{message.question}</h4>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-gray-800">{message.answer}</p>
                        {message.actions && message.actions.length > 0 && (
                          <div className="mt-2 space-x-2">
                            {message.actions.map((action: any, index: number) => (
                              <Button key={index} size="sm" variant="outline">
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {isLoading && (
                  <div className="flex justify-center py-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Lead Dashboard */}
          {leadData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Lead Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{leadData.name}</h3>
                    <p className="text-sm text-gray-600">{leadData.email}</p>
                  </div>
                  <Badge className={getStatusColor(leadData.status)}>
                    {leadData.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Lead Score:</span>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${leadData.leadScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{leadData.leadScore}/100</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Contact:</span>
                    <p className="text-xs">{leadData.lastInteraction.toLocaleDateString()}</p>
                  </div>
                </div>

                {leadData.interests.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-600">Interests:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {leadData.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Help</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12" onClick={() => setSearchQuery('financing')}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Financing Help
                </Button>
                <Button variant="outline" className="h-12" onClick={() => setSearchQuery('process')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Buying Process
                </Button>
                <Button variant="outline" className="h-12" onClick={() => setSearchQuery('market')}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Market Trends
                </Button>
                <Button variant="outline" className="h-12" onClick={() => setSearchQuery('legal')}>
                  <Shield className="h-4 w-4 mr-2" />
                  Legal Questions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Lead Capture Form Component
interface LeadCaptureFormProps {
  onCapture: (leadInfo: Partial<LeadData>) => void;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ onCapture }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    location: '',
    propertyType: '',
    interests: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCapture(formData);
  };

  const interestOptions = [
    'First Home Buyer',
    'Investment Property',
    'Upgrading Home',
    'Downsizing',
    'Commercial Property',
    'Land Development'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
        <Input
          placeholder="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
        />
        <Input
          placeholder="Budget Range"
          value={formData.budget}
          onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Preferred Location"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
        />
        <Input
          placeholder="Property Type"
          value={formData.propertyType}
          onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value }))}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Interests:</label>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((interest) => (
            <Button
              key={interest}
              type="button"
              variant={formData.interests.includes(interest) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const newInterests = formData.interests.includes(interest)
                  ? formData.interests.filter(i => i !== interest)
                  : [...formData.interests, interest];
                setFormData(prev => ({ ...prev, interests: newInterests }));
              }}
            >
              {interest}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          <CheckCircle className="h-4 w-4 mr-2" />
          Get Help
        </Button>
        <Button type="button" variant="outline" onClick={() => setFormData({
          name: '', email: '', phone: '', budget: '', location: '', propertyType: '', interests: []
        })}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
