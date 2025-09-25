import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Bell,
  CheckCircle,
  AlertCircle,
  X,
  Edit,
  Plus,
  Send,
  Phone,
  Mail,
  MessageSquare,
  Star,
  Route,
  Camera,
  FileText,
  Zap
} from 'lucide-react';
import { format, addDays, isWeekend } from 'date-fns';
import { cn } from '@/lib/utils';
import { sensayService } from '@/services/sensayService';

interface Appointment {
  id: string;
  type: 'viewing' | 'consultation' | 'valuation' | 'follow-up' | 'group-tour';
  title: string;
  description?: string;
  date: Date;
  duration: number; // in minutes
  location: {
    type: 'property' | 'office' | 'virtual' | 'client-location';
    address?: string;
    coordinates?: { lat: number; lng: number };
    meetingLink?: string;
  };
  participants: Participant[];
  agent: Agent;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  reminders: Reminder[];
  feedback?: AppointmentFeedback;
  propertyId?: string;
  notes?: string;
  followUpActions?: FollowUpAction[];
}

interface Participant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'primary-client' | 'spouse' | 'family-member' | 'advisor' | 'investor';
  preferences?: {
    communicationMethod: 'email' | 'sms' | 'phone';
    language: string;
  };
}

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  specialties: string[];
  availability: TimeSlot[];
}

interface TimeSlot {
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  appointmentId?: string;
}

interface Reminder {
  id: string;
  type: 'email' | 'sms' | 'push' | 'call';
  timing: number; // minutes before appointment
  sent: boolean;
  message?: string;
}

interface AppointmentFeedback {
  rating: number; // 1-5 stars
  comment?: string;
  interestLevel: 'very-high' | 'high' | 'medium' | 'low' | 'not-interested';
  nextSteps?: string;
  timestamp: Date;
}

interface FollowUpAction {
  id: string;
  type: 'send-info' | 'schedule-viewing' | 'send-contract' | 'call' | 'email' | 'send-financing-info';
  description: string;
  dueDate: Date;
  completed: boolean;
  automatable: boolean;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    type: 'viewing',
    title: 'Property Viewing - 123 Collins Street',
    description: 'Family home viewing with the Johnsons',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    duration: 60,
    location: {
      type: 'property',
      address: '123 Collins Street, Melbourne VIC 3000',
      coordinates: { lat: -37.8136, lng: 144.9631 }
    },
    participants: [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+61 412 345 678',
        role: 'primary-client'
      }
    ],
    agent: {
      id: '1',
      name: 'Agent Smith',
      email: 'agent.smith@propguard.ai',
      phone: '+61 400 123 456',
      specialties: ['Residential', 'Investment'],
      availability: []
    },
    status: 'confirmed',
    priority: 'high',
    reminders: [
      { id: '1', type: 'email', timing: 1440, sent: true }, // 24 hours
      { id: '2', type: 'sms', timing: 120, sent: false } // 2 hours
    ],
    propertyId: 'prop-1'
  },
  {
    id: '2',
    type: 'consultation',
    title: 'Investment Consultation',
    description: 'Property investment strategy discussion',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    duration: 90,
    location: {
      type: 'office',
      address: 'PropGuard AI Office, Melbourne'
    },
    participants: [
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        role: 'primary-client'
      }
    ],
    agent: {
      id: '1',
      name: 'Agent Smith',
      email: 'agent.smith@propguard.ai',
      phone: '+61 400 123 456',
      specialties: ['Residential', 'Investment'],
      availability: []
    },
    status: 'scheduled',
    priority: 'medium',
    reminders: []
  }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

export const AppointmentManager: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'today'>('today');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({});
  const [suggestedTimes, setSuggestedTimes] = useState<TimeSlot[]>([]);

  const todayAppointments = appointments.filter(apt => {
    const today = new Date();
    return apt.date.toDateString() === today.toDateString();
  });

  const upcomingAppointments = appointments
    .filter(apt => apt.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  useEffect(() => {
    // Generate suggested times based on agent availability
    generateSuggestedTimes();
  }, [selectedDate]);

  const generateSuggestedTimes = () => {
    const times: TimeSlot[] = [];
    const date = selectedDate;
    
    if (!isWeekend(date)) {
      timeSlots.forEach(time => {
        const isAvailable = Math.random() > 0.3; // Mock availability
        times.push({
          date,
          startTime: time,
          endTime: addMinutesToTime(time, 60),
          isAvailable
        });
      });
    }
    
    setSuggestedTimes(times);
  };

  const addMinutesToTime = (time: string, minutes: number): string => {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Appointment['priority']) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Appointment['type']) => {
    switch (type) {
      case 'viewing': return MapPin;
      case 'consultation': return MessageSquare;
      case 'valuation': return FileText;
      case 'follow-up': return Phone;
      case 'group-tour': return Users;
      default: return CalendarIcon;
    }
  };

  const handleCreateAppointment = async () => {
    if (!newAppointment.title || !newAppointment.date) return;

    const appointment: Appointment = {
      id: Date.now().toString(),
      type: newAppointment.type || 'viewing',
      title: newAppointment.title,
      description: newAppointment.description,
      date: newAppointment.date,
      duration: newAppointment.duration || 60,
      location: newAppointment.location || { type: 'property' },
      participants: newAppointment.participants || [],
      agent: {
        id: '1',
        name: 'Agent Smith',
        email: 'agent.smith@propguard.ai',
        phone: '+61 400 123 456',
        specialties: ['Residential'],
        availability: []
      },
      status: 'scheduled',
      priority: newAppointment.priority || 'medium',
      reminders: [
        { id: Date.now().toString(), type: 'email', timing: 1440, sent: false },
        { id: (Date.now() + 1).toString(), type: 'sms', timing: 120, sent: false }
      ]
    };

    setAppointments(prev => [...prev, appointment]);
    setShowCreateForm(false);
    setNewAppointment({});

    // Send confirmation through Sensay
    try {
      await sensayService.sendMessage(`Appointment scheduled: ${appointment.title} on ${format(appointment.date, 'PPP')} at ${format(appointment.date, 'HH:mm')}`);
    } catch (error) {
      console.error('Error sending appointment confirmation:', error);
    }
  };

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

  const handleSendReminder = async (appointment: Appointment, type: 'email' | 'sms') => {
    try {
      const message = `Reminder: ${appointment.title} scheduled for ${format(appointment.date, 'PPP')} at ${format(appointment.date, 'HH:mm')}`;
      await sensayService.sendMessage(`Send ${type} reminder: ${message}`);
      
      // Mark reminder as sent
      setAppointments(prev => prev.map(apt => 
        apt.id === appointment.id 
          ? {
              ...apt,
              reminders: apt.reminders.map(reminder => 
                reminder.type === type ? { ...reminder, sent: true } : reminder
              )
            }
          : apt
      ));
    } catch (error) {
      console.error('Error sending reminder:', error);
    }
  };

  const generateOptimalSchedule = () => {
    // AI-powered optimal scheduling logic
    const optimizedAppointments = appointments.map(apt => {
      // Group nearby appointments
      // Minimize travel time
      // Consider client preferences
      return apt;
    });
    
    setAppointments(optimizedAppointments);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointment Manager</h1>
            <p className="text-gray-600">Smart scheduling and tour management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={generateOptimalSchedule}>
              <Zap className="h-4 w-4 mr-2" />
              Optimize Schedule
            </Button>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'today' ? 'default' : 'outline'}
            onClick={() => setViewMode('today')}
          >
            Today
          </Button>
          <Button 
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            onClick={() => setViewMode('calendar')}
          >
            Calendar
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments List */}
          <div className="lg:col-span-2 space-y-6">
            {viewMode === 'today' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-blue-600" />
                    Today's Appointments ({todayAppointments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.length > 0 ? (
                      todayAppointments.map((appointment) => (
                        <AppointmentCard 
                          key={appointment.id}
                          appointment={appointment}
                          onStatusChange={handleStatusChange}
                          onSendReminder={handleSendReminder}
                          onSelect={() => setSelectedAppointment(appointment)}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No appointments scheduled for today</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.slice(0, 5).map((appointment) => (
                    <AppointmentCard 
                      key={appointment.id}
                      appointment={appointment}
                      onStatusChange={handleStatusChange}
                      onSendReminder={handleSendReminder}
                      onSelect={() => setSelectedAppointment(appointment)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Appointments:</span>
                    <span className="font-bold">{todayAppointments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confirmed:</span>
                    <span className="font-bold text-green-600">
                      {todayAppointments.filter(apt => apt.status === 'confirmed').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-bold text-yellow-600">
                      {todayAppointments.filter(apt => apt.status === 'scheduled').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Selected Appointment Details */}
            {selectedAppointment && (
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <AppointmentDetails 
                    appointment={selectedAppointment}
                    onClose={() => setSelectedAppointment(null)}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Create Appointment Modal */}
      {showCreateForm && (
        <CreateAppointmentForm
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateAppointment}
          newAppointment={newAppointment}
          setNewAppointment={setNewAppointment}
          suggestedTimes={suggestedTimes}
        />
      )}
    </div>
  );
};

// Appointment Card Component
interface AppointmentCardProps {
  appointment: Appointment;
  onStatusChange: (id: string, status: Appointment['status']) => void;
  onSendReminder: (appointment: Appointment, type: 'email' | 'sms') => void;
  onSelect: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onStatusChange,
  onSendReminder,
  onSelect
}) => {
  const IconComponent = getTypeIcon(appointment.type);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onSelect}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <IconComponent className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-medium">{appointment.title}</h3>
              <p className="text-sm text-gray-600">
                {format(appointment.date, 'PPP')} at {format(appointment.date, 'HH:mm')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status}
            </Badge>
            <Badge className={getPriorityColor(appointment.priority)}>
              {appointment.priority}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {appointment.duration} min
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {appointment.participants.length} participant{appointment.participants.length !== 1 ? 's' : ''}
          </div>
          {appointment.location.type === 'property' && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Property
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {appointment.participants[0]?.name}
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={(e) => {
              e.stopPropagation();
              onSendReminder(appointment, 'email');
            }}>
              <Mail className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={(e) => {
              e.stopPropagation();
              onSendReminder(appointment, 'sms');
            }}>
              <MessageSquare className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Appointment Details Component
interface AppointmentDetailsProps {
  appointment: Appointment;
  onClose: () => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ appointment, onClose }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{appointment.title}</h3>
        <Button size="sm" variant="ghost" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium">Date & Time</Label>
          <p className="text-sm text-gray-600">
            {format(appointment.date, 'PPP')} at {format(appointment.date, 'HH:mm')}
          </p>
        </div>

        <div>
          <Label className="text-sm font-medium">Duration</Label>
          <p className="text-sm text-gray-600">{appointment.duration} minutes</p>
        </div>

        <div>
          <Label className="text-sm font-medium">Location</Label>
          <p className="text-sm text-gray-600">
            {appointment.location.address || appointment.location.type}
          </p>
        </div>

        <div>
          <Label className="text-sm font-medium">Participants</Label>
          <div className="space-y-1">
            {appointment.participants.map((participant) => (
              <div key={participant.id} className="text-sm text-gray-600">
                {participant.name} ({participant.role})
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Agent</Label>
          <p className="text-sm text-gray-600">{appointment.agent.name}</p>
        </div>

        {appointment.description && (
          <div>
            <Label className="text-sm font-medium">Description</Label>
            <p className="text-sm text-gray-600">{appointment.description}</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button size="sm" variant="outline">
          <Send className="h-4 w-4 mr-1" />
          Send Info
        </Button>
      </div>
    </div>
  );
};

// Create Appointment Form Component
interface CreateAppointmentFormProps {
  onClose: () => void;
  onSubmit: () => void;
  newAppointment: Partial<Appointment>;
  setNewAppointment: (appointment: Partial<Appointment>) => void;
  suggestedTimes: TimeSlot[];
}

const CreateAppointmentForm: React.FC<CreateAppointmentFormProps> = ({
  onClose,
  onSubmit,
  newAppointment,
  setNewAppointment,
  suggestedTimes
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            New Appointment
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Appointment Type</Label>
              <Select 
                value={newAppointment.type} 
                onValueChange={(value) => setNewAppointment({...newAppointment, type: value as any})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewing">Property Viewing</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="valuation">Valuation</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="group-tour">Group Tour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select 
                value={newAppointment.priority} 
                onValueChange={(value) => setNewAppointment({...newAppointment, priority: value as any})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Title</Label>
            <Input
              value={newAppointment.title || ''}
              onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
              placeholder="Appointment title"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={newAppointment.description || ''}
              onChange={(e) => setNewAppointment({...newAppointment, description: e.target.value})}
              placeholder="Additional details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setNewAppointment({...newAppointment, date});
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                value={newAppointment.duration || 60}
                onChange={(e) => setNewAppointment({...newAppointment, duration: parseInt(e.target.value)})}
                placeholder="60"
              />
            </div>
          </div>

          {/* Suggested Times */}
          {selectedDate && suggestedTimes.length > 0 && (
            <div>
              <Label>Suggested Times</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {suggestedTimes.filter(slot => slot.isAvailable).slice(0, 8).map((slot, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const date = new Date(selectedDate);
                      const [hours, minutes] = slot.startTime.split(':').map(Number);
                      date.setHours(hours, minutes, 0, 0);
                      setNewAppointment({...newAppointment, date});
                    }}
                  >
                    {slot.startTime}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSubmit} disabled={!newAppointment.title || !newAppointment.date}>
              Create Appointment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
