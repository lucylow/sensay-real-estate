/**
 * Enhanced Animations Component
 * 
 * Provides advanced animation utilities and micro-interactions
 * for the PropGuard AI Sensay chatbot interface.
 */

import React from 'react';
import { motion, Variants, Transition } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StaggeredAnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  delay = 0.1,
  className = ''
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

interface FloatingAnimationProps {
  children: React.ReactNode;
  intensity?: number;
  duration?: number;
  className?: string;
}

export const FloatingAnimation: React.FC<FloatingAnimationProps> = ({
  children,
  intensity = 10,
  duration = 3,
  className = ''
}) => {
  return (
    <motion.div
      animate={{
        y: [-intensity, intensity, -intensity]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

interface PulseAnimationProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export const PulseAnimation: React.FC<PulseAnimationProps> = ({
  children,
  scale = 1.05,
  duration = 2,
  className = ''
}) => {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

interface SlideInAnimationProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
}

export const SlideInAnimation: React.FC<SlideInAnimationProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = ''
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -100, y: 0 };
      case 'right':
        return { x: 100, y: 0 };
      case 'up':
        return { x: 0, y: 100 };
      case 'down':
        return { x: 0, y: -100 };
      default:
        return { x: 0, y: 100 };
    }
  };

  const transition: Transition = {
    duration: 0.6,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94]
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={transition}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

interface TypewriterAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypewriterAnimation: React.FC<TypewriterAnimationProps> = ({
  text,
  speed = 50,
  className = '',
  onComplete
}) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  React.useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <span className={cn(className)}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

interface MorphingIconProps {
  icons: React.ReactNode[];
  duration?: number;
  className?: string;
}

export const MorphingIcon: React.FC<MorphingIconProps> = ({
  icons,
  duration = 2,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % icons.length);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [icons.length, duration]);

  return (
    <motion.div
      key={currentIndex}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={cn(className)}
    >
      {icons[currentIndex]}
    </motion.div>
  );
};

interface ProgressBarAnimationProps {
  progress: number;
  duration?: number;
  className?: string;
}

export const ProgressBarAnimation: React.FC<ProgressBarAnimationProps> = ({
  progress,
  duration = 1,
  className = ''
}) => {
  return (
    <div className={cn('w-full bg-gray-200 rounded-full h-2 overflow-hidden', className)}>
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration, ease: 'easeOut' }}
      />
    </div>
  );
};

interface ShakeAnimationProps {
  children: React.ReactNode;
  trigger: boolean;
  intensity?: number;
  className?: string;
}

export const ShakeAnimation: React.FC<ShakeAnimationProps> = ({
  children,
  trigger,
  intensity = 10,
  className = ''
}) => {
  return (
    <motion.div
      animate={trigger ? {
        x: [-intensity, intensity, -intensity, intensity, -intensity, intensity, 0]
      } : {}}
      transition={{
        duration: 0.5,
        ease: 'easeInOut'
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

interface BounceInAnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const BounceInAnimation: React.FC<BounceInAnimationProps> = ({
  children,
  delay = 0,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.68, -0.55, 0.265, 1.55]
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

interface LoadingDotsProps {
  count?: number;
  size?: number;
  color?: string;
  className?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({
  count = 3,
  size = 8,
  color = '#6B7280',
  className = ''
}) => {
  return (
    <div className={cn('flex space-x-1', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

interface MagneticHoverProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

export const MagneticHover: React.FC<MagneticHoverProps> = ({
  children,
  intensity = 0.3,
  className = ''
}) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * intensity;
    const distanceY = (e.clientY - centerY) * intensity;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
