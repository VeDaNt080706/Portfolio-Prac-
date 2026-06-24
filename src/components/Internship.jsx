import { useScrollReveal } from '../hooks/useScrollReveal';
import TypewriterText from './TypewriterText';

export default function Internship() {
  const leftRef  = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });
  const rightRef = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });

  return (
    <section id="internship" aria-labelledby="internship-heading">
      <div className="container">
        <TypewriterText
          text="[+] Internship"
          as="span"
          speed={50}
          className="section-label heading-md"
        />

        <div className="about__grid">
          {/* Left — internship details */}
          <div ref={leftRef} className="about__left anim-fade-up">
            {/* Org + role header */}
            <div className="internship__header">
              <span className="internship__org">Elite Forums</span>
              <span className="badge-outline internship__badge">Current</span>
            </div>

            {/*
              TODO: Replace placeholder text below with real internship details.
              Fields to update: role title, team/focus area, start date, duration,
              key responsibilities, and any notable outcomes.
            */}
            <p className="about__text" style={{ marginTop: 'var(--space-lg)' }}>
              Currently interning at{' '}
              <strong style={{ color: 'var(--color-ink)' }}>Elite Forums</strong>{' '}
              as a{' '}
              {/* TODO: Replace with real role title */}
              <strong style={{ color: 'var(--color-ink)' }}>Web Development Intern</strong>
              , working within the product &amp; engineering team on internal tooling
              and frontend-facing features.
            </p>

            <p className="about__text" style={{ marginTop: 'var(--space-xl)' }}>
              {/* TODO: Replace with real responsibilities */}
              Responsibilities include building and maintaining React-based UI
              components, contributing to deployment pipelines, and collaborating
              with senior engineers on infrastructure improvements using Docker and
              cloud services.
            </p>

            <p className="about__text" style={{ marginTop: 'var(--space-xl)' }}>
              {/* TODO: Replace with real duration and start/end dates */}
              Duration: <span style={{ color: 'var(--color-ink)' }}>Ongoing — started Month YYYY</span>.
              Focus areas: frontend development, DevOps fundamentals, and team
              workflow practices in a real production environment.
            </p>
          </div>

          {/* Right — terminal meta card */}
          <div ref={rightRef} className="about__right anim-fade-up" data-delay="2" aria-hidden="true">
            <div className="about__stat-card">
              <div className="about__stat-header">
                <span className="about__stat-label">$ cat internship.json</span>
              </div>
              <div className="about__stat-body">
                <div className="about__stat-row">
                  <span className="about__stat-key">&quot;org&quot;</span>
                  <span className="about__stat-colon">:</span>
                  <span className="about__stat-val">&quot;Elite Forums&quot;</span>
                </div>
                <div className="about__stat-row">
                  <span className="about__stat-key">&quot;role&quot;</span>
                  <span className="about__stat-colon">:</span>
                  {/* TODO: update with real role */}
                  <span className="about__stat-val">&quot;Web Dev Intern&quot;</span>
                </div>
                <div className="about__stat-row">
                  <span className="about__stat-key">&quot;started&quot;</span>
                  <span className="about__stat-colon">:</span>
                  {/* TODO: update with real start date */}
                  <span className="about__stat-val">&quot;Month YYYY&quot;</span>
                </div>
                <div className="about__stat-row">
                  <span className="about__stat-key">&quot;status&quot;</span>
                  <span className="about__stat-colon">:</span>
                  <span className="about__stat-val about__stat-val--green">&quot;active&quot;</span>
                </div>
                <div className="about__stat-row">
                  <span className="about__stat-key">&quot;stack&quot;</span>
                  <span className="about__stat-colon">:</span>
                  <span className="about__stat-val">[&quot;React&quot;, &quot;Docker&quot;, &quot;AWS&quot;]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
