import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TypewriterText from './TypewriterText';
import { skillGroups, currentlyLearning } from '../data';

/**
 * AccordionItem — controlled accordion row.
 * open/close state is managed by the parent so only one can be open at a time.
 */
function AccordionItem({ category, items, delay, isOpen, onToggle }) {
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
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`skills-content-${category}`}
        aria-label={`${category} — ${isOpen ? 'collapse' : 'expand'}`}
      >
        <span className="skills__accordion-label">{category}</span>
        <span className="skills__accordion-count">{items.length}</span>
        <span className="skills__accordion-chevron" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {/* Content — hidden/shown via CSS max-height, never unmounted */}
      <div
        id={`skills-content-${category}`}
        className={`skills__accordion-content${isOpen ? ' skills__accordion-content--open' : ''}`}
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
  // null = all closed; number = index of the open row
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

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

        {/* Full-width accordion list — only one row open at a time */}
        <div className="skills__accordion-list" role="list" aria-label="Skill categories">
          {skillGroups.map(({ category, items }, i) => (
            <AccordionItem
              key={category}
              category={category}
              items={items}
              delay={i + 1}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
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
