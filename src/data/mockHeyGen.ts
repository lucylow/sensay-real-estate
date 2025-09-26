/**
 * Mock data for HeyGen API integration
 * Provides realistic avatar and video generation data
 */

export interface MockHeyGenAvatar {
  avatar_id: string;
  name: string;
  description: string;
  gender: 'male' | 'female' | 'neutral';
  age_range: string;
  ethnicity: string;
  style: string;
  preview_url: string;
  thumbnail_url: string;
  tags: string[];
  is_premium: boolean;
  supported_languages: string[];
  voice_options: string[];
}

export interface MockHeyGenVideo {
  video_id: string;
  avatar_id: string;
  text: string;
  voice_id: string;
  status: 'processing' | 'completed' | 'failed';
  created_at: string;
  completed_at?: string;
  video_url?: string;
  thumbnail_url?: string;
  duration: number;
  resolution: string;
  format: string;
  file_size: number;
  error_message?: string;
}

export interface MockHeyGenVoice {
  voice_id: string;
  name: string;
  language: string;
  gender: 'male' | 'female';
  accent: string;
  description: string;
  preview_url: string;
  is_premium: boolean;
  supported_avatars: string[];
}

export interface MockHeyGenTask {
  task_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  started_at?: string;
  completed_at?: string;
  progress: number;
  estimated_completion?: string;
  error_message?: string;
  result?: {
    video_id: string;
    video_url: string;
    thumbnail_url: string;
  };
}

export const mockHeyGenAvatars: MockHeyGenAvatar[] = [
  {
    avatar_id: 'Marianne_CasualLook_public',
    name: 'Marianne',
    description: 'Professional woman in business casual attire, perfect for corporate presentations and educational content.',
    gender: 'female',
    age_range: '25-35',
    ethnicity: 'Caucasian',
    style: 'professional',
    preview_url: 'https://heygen-avatars.s3.amazonaws.com/marianne_preview.mp4',
    thumbnail_url: 'https://heygen-avatars.s3.amazonaws.com/marianne_thumb.jpg',
    tags: ['professional', 'business', 'education', 'corporate'],
    is_premium: false,
    supported_languages: ['en', 'es', 'fr', 'de'],
    voice_options: ['en_us_female_001', 'en_us_female_002', 'en_au_female_001']
  },
  {
    avatar_id: 'Adam_Professional_public',
    name: 'Adam',
    description: 'Confident male presenter in formal business attire, ideal for executive presentations and training videos.',
    gender: 'male',
    age_range: '30-40',
    ethnicity: 'Caucasian',
    style: 'professional',
    preview_url: 'https://heygen-avatars.s3.amazonaws.com/adam_preview.mp4',
    thumbnail_url: 'https://heygen-avatars.s3.amazonaws.com/adam_thumb.jpg',
    tags: ['professional', 'executive', 'training', 'formal'],
    is_premium: false,
    supported_languages: ['en', 'es', 'fr', 'de'],
    voice_options: ['en_us_male_001', 'en_us_male_002', 'en_au_male_001']
  },
  {
    avatar_id: 'Sarah_Friendly_public',
    name: 'Sarah',
    description: 'Warm and approachable female presenter, perfect for customer service and friendly explanations.',
    gender: 'female',
    age_range: '25-30',
    ethnicity: 'Asian',
    style: 'friendly',
    preview_url: 'https://heygen-avatars.s3.amazonaws.com/sarah_preview.mp4',
    thumbnail_url: 'https://heygen-avatars.s3.amazonaws.com/sarah_thumb.jpg',
    tags: ['friendly', 'customer_service', 'approachable', 'casual'],
    is_premium: false,
    supported_languages: ['en', 'zh', 'ja', 'ko'],
    voice_options: ['en_us_female_003', 'en_au_female_002', 'zh_female_001']
  },
  {
    avatar_id: 'Marcus_Expert_public',
    name: 'Marcus',
    description: 'Knowledgeable male expert in smart casual attire, excellent for technical explanations and tutorials.',
    gender: 'male',
    age_range: '35-45',
    ethnicity: 'African American',
    style: 'expert',
    preview_url: 'https://heygen-avatars.s3.amazonaws.com/marcus_preview.mp4',
    thumbnail_url: 'https://heygen-avatars.s3.amazonaws.com/marcus_thumb.jpg',
    tags: ['expert', 'technical', 'tutorial', 'knowledgeable'],
    is_premium: false,
    supported_languages: ['en', 'es', 'fr'],
    voice_options: ['en_us_male_003', 'en_us_male_004', 'en_uk_male_001']
  },
  {
    avatar_id: 'Lisa_RealEstate_public',
    name: 'Lisa',
    description: 'Professional real estate agent, specifically designed for property presentations and client interactions.',
    gender: 'female',
    age_range: '28-35',
    ethnicity: 'Caucasian',
    style: 'real_estate',
    preview_url: 'https://heygen-avatars.s3.amazonaws.com/lisa_preview.mp4',
    thumbnail_url: 'https://heygen-avatars.s3.amazonaws.com/lisa_thumb.jpg',
    tags: ['real_estate', 'property', 'sales', 'professional'],
    is_premium: true,
    supported_languages: ['en', 'es'],
    voice_options: ['en_us_female_004', 'en_au_female_003', 'es_female_001']
  },
  {
    avatar_id: 'David_Financial_public',
    name: 'David',
    description: 'Trustworthy financial advisor, perfect for investment presentations and financial planning content.',
    gender: 'male',
    age_range: '40-50',
    ethnicity: 'Caucasian',
    style: 'financial',
    preview_url: 'https://heygen-avatars.s3.amazonaws.com/david_preview.mp4',
    thumbnail_url: 'https://heygen-avatars.s3.amazonaws.com/david_thumb.jpg',
    tags: ['financial', 'investment', 'advisor', 'trustworthy'],
    is_premium: true,
    supported_languages: ['en', 'es', 'fr'],
    voice_options: ['en_us_male_005', 'en_uk_male_002', 'fr_male_001']
  }
];

export const mockHeyGenVoices: MockHeyGenVoice[] = [
  {
    voice_id: 'en_us_female_001',
    name: 'Emma',
    language: 'English',
    gender: 'female',
    accent: 'American',
    description: 'Clear, professional American female voice perfect for business presentations.',
    preview_url: 'https://heygen-voices.s3.amazonaws.com/emma_preview.mp3',
    is_premium: false,
    supported_avatars: ['Marianne_CasualLook_public', 'Sarah_Friendly_public']
  },
  {
    voice_id: 'en_us_male_001',
    name: 'James',
    language: 'English',
    gender: 'male',
    accent: 'American',
    description: 'Confident, authoritative American male voice ideal for executive content.',
    preview_url: 'https://heygen-voices.s3.amazonaws.com/james_preview.mp3',
    is_premium: false,
    supported_avatars: ['Adam_Professional_public', 'Marcus_Expert_public']
  },
  {
    voice_id: 'en_au_female_001',
    name: 'Olivia',
    language: 'English',
    gender: 'female',
    accent: 'Australian',
    description: 'Warm, friendly Australian female voice perfect for customer service.',
    preview_url: 'https://heygen-voices.s3.amazonaws.com/olivia_preview.mp3',
    is_premium: false,
    supported_avatars: ['Marianne_CasualLook_public', 'Sarah_Friendly_public']
  },
  {
    voice_id: 'en_uk_male_001',
    name: 'William',
    language: 'English',
    gender: 'male',
    accent: 'British',
    description: 'Sophisticated British male voice excellent for educational content.',
    preview_url: 'https://heygen-voices.s3.amazonaws.com/william_preview.mp3',
    is_premium: true,
    supported_avatars: ['Marcus_Expert_public', 'David_Financial_public']
  },
  {
    voice_id: 'es_female_001',
    name: 'Isabella',
    language: 'Spanish',
    gender: 'female',
    accent: 'Mexican',
    description: 'Professional Spanish female voice for international presentations.',
    preview_url: 'https://heygen-voices.s3.amazonaws.com/isabella_preview.mp3',
    is_premium: true,
    supported_avatars: ['Lisa_RealEstate_public']
  }
];

export const mockHeyGenVideos: MockHeyGenVideo[] = [
  {
    video_id: 'video_001',
    avatar_id: 'Marianne_CasualLook_public',
    text: 'Welcome to Sensay Real Estate. I\'m here to help you make informed property investment decisions using our advanced AI-powered analysis.',
    voice_id: 'en_us_female_001',
    status: 'completed',
    created_at: '2024-01-25T10:00:00Z',
    completed_at: '2024-01-25T10:02:30Z',
    video_url: 'https://heygen-videos.s3.amazonaws.com/video_001.mp4',
    thumbnail_url: 'https://heygen-videos.s3.amazonaws.com/video_001_thumb.jpg',
    duration: 12.5,
    resolution: '1920x1080',
    format: 'mp4',
    file_size: 5242880
  },
  {
    video_id: 'video_002',
    avatar_id: 'Adam_Professional_public',
    text: 'Our PropGuard AI platform provides comprehensive risk assessment and valuation analysis for properties across Australia.',
    voice_id: 'en_us_male_001',
    status: 'completed',
    created_at: '2024-01-25T10:05:00Z',
    completed_at: '2024-01-25T10:07:15Z',
    video_url: 'https://heygen-videos.s3.amazonaws.com/video_002.mp4',
    thumbnail_url: 'https://heygen-videos.s3.amazonaws.com/video_002_thumb.jpg',
    duration: 8.7,
    resolution: '1920x1080',
    format: 'mp4',
    file_size: 3145728
  },
  {
    video_id: 'video_003',
    avatar_id: 'Lisa_RealEstate_public',
    text: 'Let me show you how our blockchain-verified property analysis can help you identify the best investment opportunities.',
    voice_id: 'en_us_female_004',
    status: 'processing',
    created_at: '2024-01-25T10:10:00Z',
    duration: 0,
    resolution: '1920x1080',
    format: 'mp4',
    file_size: 0
  }
];

export const mockHeyGenTasks: MockHeyGenTask[] = [
  {
    task_id: 'task_001',
    status: 'completed',
    created_at: '2024-01-25T10:00:00Z',
    started_at: '2024-01-25T10:00:30Z',
    completed_at: '2024-01-25T10:02:30Z',
    progress: 100,
    result: {
      video_id: 'video_001',
      video_url: 'https://heygen-videos.s3.amazonaws.com/video_001.mp4',
      thumbnail_url: 'https://heygen-videos.s3.amazonaws.com/video_001_thumb.jpg'
    }
  },
  {
    task_id: 'task_002',
    status: 'processing',
    created_at: '2024-01-25T10:10:00Z',
    started_at: '2024-01-25T10:10:15Z',
    progress: 65,
    estimated_completion: '2024-01-25T10:12:00Z'
  },
  {
    task_id: 'task_003',
    status: 'failed',
    created_at: '2024-01-25T09:30:00Z',
    started_at: '2024-01-25T09:30:20Z',
    progress: 25,
    error_message: 'Text content exceeds maximum length limit'
  }
];

export const mockHeyGenAPIResponses = {
  success: {
    success: true,
    task_id: 'task_001',
    message: 'Video generation started successfully',
    estimated_completion: '2024-01-25T10:02:30Z'
  },
  error: {
    success: false,
    error: 'Invalid avatar ID provided',
    error_code: 'INVALID_AVATAR_ID'
  },
  task_status: {
    task_id: 'task_001',
    status: 'completed',
    progress: 100,
    result: {
      video_id: 'video_001',
      video_url: 'https://heygen-videos.s3.amazonaws.com/video_001.mp4',
      thumbnail_url: 'https://heygen-videos.s3.amazonaws.com/video_001_thumb.jpg'
    }
  }
};

export const mockHeyGenUsage = {
  current_month: {
    videos_generated: 47,
    minutes_used: 234,
    characters_processed: 15680,
    storage_used_mb: 1024
  },
  limits: {
    monthly_videos: 100,
    monthly_minutes: 500,
    monthly_characters: 50000,
    storage_limit_mb: 5000
  },
  subscription: {
    tier: 'pro',
    expires_at: '2024-02-25T00:00:00Z',
    auto_renew: true
  }
};

export const mockHeyGenTemplates = [
  {
    id: 'template_001',
    name: 'Property Introduction',
    description: 'Professional introduction for property presentations',
    avatar_id: 'Lisa_RealEstate_public',
    voice_id: 'en_us_female_004',
    text_template: 'Welcome to {{property_address}}. I\'m excited to show you this {{property_type}} with {{bedrooms}} bedrooms and {{bathrooms}} bathrooms.',
    category: 'real_estate',
    duration_estimate: 15
  },
  {
    id: 'template_002',
    name: 'Investment Analysis',
    description: 'Comprehensive investment analysis presentation',
    avatar_id: 'David_Financial_public',
    voice_id: 'en_us_male_005',
    text_template: 'Based on our analysis, this property shows {{risk_level}} risk with an estimated return of {{return_percentage}}%. The current market valuation is {{estimated_value}}.',
    category: 'financial',
    duration_estimate: 25
  },
  {
    id: 'template_003',
    name: 'Market Update',
    description: 'Current market trends and insights',
    avatar_id: 'Marianne_CasualLook_public',
    voice_id: 'en_us_female_001',
    text_template: 'The {{suburb}} market is currently showing {{market_sentiment}} sentiment with {{growth_rate}}% growth over the past 12 months.',
    category: 'market',
    duration_estimate: 20
  }
];

