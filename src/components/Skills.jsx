import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TypewriterText from './TypewriterText';
import { skillGroups, currentlyLearning } from '../data';

/**
 * AccordionItem — a completely independent, self-contained accordion row.
 * Each instance manages its own open/closed state.
 * Headers never disappear — only the content animates in/out.
 */
function AccordionItem({ category, items, delay }) {
  const [open, setOpen] = useState(false);
  const ref = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });

  return (
    <div
      ref={ref}
      className="skills__accordion anim-fade-up"
      data-delay={delay}
    >
      {/* Header — always visible, never removed from DOM */}
      <button
        className="skills__accordion-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`skills-content-${category}`}
        aria-label={`${category} — ${open ? 'collapse' : 'expand'}`}
      >
        <span className="skills__accordion-label">{category}</span>
        <span className="skills__accordion-count">{items.length}</span>
        <span className="skills__accordion-chevron" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>

      {/* Content — hidden/shown via CSS max-height, never unmounted */}
      <div
        id={`skills-content-${category}`}
        className={`skills__accordion-content${open ? ' skills__accordion-content--open' : ''}`}
        role="region"
        aria-label={`${category} skills`}
      >
        <div className="skills__accordion-pills">
          {items.map((item) => (
            <span key={item} className="skills__accordion-pill">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const learningRef = useScrollReveal({ rootMargin: '0px 0px -20px 0px' });

  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <TypewriterText
          text="[+] Skills"
          as="span"
          speed={50}
          className="section-label heading-md"
          id="skills-heading"
        />

        {/* Full-width accordion list — each row is independent */}
        <div className="skills__accordion-list" role="list" aria-label="Skill categories">
          {skillGroups.map(({ category, items }, i) => (
            <AccordionItem
              key={category}
              category={category}
              items={items}
              delay={i + 1}
            />
          ))}
        </div>

        {/* Currently learning — separate block */}
        <div
          ref={learningRef}
          className="skills__learning anim-fade-up"
          aria-labelledby="learning-heading"
        >
          <div className="skills__learning-header">
            <span id="learning-heading" className="skills__learning-label">
              [~] Currently Learning
            </span>
            <span className="caption-md color-mute">
              &mdash; in progress, not yet proficient
            </span>
          </div>
          <div className="skills__learning-badges">
            {currentlyLearning.map((item) => (
              <span key={item} className="skills__learning-badge">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
