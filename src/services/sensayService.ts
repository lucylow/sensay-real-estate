import { sensayConfig, sensayEndpoints } from '@/config/sensay';

export interface SensayMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface SensayChatResponse {
  message: string;
  conversationId: string;
  metadata?: Record<string, any>;
  actions?: SensayAction[];
}

export interface SensayAction {
  type: 'viewProperty' | 'scheduleShowing' | 'downloadReport' | 'bookTour' | 'getValuation';
  data: Record<string, any>;
  label: string;
}

export class SensayService {
  private conversationId: string | null = null;

  async sendMessage(message: string): Promise<SensayChatResponse> {
    try {
      const response = await fetch(sensayEndpoints.chat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sensayConfig.apiKey}`,
        },
        body: JSON.stringify({
          message,
          replicaId: sensayConfig.replicaId,
          conversationId: this.conversationId,
          context: {
            platform: 'propguard-ai',
            userType: 'real-estate-client',
            features: ['property-search', 'valuation', 'risk-assessment', 'tour-booking'],
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Sensay API error: ${response.status}`);
      }

      const data = await response.json();
      this.conversationId = data.conversationId;

      return {
        message: data.message,
        conversationId: data.conversationId,
        metadata: data.metadata,
        actions: this.parseActions(data.message),
      };
    } catch (error) {
      console.error('Sensay API error:', error);
      return {
        message: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
        conversationId: this.conversationId || '',
        actions: [],
      };
    }
  }

  private parseActions(message: string): SensayAction[] {
    const actions: SensayAction[] = [];
    
    // Parse property-related actions
    if (message.includes('property') || message.includes('listing')) {
      actions.push({
        type: 'viewProperty',
        data: { searchQuery: message },
        label: 'View Properties',
      });
    }

    if (message.includes('tour') || message.includes('viewing') || message.includes('visit')) {
      actions.push({
        type: 'bookTour',
        data: { request: message },
        label: 'Book a Tour',
      });
    }

    if (message.includes('value') || message.includes('price') || message.includes('valuation')) {
      actions.push({
        type: 'getValuation',
        data: { query: message },
        label: 'Get Valuation',
      });
    }

    return actions;
  }

  async getConversationHistory(): Promise<SensayMessage[]> {
    if (!this.conversationId) return [];

    try {
      const response = await fetch(`${sensayEndpoints.conversations}/${this.conversationId}`, {
        headers: {
          'Authorization': `Bearer ${sensayConfig.apiKey}`,
        },
      });

      if (!response.ok) return [];

      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      return [];
    }
  }

  resetConversation(): void {
    this.conversationId = null;
  }
}

export const sensayService = new SensayService();
