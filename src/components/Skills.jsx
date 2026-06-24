import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TypewriterText from './TypewriterText';
import { skillGroups, currentlyLearning } from '../data';

// ── SVG imports from assets ──────────────────────────────────────────────────
import jsLogo      from '../assets/javascript.svg';
import pyLogo      from '../assets/python.svg';
import javaLogo    from '../assets/java.svg';
import htmlLogo    from '../assets/html.svg';
import cssLogo     from '../assets/css-3.svg';
import reactLogo   from '../assets/react.svg';
import dockerLogo  from '../assets/docker.svg';
import awsLogo     from '../assets/aws.svg';
import gitLogo     from '../assets/git.svg';
import cursorLogo  from '../assets/cursor.svg';
import claudeLogo  from '../assets/claude-code.svg';
import figmaLogo   from '../assets/figma.svg';
import notionLogo  from '../assets/notion (1).svg';

// ── Icon map: skill label → SVG src ─────────────────────────────────────────
const ICON_MAP = {
  'JavaScript':           jsLogo,
  'Python':               pyLogo,
  'Java':                 javaLogo,
  'HTML / CSS':           htmlLogo,
  'HTML':                 htmlLogo,
  'CSS':                  cssLogo,
  'React':                reactLogo,
  'Docker (intermediate)':dockerLogo,
  'Docker':               dockerLogo,
  'AWS basics (EC2, S3)': awsLogo,
  'AWS':                  awsLogo,
  'Git / GitHub':         gitLogo,
  'Git':                  gitLogo,
  'Cursor':               cursorLogo,
  'Claude Code':          claudeLogo,
  'Figma':                figmaLogo,
  'Notion':               notionLogo,
};

/**
 * SkillIcon — SVG logo inside a white rounded pill.
 * White background ensures every logo pops against the black page.
 */
function SkillIcon({ label }) {
  const src = ICON_MAP[label];
  if (!src) return null;

  return (
    <span className="skill-icon-wrap" aria-hidden="true">
      <img src={src} alt="" className="skill-icon" width={14} height={14} />
    </span>
  );
}

/**
 * SkillGroup — reveals with a staggered fade-up.
 */
function SkillGroup({ category, items, delay }) {
  const ref = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });
  return (
    <div
      ref={ref}
      className="skills__group anim-fade-up"
      data-delay={delay}
      role="listitem"
      aria-label={`${category} skills`}
    >
      <p className="skills__group-label">{category}</p>
      <ul className="skills__items" role="list">
        {items.map((item) => (
          <li key={item} className="skills__item">
            <SkillIcon label={item} />
            {item}
          </li>
        ))}
      </ul>
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

        {/* Proficiency groups — each group staggered */}
        <div className="skills__grid" role="list" aria-label="Skill groups">
          {skillGroups.map(({ category, items }, i) => (
            <SkillGroup
              key={category}
              category={category}
              items={items}
              delay={i + 1}
            />
          ))}
        </div>

        {/*
          Currently learning — OWN block, separate from proficiency groups.
          No icons here — these are not claimed proficiencies.
        */}
        <div
          ref={learningRef}
          className="skills__learning anim-fade-up"
          aria-labelledby="learning-heading"
        >
          <div className="skills__learning-header">
            <span id="learning-heading" className="skills__learning-label">
              [~] Currently learning
            </span>
            <span className="caption-md color-mute">
              &mdash; in progress, not yet proficient
            </span>
          </div>
          <ul className="skills__learning-items" role="list">
            {currentlyLearning.map((item) => (
              <li key={item} className="skills__learning-item">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
