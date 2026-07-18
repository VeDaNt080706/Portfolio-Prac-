import ExpandableCard from './ExpandableCard';

/**
 * ProjectCard — renders a project entry.
 * Reuses the generic ExpandableCard component for visuals and interactions.
 */
export default function ProjectCard({ project }) {
  const { name, oneLiner, description, role, stack, status, links } = project;

  const statusClass =
    status === 'Shipped'             ? 'badge-success' :
    status === 'Completed'           ? 'badge-success' :
    status === 'Functional prototype' ? 'badge-warning' :
    'badge-outline';

  const alwaysVisibleContent = (
    <div className="project-card__stack" aria-label="Technology stack">
      {stack.map((tech) => (
        <span key={tech} className="badge-outline">{tech}</span>
      ))}
    </div>
  );

  const fileName = `${name.toLowerCase().replace(/\s+/g, '-')}/README.md`;

  return (
    <ExpandableCard
      title={name}
      subtitle={oneLiner}
      badge={status}
      badgeClass={statusClass}
      alwaysVisibleContent={alwaysVisibleContent}
      fileName={fileName}
    >
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
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // don't collapse on link click
                >
                  {label} ↗
                </a>
              );
            })}
          </div>
        </div>
      )}
    </ExpandableCard>
  );
}
