import { useEffect, useRef, useState } from 'react';

/**
 * TypewriterText — types out `text` character by character once the
 * element enters the viewport. Fires ONCE (IntersectionObserver unobserved
 * after first trigger). Respects prefers-reduced-motion.
 *
 * Props:
 *   text      — the full string to type
 *   as        — tag to render ('span' | 'h1' | 'h2' | etc.)
 *   speed     — ms per character (default 40)
 *   delay     — ms before typing starts after entering viewport (default 0)
 *   className — forwarded to the outer tag
 */
export default function TypewriterText({
  text,
  as: Tag = 'span',
  speed = 40,
  delay = 0,
  className,
}) {
  const [displayed, setDisplayed]   = useState('');
  const [active, setActive]         = useState(false);
  const [done, setDone]             = useState(false);
  const ref        = useRef(null);
  const timerRef   = useRef(null);
  const startedRef = useRef(false);

  // Detect reduced-motion preference once
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // IntersectionObserver: start typing when element enters viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReduced) {
      // Skip animation — show full text immediately
      setDisplayed(text);
      setDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          observer.unobserve(el); // one-shot
          setTimeout(() => setActive(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, prefersReduced, text]);

  // Typing engine
  useEffect(() => {
    if (!active || prefersReduced) return;

    let i = 0;
    const tick = () => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        timerRef.current = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };

    timerRef.current = setTimeout(tick, speed);
    return () => clearTimeout(timerRef.current);
  }, [active, text, speed, prefersReduced]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {/*
        Hidden full text is always in the DOM for SEO + a11y.
        The aria-label on the outer tag ensures screen readers read the
        full text without waiting for the animation.
      */}
      <span aria-hidden="true">
        {active || prefersReduced ? displayed : <span style={{ visibility: 'hidden' }}>{text}</span>}
        {active && !done && <span className="tw-cursor" aria-hidden="true">▌</span>}
      </span>
    </Tag>
  );
}
