import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TypewriterText from './TypewriterText';

// ─────────────────────────────────────────────────────────────────────────────
// macOS Terminal typing sequence for the Experience section
// ─────────────────────────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { text: '$ company',                  isCmd: true },
  { text: 'Elite Forums',              isCmd: false },
  { text: '',                           isGap: true },
  { text: '$ role',                     isCmd: true },
  { text: 'Web Development Intern',    isCmd: false },
  { text: '',                           isGap: true },
  { text: '$ tech',                     isCmd: true },
  { text: 'React',                     isCmd: false },
  { text: 'JavaScript',               isCmd: false },
  { text: 'HTML',                      isCmd: false },
  { text: 'CSS',                       isCmd: false },
  { text: 'Supabase',                 isCmd: false },
  { text: 'Vercel',                   isCmd: false },
  { text: 'Groq API',                 isCmd: false },
  { text: 'Resend',                   isCmd: false },
  { text: '',                           isGap: true },
  { text: '$ status',                   isCmd: true },
  { text: 'Completed Internship ✓',   isCmd: false },
];

function ExpTerminal({ inView }) {
  const [completedLines, setCompleted] = useState([]);
  const [typingText, setTypingText]    = useState('');
  const [done, setDone]                = useState(false);
  const hasRun                         = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    let cancelled = false;
    const finished = [];
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    async function run() {
      await sleep(300);
      for (const line of TERMINAL_LINES) {
        if (cancelled) return;

        if (line.isGap) {
          finished.push({ text: '', isGap: true });
          setCompleted([...finished]);
          await sleep(80);
          continue;
        }

        const speed = line.isCmd ? 55 : 28;
        for (let i = 1; i <= line.text.length; i++) {
          if (cancelled) return;
          setTypingText(line.text.slice(0, i));
          await sleep(speed);
        }

        if (cancelled) return;
        finished.push({ text: line.text, isCmd: line.isCmd });
        setCompleted([...finished]);
        setTypingText('');
        await sleep(line.isCmd ? 180 : 60);
      }
      if (!cancelled) setDone(true);
    }

    run();
    return () => { cancelled = true; };
  }, [inView]);

  return (
    <div className="about__terminal" aria-hidden="true">
      {/* macOS title bar */}
      <div className="about__terminal-titlebar">
        <span className="about__terminal-dot about__terminal-dot--red" />
        <span className="about__terminal-dot about__terminal-dot--yellow" />
        <span className="about__terminal-dot about__terminal-dot--green" />
        <span className="about__terminal-title">internship — bash</span>
      </div>

      {/* Terminal body */}
      <div className="about__terminal-body">
        {completedLines.map((line, i) =>
          line.isGap ? (
            <div key={i} className="term-line term-line--gap" />
          ) : (
            <div
              key={i}
              className={`term-line ${line.isCmd ? 'term-line--cmd' : 'term-line--out'}`}
            >
              {line.text}
            </div>
          )
        )}
        {typingText && (
          <div className="term-line term-line--typing">
            {typingText}<span className="tw-cursor">▌</span>
          </div>
        )}
        {!done && !typingText && completedLines.length === 0 && (
          <span className="tw-cursor" style={{ fontSize: 14 }}>▌</span>
        )}
      </div>
    </div>
  );
}

export default function Internship() {
  const leftRef  = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });
  const rightRef = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Trigger terminal animation when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="internship" ref={sectionRef} aria-labelledby="experience-heading">
      <div className="container">
        <TypewriterText
          text="[+] Experience"
          as="span"
          speed={50}
          className="section-label heading-md"
          id="experience-heading"
        />

        <div className="about__grid">
          {/* Left — experience details */}
          <div ref={leftRef} className="about__left anim-fade-up">
            {/* Org + role header */}
            <div className="internship__header">
              <span className="internship__org">Elite Forums Internship</span>
              <span className="badge-outline internship__badge">Current</span>
            </div>

            <p className="about__text" style={{ marginTop: 'var(--space-lg)' }}>
              Throughout my internship and personal projects, I gained
              practical experience in modern web development by building
              responsive applications using React, JavaScript, HTML, and CSS.
              I worked with Supabase for authentication and database
              management, implementing complete CRUD operations and
              integrating backend services into production-ready applications.
            </p>

            <p className="about__text" style={{ marginTop: 'var(--space-xl)' }}>
              I deployed projects using Vercel, learned deployment workflows,
              environment variable management, and application hosting.
              Additionally, I integrated AI capabilities using the Groq API
              and implemented email functionality using Resend, giving me
              exposure to AI-assisted applications and communication services.
            </p>

            <p className="about__text" style={{ marginTop: 'var(--space-xl)' }}>
              These experiences strengthened my understanding of frontend
              development, backend integration, cloud deployment, REST APIs,
              authentication, deployment pipelines, and real-world software
              engineering practices.
            </p>
          </div>

          {/* Right — macOS terminal card */}
          <div ref={rightRef} className="about__right anim-fade-up" data-delay="2">
            <ExpTerminal inView={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}
