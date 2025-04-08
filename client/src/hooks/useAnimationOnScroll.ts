import { useEffect } from 'react';

interface AnimationOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

export const useAnimationOnScroll = (
  selectors: string | string[],
  options: AnimationOptions = {}
) => {
  useEffect(() => {
    const {
      threshold = 0.1,
      once = true,
      rootMargin = '0px 0px -10% 0px'
    } = options;
    
    const selectorsArray = Array.isArray(selectors) ? selectors : [selectors];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animationPlayState = 'running';
          
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          (entry.target as HTMLElement).style.animationPlayState = 'paused';
        }
      });
    }, {
      threshold,
      rootMargin
    });

    const elements: HTMLElement[] = [];
    
    selectorsArray.forEach(selector => {
      document.querySelectorAll<HTMLElement>(selector).forEach(el => {
        observer.observe(el);
        elements.push(el);
      });
    });

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [selectors, options]);
};

export default useAnimationOnScroll;
