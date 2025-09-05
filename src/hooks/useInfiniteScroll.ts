/**
 * Хук для бесконечной прокрутки с использованием IntersectionObserver
 */

import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  rootMargin?: string;
}

export const useInfiniteScroll = ({
  hasMore,
  loading,
  onLoadMore,
  threshold = 0.1,
  rootMargin = '50px',
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      
      if (target.isIntersecting && hasMore && !loading) {
        onLoadMore();
      }
    },
    [hasMore, loading, onLoadMore]
  );

  // Настройка observer
  useEffect(() => {
    const element = observerRef.current;
    
    if (!element) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });

    observer.current.observe(element);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [handleIntersect, threshold, rootMargin]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return observerRef;
};