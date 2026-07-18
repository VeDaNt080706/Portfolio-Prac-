import { useRef, useState } from 'react';

/**
 * ExpandableCard — a reusable terminal-style folder/file expander.
 * Visually structured like a macOS terminal folder or file, used for Projects and Skills.
 */
export default function ExpandableCard({
  title,
  subtitle,
  badge,
  badgeClass,
  alwaysVisibleContent,
  fileName,
  className = '',
  defaultExpanded = false,
  children,
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const cardRef = useRef(null);

  const toggle = () => {
    setExpanded((v) => !v);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <article
      ref={cardRef}
      className={`project-card${expanded ? ' expanded' : ''} ${className}`}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
      aria-label={`${title} — ${expanded ? 'collapse' : 'expand'} details`}
    >
      {/* Card header */}
      <div className="project-card__header">
        <h3 className="project-card__name">[+] {title}</h3>
        {badge && <span className={badgeClass}>{badge}</span>}
      </div>

      {/* Subtitle / one-liner */}
      {subtitle && <p className="project-card__one-liner">{subtitle}</p>}

      {/* Optional always-visible content (e.g. stack badges) */}
      {alwaysVisibleContent}

      {/* Expand/collapse hint */}
      <span className="project-card__toggle" aria-hidden="true">
        {expanded ? '[-] collapse' : '[+] expand'}
      </span>

      {/* ── Expanded file-view panel ── */}
      <div className="project-card__file-view" aria-hidden={!expanded}>
        {/* File header bar */}
        <div className="project-card__file-header">
          <span>📄</span>
          <span className="project-card__file-name">{fileName}</span>
        </div>

        {/* File body */}
        <div className="project-card__file-body">
          {children}
        </div>
      </div>
    </article>
  );
}
