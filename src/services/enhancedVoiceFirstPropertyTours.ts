import { SensayAPI } from '@/services/api/sensay';
import { elevenLabsService } from '@/config/elevenlabs';
import { supabase } from '@/integrations/supabase/client';

export interface VoiceCommand {
  command: string;
  intent: 'navigate' | 'describe' | 'question' | 'control' | 'book' | 'compare';
  entities: {
    room?: string;
    feature?: string;
    direction?: 'north' | 'south' | 'east' | 'west' | 'upstairs' | 'downstairs';
    action?: string;
  };
  confidence: number;
}

export interface InteractiveTourState {
  currentRoom: string;
  tourProgress: number; // 0-100
  visitedRooms: string[];
  userQuestions: string[];
  bookmarkedFeatures: string[];
  tourStartTime: Date;
  estimatedCompletionTime: number; // minutes
}

export interface PropertyTourData {
  propertyId: string;
  address: string;
  rooms: Array<{
    name: string;
    type: 'bedroom' | 'bathroom' | 'kitchen' | 'living' | 'dining' | 'study' | 'garage' | 'outdoor' | 'other';
    description: string;
    features: string[];
    measurements: string;
    highlights: string[];
    voicePrompts: string[];
  }>;
  navigation: Array<{
    from: string;
    to: string;
    direction: string;
    description: string;
  }>;
  highlights: Array<{
    feature: string;
    description: string;
    location: string;
    importance: 'high' | 'medium' | 'low';
  }>;
}

export interface VoiceTourResponse {
  audioUrl: string;
  transcript: string;
  nextSuggestions: string[];
  tourState: InteractiveTourState;
  visualCues?: {
    highlightRoom?: string;
    showFeature?: string;
    displayInfo?: string;
  };
}

export interface BookingIntegration {
  availableSlots: Array<{
    date: string;
    time: string;
    duration: number;
    agentId: string;
    agentName: string;
    agentVoice: string;
  }>;
  bookingConfirmation: {
    bookingId: string;
    date: string;
    time: string;
    agent: string;
    location: string;
    confirmationCode: string;
  };
}

export class EnhancedVoiceFirstPropertyTours {
  private sensayAPI: SensayAPI;
  private tourStates: Map<string, InteractiveTourState> = new Map();
  private propertyTours: Map<string, PropertyTourData> = new Map();

  constructor() {
    this.sensayAPI = new SensayAPI();
  }

  async startVoiceTour(propertyId: string, userId: string): Promise<VoiceTourResponse> {
    try {
      // Load property tour data
      const tourData = await this.loadPropertyTourData(propertyId);
      
      // Initialize tour state
      const tourState: InteractiveTourState = {
        currentRoom: 'entrance',
        tourProgress: 0,
        visitedRooms: ['entrance'],
        userQuestions: [],
        bookmarkedFeatures: [],
        tourStartTime: new Date(),
        estimatedCompletionTime: tourData.rooms.length * 3 // 3 minutes per room
      };

      this.tourStates.set(userId, tourState);
      this.propertyTours.set(userId, tourData);

      // Generate welcome message
      const welcomeMessage = await this.generateWelcomeMessage(tourData, tourState);
      
      // Convert to speech using Eleven Labs
      const speechResponse = await elevenLabsService.generateSpeech(welcomeMessage, undefined, {
        voice_settings: {
          stability: 0.85,
          similarity_boost: 0.95,
          style: 0.3
        }
      });

      if (!speechResponse.success) {
        throw new Error('Failed to generate welcome speech');
      }

      return {
        audioUrl: speechResponse.audio_url!,
        transcript: welcomeMessage,
        nextSuggestions: this.getNextSuggestions(tourState, tourData),
        tourState
      };
    } catch (error) {
      console.error('Failed to start voice tour:', error);
      throw new Error('Unable to start voice tour');
    }
  }

  async processVoiceCommand(
    command: string,
    userId: string,
    audioData?: ArrayBuffer
  ): Promise<VoiceTourResponse> {
    try {
      const tourState = this.tourStates.get(userId);
      const tourData = this.propertyTours.get(userId);

      if (!tourState || !tourData) {
        throw new Error('No active tour found');
      }

      // Process voice command with Sensay
      const voiceCommand = await this.processVoiceCommandWithAI(command, tourState, tourData);

      // Generate response based on command
      const response = await this.generateCommandResponse(voiceCommand, tourState, tourData);

      // Update tour state
      this.updateTourState(tourState, voiceCommand);

      // Convert response to speech
      const speechResponse = await elevenLabsService.generateSpeech(response.transcript, undefined, {
        voice_settings: {
          stability: 0.85,
          similarity_boost: 0.95,
          style: 0.3
        }
      });

      if (!speechResponse.success) {
        throw new Error('Failed to generate speech response');
      }

      return {
        audioUrl: speechResponse.audio_url!,
        transcript: response.transcript,
        nextSuggestions: this.getNextSuggestions(tourState, tourData),
        tourState,
        visualCues: response.visualCues
      };
    } catch (error) {
      console.error('Failed to process voice command:', error);
      throw new Error('Unable to process voice command');
    }
  }

  async bookViewing(userId: string, preferences?: {
    preferredDate?: string;
    preferredTime?: string;
    duration?: number;
  }): Promise<BookingIntegration> {
    try {
      const tourState = this.tourStates.get(userId);
      const tourData = this.propertyTours.get(userId);

      if (!tourState || !tourData) {
        throw new Error('No active tour found');
      }

      // Get available slots
      const availableSlots = await this.getAvailableViewingSlots(tourData.propertyId, preferences);

      // Generate booking confirmation message
      const confirmationMessage = await this.generateBookingConfirmation(availableSlots[0]);

      // Convert to speech
      const speechResponse = await elevenLabsService.generateSpeech(confirmationMessage);

      if (!speechResponse.success) {
        throw new Error('Failed to generate booking confirmation speech');
      }

      return {
        availableSlots,
        bookingConfirmation: {
          bookingId: `booking_${Date.now()}`,
          date: availableSlots[0].date,
          time: availableSlots[0].time,
          agent: availableSlots[0].agentName,
          location: tourData.address,
          confirmationCode: `VC${Math.random().toString(36).substr(2, 6).toUpperCase()}`
        }
      };
    } catch (error) {
      console.error('Failed to book viewing:', error);
      throw new Error('Unable to book viewing');
    }
  }

  async compareProperties(propertyIds: string[], userId: string): Promise<VoiceTourResponse> {
    try {
      const tourState = this.tourStates.get(userId);
      
      if (!tourState) {
        throw new Error('No active tour found');
      }

      // Load comparison data
      const comparisonData = await this.loadPropertyComparisonData(propertyIds);

      // Generate comparison using Sensay
      const comparisonMessage = await this.generatePropertyComparison(comparisonData, tourState);

      // Convert to speech
      const speechResponse = await elevenLabsService.generateSpeech(comparisonMessage, undefined, {
        voice_settings: {
          stability: 0.85,
          similarity_boost: 0.95,
          style: 0.3
        }
      });

      if (!speechResponse.success) {
        throw new Error('Failed to generate comparison speech');
      }

      return {
        audioUrl: speechResponse.audio_url!,
        transcript: comparisonMessage,
        nextSuggestions: ['Book a viewing', 'Ask specific questions', 'Compare features'],
        tourState
      };
    } catch (error) {
      console.error('Failed to compare properties:', error);
      throw new Error('Unable to compare properties');
    }
  }

  private async loadPropertyTourData(propertyId: string): Promise<PropertyTourData> {
    try {
      // Load property data from Supabase
      const { data: propertyData, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (error) {
        throw error;
      }

      // Use Sensay to generate tour data
      const prompt = `
        As an AI property tour guide, create a comprehensive voice tour for this property:
        
        Property Data: ${JSON.stringify(propertyData, null, 2)}
        
        Provide tour data in JSON format:
        {
          "propertyId": "${propertyId}",
          "address": "property address",
          "rooms": [
            {
              "name": "room name",
              "type": "bedroom/bathroom/kitchen/living/dining/study/garage/outdoor/other",
              "description": "detailed room description",
              "features": ["feature1", "feature2"],
              "measurements": "room measurements",
              "highlights": ["highlight1", "highlight2"],
              "voicePrompts": ["prompt1", "prompt2"]
            }
          ],
          "navigation": [
            {
              "from": "room1",
              "to": "room2",
              "direction": "navigation direction",
              "description": "navigation description"
            }
          ],
          "highlights": [
            {
              "feature": "feature name",
              "description": "feature description",
              "location": "feature location",
              "importance": "high/medium/low"
            }
          ]
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'property_tour_creation',
        expertise: 'property_tours'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Failed to load property tour data, using fallback:', error);
      return this.getFallbackTourData(propertyId);
    }
  }

  private async generateWelcomeMessage(tourData: PropertyTourData, tourState: InteractiveTourState): Promise<string> {
    try {
      const prompt = `
        As Alex, the AI property tour guide, create a warm welcome message for this property tour:
        
        Property: ${tourData.address}
        Estimated Tour Time: ${tourState.estimatedCompletionTime} minutes
        
        Create a friendly, engaging welcome message that:
        - Introduces yourself as Alex
        - Welcomes the visitor
        - Explains the voice tour features
        - Sets expectations
        - Encourages interaction
        
        Keep it conversational and enthusiastic, around 100-150 words.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'welcome_message',
        expertise: 'property_tours'
      });

      return response.response;
    } catch (error) {
      console.warn('Failed to generate welcome message, using fallback:', error);
      return `Welcome to ${tourData.address}! I'm Alex, your AI property tour guide. I'll be taking you through this beautiful property today. You can ask me questions about any room or feature, and I'll provide detailed information. Just speak naturally - I can understand your voice commands. Let's start exploring! What would you like to know about this property?`;
    }
  }

  private async processVoiceCommandWithAI(
    command: string,
    tourState: InteractiveTourState,
    tourData: PropertyTourData
  ): Promise<VoiceCommand> {
    try {
      const prompt = `
        As an AI voice command processor, analyze this voice command during a property tour:
        
        Command: "${command}"
        Current Room: ${tourState.currentRoom}
        Tour Progress: ${tourState.tourProgress}%
        Visited Rooms: ${tourState.visitedRooms.join(', ')}
        
        Available Rooms: ${tourData.rooms.map(r => r.name).join(', ')}
        Available Features: ${tourData.highlights.map(h => h.feature).join(', ')}
        
        Analyze the command and provide JSON response:
        {
          "command": "original command",
          "intent": "navigate/describe/question/control/book/compare",
          "entities": {
            "room": "room name if mentioned",
            "feature": "feature name if mentioned",
            "direction": "north/south/east/west/upstairs/downstairs if mentioned",
            "action": "specific action if mentioned"
          },
          "confidence": 0-100
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'voice_command_processing',
        expertise: 'voice_interfaces'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Failed to process voice command with AI, using fallback:', error);
      return this.getFallbackVoiceCommand(command);
    }
  }

  private async generateCommandResponse(
    voiceCommand: VoiceCommand,
    tourState: InteractiveTourState,
    tourData: PropertyTourData
  ): Promise<{ transcript: string; visualCues?: any }> {
    try {
      let response = '';
      const visualCues: any = {};

      switch (voiceCommand.intent) {
        case 'navigate':
          response = await this.generateNavigationResponse(voiceCommand, tourState, tourData);
          visualCues.highlightRoom = voiceCommand.entities.room;
          break;
        case 'describe':
          response = await this.generateDescriptionResponse(voiceCommand, tourState, tourData);
          visualCues.showFeature = voiceCommand.entities.feature;
          break;
        case 'question':
          response = await this.generateQuestionResponse(voiceCommand, tourState, tourData);
          break;
        case 'book':
          response = await this.generateBookingResponse(voiceCommand, tourState, tourData);
          break;
        case 'compare':
          response = await this.generateComparisonResponse(voiceCommand, tourState, tourData);
          break;
        default:
          response = await this.generateGeneralResponse(voiceCommand, tourState, tourData);
      }

      return { transcript: response, visualCues };
    } catch (error) {
      console.warn('Failed to generate command response, using fallback:', error);
      return {
        transcript: "I understand you'd like to know more about this property. Could you please be more specific about what you'd like to see or know?",
        visualCues: {}
      };
    }
  }

  private async generateNavigationResponse(
    voiceCommand: VoiceCommand,
    tourState: InteractiveTourState,
    tourData: PropertyTourData
  ): Promise<string> {
    try {
      const prompt = `
        As Alex, the AI property tour guide, respond to a navigation request:
        
        Command: "${voiceCommand.command}"
        Requested Room: ${voiceCommand.entities.room || 'current room'}
        Current Room: ${tourState.currentRoom}
        
        Available Rooms: ${tourData.rooms.map(r => r.name).join(', ')}
        
        Create a helpful navigation response that:
        - Acknowledges the request
        - Provides clear directions
        - Describes what they'll see
        - Maintains enthusiasm
        
        Keep it conversational and around 50-80 words.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'navigation_response',
        expertise: 'property_tours'
      });

      return response.response;
    } catch (error) {
      return `Let me take you to the ${voiceCommand.entities.room || 'next room'}. Follow me this way, and I'll show you what makes this space special.`;
    }
  }

  private async generateDescriptionResponse(
    voiceCommand: VoiceCommand,
    tourState: InteractiveTourState,
    tourData: PropertyTourData
  ): Promise<string> {
    try {
      const prompt = `
        As Alex, the AI property tour guide, provide a detailed description:
        
        Command: "${voiceCommand.command}"
        Requested Feature: ${voiceCommand.entities.feature || 'current room'}
        Current Room: ${tourState.currentRoom}
        
        Property Data: ${JSON.stringify(tourData, null, 2)}
        
        Create a detailed, engaging description that:
        - Highlights key features
        - Mentions measurements and details
        - Explains benefits
        - Maintains enthusiasm
        
        Keep it informative and around 80-120 words.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'description_response',
        expertise: 'property_tours'
      });

      return response.response;
    } catch (error) {
      return `This is a fantastic feature! Let me tell you about the ${voiceCommand.entities.feature || 'current room'}. It's beautifully designed with attention to detail and offers great functionality. The measurements are generous, and it really adds value to the property.`;
    }
  }

  private async generateQuestionResponse(
    voiceCommand: VoiceCommand,
    tourState: InteractiveTourState,
    tourData: PropertyTourData
  ): Promise<string> {
    try {
      const prompt = `
        As Alex, the AI property tour guide, answer a question:
        
        Question: "${voiceCommand.command}"
        Current Room: ${tourState.currentRoom}
        
        Property Data: ${JSON.stringify(tourData, null, 2)}
        
        Provide a helpful, accurate answer that:
        - Directly addresses the question
        - Provides relevant details
        - Offers additional helpful information
        - Maintains a friendly tone
        
        Keep it informative and around 60-100 words.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'question_response',
        expertise: 'property_tours'
      });

      return response.response;
    } catch (error) {
      return `That's a great question! Based on what I can see here, the answer would be... Let me provide you with the most accurate information I have about that.`;
    }
  }

  private async generateBookingResponse(
    voiceCommand: VoiceCommand,
    tourState: InteractiveTourState,
    tourData: PropertyTourData
  ): Promise<string> {
    try {
      const prompt = `
        As Alex, the AI property tour guide, respond to a booking request:
        
        Command: "${voiceCommand.command}"
        Property: ${tourData.address}
        
        Create a response that:
        - Acknowledges the booking interest
        - Explains the booking process
        - Offers to help with scheduling
        - Maintains enthusiasm
        
        Keep it helpful and around 60-80 words.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'booking_response',
        expertise: 'property_tours'
      });

      return response.response;
    } catch (error) {
      return `I'd be happy to help you book a viewing! I can check our available times and get you scheduled with one of our agents. Would you like me to find some available slots for you?`;
    }
  }

  private async generateComparisonResponse(
    voiceCommand: VoiceCommand,
    tourState: InteractiveTourState,
    tourData: PropertyTourData
  ): Promise<string> {
    try {
      const prompt = `
        As Alex, the AI property tour guide, respond to a comparison request:
        
        Command: "${voiceCommand.command}"
        Current Property: ${tourData.address}
        
        Create a response that:
        - Acknowledges the comparison request
        - Offers to help with comparisons
        - Explains what you can compare
        - Maintains enthusiasm
        
        Keep it helpful and around 60-80 words.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'comparison_response',
        expertise: 'property_tours'
      });

      return response.response;
    } catch (error) {
      return `I can definitely help you compare properties! I can compare features, pricing, location benefits, and investment potential. What specific properties would you like me to compare this one with?`;
    }
  }

  private async generateGeneralResponse(
    voiceCommand: VoiceCommand,
    tourState: InteractiveTourState,
    tourData: PropertyTourData
  ): Promise<string> {
    try {
      const prompt = `
        As Alex, the AI property tour guide, respond to a general request:
        
        Command: "${voiceCommand.command}"
        Current Room: ${tourState.currentRoom}
        
        Create a helpful response that:
        - Acknowledges the request
        - Offers assistance
        - Suggests next steps
        - Maintains enthusiasm
        
        Keep it helpful and around 50-70 words.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'general_response',
        expertise: 'property_tours'
      });

      return response.response;
    } catch (error) {
      return `I'm here to help! You can ask me about any room, feature, or aspect of this property. What would you like to know more about?`;
    }
  }

  private updateTourState(tourState: InteractiveTourState, voiceCommand: VoiceCommand): void {
    // Update visited rooms if navigating
    if (voiceCommand.intent === 'navigate' && voiceCommand.entities.room) {
      if (!tourState.visitedRooms.includes(voiceCommand.entities.room)) {
        tourState.visitedRooms.push(voiceCommand.entities.room);
      }
      tourState.currentRoom = voiceCommand.entities.room;
    }

    // Update progress
    tourState.tourProgress = (tourState.visitedRooms.length / 10) * 100; // Assuming 10 total rooms

    // Add to questions if it's a question
    if (voiceCommand.intent === 'question') {
      tourState.userQuestions.push(voiceCommand.command);
    }
  }

  private getNextSuggestions(tourState: InteractiveTourState, tourData: PropertyTourData): string[] {
    const suggestions = [];
    
    // Room suggestions
    const unvisitedRooms = tourData.rooms
      .filter(room => !tourState.visitedRooms.includes(room.name))
      .slice(0, 2)
      .map(room => `Show me the ${room.name}`);
    
    suggestions.push(...unvisitedRooms);
    
    // Feature suggestions
    if (tourState.userQuestions.length < 3) {
      suggestions.push('Tell me about the key features');
      suggestions.push('What makes this property special?');
    }
    
    // Booking suggestion
    if (tourState.tourProgress > 50) {
      suggestions.push('I want to book a viewing');
    }
    
    return suggestions.slice(0, 3);
  }

  private async getAvailableViewingSlots(propertyId: string, preferences?: any): Promise<any[]> {
    // Mock implementation - in production, integrate with calendar system
    return [
      {
        date: '2024-09-15',
        time: '10:00 AM',
        duration: 60,
        agentId: 'agent_001',
        agentName: 'Sarah Johnson',
        agentVoice: 'sarah-professional'
      },
      {
        date: '2024-09-15',
        time: '2:00 PM',
        duration: 60,
        agentId: 'agent_002',
        agentName: 'Michael Chen',
        agentVoice: 'michael-friendly'
      }
    ];
  }

  private async generateBookingConfirmation(slot: any): Promise<string> {
    try {
      const prompt = `
        As Alex, the AI property tour guide, create a booking confirmation message:
        
        Agent: ${slot.agentName}
        Date: ${slot.date}
        Time: ${slot.time}
        Duration: ${slot.duration} minutes
        
        Create an enthusiastic confirmation message that:
        - Confirms the booking details
        - Introduces the agent
        - Sets expectations
        - Maintains excitement
        
        Keep it around 80-100 words.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'booking_confirmation',
        expertise: 'property_tours'
      });

      return response.response;
    } catch (error) {
      return `Excellent! I've booked your viewing for ${slot.date} at ${slot.time} with ${slot.agentName}. You'll receive a confirmation email shortly. ${slot.agentName} is one of our top agents and will be able to answer all your questions in person. I'm excited for you to see this property!`;
    }
  }

  private async loadPropertyComparisonData(propertyIds: string[]): Promise<any[]> {
    // Mock implementation - in production, load from database
    return propertyIds.map(id => ({
      id,
      address: `Property ${id}`,
      price: 800000 + Math.random() * 400000,
      bedrooms: 3 + Math.floor(Math.random() * 2),
      bathrooms: 2 + Math.floor(Math.random() * 2)
    }));
  }

  private async generatePropertyComparison(comparisonData: any[], tourState: InteractiveTourState): Promise<string> {
    try {
      const prompt = `
        As Alex, the AI property tour guide, create a property comparison:
        
        Properties to Compare: ${JSON.stringify(comparisonData, null, 2)}
        
        Create a helpful comparison that:
        - Highlights key differences
        - Mentions pros and cons
        - Provides recommendations
        - Maintains objectivity
        
        Keep it informative and around 120-150 words.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'property_comparison',
        expertise: 'property_tours'
      });

      return response.response;
    } catch (error) {
      return `Let me compare these properties for you. Each has its own unique advantages - some offer better location, others have more space or modern features. I'd be happy to discuss the specific benefits of each property in more detail.`;
    }
  }

  // Fallback methods
  private getFallbackTourData(propertyId: string): PropertyTourData {
    return {
      propertyId,
      address: '123 Sample Street',
      rooms: [
        {
          name: 'entrance',
          type: 'other',
          description: 'Welcome to this beautiful property',
          features: ['High ceilings', 'Natural light'],
          measurements: '3m x 2m',
          highlights: ['First impression', 'Natural light'],
          voicePrompts: ['Welcome', 'Entrance hall']
        },
        {
          name: 'living room',
          type: 'living',
          description: 'Spacious living area with modern features',
          features: ['Open plan', 'Modern finishes'],
          measurements: '5m x 4m',
          highlights: ['Open plan living', 'Modern design'],
          voicePrompts: ['Living room', 'Main living area']
        }
      ],
      navigation: [
        {
          from: 'entrance',
          to: 'living room',
          direction: 'straight ahead',
          description: 'Walk straight ahead into the living room'
        }
      ],
      highlights: [
        {
          feature: 'Modern kitchen',
          description: 'Fully equipped modern kitchen',
          location: 'Kitchen',
          importance: 'high'
        }
      ]
    };
  }

  private getFallbackVoiceCommand(command: string): VoiceCommand {
    return {
      command,
      intent: 'question',
      entities: {},
      confidence: 50
    };
  }
}

export const enhancedVoiceFirstPropertyTours = new EnhancedVoiceFirstPropertyTours();
