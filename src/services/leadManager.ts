import { ConversationState, UserPreferences } from './sensayService';

export interface LeadProfile {
  id: string;
  userId: string;
  name?: string;
  email?: string;
  phone?: string;
  leadScore: number;
  qualificationLevel: 'low' | 'medium' | 'high' | 'premium';
  preferences: UserPreferences;
  interactionHistory: Array<{
    timestamp: Date;
    type: 'search' | 'valuation' | 'scheduling' | 'inquiry' | 'contact';
    details: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }>;
  nurturingStage: 'awareness' | 'interest' | 'consideration' | 'intent' | 'purchase';
  nextAction: string;
  lastContact: Date;
  totalInteractions: number;
  engagementScore: number;
  preferredCommunicationMethod: 'chat' | 'email' | 'phone' | 'video';
  timezone?: string;
  language: string;
}

export interface LeadQualificationResult {
  score: number;
  level: 'low' | 'medium' | 'high' | 'premium';
  factors: Array<{
    factor: string;
    score: number;
    weight: number;
    description: string;
  }>;
  recommendations: string[];
  nextSteps: string[];
  nurturingPlan: NurturingSequence[];
  estimatedTimeline: string;
  probabilityOfConversion: number;
}

export interface NurturingSequence {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'call' | 'content' | 'event';
  trigger: string;
  delay: number; // hours
  content: string;
  personalization: Record<string, any>;
  tracking: {
    sent: boolean;
    opened?: boolean;
    clicked?: boolean;
    responded?: boolean;
    timestamp?: Date;
  };
}

export class LeadManager {
  private leadProfiles: Map<string, LeadProfile> = new Map();
  private nurturingTemplates: Map<string, NurturingSequence[]> = new Map();

  constructor() {
    this.initializeNurturingTemplates();
  }

  async qualifyLead(
    session: ConversationState, 
    entities: Record<string, any>, 
    message: string
  ): Promise<number> {
    let score = 0;
    const factors: Array<{ factor: string; score: number; weight: number; description: string }> = [];

    // Budget qualification (25% weight)
    if (entities.budget) {
      const budgetScore = this.calculateBudgetScore(entities.budget);
      score += budgetScore * 0.25;
      factors.push({
        factor: 'Budget',
        score: budgetScore,
        weight: 0.25,
        description: `Budget of $${entities.budget.toLocaleString()} indicates ${budgetScore > 0.7 ? 'high' : 'medium'} purchasing power`
      });
    }

    // Timeline qualification (20% weight)
    const timelineScore = this.analyzeTimelineIntent(message);
    score += timelineScore * 0.20;
    factors.push({
      factor: 'Timeline',
      score: timelineScore,
      weight: 0.20,
      description: this.getTimelineDescription(timelineScore)
    });

    // Engagement level (20% weight)
    const engagementScore = this.calculateEngagementScore(session);
    score += engagementScore * 0.20;
    factors.push({
      factor: 'Engagement',
      score: engagementScore,
      weight: 0.20,
      description: `${session.interactionCount} interactions with ${engagementScore > 0.7 ? 'high' : 'moderate'} engagement`
    });

    // Contact information completeness (15% weight)
    const contactScore = this.calculateContactScore(entities, session);
    score += contactScore * 0.15;
    factors.push({
      factor: 'Contact Info',
      score: contactScore,
      weight: 0.15,
      description: contactScore > 0.7 ? 'Complete contact information provided' : 'Partial or no contact information'
    });

    // Property specificity (10% weight)
    const specificityScore = this.calculateSpecificityScore(entities);
    score += specificityScore * 0.10;
    factors.push({
      factor: 'Specificity',
      score: specificityScore,
      weight: 0.10,
      description: specificityScore > 0.7 ? 'Very specific property requirements' : 'General property search'
    });

    // Risk tolerance (10% weight)
    const riskScore = this.calculateRiskToleranceScore(entities, session);
    score += riskScore * 0.10;
    factors.push({
      factor: 'Risk Profile',
      score: riskScore,
      weight: 0.10,
      description: this.getRiskProfileDescription(riskScore)
    });

    // Update or create lead profile
    const userId = 'user_' + Date.now(); // In real app, use actual user ID
    await this.updateLeadProfile(userId, session, entities, score, factors);

    return Math.min(score, 1.0);
  }

  private calculateBudgetScore(budget: number): number {
    if (budget >= 1500000) return 1.0; // Premium
    if (budget >= 1000000) return 0.8; // High
    if (budget >= 750000) return 0.6; // Medium-High
    if (budget >= 500000) return 0.4; // Medium
    if (budget >= 300000) return 0.2; // Low-Medium
    return 0.1; // Low
  }

  private analyzeTimelineIntent(message: string): number {
    const urgentKeywords = ['immediately', 'urgent', 'asap', 'quickly', 'soon', 'this week', 'this month'];
    const moderateKeywords = ['next month', 'within 3 months', 'looking to buy', 'planning'];
    const casualKeywords = ['someday', 'eventually', 'just looking', 'browsing', 'curious'];

    const messageLower = message.toLowerCase();

    if (urgentKeywords.some(keyword => messageLower.includes(keyword))) {
      return 1.0; // Very urgent
    }
    if (moderateKeywords.some(keyword => messageLower.includes(keyword))) {
      return 0.7; // Moderate timeline
    }
    if (casualKeywords.some(keyword => messageLower.includes(keyword))) {
      return 0.3; // Casual interest
    }

    return 0.5; // Neutral
  }

  private calculateEngagementScore(session: ConversationState): number {
    const interactionCount = session.interactionCount;
    const sessionDuration = Date.now() - session.sessionStart.getTime();
    const hoursInSession = sessionDuration / (1000 * 60 * 60);

    // High engagement if many interactions in short time
    if (interactionCount > 10 && hoursInSession < 1) return 1.0;
    if (interactionCount > 5 && hoursInSession < 2) return 0.8;
    if (interactionCount > 3 && hoursInSession < 4) return 0.6;
    if (interactionCount > 1) return 0.4;
    return 0.2;
  }

  private calculateContactScore(entities: Record<string, any>, session: ConversationState): number {
    let score = 0;
    if (entities.email) score += 0.4;
    if (entities.phone) score += 0.4;
    if (entities.name) score += 0.2;
    return score;
  }

  private calculateSpecificityScore(entities: Record<string, any>): number {
    let score = 0;
    const specificFields = ['location', 'propertyType', 'bedrooms', 'bathrooms', 'features'];
    const providedFields = specificFields.filter(field => entities[field]);
    return providedFields.length / specificFields.length;
  }

  private calculateRiskToleranceScore(entities: Record<string, any>, session: ConversationState): number {
    const riskTolerance = session.userPreferences?.riskTolerance || entities.riskTolerance;
    switch (riskTolerance) {
      case 'low': return 0.3;
      case 'medium': return 0.6;
      case 'high': return 0.9;
      default: return 0.5;
    }
  }

  private getTimelineDescription(score: number): string {
    if (score >= 0.8) return 'Urgent timeline - looking to buy immediately';
    if (score >= 0.6) return 'Active timeline - planning to buy within 3 months';
    if (score >= 0.4) return 'Moderate timeline - considering purchase';
    return 'Casual interest - just browsing';
  }

  private getRiskProfileDescription(score: number): string {
    if (score >= 0.8) return 'High risk tolerance - investment focused';
    if (score >= 0.6) return 'Medium risk tolerance - balanced approach';
    if (score >= 0.4) return 'Low-medium risk tolerance - conservative';
    return 'Low risk tolerance - very conservative';
  }

  private async updateLeadProfile(
    userId: string,
    session: ConversationState,
    entities: Record<string, any>,
    leadScore: number,
    factors: Array<{ factor: string; score: number; weight: number; description: string }>
  ): Promise<void> {
    let profile = this.leadProfiles.get(userId);
    
    if (!profile) {
      profile = {
        id: userId,
        userId,
        leadScore,
        qualificationLevel: this.getQualificationLevel(leadScore),
        preferences: session.userPreferences || {},
        interactionHistory: [],
        nurturingStage: 'awareness',
        nextAction: 'Initial contact',
        lastContact: new Date(),
        totalInteractions: 0,
        engagementScore: 0,
        preferredCommunicationMethod: 'chat',
        language: session.language
      };
    }

    // Update profile with new information
    profile.leadScore = leadScore;
    profile.qualificationLevel = this.getQualificationLevel(leadScore);
    profile.lastContact = new Date();
    profile.totalInteractions += 1;
    profile.engagementScore = this.calculateEngagementScore(session);

    // Update preferences if new information is provided
    if (entities.budget) {
      profile.preferences.budgetMax = entities.budget;
    }
    if (entities.location) {
      profile.preferences.preferredLocations = profile.preferences.preferredLocations || [];
      if (!profile.preferences.preferredLocations.includes(entities.location)) {
        profile.preferences.preferredLocations.push(entities.location);
      }
    }
    if (entities.propertyType) {
      profile.preferences.propertyTypes = profile.preferences.propertyTypes || [];
      if (!profile.preferences.propertyTypes.includes(entities.propertyType)) {
        profile.preferences.propertyTypes.push(entities.propertyType);
      }
    }

    // Add interaction to history
    profile.interactionHistory.push({
      timestamp: new Date(),
      type: 'inquiry',
      details: `Lead score updated to ${Math.round(leadScore * 100)}/100`,
      sentiment: leadScore > 0.7 ? 'positive' : leadScore > 0.4 ? 'neutral' : 'negative'
    });

    // Update nurturing stage
    profile.nurturingStage = this.getNurturingStage(leadScore, profile.totalInteractions);

    // Set next action
    profile.nextAction = this.getNextAction(profile);

    this.leadProfiles.set(userId, profile);
  }

  private getQualificationLevel(score: number): 'low' | 'medium' | 'high' | 'premium' {
    if (score >= 0.8) return 'premium';
    if (score >= 0.6) return 'high';
    if (score >= 0.4) return 'medium';
    return 'low';
  }

  private getNurturingStage(score: number, interactions: number): 'awareness' | 'interest' | 'consideration' | 'intent' | 'purchase' {
    if (score >= 0.8 && interactions >= 5) return 'intent';
    if (score >= 0.6 && interactions >= 3) return 'consideration';
    if (score >= 0.4 || interactions >= 2) return 'interest';
    return 'awareness';
  }

  private getNextAction(profile: LeadProfile): string {
    switch (profile.qualificationLevel) {
      case 'premium':
        return 'Schedule immediate call with senior agent';
      case 'high':
        return 'Send personalized property matches and schedule call';
      case 'medium':
        return 'Send market report and follow up in 2 days';
      case 'low':
        return 'Add to nurturing sequence and follow up in 1 week';
      default:
        return 'Continue conversation and gather more information';
    }
  }

  private initializeNurturingTemplates(): void {
    // Premium lead nurturing sequence
    this.nurturingTemplates.set('premium', [
      {
        id: 'premium_1',
        name: 'Immediate Follow-up',
        type: 'call',
        trigger: 'lead_qualified_premium',
        delay: 1,
        content: 'Senior agent will call within 1 hour to discuss your requirements',
        personalization: { agent_level: 'senior' },
        tracking: { sent: false }
      },
      {
        id: 'premium_2',
        name: 'Exclusive Property Matches',
        type: 'email',
        trigger: 'premium_call_completed',
        delay: 4,
        content: 'Personalized property recommendations with exclusive off-market listings',
        personalization: { exclusivity: true },
        tracking: { sent: false }
      }
    ]);

    // High lead nurturing sequence
    this.nurturingTemplates.set('high', [
      {
        id: 'high_1',
        name: 'Property Matches',
        type: 'email',
        trigger: 'lead_qualified_high',
        delay: 2,
        content: 'Curated property matches based on your preferences',
        personalization: { match_count: 5 },
        tracking: { sent: false }
      },
      {
        id: 'high_2',
        name: 'Market Analysis',
        type: 'email',
        trigger: 'high_email_opened',
        delay: 24,
        content: 'Detailed market analysis for your target areas',
        personalization: { area_analysis: true },
        tracking: { sent: false }
      }
    ]);

    // Medium lead nurturing sequence
    this.nurturingTemplates.set('medium', [
      {
        id: 'medium_1',
        name: 'Educational Content',
        type: 'email',
        trigger: 'lead_qualified_medium',
        delay: 4,
        content: 'Buying guide and market insights',
        personalization: { content_type: 'educational' },
        tracking: { sent: false }
      },
      {
        id: 'medium_2',
        name: 'Market Updates',
        type: 'email',
        trigger: 'medium_email_opened',
        delay: 72,
        content: 'Weekly market updates and new listings',
        personalization: { frequency: 'weekly' },
        tracking: { sent: false }
      }
    ]);

    // Low lead nurturing sequence
    this.nurturingTemplates.set('low', [
      {
        id: 'low_1',
        name: 'Welcome Series',
        type: 'email',
        trigger: 'lead_qualified_low',
        delay: 24,
        content: 'Welcome to PropGuard AI - Introduction to our services',
        personalization: { welcome: true },
        tracking: { sent: false }
      },
      {
        id: 'low_2',
        name: 'Monthly Newsletter',
        type: 'email',
        trigger: 'low_email_opened',
        delay: 168, // 1 week
        content: 'Monthly market newsletter and tips',
        personalization: { frequency: 'monthly' },
        tracking: { sent: false }
      }
    ]);
  }

  async getLeadProfile(userId: string): Promise<LeadProfile | null> {
    return this.leadProfiles.get(userId) || null;
  }

  async getNurturingSequence(qualificationLevel: string): Promise<NurturingSequence[]> {
    return this.nurturingTemplates.get(qualificationLevel) || [];
  }

  async getAllLeads(): Promise<LeadProfile[]> {
    return Array.from(this.leadProfiles.values());
  }

  async getLeadStats(): Promise<{
    total: number;
    byLevel: Record<string, number>;
    byStage: Record<string, number>;
    averageScore: number;
  }> {
    const leads = Array.from(this.leadProfiles.values());
    
    const byLevel = leads.reduce((acc, lead) => {
      acc[lead.qualificationLevel] = (acc[lead.qualificationLevel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byStage = leads.reduce((acc, lead) => {
      acc[lead.nurturingStage] = (acc[lead.nurturingStage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const averageScore = leads.length > 0 
      ? leads.reduce((sum, lead) => sum + lead.leadScore, 0) / leads.length 
      : 0;

    return {
      total: leads.length,
      byLevel,
      byStage,
      averageScore
    };
  }
}

