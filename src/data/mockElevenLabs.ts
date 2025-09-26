/**
 * Mock data for ElevenLabs API integration
 * Provides realistic voice data, models, and user information
 */

export interface MockVoice {
  voice_id: string;
  name: string;
  category: string;
  description?: string;
  labels?: Record<string, string>;
  preview_url?: string;
  available_for_tiers?: string[];
  settings?: {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

export interface MockModel {
  model_id: string;
  name: string;
  can_do_text_to_speech: boolean;
  can_do_voice_conversion: boolean;
  can_use_style: boolean;
  can_use_pronunciation_dictionary: boolean;
  token_cost_factor: number;
  max_characters_request_free_user: number;
  max_characters_request_subscribed_user: number;
  languages: Array<{
    language_id: string;
    name: string;
  }>;
}

export interface MockUserInfo {
  character_count: number;
  character_limit: number;
  can_extend_character_limit: boolean;
  subscription_tier: string;
  remaining_characters: number;
}

export const mockVoices: MockVoice[] = [
  {
    voice_id: 'pNInz6obpgDQGcFmaJgB',
    name: 'Adam',
    category: 'American',
    description: 'A warm, professional male voice perfect for business and educational content.',
    labels: {
      gender: 'male',
      age: 'adult',
      accent: 'american',
      use_case: 'professional'
    },
    preview_url: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/Adam.mp3',
    available_for_tiers: ['free', 'starter', 'creator', 'pro'],
    settings: {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.0,
      use_speaker_boost: true
    }
  },
  {
    voice_id: 'EXAVITQu4vr4xnSDxMaL',
    name: 'Bella',
    category: 'American',
    description: 'A clear, friendly female voice ideal for customer service and presentations.',
    labels: {
      gender: 'female',
      age: 'adult',
      accent: 'american',
      use_case: 'customer_service'
    },
    preview_url: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/Bella.mp3',
    available_for_tiers: ['free', 'starter', 'creator', 'pro'],
    settings: {
      stability: 0.6,
      similarity_boost: 0.8,
      style: 0.2,
      use_speaker_boost: true
    }
  },
  {
    voice_id: 'VR6AewLTigWG4xSOukaG',
    name: 'Arnold',
    category: 'American',
    description: 'A confident, authoritative male voice perfect for announcements and narration.',
    labels: {
      gender: 'male',
      age: 'adult',
      accent: 'american',
      use_case: 'announcement'
    },
    preview_url: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/Arnold.mp3',
    available_for_tiers: ['starter', 'creator', 'pro'],
    settings: {
      stability: 0.7,
      similarity_boost: 0.6,
      style: 0.1,
      use_speaker_boost: true
    }
  },
  {
    voice_id: 'AZnzlk1XvdvUeBnXmlld',
    name: 'Domi',
    category: 'American',
    description: 'A dynamic, energetic female voice great for marketing and engaging content.',
    labels: {
      gender: 'female',
      age: 'young_adult',
      accent: 'american',
      use_case: 'marketing'
    },
    preview_url: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/Domi.mp3',
    available_for_tiers: ['free', 'starter', 'creator', 'pro'],
    settings: {
      stability: 0.4,
      similarity_boost: 0.7,
      style: 0.5,
      use_speaker_boost: true
    }
  },
  {
    voice_id: 'ErXwobaYiN019PkySvjV',
    name: 'Elli',
    category: 'American',
    description: 'A calm, soothing female voice perfect for meditation and relaxation content.',
    labels: {
      gender: 'female',
      age: 'adult',
      accent: 'american',
      use_case: 'relaxation'
    },
    preview_url: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/Elli.mp3',
    available_for_tiers: ['free', 'starter', 'creator', 'pro'],
    settings: {
      stability: 0.8,
      similarity_boost: 0.5,
      style: 0.1,
      use_speaker_boost: true
    }
  },
  {
    voice_id: 'MF3mGyEYCl7XYWbV9V6O',
    name: 'Josh',
    category: 'American',
    description: 'A casual, conversational male voice ideal for podcasts and informal content.',
    labels: {
      gender: 'male',
      age: 'young_adult',
      accent: 'american',
      use_case: 'podcast'
    },
    preview_url: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/Josh.mp3',
    available_for_tiers: ['free', 'starter', 'creator', 'pro'],
    settings: {
      stability: 0.5,
      similarity_boost: 0.6,
      style: 0.3,
      use_speaker_boost: true
    }
  },
  {
    voice_id: 'TxGEqnHWrfWFTfGW9XjX',
    name: 'Rachel',
    category: 'American',
    description: 'A professional, articulate female voice excellent for news and educational content.',
    labels: {
      gender: 'female',
      age: 'adult',
      accent: 'american',
      use_case: 'news'
    },
    preview_url: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/Rachel.mp3',
    available_for_tiers: ['free', 'starter', 'creator', 'pro'],
    settings: {
      stability: 0.6,
      similarity_boost: 0.8,
      style: 0.0,
      use_speaker_boost: true
    }
  },
  {
    voice_id: 'VR6AewLTigWG4xSOukaG',
    name: 'Sam',
    category: 'American',
    description: 'A versatile, neutral voice suitable for a wide range of applications.',
    labels: {
      gender: 'neutral',
      age: 'adult',
      accent: 'american',
      use_case: 'general'
    },
    preview_url: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/Sam.mp3',
    available_for_tiers: ['free', 'starter', 'creator', 'pro'],
    settings: {
      stability: 0.5,
      similarity_boost: 0.7,
      style: 0.2,
      use_speaker_boost: true
    }
  }
];

export const mockModels: MockModel[] = [
  {
    model_id: 'eleven_monolingual_v1',
    name: 'Eleven Monolingual v1',
    can_do_text_to_speech: true,
    can_do_voice_conversion: false,
    can_use_style: false,
    can_use_pronunciation_dictionary: false,
    token_cost_factor: 1.0,
    max_characters_request_free_user: 10000,
    max_characters_request_subscribed_user: 50000,
    languages: [
      { language_id: 'en', name: 'English' }
    ]
  },
  {
    model_id: 'eleven_multilingual_v1',
    name: 'Eleven Multilingual v1',
    can_do_text_to_speech: true,
    can_do_voice_conversion: false,
    can_use_style: true,
    can_use_pronunciation_dictionary: false,
    token_cost_factor: 1.2,
    max_characters_request_free_user: 10000,
    max_characters_request_subscribed_user: 50000,
    languages: [
      { language_id: 'en', name: 'English' },
      { language_id: 'es', name: 'Spanish' },
      { language_id: 'fr', name: 'French' },
      { language_id: 'de', name: 'German' },
      { language_id: 'it', name: 'Italian' },
      { language_id: 'pt', name: 'Portuguese' },
      { language_id: 'pl', name: 'Polish' },
      { language_id: 'tr', name: 'Turkish' },
      { language_id: 'ru', name: 'Russian' },
      { language_id: 'nl', name: 'Dutch' },
      { language_id: 'cs', name: 'Czech' },
      { language_id: 'ar', name: 'Arabic' },
      { language_id: 'zh', name: 'Chinese' },
      { language_id: 'ja', name: 'Japanese' },
      { language_id: 'hu', name: 'Hungarian' },
      { language_id: 'ko', name: 'Korean' }
    ]
  },
  {
    model_id: 'eleven_multilingual_v2',
    name: 'Eleven Multilingual v2',
    can_do_text_to_speech: true,
    can_do_voice_conversion: false,
    can_use_style: true,
    can_use_pronunciation_dictionary: true,
    token_cost_factor: 1.5,
    max_characters_request_free_user: 10000,
    max_characters_request_subscribed_user: 50000,
    languages: [
      { language_id: 'en', name: 'English' },
      { language_id: 'es', name: 'Spanish' },
      { language_id: 'fr', name: 'French' },
      { language_id: 'de', name: 'German' },
      { language_id: 'it', name: 'Italian' },
      { language_id: 'pt', name: 'Portuguese' },
      { language_id: 'pl', name: 'Polish' },
      { language_id: 'tr', name: 'Turkish' },
      { language_id: 'ru', name: 'Russian' },
      { language_id: 'nl', name: 'Dutch' },
      { language_id: 'cs', name: 'Czech' },
      { language_id: 'ar', name: 'Arabic' },
      { language_id: 'zh', name: 'Chinese' },
      { language_id: 'ja', name: 'Japanese' },
      { language_id: 'hu', name: 'Hungarian' },
      { language_id: 'ko', name: 'Korean' }
    ]
  }
];

export const mockUserInfo: MockUserInfo = {
  character_count: 12500,
  character_limit: 100000,
  can_extend_character_limit: true,
  subscription_tier: 'creator',
  remaining_characters: 87500
};

export const mockVoiceSettings = {
  stability: 0.5,
  similarity_boost: 0.75,
  style: 0.2,
  use_speaker_boost: true
};

export const mockClonedVoices = [
  {
    voice_id: 'cloned_voice_001',
    name: 'Sensay Professional',
    description: 'Custom voice for Sensay real estate presentations',
    category: 'cloned',
    labels: {
      purpose: 'real_estate',
      client: 'sensay',
      created_date: '2024-01-15'
    },
    settings: {
      stability: 0.6,
      similarity_boost: 0.8,
      style: 0.1,
      use_speaker_boost: true
    }
  },
  {
    voice_id: 'cloned_voice_002',
    name: 'Property Analyst',
    description: 'Voice optimized for property analysis and reporting',
    category: 'cloned',
    labels: {
      purpose: 'analysis',
      domain: 'real_estate',
      created_date: '2024-01-20'
    },
    settings: {
      stability: 0.7,
      similarity_boost: 0.7,
      style: 0.0,
      use_speaker_boost: true
    }
  }
];

export const mockAudioTracks = [
  {
    id: 'track_001',
    text: 'Welcome to Sensay Real Estate. Your intelligent property analysis assistant is ready to help you make informed investment decisions.',
    voiceId: 'pNInz6obpgDQGcFmaJgB',
    duration: 8.5,
    timestamp: new Date(Date.now() - 300000) // 5 minutes ago
  },
  {
    id: 'track_002',
    text: 'Based on current market analysis, this property shows strong investment potential with a 12% projected annual return.',
    voiceId: 'EXAVITQu4vr4xnSDxMaL',
    duration: 12.3,
    timestamp: new Date(Date.now() - 180000) // 3 minutes ago
  },
  {
    id: 'track_003',
    text: 'Environmental risk assessment indicates low flood risk and moderate fire risk for this location.',
    voiceId: 'VR6AewLTigWG4xSOukaG',
    duration: 9.7,
    timestamp: new Date(Date.now() - 60000) // 1 minute ago
  }
];

export const mockTTSResponse = {
  success: true,
  audio_url: 'blob:https://sensay-real-estate.com/mock-audio-123',
  request_id: 'req_mock_001',
  duration: 8.5,
  characters_used: 156
};

export const mockErrorResponses = {
  api_key_invalid: {
    success: false,
    error: 'Invalid API key. Please check your VITE_ELEVENLABS_API_KEY environment variable.',
    error_code: 'invalid_api_key'
  },
  rate_limit_exceeded: {
    success: false,
    error: 'Rate limit exceeded. Please wait before making another request.',
    error_code: 'rate_limit_exceeded'
  },
  character_limit_exceeded: {
    success: false,
    error: 'Character limit exceeded. Please upgrade your subscription.',
    error_code: 'character_limit_exceeded'
  },
  voice_not_found: {
    success: false,
    error: 'Voice not found. Please check the voice ID.',
    error_code: 'voice_not_found'
  }
};

export const mockSubscriptionTiers = [
  {
    name: 'Free',
    price: 0,
    character_limit: 10000,
    voices_limit: 8,
    features: [
      '8 premade voices',
      '10,000 characters per month',
      'Basic voice settings',
      'Standard quality'
    ],
    limitations: [
      'No voice cloning',
      'No pronunciation dictionary',
      'Limited customer support'
    ]
  },
  {
    name: 'Starter',
    price: 5,
    character_limit: 30000,
    voices_limit: 8,
    features: [
      '8 premade voices',
      '30,000 characters per month',
      'Basic voice settings',
      'Standard quality',
      'Priority support'
    ],
    limitations: [
      'No voice cloning',
      'No pronunciation dictionary'
    ]
  },
  {
    name: 'Creator',
    price: 22,
    character_limit: 100000,
    voices_limit: 30,
    features: [
      '30 custom voices',
      '100,000 characters per month',
      'Advanced voice settings',
      'High quality audio',
      'Voice cloning',
      'Pronunciation dictionary',
      'Priority support'
    ],
    limitations: [
      'Limited commercial use'
    ]
  },
  {
    name: 'Pro',
    price: 99,
    character_limit: 500000,
    voices_limit: 160,
    features: [
      '160 custom voices',
      '500,000 characters per month',
      'Advanced voice settings',
      'Highest quality audio',
      'Voice cloning',
      'Pronunciation dictionary',
      'Commercial license',
      'API access',
      'Priority support'
    ],
    limitations: []
  }
];
