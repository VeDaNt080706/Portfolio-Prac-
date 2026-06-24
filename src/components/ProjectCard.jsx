import { useRef, useState } from 'react';

/**
 * ProjectCard — renders a project entry.
 * Click anywhere on the card to expand/collapse the file-view detail panel.
 */
export default function ProjectCard({ project }) {
  const { name, oneLiner, description, role, stack, status, links } = project;
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  const statusClass =
    status === 'Shipped'             ? 'badge-success' :
    status === 'Functional prototype' ? 'badge-warning' :
    'badge-outline';

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
      className={`project-card${expanded ? ' expanded' : ''}`}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
      aria-label={`${name} — ${expanded ? 'collapse' : 'expand'} details`}
    >
      {/* Card header */}
      <div className="project-card__header">
        <h3 className="project-card__name">[+] {name}</h3>
        <span className={statusClass}>{status}</span>
      </div>

      {/* One-liner always visible */}
      <p className="project-card__one-liner">{oneLiner}</p>

      {/* Stack tags always visible */}
      <div className="project-card__stack" aria-label="Technology stack">
        {stack.map((tech) => (
          <span key={tech} className="badge-outline">{tech}</span>
        ))}
      </div>

      {/* Expand/collapse hint */}
      <span className="project-card__toggle" aria-hidden="true">
        {expanded ? '[-] collapse' : '[+] expand'}
      </span>

      {/* ── Expanded file-view panel ── */}
      <div className="project-card__file-view" aria-hidden={!expanded}>
        {/* File header bar */}
        <div className="project-card__file-header">
          <span>📄</span>
          <span className="project-card__file-name">
            {name.toLowerCase().replace(/\s+/g, '-')}/README.md
          </span>
        </div>

        {/* File body — structured like a README */}
        <div className="project-card__file-body">
          <div className="project-card__file-row">
            <span className="project-card__file-key color-mute">&gt; status</span>
            <span className="project-card__file-val">{status}</span>
          </div>

          <div className="project-card__file-row">
            <span className="project-card__file-key color-mute">&gt; role</span>
            <span className="project-card__file-val">{role}</span>
          </div>

          <div>
            <p className="project-card__file-key color-mute" style={{ marginBottom: 6 }}>
              &gt; description
            </p>
            <p className="project-card__description" style={{ color: 'var(--color-body)' }}>
              {description}
            </p>
          </div>

          <div>
            <p className="project-card__file-key color-mute" style={{ marginBottom: 6 }}>
              &gt; stack
            </p>
            <div className="project-card__file-stack">
              {stack.map((tech) => (
                <span key={tech} className="badge-outline">{tech}</span>
              ))}
            </div>
          </div>

          {links.length > 0 && (
            <div>
              <p className="project-card__file-key color-mute" style={{ marginBottom: 6 }}>
                &gt; links
              </p>
              <div className="project-card__links" style={{ borderTop: 'none', paddingTop: 0 }}>
                {links.map(({ label, href }) => {
                  const isPlaceholder = href === '#';
                  return isPlaceholder ? (
                    <span
                      key={label}
                      style={{
                        color: 'var(--color-ash)',
                        cursor: 'default',
                        fontSize: 'var(--text-caption)',
                      }}
                    >
                      {label}{' '}
                      <span className="caption-md color-ash">(coming soon)</span>
                    </span>
                  ) : (
                    <a
                      key={label}
                      href={href}
                      className="project-card__link"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()} // don't collapse on link click
                    >
                      {label} ↗
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
