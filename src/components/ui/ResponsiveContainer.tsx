/**
 * Responsive Container Component
 * 
 * Provides responsive layout utilities and mobile-optimized containers
 * for the PropGuard AI Sensay chatbot interface.
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  mobileClassName?: string;
  tabletClassName?: string;
  desktopClassName?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  mobileClassName = '',
  tabletClassName = '',
  desktopClassName = ''
}) => {
  return (
    <div
      className={cn(
        'w-full',
        // Mobile-first responsive design
        'px-4 py-2',
        'sm:px-6 sm:py-4',
        'md:px-8 md:py-6',
        'lg:px-12 lg:py-8',
        // Custom classes
        mobileClassName,
        `sm:${tabletClassName}`,
        `lg:${desktopClassName}`,
        className
      )}
    >
      {children}
    </div>
  );
};

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'gap-4',
  className = ''
}) => {
  const gridCols = {
    mobile: cols.mobile || 1,
    tablet: cols.tablet || 2,
    desktop: cols.desktop || 3
  };

  return (
    <div
      className={cn(
        'grid',
        gap,
        `grid-cols-${gridCols.mobile}`,
        `sm:grid-cols-${gridCols.tablet}`,
        `lg:grid-cols-${gridCols.desktop}`,
        className
      )}
    >
      {children}
    </div>
  );
};

interface MobileOptimizedCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MobileOptimizedCard: React.FC<MobileOptimizedCardProps> = ({
  children,
  className = '',
  padding = 'md',
  rounded = 'lg'
}) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  };

  return (
    <div
      className={cn(
        'bg-white',
        'border border-gray-200',
        'shadow-sm',
        'hover:shadow-md',
        'transition-shadow',
        'duration-200',
        paddingClasses[padding],
        roundedClasses[rounded],
        // Mobile optimizations
        'min-h-[200px]',
        'sm:min-h-[300px]',
        'overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};

interface TouchOptimizedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TouchOptimizedButton: React.FC<TouchOptimizedButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-900'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[44px]',
    md: 'px-4 py-3 text-base min-h-[48px]',
    lg: 'px-6 py-4 text-lg min-h-[52px]'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'font-medium',
        'rounded-lg',
        'transition-all',
        'duration-200',
        'active:scale-95',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-blue-500',
        'focus:ring-offset-2',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        'disabled:active:scale-100',
        // Touch optimization
        'touch-manipulation',
        'select-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
};

interface AdaptiveTextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
}

export const AdaptiveText: React.FC<AdaptiveTextProps> = ({
  children,
  size = 'base',
  weight = 'normal',
  className = ''
}) => {
  const sizeClasses = {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl'
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  return (
    <span
      className={cn(
        'leading-relaxed',
        sizeClasses[size],
        weightClasses[weight],
        className
      )}
    >
      {children}
    </span>
  );
};
