import React from 'react';
import { motion } from 'framer-motion';

// Accessibility Focus Trap Hook
export const useFocusTrap = (isActive: boolean) => {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!isActive || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
      
      if (e.key === 'Escape') {
        // Escape key handling will be implemented by parent components
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return ref;
};

// Skip to content link for accessibility
export const SkipToContent: React.FC<{ targetId: string; children?: React.ReactNode }> = ({ 
  targetId, 
  children = 'Skip to main content' 
}) => (
  <motion.a
    href={`#${targetId}`}
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    whileFocus={{ scale: 1.05 }}
    onFocus={() => {
      document.getElementById(targetId)?.focus();
    }}
  >
    {children}
  </motion.a>
);

// Screen reader announcements
export const ScreenReaderAnnouncement: React.FC<{ 
  announcement: string; 
  priority?: 'polite' | 'assertive';
}> = ({ announcement, priority = 'polite' }) => {
  const announcerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (announcerRef.current && announcement) {
      announcerRef.current.textContent = announcement;
    }
  }, [announcement]);

  return (
    <div
      ref={announcerRef}
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    />
  );
};

// Enhanced button with accessibility features
export const AccessibleButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}> = ({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false, 
  ariaLabel,
  className = '',
  variant = 'primary'
}) => (
  <motion.button
    onClick={onClick}
    disabled={disabled || loading}
    aria-label={ariaLabel}
    aria-busy={loading}
    className={`
      ${variant === 'primary' 
        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
      } 
      px-4 py-2 rounded-lg font-medium transition-colors
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      ${className}
    `}
    whileTap={{ scale: 0.95 }}
    whileFocus={{ scale: 1.02 }}
  >
    {loading ? (
      <div className="flex items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
        />
        Loading...
      </div>
    ) : (
      children
    )}
  </motion.button>
);

// Accessible navigation landmark
export const AccessibleNavigation: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <nav 
    role="navigation" 
    aria-label="Main navigation"
    className={`focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
  >
    {children}
  </nav>
);

// Accessible main content landmark
export const AccessibleMain: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <main 
    role="main"
    className={className}
    id="main-content"
    tabIndex={-1}
  >
    {children}
  </main>
);

// Accessible sidebar landmark
export const AccessibleAside: React.FC<{
  children: React.ReactNode;
  ariaLabel: string;
  className?: string;
}> = ({ children, ariaLabel, className = '' }) => (
  <aside 
    role="complementary" 
    aria-label={ariaLabel}
    className={className}
  >
    {children}
  </aside>
);

// Enhanced form field with accessibility
export const AccessibleInput: React.FC<{
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}> = ({ 
  label, 
  id, 
  type = 'text', 
  placeholder, 
  required = false, 
  error,
  helperText,
  className = ''
}) => (
  <div className={`mb-4 ${className}`}>
    <label 
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
      {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
    </label>
    
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      required={required}
      aria-describedby={`${id}-helper ${error ? `${id}-error` : ''}`}
      aria-invalid={error ? 'true' : 'false'}
      className={`
        block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
        ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
      `}
    />
    
    {helperText && (
      <p id={`${id}-helper`} className="mt-1 text-sm text-gray-500">
        {helperText}
      </p>
    )}
    
    {error && (
      <p id={`${id}-error`} className="mt-1 text-sm text-red-600 flex items-center">
        <span className="sr-only">Error: </span>
        {error}
      </p>
    )}
  </div>
);

// Accessibility utilities
export const accessibilityUtils = {
  // Announce page changes to screen readers
  announcePageChange: (pageTitle: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Page changed to: ${pageTitle}`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Check for reduced motion preference
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Check for high contrast mode
  prefersHighContrast: () => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Get user's color scheme preference
  getColorScheme: () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
};

export default {
  useFocusTrap,
  SkipToContent,
  ScreenReaderAnnouncement,
  AccessibleButton,
  AccessibleNavigation,
  AccessibleMain,
  AccessibleAside,
  AccessibleInput,
  accessibilityUtils
};
