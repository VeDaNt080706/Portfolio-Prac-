import { useScrollReveal } from '../hooks/useScrollReveal';
import TypewriterText from './TypewriterText';
import { hackathons, projects } from '../data';

function getProjectById(id) {
  return projects.find((p) => p.id === id) ?? null;
}

/**
 * HackathonRow — each row slides in from the left with a stagger delay.
 */
function HackathonRow({ entry, delay }) {
  const ref = useScrollReveal({ rootMargin: '0px 0px -20px 0px' });
  const linked = entry.projectRef ? getProjectById(entry.projectRef) : null;

  return (
    <li ref={ref} className="hackathon-row anim-slide-left" data-delay={delay}>
      <span className="hackathon-row__date caption-md">{entry.date}</span>

      <div className="hackathon-row__content">
        <span className="hackathon-row__name body-strong">{entry.name}</span>
        <span className="hackathon-row__built body-md">
          Built:{' '}
          {linked ? (
            <a href="#projects">{entry.built}</a>
          ) : (
            entry.built
          )}
        </span>
      </div>

      {/*
        outcome is plain caption text — never a trophy / highlighted badge.
        Must say "Participant" or describe work, never a fabricated placement.
      */}
      <span className="hackathon-row__outcome caption-md color-mute">
        {entry.outcome}
      </span>
    </li>
  );
}

export default function Hackathons() {
  return (
    <section id="hackathons" aria-labelledby="hackathons-heading">
      <div className="container">
        <TypewriterText
          text="[+] Hackathons & Experience"
          as="span"
          speed={40}
          className="section-label heading-md"
          id="hackathons-heading"
        />

        {hackathons.length === 0 ? (
          <p className="body-md color-mute">
            [-] No entries yet — add events to{' '}
            <code>src/data.js → hackathons[]</code>.
          </p>
        ) : (
          <ol className="hackathons__list" aria-label="Hackathon history">
            {hackathons.map((entry, idx) => (
              <HackathonRow key={idx} entry={entry} delay={idx + 1} />
            ))}
          </ol>
        )}

        <p
          className="caption-md color-ash"
          style={{ marginTop: 'var(--space-xl)' }}
        >
          More entries to be added — copy the object shape in{' '}
          <code>src/data.js → hackathons[]</code> and fill in real event data.
        </p>
      </div>
    </section>
  );
}
