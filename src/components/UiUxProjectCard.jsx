import { useRef, useState } from 'react';
import miroThumb from '../assets/thumb-miro-userflow.jpg';
import figmaThumb from '../assets/thumb-figma-case-study.png';

/* ── Inline SVG logos ───────────────────────────────────────────── */
const MiroLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16" style={{ flexShrink: 0 }}>
    <path fill="#fd3" d="M0 64C0 28.654 28.654 0 64 0h128c35.346 0 64 28.654 64 64v128c0 35.346-28.654 64-64 64H64c-35.346 0-64-28.654-64-64z"/>
    <path d="M170.195 48.8h-23.239l19.366 34.026L123.717 48.8h-23.239l21.303 41.588L77.239 48.8H54l23.239 52.937L54 207.6h23.239l44.542-113.426L100.478 207.6h23.239l42.605-120.988L146.956 207.6h23.239L212.8 75.263z"/>
  </svg>
);

const FigmaLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 384" width="12" height="18" style={{ flexShrink: 0 }}>
    <path fill="#0acf83" d="M64 384c35.328 0 64-28.672 64-64v-64H64c-35.328 0-64 28.672-64 64s28.672 64 64 64"/>
    <path fill="#a259ff" d="M0 192c0-35.328 28.672-64 64-64h64v128H64c-35.328 0-64-28.672-64-64"/>
    <path fill="#f24e1e" d="M0 64C0 28.672 28.672 0 64 0h64v128H64C28.672 128 0 99.328 0 64"/>
    <path fill="#ff7262" d="M128 0h64c35.328 0 64 28.672 64 64s-28.672 64-64 64h-64z"/>
    <path fill="#1abcfe" d="M256 192c0 35.328-28.672 64-64 64s-64-28.672-64-64 28.672-64 64-64 64 28.672 64 64"/>
  </svg>
);

const thumbnailMap = { miro: miroThumb, figma: figmaThumb };
const LogoMap = { miro: MiroLogo, figma: FigmaLogo };

/* ── External link card ─────────────────────────────────────────── */
function ExternalLinkCard({ label, href, platform, thumbnailKey }) {
  const Logo = LogoMap[platform] || (() => null);
  const thumb = thumbnailMap[thumbnailKey];

  return (
    <a
      href={href}
      className="uiux-link-card"
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Thumbnail area */}
      <div className="uiux-link-card__thumb">
        {thumb && <img src={thumb} alt={label} />}
      </div>
      {/* Footer strip */}
      <div className="uiux-link-card__footer">
        <span className="uiux-link-card__label">
          <Logo />
          <span>{label}</span>
        </span>
        <span className="uiux-link-card__arrow">&#8599;</span>
      </div>
    </a>
  );
}

/* ── Main UiUxProjectCard ───────────────────────────────────────── */
export default function UiUxProjectCard({ project }) {
  const { name, oneLiner, description, role, workflow, stack, status, links, externalLinks } = project;
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const cardRef = useRef(null);

  const statusClass =
    status === 'Shipped'              ? 'badge-success' :
    status === 'Completed'            ? 'badge-success' :
    status === 'Functional prototype' ? 'badge-warning' :
    'badge-outline';

  const fileName = `ui-/-ux-case-study/README.md`;

  const toggle = () => setExpanded((v) => !v);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const certificateLink = links?.find((l) => l.label.includes('Certificate'));

  return (
    <article
      ref={cardRef}
      className={`project-card uiux-card${expanded ? ' expanded' : ''}`}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
      aria-label={`${name} — ${expanded ? 'collapse' : 'expand'} details`}
    >
      {/* ── Card header ── */}
      <div className="project-card__header">
        <h3 className="project-card__name">[+] {name}</h3>
        {status && <span className={statusClass}>{status}</span>}
      </div>

      {/* ── One-liner ── */}
      {oneLiner && <p className="project-card__one-liner">{oneLiner}</p>}

      {/* ── Stack badges ── */}
      <div className="project-card__stack" aria-label="Technology stack">
        {stack.map((tech) => (
          <span key={tech} className="badge-outline">{tech}</span>
        ))}
      </div>

      {/* ── Tab bar — stops propagation so tabs don't toggle card ── */}
      <div
        className="uiux-tabs"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          className={`uiux-tab${expanded && activeTab === 'description' ? ' uiux-tab--active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!expanded) setExpanded(true);
            setActiveTab('description');
          }}
          aria-selected={activeTab === 'description'}
        >
          Description
        </button>
        <button
          className={`uiux-tab${expanded && activeTab === 'links' ? ' uiux-tab--active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!expanded) setExpanded(true);
            setActiveTab('links');
          }}
          aria-selected={activeTab === 'links'}
        >
          Links
        </button>
      </div>

      {/* ── Expand/collapse hint ── */}
      <span className="project-card__toggle" aria-hidden="true">
        {expanded ? '[-] collapse' : '[+] expand'}
      </span>

      {/* ── Expanded file-view panel ── */}
      <div className="project-card__file-view" aria-hidden={!expanded}>
        {/* File header bar */}
        <div className="project-card__file-header">
          <span>&#128196;</span>
          <span className="project-card__file-name">{fileName}</span>
        </div>

        {/* File body */}
        <div className="project-card__file-body">

          {activeTab === 'description' && (
            <>
              {/* status */}
              <div className="project-card__file-row">
                <span className="project-card__file-key color-mute">&gt; status</span>
                <span className="project-card__file-val">{status}</span>
              </div>

              {/* role */}
              <div className="project-card__file-row">
                <span className="project-card__file-key color-mute">&gt; role</span>
                <span className="project-card__file-val">{role}</span>
              </div>

              {/* workflow */}
              {workflow && (
                <div className="project-card__file-row uiux-workflow-row">
                  <span className="project-card__file-key color-mute">&gt; workflow</span>
                  <span className="project-card__file-val uiux-workflow-text">{workflow}</span>
                </div>
              )}

              {/* description */}
              <div>
                <p className="project-card__file-key color-mute" style={{ marginBottom: 6 }}>
                  &gt; description
                </p>
                <p className="project-card__description" style={{ color: 'var(--color-body)' }}>
                  {description}
                </p>
              </div>

              {/* Certificate link — directly under description */}
              {certificateLink && (
                <div onClick={(e) => e.stopPropagation()}>
                  <a
                    href={certificateLink.href}
                    className="project-card__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {certificateLink.label} &#8599;
                  </a>
                </div>
              )}
            </>
          )}

          {activeTab === 'links' && (
            <div className="uiux-link-grid">
              {(externalLinks || []).map((link) => (
                <ExternalLinkCard key={link.href} {...link} />
              ))}
            </div>
          )}

        </div>
      </div>
    </article>
  );
}
