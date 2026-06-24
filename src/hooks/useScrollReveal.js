import { useEffect, useRef } from 'react';

/**
 * Returns a ref. When the element enters the viewport for the first time,
 * the class 'revealed' is added. Observer is unobserved immediately after —
 * animation fires ONCE only, never re-triggers on scroll back.
 *
 * @param {object} options  - IntersectionObserver options override
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already revealed (e.g. after HMR in dev), skip
    if (el.classList.contains('revealed')) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el); // one-shot
        }
      },
      {
        threshold:   options.threshold   ?? 0.1,
        rootMargin:  options.rootMargin  ?? '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}
