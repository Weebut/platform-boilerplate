import { useEffect } from 'react';

interface useIntersectionObserverProps {
  isLoading: boolean;
  hasNext: boolean;
  goNext: () => void;
  target: Element | string;
}

export function useIntersectionObserver(props: useIntersectionObserverProps) {
  useEffect(() => {
    if (!props.isLoading) {
      const onIntersect: IntersectionObserverCallback = ([entry], observer) => {
        if (entry.isIntersecting && props.hasNext) {
          props.goNext();
        }
      };

      const target =
        typeof props.target === 'string'
          ? document.querySelector(`#${props.target}`)
          : props.target;

      if (!target) {
        return;
      }

      const observer = new IntersectionObserver(onIntersect, {
        threshold: 0.01,
      });

      observer.observe(target);

      return () => observer && observer.disconnect();
    }
  }, [props]);
}
