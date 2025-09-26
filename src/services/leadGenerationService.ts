import { SensayAPI } from '@/services/api/sensay';

export interface LeadScoringCriteria {
  budget: {
    weight: number;
    thresholds: {
      high: { min: number; score: number };
      medium: { min: number; max: number; score: number };
      low: { max: number; score: number };
    };
  };
  timeline: {
    weight: number;
    scores: {
      immediate: number;
      '3_months': number;
      '6_months': number;
      '1_year': number;
    };
  };
  financing: {
    weight: number;
    scores: {
      pre_approved: number;
      pre_qualified: number;
      exploring: number;
      not_started: number;
    };
  };
  location_specificity: {
    weight: number;
    scores: {
      exact_address: number;
      neighborhood: number;
      city: number;
      region: number;
    };
  };
  engagement: {
    weight: number;
    factors: {
      message_count: { threshold: number; score: number };
      questions_asked: { threshold: number; score: number };
      property_views: { threshold: number; score: number };
    };
  };
}

export interface LeadData {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  budgetRange?: { min: number; max: number };
  preferredLocations?: string[];
  propertyTypes?: string[];
  timeline?: string;
  financingStatus?: string;
  leadScore: number;
  status: 'new' | 'qualified' | 'contacted' | 'appointment_scheduled' | 'converted' | 'lost';
  interactions: Array<{
    timestamp: Date;
    message: string;
    response: string;
    channel: string;
    intent: string;
  }>;
  lastContact?: Date;
  nextFollowup?: Date;
  assignedAgent?: string;
  notes?: Array<{
    timestamp: Date;
    agent: string;
    note: string;
  }>;
}

export interface AppointmentData {
  id: string;
  propertyId: string;
  leadId: string;
  scheduledTime: Date;
  duration: number; // minutes
  type: 'viewing' | 'virtual_tour' | 'consultation';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  location?: string;
  virtualLink?: string;
  notes?: string;
  reminders: Array<{
    type: 'email' | 'sms' | 'push';
    scheduledTime: Date;
    sent: boolean;
  }>;
}

export interface NurtureSequence {
  id: string;
  name: string;
  triggerScore: number;
  steps: Array<{
    delay: number; // hours
    type: 'email' | 'sms' | 'call' | 'message';
    template: string;
    content: string;
  }>;
  active: boolean;
}

export class LeadScoringService {
  private scoringRules: LeadScoringCriteria;

  constructor() {
    this.scoringRules = {
      budget: {
        weight: 0.3,
        thresholds: {
          high: { min: 500000, score: 100 },
          medium: { min: 300000, max: 500000, score: 70 },
          low: { max: 300000, score: 40 }
        }
      },
      timeline: {
        weight: 0.25,
        scores: {
          immediate: 100,
          '3_months': 70,
          '6_months': 40,
          '1_year': 20
        }
      },
      financing: {
        weight: 0.2,
        scores: {
          pre_approved: 100,
          pre_qualified: 70,
          exploring: 40,
          not_started: 10
        }
      },
      location_specificity: {
        weight: 0.15,
        scores: {
          exact_address: 100,
          neighborhood: 80,
          city: 50,
          region: 20
        }
      },
      engagement: {
        weight: 0.1,
        factors: {
          message_count: { threshold: 5, score: 30 },
          questions_asked: { threshold: 3, score: 40 },
          property_views: { threshold: 5, score: 30 }
        }
      }
    };
  }

  calculateScore(leadData: LeadData, interactionHistory: any[]): number {
    let totalScore = 0;
    let maxPossible = 0;

    for (const [factor, rules] of Object.entries(this.scoringRules)) {
      const factorScore = this.calculateFactorScore(factor, leadData, interactionHistory, rules);
      totalScore += factorScore * rules.weight;
      maxPossible += 100 * rules.weight;
    }

    // Normalize to 0-100 scale
    return Math.round((totalScore / maxPossible) * 100);
  }

  private calculateFactorScore(factor: string, leadData: LeadData, interactionHistory: any[], rules: any): number {
    switch (factor) {
      case 'budget':
        return this.scoreBudget(leadData.budgetRange, rules);
      case 'timeline':
        return rules.scores[leadData.timeline || ''] || 0;
      case 'financing':
        return rules.scores[leadData.financingStatus || ''] || 0;
      case 'location_specificity':
        return this.scoreLocationSpecificity(leadData.preferredLocations, rules);
      case 'engagement':
        return this.scoreEngagement(interactionHistory, rules);
      default:
        return 0;
    }
  }

  private scoreBudget(budgetRange: { min: number; max: number } | undefined, rules: any): number {
    if (!budgetRange) return 0;
    
    const amount = budgetRange.max || budgetRange.min;
    for (const [level, threshold] of Object.entries(rules.thresholds)) {
      const meetsMin = !threshold.min || amount >= threshold.min;
      const meetsMax = !threshold.max || amount <= threshold.max;
      
      if (meetsMin && meetsMax) {
        return threshold.score;
      }
    }
    return 0;
  }

  private scoreLocationSpecificity(locations: string[] | undefined, rules: any): number {
    if (!locations || locations.length === 0) return 0;
    
    const location = locations[0]; // Use first location for scoring
    
    if (location.includes(',')) {
      // Likely an address
      return rules.scores.exact_address;
    } else if (location.includes('neighborhood') || location.split(' ').length === 1) {
      // Single word - likely neighborhood
      return rules.scores.neighborhood;
    } else {
      // Multiple words - likely city or region
      return location.length > 15 ? rules.scores.region : rules.scores.city;
    }
  }

  private scoreEngagement(interactionHistory: any[], rules: any): number {
    let engagementScore = 0;

    // Message count
    if (interactionHistory.length >= rules.factors.message_count.threshold) {
      engagementScore += rules.factors.message_count.score;
    }

    // Questions asked
    const questions = interactionHistory.filter(i => 
      i.intent && i.intent.includes('question')
    ).length;
    if (questions >= rules.factors.questions_asked.threshold) {
      engagementScore += rules.factors.questions_asked.score;
    }

    // Property views
    const propertyViews = interactionHistory.filter(i => 
      i.action && i.action.includes('view_property')
    ).length;
    if (propertyViews >= rules.factors.property_views.threshold) {
      engagementScore += rules.factors.property_views.score;
    }

    return engagementScore;
  }

  getRecommendation(score: number): {
    priority: string;
    action: string;
    message: string;
    nextSteps: string[];
  } {
    if (score >= 80) {
      return {
        priority: 'high',
        action: 'immediate_followup',
        message: 'Hot lead - contact within 1 hour',
        nextSteps: [
          'Call immediately',
          'Send personalized property recommendations',
          'Schedule viewing within 24 hours',
          'Assign to top-performing agent'
        ]
      };
    } else if (score >= 60) {
      return {
        priority: 'medium',
        action: 'schedule_call',
        message: 'Warm lead - contact within 24 hours',
        nextSteps: [
          'Send follow-up email',
          'Schedule phone call',
          'Provide market insights',
          'Add to nurture sequence'
        ]
      };
    } else if (score >= 40) {
      return {
        priority: 'low',
        action: 'nurture_sequence',
        message: 'Cool lead - add to nurture campaign',
        nextSteps: [
          'Add to automated nurture sequence',
          'Send weekly market updates',
          'Provide educational content',
          'Monitor engagement'
        ]
      };
    } else {
      return {
        priority: 'very_low',
        action: 'automated_only',
        message: 'Cold lead - automated engagement only',
        nextSteps: [
          'Add to general newsletter',
          'Send monthly updates',
          'Monitor for re-engagement',
          'Focus on higher priority leads'
        ]
      };
    }
  }

  updateScoringRules(newRules: Partial<LeadScoringCriteria>): void {
    this.scoringRules = { ...this.scoringRules, ...newRules };
  }
}

export class AppointmentSchedulingService {
  private sensayAPI: SensayAPI;

  constructor() {
    this.sensayAPI = new SensayAPI();
  }

  async scheduleAppointment(appointmentData: Omit<AppointmentData, 'id' | 'reminders'>): Promise<AppointmentData> {
    const appointment: AppointmentData = {
      ...appointmentData,
      id: `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      reminders: this.generateReminders(appointmentData.scheduledTime, appointmentData.type)
    };

    // Send confirmation via Sensay multi-channel
    await this.sendAppointmentConfirmation(appointment);
    
    // Schedule reminders
    await this.scheduleReminders(appointment);

    return appointment;
  }

  private generateReminders(scheduledTime: Date, type: string): Array<{
    type: 'email' | 'sms' | 'push';
    scheduledTime: Date;
    sent: boolean;
  }> {
    const reminders = [];
    const now = new Date();

    // 24 hours before
    const dayBefore = new Date(scheduledTime.getTime() - 24 * 60 * 60 * 1000);
    if (dayBefore > now) {
      reminders.push({
        type: 'email',
        scheduledTime: dayBefore,
        sent: false
      });
    }

    // 2 hours before
    const twoHoursBefore = new Date(scheduledTime.getTime() - 2 * 60 * 60 * 1000);
    if (twoHoursBefore > now) {
      reminders.push({
        type: 'sms',
        scheduledTime: twoHoursBefore,
        sent: false
      });
    }

    // 30 minutes before
    const thirtyMinutesBefore = new Date(scheduledTime.getTime() - 30 * 60 * 1000);
    if (thirtyMinutesBefore > now) {
      reminders.push({
        type: 'push',
        scheduledTime: thirtyMinutesBefore,
        sent: false
      });
    }

    return reminders;
  }

  private async sendAppointmentConfirmation(appointment: AppointmentData): Promise<void> {
    const confirmationMessage = this.generateConfirmationMessage(appointment);
    
    try {
      await this.sensayAPI.sendMessage(
        confirmationMessage,
        `apt_${appointment.id}`,
        {
          appointmentId: appointment.id,
          type: 'confirmation'
        }
      );
    } catch (error) {
      console.error('Failed to send appointment confirmation:', error);
    }
  }

  private generateConfirmationMessage(appointment: AppointmentData): string {
    const timeStr = appointment.scheduledTime.toLocaleString();
    
    switch (appointment.type) {
      case 'viewing':
        return `✅ **Appointment Confirmed!**

📅 **Date & Time**: ${timeStr}
🏠 **Property**: ${appointment.propertyId}
📍 **Location**: ${appointment.location || 'Property address'}
⏱️ **Duration**: ${appointment.duration} minutes

You'll receive reminders 24 hours and 2 hours before your appointment. If you need to reschedule, please contact us at least 4 hours in advance.`;
        
      case 'virtual_tour':
        return `✅ **Virtual Tour Scheduled!**

📅 **Date & Time**: ${timeStr}
🏠 **Property**: ${appointment.propertyId}
🔗 **Virtual Link**: ${appointment.virtualLink || 'Will be sent before the tour'}
⏱️ **Duration**: ${appointment.duration} minutes

You'll receive the virtual tour link 30 minutes before your scheduled time.`;
        
      case 'consultation':
        return `✅ **Consultation Scheduled!**

📅 **Date & Time**: ${timeStr}
💬 **Type**: Real Estate Consultation
⏱️ **Duration**: ${appointment.duration} minutes

We'll discuss your real estate needs and provide personalized recommendations.`;
        
      default:
        return `✅ **Appointment Confirmed!**

📅 **Date & Time**: ${timeStr}
⏱️ **Duration**: ${appointment.duration} minutes

You'll receive reminders before your appointment.`;
    }
  }

  private async scheduleReminders(appointment: AppointmentData): Promise<void> {
    for (const reminder of appointment.reminders) {
      // In a real implementation, this would integrate with a job scheduler
      // like Bull, Agenda, or a cloud service like AWS EventBridge
      console.log(`Scheduled ${reminder.type} reminder for ${remointment.scheduledTime}`);
    }
  }

  async rescheduleAppointment(appointmentId: string, newTime: Date): Promise<AppointmentData> {
    // In a real implementation, this would update the database
    // and reschedule all reminders
    console.log(`Rescheduling appointment ${appointmentId} to ${newTime}`);
    
    // Return updated appointment (mock implementation)
    return {
      id: appointmentId,
      propertyId: '',
      leadId: '',
      scheduledTime: newTime,
      duration: 60,
      type: 'viewing',
      status: 'rescheduled',
      reminders: []
    };
  }

  async cancelAppointment(appointmentId: string, reason?: string): Promise<void> {
    // In a real implementation, this would:
    // 1. Update appointment status to 'cancelled'
    // 2. Cancel all scheduled reminders
    // 3. Send cancellation confirmation
    // 4. Offer rescheduling options
    
    console.log(`Cancelling appointment ${appointmentId}. Reason: ${reason || 'Not provided'}`);
  }
}

export class LeadNurturingService {
  private sensayAPI: SensayAPI;
  private nurtureSequences: NurtureSequence[];

  constructor() {
    this.sensayAPI = new SensayAPI();
    this.nurtureSequences = this.initializeNurtureSequences();
  }

  private initializeNurtureSequences(): NurtureSequence[] {
    return [
      {
        id: 'hot_lead_sequence',
        name: 'Hot Lead Follow-up',
        triggerScore: 80,
        steps: [
          {
            delay: 0, // Immediate
            type: 'call',
            template: 'immediate_call',
            content: 'Call immediately to capitalize on high interest'
          },
          {
            delay: 2, // 2 hours later
            type: 'email',
            template: 'personalized_properties',
            content: 'Send personalized property recommendations'
          },
          {
            delay: 24, // 24 hours later
            type: 'sms',
            template: 'viewing_reminder',
            content: 'Remind about scheduled viewing or offer to schedule'
          }
        ],
        active: true
      },
      {
        id: 'warm_lead_sequence',
        name: 'Warm Lead Nurture',
        triggerScore: 60,
        steps: [
          {
            delay: 2, // 2 hours later
            type: 'email',
            template: 'welcome_series',
            content: 'Welcome email with market insights'
          },
          {
            delay: 24, // 24 hours later
            type: 'email',
            template: 'property_recommendations',
            content: 'Curated property recommendations'
          },
          {
            delay: 72, // 3 days later
            type: 'call',
            template: 'follow_up_call',
            content: 'Follow-up call to answer questions'
          },
          {
            delay: 168, // 1 week later
            type: 'email',
            template: 'market_update',
            content: 'Weekly market update and new listings'
          }
        ],
        active: true
      },
      {
        id: 'cool_lead_sequence',
        name: 'Cool Lead Nurture',
        triggerScore: 40,
        steps: [
          {
            delay: 24, // 24 hours later
            type: 'email',
            template: 'educational_content',
            content: 'Educational content about home buying process'
          },
          {
            delay: 168, // 1 week later
            type: 'email',
            template: 'market_insights',
            content: 'Market insights and trends'
          },
          {
            delay: 336, // 2 weeks later
            type: 'email',
            template: 'success_stories',
            content: 'Customer success stories and testimonials'
          },
          {
            delay: 504, // 3 weeks later
            type: 'email',
            template: 're_engagement',
            content: 'Re-engagement offer with special incentives'
          }
        ],
        active: true
      }
    ];
  }

  async executeNurtureSequence(leadData: LeadData, action: string, context: any): Promise<{
    nextAction: string;
    scheduledFollowup: Date;
    messagesSent: number;
  }> {
    const sequence = this.getNurtureSequence(leadData.leadScore);
    if (!sequence) {
      return {
        nextAction: 'no_action',
        scheduledFollowup: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
        messagesSent: 0
      };
    }

    let messagesSent = 0;
    const now = new Date();

    for (const step of sequence.steps) {
      const scheduledTime = new Date(now.getTime() + step.delay * 60 * 60 * 1000);
      
      try {
        await this.executeNurtureStep(leadData, step, context, scheduledTime);
        messagesSent++;
      } catch (error) {
        console.error(`Failed to execute nurture step: ${step.type}`, error);
      }
    }

    const nextFollowup = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week later

    return {
      nextAction: sequence.steps[sequence.steps.length - 1].type,
      scheduledFollowup: nextFollowup,
      messagesSent
    };
  }

  private getNurtureSequence(leadScore: number): NurtureSequence | null {
    return this.nurtureSequences.find(seq => 
      seq.active && leadScore >= seq.triggerScore
    ) || null;
  }

  private async executeNurtureStep(
    leadData: LeadData, 
    step: any, 
    context: any, 
    scheduledTime: Date
  ): Promise<void> {
    const message = this.generateNurtureMessage(step, leadData, context);
    
    try {
      await this.sensayAPI.sendMessage(
        message,
        `nurture_${leadData.id}_${step.type}`,
        {
          leadId: leadData.id,
          stepType: step.type,
          template: step.template,
          scheduledTime: scheduledTime.toISOString()
        }
      );
    } catch (error) {
      console.error(`Failed to send nurture message: ${step.type}`, error);
      throw error;
    }
  }

  private generateNurtureMessage(step: any, leadData: LeadData, context: any): string {
    const templates: Record<string, string> = {
      immediate_call: `Hi ${leadData.name || 'there'}! I noticed you're interested in properties. I'd love to help you find the perfect home. When would be a good time for a quick call?`,
      
      personalized_properties: `Hi ${leadData.name || 'there'}! I've found some properties that match your criteria perfectly. Here are my top recommendations...`,
      
      viewing_reminder: `Don't forget about your property viewing tomorrow! I'm excited to show you around. Let me know if you have any questions.`,
      
      welcome_series: `Welcome to PropGuard AI! I'm here to help you navigate the real estate market. Here's what's happening in your area...`,
      
      property_recommendations: `I've curated some properties that might interest you based on your preferences. Take a look and let me know what you think!`,
      
      follow_up_call: `Hi ${leadData.name || 'there'}! I wanted to follow up on our conversation. Do you have any questions about the properties I showed you?`,
      
      market_update: `Here's your weekly market update! New listings, price changes, and market trends in your area.`,
      
      educational_content: `Buying a home is a big decision. Here's a helpful guide to the home buying process...`,
      
      market_insights: `Market insights: What's happening in the real estate market and how it affects your search.`,
      
      success_stories: `Read how other families found their dream homes with PropGuard AI...`,
      
      re_engagement: `Hi ${leadData.name || 'there'}! I haven't heard from you in a while. Are you still looking for a home? I have some exciting new listings to share!`
    };

    return templates[step.template] || step.content;
  }

  addCustomNurtureSequence(sequence: NurtureSequence): void {
    this.nurtureSequences.push(sequence);
  }

  updateNurtureSequence(sequenceId: string, updates: Partial<NurtureSequence>): void {
    const index = this.nurtureSequences.findIndex(seq => seq.id === sequenceId);
    if (index !== -1) {
      this.nurtureSequences[index] = { ...this.nurtureSequences[index], ...updates };
    }
  }

  getNurtureSequences(): NurtureSequence[] {
    return this.nurtureSequences;
  }
}

// Export singleton instances
export const leadScoringService = new LeadScoringService();
export const appointmentSchedulingService = new AppointmentSchedulingService();
export const leadNurturingService = new LeadNurturingService();
