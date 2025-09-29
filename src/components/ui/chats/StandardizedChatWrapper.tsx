import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface StandardizedChatWrapperProps {
  children: React.ReactNode;
  className?: string;
  height?: string;
  autoScroll?: boolean;
  onScroll?: (position: number) => void;
}

export interface StandardizedChatWrapperRef {
  scrollToBottom: (behavior?: ScrollBehavior) => void;
  scrollToTop: (behavior?: ScrollBehavior) => void;
  scrollToPosition: (position: number, behavior?: ScrollBehavior) => void;
}

/**
 * Standardized wrapper for all chat interfaces ensuring consistent scrolling
 */
export const StandardizedChatWrapper = forwardRef<StandardizedChatWrapperRef, StandardizedChatWrapperProps>(
  ({ children, className, height = '400px', autoScroll = true, onScroll }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      scrollToBottom: (behavior = 'smooth') => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior
          });
        }
      },
      scrollToTop: (behavior = 'smooth') => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: 0,
            behavior
          });
        }
      },
      scrollToPosition: (position, behavior = 'smooth') => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: position,
            behavior
          });
        }
      }
    }));

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      if (onScroll) {
        const element = e.currentTarget;
        const scrollPercent = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
        onScroll(scrollPercent);
      }
    };

    useEffect(() => {
      if (autoScroll && scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, [children, autoScroll]);

    return (
      <ScrollArea 
        className={cn('flex-1 overflow-hidden', `h-[${height}]`)}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <div className={cn('space-y-4 p-4', className)}>
          {children}
        </div>
      </ScrollArea>
    );
  }
);

StandardizedChatWrapper.displayName = 'StandardizedChatWrapper';
