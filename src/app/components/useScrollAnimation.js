"use client";
import { useRef, useEffect } from 'react';

export function useScrollAnimation(callback, threshold = 0.2) {
  const ref = useRef();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [callback, threshold]);
  return ref;
}
