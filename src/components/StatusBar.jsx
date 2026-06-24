import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'top',        label: '~/vedant' },
  { id: 'about',      label: '#about' },
  { id: 'internship', label: '#internship' },
  { id: 'projects',   label: '#projects' },
  { id: 'skills',     label: '#skills' },
  { id: 'hackathons', label: '#hackathons' },
  { id: 'contact',    label: '#contact' },
];

export default function StatusBar() {
  const [activeLabel, setActiveLabel] = useState(SECTIONS[0].label);
  const [time, setTime]               = useState('');

  // Track which section is in view
  useEffect(() => {
    // Use root margin to trigger slightly before full in-view
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the last entry that is intersecting (lowest on page wins)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const sec = SECTIONS.find((s) => s.id === visible[0].target.id);
          if (sec) setActiveLabel(sec.label);
        }
      },
      { threshold: 0.2 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Live clock (updates every minute)
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('en-US', {
        hour:   '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="status-bar"
      role="status"
      aria-live="polite"
      aria-label="Page status bar"
    >
      {/* Left cluster */}
      <div className="status-bar__left">
        <span className="status-bar__branch">
          <span aria-hidden="true">⎇</span>
          <span>main</span>
        </span>

        <span className="status-bar__divider" aria-hidden="true">│</span>

        <span className="status-bar__section" aria-label={`Current section: ${activeLabel}`}>
          {activeLabel}
        </span>

        <span className="status-bar__cursor" aria-hidden="true" />
      </div>

      {/* Right cluster */}
      <div className="status-bar__right" aria-hidden="true">
        <span className="status-bar__item">Vedant.S.Mungapatil</span>
        <span className="status-bar__divider">│</span>
        <span className="status-bar__item">JetBrains Mono</span>
        <span className="status-bar__divider">│</span>
        <span className="status-bar__item">UTF-8</span>
        <span className="status-bar__divider">│</span>
        <span className="status-bar__item">{time}</span>
      </div>
    </div>
  );
}
