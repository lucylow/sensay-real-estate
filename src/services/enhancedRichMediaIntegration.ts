import { SensayAPI } from '@/services/api/sensay';
import { supabase } from '@/integrations/supabase/client';

export interface PropertyVideoPreview {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number; // seconds
  quality: '720p' | '1080p' | '4K';
  type: 'walkthrough' | 'drone' | 'neighborhood' | 'virtual_staging' | 'before_after';
  features: string[];
  highlights: string[];
  accessibility: {
    captions: boolean;
    audioDescription: boolean;
    signLanguage: boolean;
  };
  analytics: {
    views: number;
    engagement: number;
    completionRate: number;
    averageWatchTime: number;
  };
}

export interface VirtualTour3D {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  tourUrl: string;
  thumbnailUrl: string;
  type: 'matterport' | 'custom_3d' | 'photogrammetry' | 'lidar_scan';
  rooms: Array<{
    name: string;
    type: string;
    hotspots: Array<{
      position: { x: number; y: number; z: number };
      type: 'info' | 'navigation' | 'media' | 'interaction';
      content: string;
      mediaUrl?: string;
    }>;
    measurements: {
      length: number;
      width: number;
      height: number;
      area: number;
    };
    features: string[];
  }>;
  navigation: {
    startRoom: string;
    path: Array<{
      from: string;
      to: string;
      direction: string;
    }>;
  };
  interactive: {
    measurements: boolean;
    annotations: boolean;
    sharing: boolean;
    booking: boolean;
    comparison: boolean;
  };
  performance: {
    loadTime: number;
    frameRate: number;
    quality: 'low' | 'medium' | 'high' | 'ultra';
    compatibility: string[];
  };
}

export interface ARPropertyVisualization {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  arUrl: string;
  type: 'furniture_placement' | 'renovation_preview' | 'exterior_changes' | 'room_planning';
  features: {
    realTimeRendering: boolean;
    physicsSimulation: boolean;
    lightingAdjustment: boolean;
    materialSwapping: boolean;
    scaleAdjustment: boolean;
  };
  content: Array<{
    category: 'furniture' | 'appliances' | 'decor' | 'materials' | 'plants';
    items: Array<{
      name: string;
      modelUrl: string;
      thumbnailUrl: string;
      dimensions: { width: number; height: number; depth: number };
      price?: number;
      brand?: string;
      description: string;
    }>;
  }>;
  compatibility: {
    ios: boolean;
    android: boolean;
    web: boolean;
    arKit: boolean;
    arCore: boolean;
  };
  analytics: {
    usage: number;
    popularItems: string[];
    averageSessionTime: number;
    conversionRate: number;
  };
}

export interface RichMediaContent {
  propertyId: string;
  videos: PropertyVideoPreview[];
  virtualTours: VirtualTour3D[];
  arVisualizations: ARPropertyVisualization[];
  images: Array<{
    id: string;
    url: string;
    thumbnailUrl: string;
    type: 'interior' | 'exterior' | 'aerial' | 'lifestyle' | 'detail';
    room?: string;
    description: string;
    tags: string[];
    quality: 'standard' | 'hd' | '4k';
  }>;
  floorPlans: Array<{
    id: string;
    url: string;
    type: '2d' | '3d' | 'interactive';
    level: string;
    measurements: boolean;
    interactive: boolean;
  }>;
  neighborhood: {
    streetView: string;
    satelliteView: string;
    amenities: Array<{
      name: string;
      type: 'school' | 'hospital' | 'shopping' | 'restaurant' | 'park' | 'transport';
      distance: number;
      rating: number;
      imageUrl?: string;
    }>;
  };
}

export interface MediaEngagementAnalytics {
  propertyId: string;
  totalViews: number;
  engagementMetrics: {
    videos: {
      totalViews: number;
      averageWatchTime: number;
      completionRate: number;
      mostPopular: string;
    };
    virtualTours: {
      totalTours: number;
      averageTourTime: number;
      completionRate: number;
      mostVisitedRooms: string[];
    };
    arVisualizations: {
      totalSessions: number;
      averageSessionTime: number;
      mostUsedFeatures: string[];
      conversionRate: number;
    };
  };
  userBehavior: {
    preferredMediaType: 'video' | 'virtual_tour' | 'ar' | 'images';
    peakUsageTimes: string[];
    deviceTypes: { mobile: number; tablet: number; desktop: number };
    geographicDistribution: Array<{
      location: string;
      views: number;
    }>;
  };
  conversionImpact: {
    mediaToInquiry: number;
    mediaToViewing: number;
    mediaToOffer: number;
    mediaToSale: number;
  };
}

export class EnhancedRichMediaIntegration {
  private sensayAPI: SensayAPI;
  private mediaCache: Map<string, RichMediaContent> = new Map();

  constructor() {
    this.sensayAPI = new SensayAPI();
  }

  async getRichMediaContent(propertyId: string): Promise<RichMediaContent> {
    try {
      // Check cache first
      if (this.mediaCache.has(propertyId)) {
        return this.mediaCache.get(propertyId)!;
      }

      // Fetch from Supabase
      const { data: propertyData, error } = await supabase
        .from('properties')
        .select('*, rich_media_content(*)')
        .eq('id', propertyId)
        .single();

      if (error) {
        throw error;
      }

      // Enhance with AI-generated content
      const enhancedContent = await this.enhanceMediaContentWithAI(propertyData);

      // Cache the result
      this.mediaCache.set(propertyId, enhancedContent);

      return enhancedContent;
    } catch (error) {
      console.error('Failed to get rich media content:', error);
      throw new Error('Unable to retrieve rich media content');
    }
  }

  async generatePropertyVideoPreview(
    propertyId: string,
    type: PropertyVideoPreview['type'],
    preferences?: any
  ): Promise<PropertyVideoPreview> {
    try {
      // Get property data
      const propertyData = await this.getPropertyData(propertyId);

      // Generate video content using AI
      const videoContent = await this.generateVideoContentWithAI(propertyData, type, preferences);

      // Create video preview
      const videoPreview: PropertyVideoPreview = {
        id: `video_${propertyId}_${type}_${Date.now()}`,
        propertyId,
        title: videoContent.title,
        description: videoContent.description,
        videoUrl: videoContent.videoUrl,
        thumbnailUrl: videoContent.thumbnailUrl,
        duration: videoContent.duration,
        quality: '1080p',
        type,
        features: videoContent.features,
        highlights: videoContent.highlights,
        accessibility: {
          captions: true,
          audioDescription: true,
          signLanguage: false
        },
        analytics: {
          views: 0,
          engagement: 0,
          completionRate: 0,
          averageWatchTime: 0
        }
      };

      // Store in Supabase
      await this.storeVideoPreview(videoPreview);

      return videoPreview;
    } catch (error) {
      console.error('Failed to generate property video preview:', error);
      throw new Error('Unable to generate property video preview');
    }
  }

  async createVirtualTour3D(
    propertyId: string,
    type: VirtualTour3D['type'],
    options?: any
  ): Promise<VirtualTour3D> {
    try {
      // Get property data
      const propertyData = await this.getPropertyData(propertyId);

      // Generate 3D tour using AI
      const tourContent = await this.generateVirtualTourWithAI(propertyData, type, options);

      // Create virtual tour
      const virtualTour: VirtualTour3D = {
        id: `tour_${propertyId}_${type}_${Date.now()}`,
        propertyId,
        title: tourContent.title,
        description: tourContent.description,
        tourUrl: tourContent.tourUrl,
        thumbnailUrl: tourContent.thumbnailUrl,
        type,
        rooms: tourContent.rooms,
        navigation: tourContent.navigation,
        interactive: {
          measurements: true,
          annotations: true,
          sharing: true,
          booking: true,
          comparison: true
        },
        performance: {
          loadTime: 3.5,
          frameRate: 60,
          quality: 'high',
          compatibility: ['web', 'mobile', 'vr']
        }
      };

      // Store in Supabase
      await this.storeVirtualTour(virtualTour);

      return virtualTour;
    } catch (error) {
      console.error('Failed to create virtual tour 3D:', error);
      throw new Error('Unable to create virtual tour 3D');
    }
  }

  async createARVisualization(
    propertyId: string,
    type: ARPropertyVisualization['type'],
    content?: any
  ): Promise<ARPropertyVisualization> {
    try {
      // Get property data
      const propertyData = await this.getPropertyData(propertyId);

      // Generate AR content using AI
      const arContent = await this.generateARContentWithAI(propertyData, type, content);

      // Create AR visualization
      const arVisualization: ARPropertyVisualization = {
        id: `ar_${propertyId}_${type}_${Date.now()}`,
        propertyId,
        title: arContent.title,
        description: arContent.description,
        arUrl: arContent.arUrl,
        type,
        features: {
          realTimeRendering: true,
          physicsSimulation: true,
          lightingAdjustment: true,
          materialSwapping: true,
          scaleAdjustment: true
        },
        content: arContent.content,
        compatibility: {
          ios: true,
          android: true,
          web: true,
          arKit: true,
          arCore: true
        },
        analytics: {
          usage: 0,
          popularItems: [],
          averageSessionTime: 0,
          conversionRate: 0
        }
      };

      // Store in Supabase
      await this.storeARVisualization(arVisualization);

      return arVisualization;
    } catch (error) {
      console.error('Failed to create AR visualization:', error);
      throw new Error('Unable to create AR visualization');
    }
  }

  async getMediaEngagementAnalytics(propertyId: string): Promise<MediaEngagementAnalytics> {
    try {
      // Query analytics from Supabase
      const { data: analyticsData, error } = await supabase
        .from('media_analytics')
        .select('*')
        .eq('property_id', propertyId)
        .single();

      if (error) {
        throw error;
      }

      // Enhance with AI insights
      const enhancedAnalytics = await this.enhanceAnalyticsWithAI(analyticsData);

      return enhancedAnalytics;
    } catch (error) {
      console.warn('Failed to get media engagement analytics, using fallback:', error);
      return this.getFallbackAnalytics(propertyId);
    }
  }

  async optimizeMediaForUser(
    propertyId: string,
    userId: string,
    preferences: any
  ): Promise<RichMediaContent> {
    try {
      // Get base media content
      const baseContent = await this.getRichMediaContent(propertyId);

      // Use AI to optimize for user preferences
      const optimizedContent = await this.optimizeContentWithAI(baseContent, preferences);

      return optimizedContent;
    } catch (error) {
      console.error('Failed to optimize media for user:', error);
      throw new Error('Unable to optimize media for user');
    }
  }

  private async enhanceMediaContentWithAI(propertyData: any): Promise<RichMediaContent> {
    try {
      const prompt = `
        As an AI media content enhancer, create comprehensive rich media content for this property:
        
        Property Data: ${JSON.stringify(propertyData, null, 2)}
        
        Generate rich media content in JSON format:
        {
          "propertyId": "${propertyData.id}",
          "videos": [
            {
              "id": "video_id",
              "propertyId": "${propertyData.id}",
              "title": "video_title",
              "description": "video_description",
              "videoUrl": "video_url",
              "thumbnailUrl": "thumbnail_url",
              "duration": 120,
              "quality": "1080p",
              "type": "walkthrough",
              "features": ["feature1", "feature2"],
              "highlights": ["highlight1", "highlight2"],
              "accessibility": {
                "captions": true,
                "audioDescription": true,
                "signLanguage": false
              },
              "analytics": {
                "views": 0,
                "engagement": 0,
                "completionRate": 0,
                "averageWatchTime": 0
              }
            }
          ],
          "virtualTours": [
            {
              "id": "tour_id",
              "propertyId": "${propertyData.id}",
              "title": "tour_title",
              "description": "tour_description",
              "tourUrl": "tour_url",
              "thumbnailUrl": "thumbnail_url",
              "type": "matterport",
              "rooms": [
                {
                  "name": "room_name",
                  "type": "bedroom",
                  "hotspots": [
                    {
                      "position": {"x": 0, "y": 0, "z": 0},
                      "type": "info",
                      "content": "hotspot_content",
                      "mediaUrl": "media_url"
                    }
                  ],
                  "measurements": {
                    "length": 4.0,
                    "width": 3.5,
                    "height": 2.7,
                    "area": 14.0
                  },
                  "features": ["feature1", "feature2"]
                }
              ],
              "navigation": {
                "startRoom": "entrance",
                "path": [
                  {
                    "from": "entrance",
                    "to": "living_room",
                    "direction": "straight_ahead"
                  }
                ]
              },
              "interactive": {
                "measurements": true,
                "annotations": true,
                "sharing": true,
                "booking": true,
                "comparison": true
              },
              "performance": {
                "loadTime": 3.5,
                "frameRate": 60,
                "quality": "high",
                "compatibility": ["web", "mobile", "vr"]
              }
            }
          ],
          "arVisualizations": [
            {
              "id": "ar_id",
              "propertyId": "${propertyData.id}",
              "title": "ar_title",
              "description": "ar_description",
              "arUrl": "ar_url",
              "type": "furniture_placement",
              "features": {
                "realTimeRendering": true,
                "physicsSimulation": true,
                "lightingAdjustment": true,
                "materialSwapping": true,
                "scaleAdjustment": true
              },
              "content": [
                {
                  "category": "furniture",
                  "items": [
                    {
                      "name": "item_name",
                      "modelUrl": "model_url",
                      "thumbnailUrl": "thumbnail_url",
                      "dimensions": {"width": 1.0, "height": 0.8, "depth": 0.6},
                      "price": 500,
                      "brand": "brand_name",
                      "description": "item_description"
                    }
                  ]
                }
              ],
              "compatibility": {
                "ios": true,
                "android": true,
                "web": true,
                "arKit": true,
                "arCore": true
              },
              "analytics": {
                "usage": 0,
                "popularItems": [],
                "averageSessionTime": 0,
                "conversionRate": 0
              }
            }
          ],
          "images": [
            {
              "id": "image_id",
              "url": "image_url",
              "thumbnailUrl": "thumbnail_url",
              "type": "interior",
              "room": "living_room",
              "description": "image_description",
              "tags": ["tag1", "tag2"],
              "quality": "4k"
            }
          ],
          "floorPlans": [
            {
              "id": "floor_plan_id",
              "url": "floor_plan_url",
              "type": "2d",
              "level": "ground_floor",
              "measurements": true,
              "interactive": true
            }
          ],
          "neighborhood": {
            "streetView": "street_view_url",
            "satelliteView": "satellite_view_url",
            "amenities": [
              {
                "name": "amenity_name",
                "type": "school",
                "distance": 500,
                "rating": 4.5,
                "imageUrl": "amenity_image_url"
              }
            ]
          }
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'rich_media_content_generation',
        expertise: 'media_production'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('AI media content enhancement failed, using fallback:', error);
      return this.getFallbackRichMediaContent(propertyData.id);
    }
  }

  private async generateVideoContentWithAI(
    propertyData: any,
    type: PropertyVideoPreview['type'],
    preferences?: any
  ): Promise<any> {
    try {
      const prompt = `
        As an AI video content generator, create video content for this property:
        
        Property Data: ${JSON.stringify(propertyData, null, 2)}
        Video Type: ${type}
        Preferences: ${JSON.stringify(preferences, null, 2)}
        
        Generate video content in JSON format:
        {
          "title": "video_title",
          "description": "video_description",
          "videoUrl": "video_url",
          "thumbnailUrl": "thumbnail_url",
          "duration": 120,
          "features": ["feature1", "feature2"],
          "highlights": ["highlight1", "highlight2"]
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'video_content_generation',
        expertise: 'video_production'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('AI video content generation failed, using fallback:', error);
      return {
        title: `${propertyData.address} - ${type} Video`,
        description: `Professional ${type} video of ${propertyData.address}`,
        videoUrl: `https://example.com/videos/${propertyData.id}_${type}.mp4`,
        thumbnailUrl: `https://example.com/thumbnails/${propertyData.id}_${type}.jpg`,
        duration: 120,
        features: ['Professional filming', 'High quality audio'],
        highlights: ['Key features', 'Property benefits']
      };
    }
  }

  private async generateVirtualTourWithAI(
    propertyData: any,
    type: VirtualTour3D['type'],
    options?: any
  ): Promise<any> {
    try {
      const prompt = `
        As an AI virtual tour generator, create a 3D virtual tour for this property:
        
        Property Data: ${JSON.stringify(propertyData, null, 2)}
        Tour Type: ${type}
        Options: ${JSON.stringify(options, null, 2)}
        
        Generate virtual tour content in JSON format with rooms, navigation, and interactive features.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'virtual_tour_generation',
        expertise: '3d_modeling'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('AI virtual tour generation failed, using fallback:', error);
      return {
        title: `${propertyData.address} - Virtual Tour`,
        description: `Interactive 3D virtual tour of ${propertyData.address}`,
        tourUrl: `https://example.com/tours/${propertyData.id}_${type}`,
        thumbnailUrl: `https://example.com/thumbnails/${propertyData.id}_${type}.jpg`,
        rooms: [
          {
            name: 'Living Room',
            type: 'living',
            hotspots: [],
            measurements: { length: 5.0, width: 4.0, height: 2.7, area: 20.0 },
            features: ['Open plan', 'Natural light']
          }
        ],
        navigation: {
          startRoom: 'entrance',
          path: []
        }
      };
    }
  }

  private async generateARContentWithAI(
    propertyData: any,
    type: ARPropertyVisualization['type'],
    content?: any
  ): Promise<any> {
    try {
      const prompt = `
        As an AI AR content generator, create AR visualization content for this property:
        
        Property Data: ${JSON.stringify(propertyData, null, 2)}
        AR Type: ${type}
        Content: ${JSON.stringify(content, null, 2)}
        
        Generate AR content in JSON format with interactive elements and 3D models.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'ar_content_generation',
        expertise: 'augmented_reality'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('AI AR content generation failed, using fallback:', error);
      return {
        title: `${propertyData.address} - AR Visualization`,
        description: `Interactive AR visualization of ${propertyData.address}`,
        arUrl: `https://example.com/ar/${propertyData.id}_${type}`,
        content: [
          {
            category: 'furniture',
            items: [
              {
                name: 'Modern Sofa',
                modelUrl: 'https://example.com/models/sofa.glb',
                thumbnailUrl: 'https://example.com/thumbnails/sofa.jpg',
                dimensions: { width: 2.0, height: 0.8, depth: 0.9 },
                price: 1200,
                brand: 'Modern Living',
                description: 'Comfortable modern sofa'
              }
            ]
          }
        ]
      };
    }
  }

  private async enhanceAnalyticsWithAI(analyticsData: any): Promise<MediaEngagementAnalytics> {
    try {
      const prompt = `
        As an AI analytics enhancer, enhance media engagement analytics:
        
        Analytics Data: ${JSON.stringify(analyticsData, null, 2)}
        
        Enhance the analytics with insights and predictions in JSON format.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'analytics_enhancement',
        expertise: 'data_analytics'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('AI analytics enhancement failed, using fallback:', error);
      return this.getFallbackAnalytics(analyticsData.property_id);
    }
  }

  private async optimizeContentWithAI(
    baseContent: RichMediaContent,
    preferences: any
  ): Promise<RichMediaContent> {
    try {
      const prompt = `
        As an AI content optimizer, optimize rich media content for user preferences:
        
        Base Content: ${JSON.stringify(baseContent, null, 2)}
        User Preferences: ${JSON.stringify(preferences, null, 2)}
        
        Optimize the content by prioritizing relevant media types and features.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'content_optimization',
        expertise: 'content_personalization'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('AI content optimization failed, using base content:', error);
      return baseContent;
    }
  }

  private async getPropertyData(propertyId: string): Promise<any> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propertyId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  private async storeVideoPreview(videoPreview: PropertyVideoPreview): Promise<void> {
    const { error } = await supabase
      .from('property_videos')
      .insert(videoPreview);

    if (error) {
      console.warn('Failed to store video preview:', error);
    }
  }

  private async storeVirtualTour(virtualTour: VirtualTour3D): Promise<void> {
    const { error } = await supabase
      .from('virtual_tours')
      .insert(virtualTour);

    if (error) {
      console.warn('Failed to store virtual tour:', error);
    }
  }

  private async storeARVisualization(arVisualization: ARPropertyVisualization): Promise<void> {
    const { error } = await supabase
      .from('ar_visualizations')
      .insert(arVisualization);

    if (error) {
      console.warn('Failed to store AR visualization:', error);
    }
  }

  // Fallback methods
  private getFallbackRichMediaContent(propertyId: string): RichMediaContent {
    return {
      propertyId,
      videos: [
        {
          id: `video_${propertyId}_walkthrough`,
          propertyId,
          title: 'Property Walkthrough',
          description: 'Professional property walkthrough video',
          videoUrl: 'https://example.com/videos/walkthrough.mp4',
          thumbnailUrl: 'https://example.com/thumbnails/walkthrough.jpg',
          duration: 120,
          quality: '1080p',
          type: 'walkthrough',
          features: ['Professional filming', 'High quality audio'],
          highlights: ['Key features', 'Property benefits'],
          accessibility: {
            captions: true,
            audioDescription: true,
            signLanguage: false
          },
          analytics: {
            views: 0,
            engagement: 0,
            completionRate: 0,
            averageWatchTime: 0
          }
        }
      ],
      virtualTours: [],
      arVisualizations: [],
      images: [],
      floorPlans: [],
      neighborhood: {
        streetView: '',
        satelliteView: '',
        amenities: []
      }
    };
  }

  private getFallbackAnalytics(propertyId: string): MediaEngagementAnalytics {
    return {
      propertyId,
      totalViews: 0,
      engagementMetrics: {
        videos: {
          totalViews: 0,
          averageWatchTime: 0,
          completionRate: 0,
          mostPopular: ''
        },
        virtualTours: {
          totalTours: 0,
          averageTourTime: 0,
          completionRate: 0,
          mostVisitedRooms: []
        },
        arVisualizations: {
          totalSessions: 0,
          averageSessionTime: 0,
          mostUsedFeatures: [],
          conversionRate: 0
        }
      },
      userBehavior: {
        preferredMediaType: 'video',
        peakUsageTimes: [],
        deviceTypes: { mobile: 0, tablet: 0, desktop: 0 },
        geographicDistribution: []
      },
      conversionImpact: {
        mediaToInquiry: 0,
        mediaToViewing: 0,
        mediaToOffer: 0,
        mediaToSale: 0
      }
    };
  }
}

export const enhancedRichMediaIntegration = new EnhancedRichMediaIntegration();
