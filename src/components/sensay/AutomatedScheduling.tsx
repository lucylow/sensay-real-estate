import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Phone, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Edit,
  Trash2,
  Send,
  MessageCircle,
  Camera,
  Mic,
  Headphones,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Home,
  Building,
  Car,
  Plane,
  Train,
  Bus
} from 'lucide-react';

interface Appointment {
  id: string;
  propertyId: string;
  propertyAddress: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  type: 'physical' | 'virtual' | 'phone';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  scheduledDate: Date;
  duration: number; // in minutes
  notes: string;
  reminders: Array<{
    type: 'email' | 'sms' | 'push';
    sent: boolean;
    scheduledTime: Date;
  }>;
  reschedulingHistory: Array<{
    date: Date;
    reason: string;
    newDate?: Date;
  }>;
  virtualTourLink?: string;
  meetingRoom?: string;
  agentId: string;
  agentName: string;
}

interface SchedulingMetrics {
  totalAppointments: number;
  completedAppointments: number;
  cancellationRate: number;
  reschedulingRate: number;
  avgResponseTime: number;
  satisfactionScore: number;
  virtualTourUsage: number;
  calendarIntegration: {
    google: boolean;
    outlook: boolean;
    apple: boolean;
  };
}

export const AutomatedScheduling: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [metrics, setMetrics] = useState<SchedulingMetrics>({
    totalAppointments: 0,
    completedAppointments: 0,
    cancellationRate: 0,
    reschedulingRate: 0,
    avgResponseTime: 0,
    satisfactionScore: 0,
    virtualTourUsage: 0,
    calendarIntegration: {
      google: true,
      outlook: true,
      apple: false
    }
  });
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);

  useEffect(() => {
    // Mock data for demonstration
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        propertyId: 'prop-123',
        propertyAddress: '123 Collins Street, Melbourne VIC 3000',
        clientName: 'Sarah Johnson',
        clientEmail: 'sarah.j@email.com',
        clientPhone: '+1-555-0123',
        type: 'virtual',
        status: 'confirmed',
        scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        duration: 60,
        notes: 'First-time buyer, interested in 3-bedroom properties',
        reminders: [
          {
            type: 'email',
            sent: true,
            scheduledTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
          },
          {
            type: 'sms',
            sent: false,
            scheduledTime: new Date(Date.now() + 1.5 * 24 * 60 * 60 * 1000)
          }
        ],
        reschedulingHistory: [],
        virtualTourLink: 'https://virtualtour.propguard.ai/123-collins',
        meetingRoom: 'Room-001',
        agentId: 'agent-001',
        agentName: 'Michael Chen'
      },
      {
        id: '2',
        propertyId: 'prop-456',
        propertyAddress: '456 George Street, Sydney NSW 2000',
        clientName: 'David Wilson',
        clientEmail: 'david.w@email.com',
        clientPhone: '+1-555-0456',
        type: 'physical',
        status: 'scheduled',
        scheduledDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        duration: 90,
        notes: 'Investment property, looking for rental yield analysis',
        reminders: [
          {
            type: 'email',
            sent: true,
            scheduledTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
          }
        ],
        reschedulingHistory: [
          {
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            reason: 'Client requested different time',
            newDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
          }
        ],
        agentId: 'agent-002',
        agentName: 'Emma Rodriguez'
      }
    ];

    const mockMetrics: SchedulingMetrics = {
      totalAppointments: 156,
      completedAppointments: 142,
      cancellationRate: 8.2,
      reschedulingRate: 12.5,
      avgResponseTime: 2.3,
      satisfactionScore: 8.7,
      virtualTourUsage: 68,
      calendarIntegration: {
        google: true,
        outlook: true,
        apple: false
      }
    };

    setAppointments(mockAppointments);
    setMetrics(mockMetrics);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'physical': return <MapPin className="h-4 w-4" />;
      case 'virtual': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntilAppointment = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Today';
  };

  return (
    <div className="space-y-6">
      {/* Scheduling Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Automated Scheduling
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button onClick={() => setIsCreatingAppointment(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.totalAppointments}</div>
              <div className="text-sm text-muted-foreground">Total Appointments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{metrics.completedAppointments}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{metrics.virtualTourUsage}%</div>
              <div className="text-sm text-muted-foreground">Virtual Tours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{metrics.satisfactionScore}/10</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="virtual-tours">Virtual Tours</TabsTrigger>
          <TabsTrigger value="calendar">Calendar Integration</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Appointment List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{appointment.clientName}</div>
                          <Badge variant="outline" className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(appointment.type)}
                          <span className="text-sm text-muted-foreground">
                            {getTimeUntilAppointment(appointment.scheduledDate)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        {appointment.propertyAddress}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(appointment.scheduledDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {appointment.agentName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {appointment.duration}min
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <div className="font-medium">Notes:</div>
                        <div className="text-muted-foreground">{appointment.notes}</div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="h-3 w-3 mr-1" />
                          Remind
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Appointment Details */}
            {selectedAppointment && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {selectedAppointment.clientName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Property Details</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedAppointment.propertyAddress}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Appointment Details</div>
                      <div className="space-y-1 text-sm">
                        <div>Type: {selectedAppointment.type}</div>
                        <div>Date: {formatDate(selectedAppointment.scheduledDate)}</div>
                        <div>Duration: {selectedAppointment.duration} minutes</div>
                        <div>Agent: {selectedAppointment.agentName}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Client Information</div>
                      <div className="space-y-1 text-sm">
                        <div>Name: {selectedAppointment.clientName}</div>
                        <div>Email: {selectedAppointment.clientEmail}</div>
                        <div>Phone: {selectedAppointment.clientPhone}</div>
                      </div>
                    </div>
                    
                    {selectedAppointment.type === 'virtual' && selectedAppointment.virtualTourLink && (
                      <div>
                        <div className="text-sm font-medium mb-2">Virtual Tour</div>
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">
                            Meeting Room: {selectedAppointment.meetingRoom}
                          </div>
                          <Button size="sm" className="w-full">
                            <Video className="h-3 w-3 mr-1" />
                            Join Virtual Tour
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Reminders</div>
                      <div className="space-y-2">
                        {selectedAppointment.reminders.map((reminder, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              {reminder.type === 'email' && <MessageCircle className="h-3 w-3" />}
                              {reminder.type === 'sms' && <Smartphone className="h-3 w-3" />}
                              {reminder.type === 'push' && <Monitor className="h-3 w-3" />}
                              <span>{reminder.type.toUpperCase()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {reminder.sent ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Clock className="h-3 w-3 text-yellow-500" />
                              )}
                              <span className="text-xs">
                                {formatDate(reminder.scheduledTime)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {selectedAppointment.reschedulingHistory.length > 0 && (
                      <div>
                        <div className="text-sm font-medium mb-2">Rescheduling History</div>
                        <div className="space-y-2">
                          {selectedAppointment.reschedulingHistory.map((reschedule, index) => (
                            <div key={index} className="p-2 bg-muted rounded text-xs">
                              <div className="font-medium">{formatDate(reschedule.date)}</div>
                              <div className="text-muted-foreground">{reschedule.reason}</div>
                              {reschedule.newDate && (
                                <div className="text-muted-foreground">
                                  New date: {formatDate(reschedule.newDate)}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Send className="h-3 w-3 mr-1" />
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="virtual-tours" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Virtual Tour Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Virtual Tour Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded">
                      <Camera className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <div className="font-medium">360° Views</div>
                      <div className="text-sm text-muted-foreground">Immersive property tours</div>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <Mic className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <div className="font-medium">Voice Commands</div>
                      <div className="text-sm text-muted-foreground">Interactive navigation</div>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <Headphones className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <div className="font-medium">Audio Guide</div>
                      <div className="text-sm text-muted-foreground">Professional narration</div>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <Globe className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                      <div className="font-medium">Live Streaming</div>
                      <div className="text-sm text-muted-foreground">Real-time interaction</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tour Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Tour Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">68%</div>
                    <div className="text-sm text-muted-foreground">Virtual Tour Usage</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Tour Duration</span>
                      <span>24 minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Completion Rate</span>
                      <span>87%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Satisfaction Score</span>
                      <span>8.9/10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Booking Conversion</span>
                      <span>34%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar Integrations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Calendar Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <span className="text-blue-600 font-bold">G</span>
                      </div>
                      <span className="font-medium">Google Calendar</span>
                    </div>
                    <Badge variant={metrics.calendarIntegration.google ? "default" : "secondary"}>
                      {metrics.calendarIntegration.google ? "Connected" : "Disconnected"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-orange-600 font-bold">O</span>
                      </div>
                      <span className="font-medium">Outlook Calendar</span>
                    </div>
                    <Badge variant={metrics.calendarIntegration.outlook ? "default" : "secondary"}>
                      {metrics.calendarIntegration.outlook ? "Connected" : "Disconnected"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-600 font-bold">A</span>
                      </div>
                      <span className="font-medium">Apple Calendar</span>
                    </div>
                    <Badge variant={metrics.calendarIntegration.apple ? "default" : "secondary"}>
                      {metrics.calendarIntegration.apple ? "Connected" : "Disconnected"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sync Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Sync Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Sync</span>
                    <span className="text-sm text-muted-foreground">2 minutes ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sync Frequency</span>
                    <span className="text-sm text-muted-foreground">Every 5 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Conflicts Resolved</span>
                    <span className="text-sm text-muted-foreground">3 today</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-scheduling</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Cancellation Rate</span>
                      <span>{metrics.cancellationRate}%</span>
                    </div>
                    <Progress value={100 - metrics.cancellationRate} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rescheduling Rate</span>
                      <span>{metrics.reschedulingRate}%</span>
                    </div>
                    <Progress value={100 - metrics.reschedulingRate} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Response Time</span>
                      <span>{metrics.avgResponseTime} hours</span>
                    </div>
                    <Progress value={100 - (metrics.avgResponseTime * 10)} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Satisfaction Score</span>
                      <span>{metrics.satisfactionScore}/10</span>
                    </div>
                    <Progress value={metrics.satisfactionScore * 10} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointment Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Appointment Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>Physical Tours</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">45%</div>
                      <div className="text-xs text-muted-foreground">70 appointments</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-green-500" />
                      <span>Virtual Tours</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">35%</div>
                      <div className="text-xs text-muted-foreground">55 appointments</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-purple-500" />
                      <span>Phone Consultations</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">20%</div>
                      <div className="text-xs text-muted-foreground">31 appointments</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
