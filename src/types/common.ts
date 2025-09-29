/**
 * Common TypeScript interfaces and types for PropGuard AI
 * This file helps maintain type safety across the application
 */

// Property-related types
export interface Property {
  address: string;
  coordinates?: { lat: number; lng: number };
  valuation?: number;
  riskData?: {
    flood?: string | number;
    fire?: string | number;
    coastal?: string | number;
    subsidence?: string | number;
    market?: string | number;
  };
  [key: string]: unknown;
}

// Analysis result types
export interface PropertyValuation {
  analysis_result?: {
    risk?: {
      flood?: string | number;
      fire?: string | number;
      coastalErosion?: string | number;
    };
    current_valuation?: number;
    risk_score?: number;
    climate_risk?: string;
    lvr?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

// Chat/AI types
export interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  data?: Record<string, unknown>;
  audioUrl?: string;
}

export interface SensayMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    intent?: string;
    entities?: Record<string, string | number | boolean>;
    confidence?: number;
    actions?: string[];
    personality?: {
      tone?: 'professional' | 'friendly' | 'technical' | 'casual';
      userType?: 'investor' | 'agent' | 'buyer' | 'seller' | 'analyst';
      language?: string;
      emotionalState?: 'confident' | 'concerned' | 'excited' | 'neutral' | 'undecided' | 'stressed' | 'frustrated' | 'uncertain';
    };
    analytics?: {
      userType?: string;
      emotionalState?: 'confident' | 'concerned' | 'excited' | 'neutral' | 'undecided' | 'stressed' | 'frustrated' | 'uncertain';
      conversationStage?: string;
      satisfactionPrediction?: number;
    };
  };
}

// Audit log types
export interface AuditLogEntry {
  timestamp: Date;
  action: string;
  user?: string;
  details: string | { query: string };
  status: 'APPROVED' | 'REVIEW' | 'REJECTED' | 'COMPLETED' | 'IN_PROGRESS';
}

// Analysis result types
export interface AnalysisResult {
  property?: {
    address: string;
    valuation?: number;
    risk?: Record<string, number>;
    analysis_result?: {
      current_valuation?: number;
      risk_score?: number;
      climate_risk?: string;
      lvr?: number;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  sentiment?: {
    sentiment_analysis?: string;
    [key: string]: unknown;
  };
  market?: Record<string, unknown>;
  [key: string]: unknown;
}

// Component prop types
export interface PropertyData {
  address?: string;
  valuation?: number;
  coordinates?: { lat: number; lng: number };
  [key: string]: unknown;
}

export interface AnalysisData {
  riskScore?: number;
  confidence?: number;
  factors?: string;
  [key: string]: unknown;
}

// AI Assistant types
export interface AIAssistantProps {
  property?: PropertyData;
  analysis?: AnalysisData;
  className?: string;
}

// Utility types
export type AsyncResult<T> = Promise<{ success: boolean; data?: T; error?: string }>;

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type StatusVariant = 'default' | 'secondary' | 'destructive' | 'outline';

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

// Form types
export interface FormFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  ariaDescribedBy?: string;
  helpText?: string;
  type?: 'text' | 'email' | 'number' | 'password';
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

// Theme types
export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
  stack?: string;
}

// Generic response wrapper
export interface ResponseWrapper<T> {
  status: 'success' | 'error' | 'warning';
  data?: T;
  message?: string;
  errors?: string[];
  metadata?: Record<string, unknown>;
}
