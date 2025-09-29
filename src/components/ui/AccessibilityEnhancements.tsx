/**
 * Accessibility Enhancements Component
 * 
 * Provides accessibility features and utilities for the PropGuard AI Sensay chatbot
 * to ensure inclusive user experience for all users.
 */

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScreenReaderTextProps {
  children: React.ReactNode;
  className?: string;
}

export const ScreenReaderText: React.FC<ScreenReaderTextProps> = ({
  children,
  className = ''
}) => {
  return (
    <span
      className={cn(
        'sr-only',
        className
      )}
      aria-live="polite"
    >
      {children}
    </span>
  );
};

interface KeyboardNavigationProps {
  children: React.ReactNode;
  className?: string;
}

export const KeyboardNavigation: React.FC<KeyboardNavigationProps> = ({
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current) return;

      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }

      if (event.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        activeElement?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'focus:outline-none',
        className
      )}
      role="region"
      aria-label="Interactive content"
    >
      {children}
    </div>
  );
};

interface HighContrastToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  className?: string;
}

export const HighContrastToggle: React.FC<HighContrastToggleProps> = ({
  isEnabled,
  onToggle,
  className = ''
}) => {
  return (
    <button
      onClick={() => onToggle(!isEnabled)}
      className={cn(
        'p-2 rounded-lg',
        'border border-gray-300',
        'hover:bg-gray-100',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        'transition-colors duration-200',
        isEnabled && 'bg-blue-100 border-blue-500',
        className
      )}
      aria-label={`${isEnabled ? 'Disable' : 'Enable'} high contrast mode`}
      aria-pressed={isEnabled}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </button>
  );
};

interface FontSizeControlProps {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  onFontSizeChange: (size: 'sm' | 'base' | 'lg' | 'xl') => void;
  className?: string;
}

export const FontSizeControl: React.FC<FontSizeControlProps> = ({
  fontSize,
  onFontSizeChange,
  className = ''
}) => {
  const sizes = [
    { key: 'sm', label: 'Small', icon: 'A' },
    { key: 'base', label: 'Medium', icon: 'A' },
    { key: 'lg', label: 'Large', icon: 'A' },
    { key: 'xl', label: 'Extra Large', icon: 'A' }
  ] as const;

  return (
    <div className={cn('flex gap-1 p-1 bg-gray-100 rounded-lg', className)}>
      {sizes.map((size) => (
        <button
          key={size.key}
          onClick={() => onFontSizeChange(size.key as any)}
          className={cn(
            'px-3 py-2 rounded-md',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            fontSize === size.key
              ? 'bg-white shadow-sm text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          )}
          aria-label={`Set font size to ${size.label}`}
          aria-pressed={fontSize === size.key}
        >
          <span
            className={cn(
              'font-bold',
              size.key === 'sm' && 'text-sm',
              size.key === 'base' && 'text-base',
              size.key === 'lg' && 'text-lg',
              size.key === 'xl' && 'text-xl'
            )}
          >
            {size.icon}
          </span>
        </button>
      ))}
    </div>
  );
};

interface AnnouncementProps {
  message: string;
  priority?: 'polite' | 'assertive';
  className?: string;
}

export const Announcement: React.FC<AnnouncementProps> = ({
  message,
  priority = 'polite',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50',
        'px-4 py-2',
        'bg-blue-600 text-white',
        'rounded-lg shadow-lg',
        'transform transition-transform duration-300',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        className
      )}
      role="status"
      aria-live={priority}
      aria-atomic="true"
      tabIndex={-1}
    >
      {message}
    </div>
  );
};

interface FocusIndicatorProps {
  children: React.ReactNode;
  className?: string;
}

export const FocusIndicator: React.FC<FocusIndicatorProps> = ({
  children,
  className = ''
}) => {
  return (
    <div
      className={cn(
        'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
        'focus-within:outline-none',
        className
      )}
    >
      {children}
    </div>
  );
};

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  href,
  children,
  className = ''
}) => {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only',
        'absolute top-0 left-0 z-50',
        'px-4 py-2',
        'bg-blue-600 text-white',
        'rounded-br-lg',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        className
      )}
    >
      {children}
    </a>
  );
};

interface ARIAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  className?: string;
}

export const ARIAButton: React.FC<ARIAButtonProps> = ({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={cn(
        'px-4 py-2',
        'bg-blue-600 text-white',
        'rounded-lg',
        'hover:bg-blue-700',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors duration-200',
        className
      )}
    >
      {children}
    </button>
  );
};