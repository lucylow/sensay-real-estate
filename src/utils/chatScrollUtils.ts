/**
 * Utility functions for consistent chat scrolling behavior
 */

import { RefObject, useEffect } from 'react';

export interface ChatScrollOptions {
  behavior?: 'auto' | 'smooth';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
}

/**
 * Auto-scroll to bottom of chat container
 */
export const scrollToBottom = (
  containerRef: RefObject<HTMLElement>,
  options: ChatScrollOptions = {}
) => {
  const {
    behavior = 'smooth',
    block = 'end'
  } = options;

  if (containerRef.current) {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior
    });
  }
};

/**
 * Scroll to specific message element
 */
export const scrollToMessage = (
  containerRef: RefObject<HTMLElement>,
  messageRef: RefObject<HTMLElement>,
  options: ChatScrollOptions = {}
) => {
  const {
    behavior = 'smooth',
    block = 'center'
  } = options;

  if (containerRef.current && messageRef.current) {
    messageRef.current.scrollIntoView({
      behavior,
      block,
      inline: 'nearest'
    });
  }
};

/**
 * Hook for auto-scrolling when new messages arrive
 */
export const useChatAutoScroll = (
  messages: unknown[],
  containerRef: RefObject<HTMLElement>,
  options?: ChatScrollOptions
) => {
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom(containerRef, options);
    }
  }, [messages.length, containerRef, options]);
};

/**
 * Get scroll position percentage
 */
export const getScrollPosition = (containerRef: RefObject<HTMLElement>): number => {
  if (!containerRef.current) return 0;
  
  const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
  return scrollTop / (scrollHeight - clientHeight) * 100;
};

/**
 * Check if user is near bottom of chat
 */
export const isNearBottom = (containerRef: RefObject<HTMLElement>, threshold = 90): boolean => {
  return getScrollPosition(containerRef) >= threshold;
};

/**
 * Standard CSS classes for chat scroll areas
 */
export const getChatScrollClasses = (height = '400px') => {
  return `flex-1 h-[${height}] overflow-hidden scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400`;
};
