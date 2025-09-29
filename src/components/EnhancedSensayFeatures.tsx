import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Globe, 
  Languages, 
  Calendar as CalendarIcon, 
  Video, 
  MessageCircle,
  Brain,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  Mic,
  MicOff,
  Camera,
  Phone,
  MapPin,
  Star,
  Zap,
  Shield,
  TrendingUp,
  FileText,
  Smartphone,
  Monitor,
  Tablet,
  Headphones,
  Volume2,
  Settings,
  User,
  Mail,
  PhoneCall,
  ExternalLink,
  Share2,
  Download,
  Bookmark,
  Heart,
  ThumbsUp,
  MessageSquare,
  Send,
  Bot,
  Sparkles,
  Target,
  Award,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  RefreshCw,
  AlertCircle,
  Info,
  Lightbulb,
  BookOpen,
  GraduationCap,
  Briefcase,
  Home,
  Building,
  Map,
  Navigation,
  Route,
  Compass,
  Flag,
  Globe2,
  Translate,
  Languages2,
  MessageSquareText,
  ChatBubbleLeftRight,
  ChatBubbleBottomCenterText,
  ChatBubbleLeft,
  ChatBubbleRight,
  ChatBubbleOvalLeftEllipsis,
  ChatBubbleOvalLeft,
  ChatBubbleBottomCenterText as ChatBubble,
  SpeakerWave,
  SpeakerXMark,
  Microphone,
  VideoCamera,
  VideoCameraSlash,
  CameraIcon,
  Photo,
  Image,
  Film,
  Tv,
  Radio,
  Music,
  Headphone,
  VolumeX,
  Bell,
  BellSlash,
  BellAlert,
  BellRing,
  Notification,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ClockIcon,
  Timer,
  Stopwatch,
  Hourglass,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarRange,
  CalendarSearch,
  CalendarHeart,
  CalendarStar,
  CalendarClock,
  CalendarEvent,
  Calendar,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12,
  Clock1,
  Clock2
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

interface VirtualTourSlot {
  id: string;
  date: string;
  time: string;
  duration: number;
  type: 'virtual' | 'live' | 'hybrid';
  available: boolean;
  price?: number;
}

interface SensayFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'multilingual' | 'virtual-tour' | 'ai-chat' | 'analytics';
  isActive: boolean;
  demoUrl?: string;
}

export const EnhancedSensayFeatures: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedTourSlot, setSelectedTourSlot] = useState<VirtualTourSlot | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string>('multilingual');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredLanguage: 'en',
    tourType: 'virtual',
    message: ''
  });

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' }
  ];

  const virtualTourSlots: VirtualTourSlot[] = [
    { id: '1', date: '2024-01-15', time: '10:00 AM', duration: 30, type: 'virtual', available: true },
    { id: '2', date: '2024-01-15', time: '2:00 PM', duration: 45, type: 'live', available: true, price: 50 },
    { id: '3', date: '2024-01-16', time: '11:00 AM', duration: 60, type: 'hybrid', available: true, price: 75 },
    { id: '4', date: '2024-01-16', time: '3:00 PM', duration: 30, type: 'virtual', available: false },
    { id: '5', date: '2024-01-17', time: '9:00 AM', duration: 45, type: 'live', available: true, price: 50 },
    { id: '6', date: '2024-01-17', time: '1:00 PM', duration: 30, type: 'virtual', available: true }
  ];

  const sensayFeatures: SensayFeature[] = [
    {
      id: 'multilingual',
      title: 'Multilingual AI Assistant',
      description: 'Chat with our AI in 12+ languages with real-time translation and cultural context awareness.',
      icon: <Languages className="w-6 h-6" />,
      category: 'multilingual',
      isActive: true,
      demoUrl: '/multilingual-chat'
    },
    {
      id: 'virtual-tour',
      title: 'Virtual Tour Scheduling',
      description: 'Schedule personalized virtual property tours with live agents in your preferred language.',
      icon: <Video className="w-6 h-6" />,
      category: 'virtual-tour',
      isActive: true,
      demoUrl: '/virtual-tours'
    },
    {
      id: 'ai-chat',
      title: 'Enhanced AI Conversations',
      description: 'Powered by Sensay Wisdom Engine for sophisticated property analysis and insights.',
      icon: <Brain className="w-6 h-6" />,
      category: 'ai-chat',
      isActive: true,
      demoUrl: '/ai-chat'
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      description: 'Get detailed property analytics with market intelligence and risk assessments.',
      icon: <TrendingUp className="w-6 h-6" />,
      category: 'analytics',
      isActive: true,
      demoUrl: '/analytics'
    }
  ];

  const handleBookingSubmit = () => {
    // Handle booking submission
    console.log('Booking submitted:', bookingForm);
    setShowBookingForm(false);
    // Show success message
  };

  const renderMultilingualDemo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {languages.slice(0, 8).map((lang) => (
          <Card 
            key={lang.code}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedLanguage === lang.code ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedLanguage(lang.code)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">{lang.flag}</div>
              <div className="font-medium text-sm">{lang.name}</div>
              <div className="text-xs text-gray-500">{lang.nativeName}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Live Chat Demo
        </h4>
        <div className="space-y-3">
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
              I'm interested in a 3-bedroom apartment in downtown. Can you help me?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white border p-3 rounded-lg max-w-xs">
              {selectedLanguage === 'es' && '¡Por supuesto! Puedo ayudarte a encontrar el apartamento perfecto. ¿Cuál es tu presupuesto?'}
              {selectedLanguage === 'fr' && 'Bien sûr ! Je peux vous aider à trouver l\'appartement parfait. Quel est votre budget ?'}
              {selectedLanguage === 'de' && 'Natürlich! Ich kann Ihnen helfen, die perfekte Wohnung zu finden. Wie hoch ist Ihr Budget?'}
              {selectedLanguage === 'en' && 'Of course! I can help you find the perfect apartment. What\'s your budget?'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVirtualTourBooking = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {virtualTourSlots.map((slot) => (
          <Card 
            key={slot.id}
            className={`cursor-pointer transition-all ${
              !slot.available ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
            } ${selectedTourSlot?.id === slot.id ? 'ring-2 ring-green-500 bg-green-50' : ''}`}
            onClick={() => slot.available && setSelectedTourSlot(slot)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant={slot.type === 'virtual' ? 'secondary' : slot.type === 'live' ? 'default' : 'outline'}>
                  {slot.type === 'virtual' && <Video className="w-3 h-3 mr-1" />}
                  {slot.type === 'live' && <Users className="w-3 h-3 mr-1" />}
                  {slot.type === 'hybrid' && <Camera className="w-3 h-3 mr-1" />}
                  {slot.type.charAt(0).toUpperCase() + slot.type.slice(1)}
                </Badge>
                {slot.price && (
                  <span className="font-semibold text-green-600">${slot.price}</span>
                )}
              </div>
              <div className="text-sm font-medium">{slot.date}</div>
              <div className="text-sm text-gray-600">{slot.time} ({slot.duration} min)</div>
              {!slot.available && (
                <Badge variant="destructive" className="mt-2">Booked</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedTourSlot && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Selected Tour Slot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div><strong>Date:</strong> {selectedTourSlot.date}</div>
              <div><strong>Time:</strong> {selectedTourSlot.time}</div>
              <div><strong>Duration:</strong> {selectedTourSlot.duration} minutes</div>
              <div><strong>Type:</strong> {selectedTourSlot.type.charAt(0).toUpperCase() + selectedTourSlot.type.slice(1)}</div>
              {selectedTourSlot.price && <div><strong>Price:</strong> ${selectedTourSlot.price}</div>}
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => setShowBookingForm(true)}
            >
              Book This Tour
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderBookingForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>Book Virtual Tour</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input 
              value={bookingForm.name}
              onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input 
              type="email"
              value={bookingForm.email}
              onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input 
              value={bookingForm.phone}
              onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Language</label>
            <Select 
              value={bookingForm.preferredLanguage}
              onValueChange={(value) => setBookingForm({...bookingForm, preferredLanguage: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tour Type</label>
            <Select 
              value={bookingForm.tourType}
              onValueChange={(value) => setBookingForm({...bookingForm, tourType: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="virtual">Virtual Tour</SelectItem>
                <SelectItem value="live">Live Tour</SelectItem>
                <SelectItem value="hybrid">Hybrid Tour</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Special Requests</label>
            <Textarea 
              value={bookingForm.message}
              onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
              placeholder="Any special requests or questions?"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowBookingForm(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1"
              onClick={handleBookingSubmit}
            >
              Confirm Booking
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Enhanced Sensay Features
              </h2>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Experience the power of Sensay's Wisdom Engine with multilingual AI conversations, 
            virtual tour scheduling, and advanced property analytics.
          </p>
        </div>

        {/* Feature Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sensayFeatures.map((feature) => (
            <Button
              key={feature.id}
              variant={activeFeature === feature.id ? "default" : "outline"}
              onClick={() => setActiveFeature(feature.id)}
              className="flex items-center gap-2"
            >
              {feature.icon}
              {feature.title}
            </Button>
          ))}
        </div>

        {/* Feature Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feature Demo */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {sensayFeatures.find(f => f.id === activeFeature)?.icon}
                  {sensayFeatures.find(f => f.id === activeFeature)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeFeature === 'multilingual' && renderMultilingualDemo()}
                {activeFeature === 'virtual-tour' && renderVirtualTourBooking()}
                {activeFeature === 'ai-chat' && (
                  <div className="space-y-6">
                    <Alert>
                      <Brain className="h-4 w-4" />
                      <AlertDescription>
                        Powered by Sensay Wisdom Engine - Advanced AI conversations with context awareness and intelligent responses.
                      </AlertDescription>
                    </Alert>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-4">AI Chat Demo</h4>
                      <div className="space-y-3">
                        <div className="flex justify-end">
                          <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                            What's the investment potential for this property?
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-white border p-3 rounded-lg max-w-xs">
                            Based on market analysis, this property shows strong investment potential with 8.5% annual growth projected. The location offers excellent rental yields and capital appreciation opportunities.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeFeature === 'analytics' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold">94%</div>
                          <div className="text-sm text-gray-600">Accuracy Rate</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold">Low</div>
                          <div className="text-sm text-gray-600">Risk Level</div>
                        </CardContent>
                      </Card>
                    </div>
                    <Alert>
                      <FileText className="h-4 w-4" />
                      <AlertDescription>
                        Advanced analytics powered by Sensay's Wisdom Engine provide comprehensive market intelligence and risk assessments.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Feature Benefits */}
          <div className="space-y-6">
            {sensayFeatures.find(f => f.id === activeFeature) && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeFeature === 'multilingual' && (
                    <>
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <div className="font-medium">12+ Languages</div>
                          <div className="text-sm text-gray-600">Real-time translation with cultural context</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Brain className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Smart Context</div>
                          <div className="text-sm text-gray-600">Understands cultural nuances and preferences</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Instant Translation</div>
                          <div className="text-sm text-gray-600">Seamless communication across languages</div>
                        </div>
                      </div>
                    </>
                  )}
                  {activeFeature === 'virtual-tour' && (
                    <>
                      <div className="flex items-start gap-3">
                        <Video className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Flexible Scheduling</div>
                          <div className="text-sm text-gray-600">Book tours that fit your schedule</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Live Agents</div>
                          <div className="text-sm text-gray-600">Personal assistance from real estate experts</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CalendarIcon className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Easy Booking</div>
                          <div className="text-sm text-gray-600">Simple reservation system with confirmations</div>
                        </div>
                      </div>
                    </>
                  )}
                  {activeFeature === 'ai-chat' && (
                    <>
                      <div className="flex items-start gap-3">
                        <Brain className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Advanced AI</div>
                          <div className="text-sm text-gray-600">Powered by Sensay Wisdom Engine</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MessageCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Natural Conversations</div>
                          <div className="text-sm text-gray-600">Human-like interactions and responses</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Context Aware</div>
                          <div className="text-sm text-gray-600">Understands your specific needs and preferences</div>
                        </div>
                      </div>
                    </>
                  )}
                  {activeFeature === 'analytics' && (
                    <>
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Market Intelligence</div>
                          <div className="text-sm text-gray-600">Real-time market data and trends</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Risk Assessment</div>
                          <div className="text-sm text-gray-600">Comprehensive risk analysis and mitigation</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Detailed Reports</div>
                          <div className="text-sm text-gray-600">Professional analysis and insights</div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => navigate('/sensay-features')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Try Live Demo
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate('/virtual-tours')}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Virtual Tour
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate('/sensay-chatbot')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start AI Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">12+</div>
            <div className="text-gray-600">Languages Supported</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600">Virtual Tours Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
            <div className="text-gray-600">AI Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Available Support</div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && renderBookingForm()}
    </div>
  );
};
