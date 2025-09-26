import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Home,
  Video,
  Eye,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Users,
  Navigation,
  MessageCircle,
  Share2,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Settings,
  Star,
  ThumbsUp,
  Heart,
  Bookmark,
  ExternalLink,
  Copy,
  Send,
  Bell,
  CheckSquare,
  Square,
  Filter,
  Search,
  Target,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  X,
  Check,
  XCircle,
  Timer,
  User2,
  Building2,
  DollarSign,
  TrendingDown,
  Minus,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  FileText,
  Camera,
  Mic,
  MicOff,
  Headphones,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
  SignalLow,
  SignalZero,
  SignalHigh,
  SignalMedium,
  SignalLow as SignalLowIcon,
  SignalZero as SignalZeroIcon,
  SignalHigh as SignalHighIcon,
  SignalMedium as SignalMediumIcon
} from 'lucide-react';

interface Appointment {
  id: string;
  title: string;
  type: 'viewing' | 'consultation' | 'virtual-tour' | 'meeting' | 'follow-up';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  location: {
    type: 'physical' | 'virtual' | 'hybrid';
    address?: string;
    meetingLink?: string;
    instructions?: string;
  };
  participants: {
    agent: {
      id: string;
      name: string;
      email: string;
      phone: string;
      avatar: string;
    };
    client: {
      id: string;
      name: string;
      email: string;
      phone: string;
      avatar?: string;
    };
    additionalParticipants?: Array<{
      id: string;
      name: string;
      email: string;
      role: string;
    }>;
  };
  property?: {
    id: string;
    address: string;
    price: number;
    images: string[];
    features: string[];
  };
  notes: string;
  reminders: Array<{
    id: string;
    type: 'email' | 'sms' | 'push';
    time: Date;
    sent: boolean;
  }>;
  preparation: {
    documents: string[];
    questions: string[];
    followUpActions: string[];
  };
  outcome?: {
    status: 'positive' | 'neutral' | 'negative';
    notes: string;
    nextSteps: string[];
    followUpDate?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface AppointmentMetrics {
  totalAppointments: number;
  todayAppointments: number;
  thisWeekAppointments: number;
  completionRate: number;
  averageDuration: number;
  rescheduleRate: number;
  clientSatisfaction: number;
  upcomingAppointments: number;
  overdueAppointments: number;
}

interface TimeSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
  isBooked: boolean;
  maxParticipants: number;
  currentParticipants: number;
}

export const AppointmentManager: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [metrics, setMetrics] = useState<AppointmentMetrics | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAppointments();
    loadMetrics();
  }, []);

  useEffect(() => {
    // Auto-refresh every minute
    const interval = setInterval(() => {
      loadAppointments();
      loadMetrics();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const loadAppointments = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const sampleAppointments: Appointment[] = [
      {
        id: '1',
        title: 'Property Viewing - 123 Main St',
        type: 'viewing',
        status: 'confirmed',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        endTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
        duration: 60,
        location: {
          type: 'physical',
          address: '123 Main Street, San Francisco, CA',
          instructions: 'Park in the visitor parking area. Ring the doorbell.'
        },
        participants: {
          agent: {
            id: 'agent1',
            name: 'Sarah Johnson',
            email: 'sarah@realty.com',
            phone: '(555) 123-4567',
            avatar: '/agents/sarah.jpg'
          },
          client: {
            id: 'client1',
            name: 'John Smith',
            email: 'john@email.com',
            phone: '(555) 987-6543'
          }
        },
        property: {
          id: 'prop1',
          address: '123 Main Street, San Francisco, CA',
          price: 1250000,
          images: ['/properties/prop1-1.jpg', '/properties/prop1-2.jpg'],
          features: ['Ocean View', 'Modern Kitchen', 'Hardwood Floors']
        },
        notes: 'Client is very interested in modern homes with ocean views. Budget is flexible.',
        reminders: [
          {
            id: 'rem1',
            type: 'email',
            time: new Date(Date.now() + 1 * 60 * 60 * 1000),
            sent: false
          },
          {
            id: 'rem2',
            type: 'sms',
            time: new Date(Date.now() + 1.5 * 60 * 60 * 1000),
            sent: false
          }
        ],
        preparation: {
          documents: ['Property Details', 'Market Analysis', 'Comparable Sales'],
          questions: ['What is the neighborhood like?', 'Are there any upcoming renovations?'],
          followUpActions: ['Send property information', 'Schedule follow-up call']
        },
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Virtual Consultation - Investment Property',
        type: 'consultation',
        status: 'scheduled',
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 30 minutes
        duration: 30,
        location: {
          type: 'virtual',
          meetingLink: 'https://meet.google.com/abc-defg-hij',
          instructions: 'Join 5 minutes early to test your camera and microphone.'
        },
        participants: {
          agent: {
            id: 'agent2',
            name: 'Michael Chen',
            email: 'michael@realty.com',
            phone: '(555) 456-7890',
            avatar: '/agents/michael.jpg'
          },
          client: {
            id: 'client2',
            name: 'Emily Davis',
            email: 'emily@email.com',
            phone: '(555) 321-9876'
          }
        },
        notes: 'First-time investor looking for guidance on property investment strategies.',
        reminders: [
          {
            id: 'rem3',
            type: 'email',
            time: new Date(Date.now() + 23 * 60 * 60 * 1000),
            sent: false
          }
        ],
        preparation: {
          documents: ['Investment Guide', 'Market Trends', 'ROI Calculator'],
          questions: ['What are the best areas for investment?', 'What is the typical ROI?'],
          followUpActions: ['Send investment resources', 'Schedule property tour']
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Virtual Tour - 456 Oak Ave',
        type: 'virtual-tour',
        status: 'in-progress',
        startTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        endTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
        duration: 60,
        location: {
          type: 'virtual',
          meetingLink: 'https://meet.google.com/xyz-uvw-rst',
          instructions: 'Virtual tour with 360° property views and interactive features.'
        },
        participants: {
          agent: {
            id: 'agent3',
            name: 'Emily Rodriguez',
            email: 'emily@realty.com',
            phone: '(555) 789-0123',
            avatar: '/agents/emily.jpg'
          },
          client: {
            id: 'client3',
            name: 'Robert Wilson',
            email: 'robert@email.com',
            phone: '(555) 654-3210'
          }
        },
        property: {
          id: 'prop2',
          address: '456 Oak Avenue, San Francisco, CA',
          price: 950000,
          images: ['/properties/prop2-1.jpg', '/properties/prop2-2.jpg'],
          features: ['City View', 'Rooftop Deck', 'Gym Access']
        },
        notes: 'Luxury condo tour for high-net-worth client. Focus on amenities and lifestyle.',
        reminders: [],
        preparation: {
          documents: ['Property Specifications', 'Amenities List', 'HOA Information'],
          questions: ['What amenities are included?', 'What are the HOA fees?'],
          followUpActions: ['Send property details', 'Schedule in-person viewing']
        },
        outcome: {
          status: 'positive',
          notes: 'Client very interested. Wants to see more properties in the area.',
          nextSteps: ['Send comparable properties', 'Schedule in-person viewing'],
          followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 30 * 60 * 1000)
      }
    ];

    setAppointments(sampleAppointments);
    setIsLoading(false);
  };

  const loadMetrics = async () => {
    const sampleMetrics: AppointmentMetrics = {
      totalAppointments: 156,
      todayAppointments: 8,
      thisWeekAppointments: 34,
      completionRate: 87.5,
      averageDuration: 45,
      rescheduleRate: 12.3,
      clientSatisfaction: 4.8,
      upcomingAppointments: 23,
      overdueAppointments: 2
    };

    setMetrics(sampleMetrics);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = !searchQuery || 
      appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.participants.client.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesType = filterType === 'all' || appointment.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'scheduled': 'bg-blue-100 text-blue-800',
      'confirmed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      'completed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800',
      'rescheduled': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'viewing': Eye,
      'consultation': MessageCircle,
      'virtual-tour': Video,
      'meeting': Users,
      'follow-up': Phone
    };
    const Icon = icons[type as keyof typeof icons] || CalendarIcon;
    return <Icon className="h-4 w-4" />;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isAppointmentToday = (appointment: Appointment) => {
    const today = new Date();
    const appointmentDate = new Date(appointment.startTime);
    return appointmentDate.toDateString() === today.toDateString();
  };

  const isAppointmentUpcoming = (appointment: Appointment) => {
    const now = new Date();
    return appointment.startTime > now && appointment.startTime <= new Date(now.getTime() + 24 * 60 * 60 * 1000);
  };

  const isAppointmentOverdue = (appointment: Appointment) => {
    const now = new Date();
    return appointment.startTime < now && appointment.status !== 'completed';
  };

  const handleAppointmentSelect = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleStatusUpdate = (appointmentId: string, newStatus: string) => {
    setAppointments(prev => prev.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status: newStatus as any, updatedAt: new Date() }
        : appointment
    ));
  };

  const handleJoinMeeting = (appointment: Appointment) => {
    if (appointment.location.meetingLink) {
      window.open(appointment.location.meetingLink, '_blank');
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <CalendarIcon className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Appointment Manager</h1>
        <Badge variant="secondary" className="ml-auto">
          <Zap className="h-3 w-3 mr-1" />
          AI-Powered Scheduling
        </Badge>
      </div>

      {/* Metrics Overview */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Appointments</p>
                  <p className="text-2xl font-bold">{metrics.todayAppointments}</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center mt-2">
                <Clock className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-sm text-blue-600">{metrics.upcomingAppointments} upcoming</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold">{metrics.completionRate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+5.2% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Client Satisfaction</p>
                  <p className="text-2xl font-bold">{metrics.clientSatisfaction}/5.0</p>
                </div>
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center mt-2">
                <Heart className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600">Excellent rating</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold">{metrics.averageDuration}min</p>
                </div>
                <Timer className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center mt-2">
                <AlertCircle className="h-4 w-4 text-orange-600 mr-1" />
                <span className="text-sm text-orange-600">{metrics.overdueAppointments} overdue</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('calendar')}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <FileText className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="rescheduled">Rescheduled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="viewing">Viewing</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="virtual-tour">Virtual Tour</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Appointments ({filteredAppointments.length})</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {filteredAppointments.filter(isAppointmentToday).length} today
              </Badge>
              <Badge variant="outline">
                <AlertCircle className="h-3 w-3 mr-1" />
                {filteredAppointments.filter(isAppointmentOverdue).length} overdue
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-20 bg-muted rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className={`flex items-center justify-between p-4 border rounded-lg hover:bg-muted cursor-pointer transition-colors ${
                    isAppointmentOverdue(appointment) ? 'border-red-200 bg-red-50' : ''
                  } ${
                    isAppointmentToday(appointment) ? 'border-blue-200 bg-blue-50' : ''
                  }`}
                  onClick={() => handleAppointmentSelect(appointment)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getTypeIcon(appointment.type)}
                    </div>
                    <div>
                      <div className="font-semibold">{appointment.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(appointment.startTime)} at {formatTime(appointment.startTime)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.participants.client.name} • {appointment.duration} minutes
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {appointment.location.type === 'virtual' ? 'Virtual' : 
                         appointment.location.type === 'physical' ? 'In-Person' : 'Hybrid'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.location.address || 'Online Meeting'}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(appointment.status)}>
                        <span className="capitalize">{appointment.status.replace('-', ' ')}</span>
                      </Badge>
                      {appointment.status === 'in-progress' && (
                        <Badge variant="destructive" className="animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                          Live
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {appointment.location.meetingLink && appointment.status === 'confirmed' && (
                        <Button variant="outline" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          handleJoinMeeting(appointment);
                        }}>
                          <Video className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl h-[80vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{selectedAppointment.title}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedAppointment(null)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="h-full overflow-y-auto">
              <div className="space-y-6">
                {/* Appointment Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Appointment Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDate(selectedAppointment.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(selectedAppointment.startTime)} - {formatTime(selectedAppointment.endTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4" />
                        <span>{selectedAppointment.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(selectedAppointment.status)}>
                          <span className="capitalize">{selectedAppointment.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Location</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {selectedAppointment.location.type === 'virtual' ? (
                          <Video className="h-4 w-4" />
                        ) : (
                          <MapPin className="h-4 w-4" />
                        )}
                        <span className="capitalize">{selectedAppointment.location.type}</span>
                      </div>
                      {selectedAppointment.location.address && (
                        <div className="text-sm text-muted-foreground">
                          {selectedAppointment.location.address}
                        </div>
                      )}
                      {selectedAppointment.location.instructions && (
                        <div className="text-sm text-muted-foreground">
                          {selectedAppointment.location.instructions}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Participants */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Participants</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{selectedAppointment.participants.agent.name}</div>
                        <div className="text-sm text-muted-foreground">Agent</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <User2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{selectedAppointment.participants.client.name}</div>
                        <div className="text-sm text-muted-foreground">Client</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Info */}
                {selectedAppointment.property && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Property</h3>
                    <div className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Home className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{selectedAppointment.property.address}</div>
                        <div className="text-sm text-muted-foreground">
                          ${selectedAppointment.property.price.toLocaleString()}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {selectedAppointment.property.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Notes</h3>
                  <div className="p-3 border rounded-lg bg-muted/50">
                    <p className="text-sm">{selectedAppointment.notes}</p>
                  </div>
                </div>

                {/* Preparation */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Preparation</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1">Documents to Bring:</div>
                      <div className="flex flex-wrap gap-1">
                        {selectedAppointment.preparation.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Key Questions:</div>
                      <div className="space-y-1">
                        {selectedAppointment.preparation.questions.map((question, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            • {question}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  {selectedAppointment.location.meetingLink && (
                    <Button onClick={() => handleJoinMeeting(selectedAppointment)}>
                      <Video className="h-4 w-4 mr-2" />
                      Join Meeting
                    </Button>
                  )}
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Client
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Reschedule
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AppointmentManager;