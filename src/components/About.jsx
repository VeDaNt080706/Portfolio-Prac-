import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TypewriterText from './TypewriterText';

// ─────────────────────────────────────────────────────────────────────────────
// macOS Terminal typing sequence
// ─────────────────────────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { text: '$ whoami', isCmd: true },
  { text: 'VEDANT.S.MUNGAPATIL', isCmd: false },
  { text: '', isGap: true },
  { text: '$ role', isCmd: true },
  { text: 'Cloud Computing & Big Data Student', isCmd: false },
  { text: '', isGap: true },
  { text: '$ learning', isCmd: true },
  { text: 'DevOps', isCmd: false },
  { text: 'React', isCmd: false },
  { text: 'Express', isCmd: false },
  { text: 'TypeScript', isCmd: false },
  { text: 'Next.js', isCmd: false },
  { text: '', isGap: true },
  { text: '$ status', isCmd: true },
  { text: 'Building Projects...', isCmd: false },
];

function MacTerminal({ inView }) {
  const [completedLines, setCompleted] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [done, setDone] = useState(false);
  const hasRun = useRef(false);

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
          await sleep(100);
          continue;
        }

        // Type out character by character
        const speed = line.isCmd ? 55 : 30;
        for (let i = 1; i <= line.text.length; i++) {
          if (cancelled) return;
          setTypingText(line.text.slice(0, i));
          await sleep(speed);
        }

        if (cancelled) return;
        finished.push({ text: line.text, isCmd: line.isCmd });
        setCompleted([...finished]);
        setTypingText('');
        await sleep(line.isCmd ? 200 : 80);
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
        <span className="about__terminal-title">vedant — bash</span>
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

export default function About() {
  const leftRef = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });
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
    <section id="about" ref={sectionRef} aria-labelledby="about-heading">
      <div className="container">
        <TypewriterText
          text="[+] About"
          as="span"
          speed={50}
          className="section-label heading-md"
        />

        <div className="about__grid">
          {/* Left — bio text */}
          <div ref={leftRef} className="about__left anim-fade-up">
            <p className="about__text">
              I am a Cloud Computing &amp; Big Data diploma student with a
              growing interest in DevOps, Full Stack Web Development, and
              modern AI-powered applications. I enjoy building practical
              projects that solve real problems while continuously improving
              my understanding of software engineering principles.
            </p>
            <p className="about__text" style={{ marginTop: 'var(--space-xl)' }}>
              My learning focuses on creating scalable web applications,
              working with databases, integrating AI services, deploying
              applications, and exploring cloud technologies. I believe in
              learning by building, which is why most of my knowledge comes
              from hands-on development and experimentation.
            </p>
          </div>

          {/* Right — macOS terminal card */}
          <div ref={rightRef} className="about__right anim-fade-up" data-delay="2">
            <MacTerminal inView={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}
