import { useEffect, useRef, useState } from 'react';
import { contact } from '../data';

// ─────────────────────────────────────────────────────────────────────────────
// ASCII block-pixel "Vedant" wordmark
// ─────────────────────────────────────────────────────────────────────────────
const ASCII_WORDMARK = `
 ██╗   ██╗███████╗██████╗  █████╗ ███╗   ██╗████████╗
 ██║   ██║██╔════╝██╔══██╗██╔══██╗████╗  ██║╚══██╔══╝
 ██║   ██║█████╗  ██║  ██║███████║██╔██╗ ██║   ██║   
 ╚██╗ ██╔╝██╔══╝  ██║  ██║██╔══██║██║╚██╗██║   ██║   
  ╚████╔╝ ███████╗██████╔╝██║  ██║██║ ╚████║   ██║   
   ╚═══╝  ╚══════╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝   `.trimStart();

// ─────────────────────────────────────────────────────────────────────────────
// Terminal boot sequence lines
// ─────────────────────────────────────────────────────────────────────────────
const BOOT_LINES = [
  { text: '$ whoami',                                                        isCmd: true,  charSpeed: 65, pauseAfter: 180 },
  { text: '  vedant.s.mungapatil',                                           isCmd: false, charSpeed: 18, pauseAfter: 260 },
  { text: '',                                                                 isGap: true,                pauseAfter: 120 },
  { text: '$ cat about.md',                                                   isCmd: true,  charSpeed: 65, pauseAfter: 180 },
  { text: '  diploma student  •  devops  •  web dev  •  building',           isCmd: false, charSpeed: 14, pauseAfter: 260 },
  { text: '',                                                                 isGap: true,                pauseAfter: 120 },
  { text: '$ ls projects/',                                                   isCmd: true,  charSpeed: 65, pauseAfter: 180 },
  { text: '  laundryease/    hackathon-chatbot/    [more-soon/]',             isCmd: false, charSpeed: 12, pauseAfter: 260 },
  { text: '',                                                                 isGap: true,                pauseAfter: 120 },
  { text: '$ git status',                                                     isCmd: true,  charSpeed: 65, pauseAfter: 180 },
  { text: '  branch: main  •  tracking: origin/main  •  building in public', isCmd: false, charSpeed: 10, pauseAfter: 0  },
];

const BOOT_KEY = 'vsm_boot_played';

export default function Hero() {
  // ── Boot sequence ──
  const alreadyPlayed                     = sessionStorage.getItem(BOOT_KEY) === '1';
  const [bootDone, setBootDone]           = useState(alreadyPlayed);
  const [completedLines, setCompleted]    = useState([]);
  const [typingText, setTypingText]       = useState('');

  // ── Parallax: only a horizontal subtle shift, NO vertical drift ──
  // We intentionally do NOT apply translateY here — that caused the logo to
  // slide into the prompt row below it. Instead we track scroll only to
  // apply a very subtle opacity pulse, keeping the logo stationary.
  const heroRef = useRef(null);

  // ─────────────────────────────────────────────────────────────────────────
  // Boot sequence — async, cancelled on unmount
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (alreadyPlayed) return;

    let cancelled = false;
    const done    = [];
    const sleep   = (ms) => new Promise((res) => setTimeout(res, ms));

    async function runBoot() {
      await sleep(400);

      for (const line of BOOT_LINES) {
        if (cancelled) return;

        if (line.isGap) {
          done.push({ text: '', isGap: true });
          setCompleted([...done]);
          await sleep(line.pauseAfter);
          continue;
        }

        for (let i = 1; i <= line.text.length; i++) {
          if (cancelled) return;
          setTypingText(line.text.slice(0, i));
          await sleep(line.charSpeed);
        }

        if (cancelled) return;
        done.push({ text: line.text, isCmd: line.isCmd });
        setCompleted([...done]);
        setTypingText('');

        if (line.pauseAfter > 0) await sleep(line.pauseAfter);
      }

      await sleep(700);
      if (!cancelled) {
        sessionStorage.setItem(BOOT_KEY, '1');
        setBootDone(true);
      }
    }

    runBoot();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── No scroll listener — parallax removed to fix the drift bug ──

  return (
    <section id="top" ref={heroRef} className="hero" aria-labelledby="hero-name">
      <div className="container">

        {/* CTA buttons stay above the panel for easy access */}
        <div className="hero__ctas" style={{ marginBottom: 'var(--space-xxl)' }}>
          <a id="hero-cta-projects" href="#projects" className="btn btn-primary">
            [+] View projects
          </a>
          <a id="hero-cta-contact" href="#contact" className="btn btn-secondary">
            Contact
          </a>
          {contact.resume && (
            <a
              id="hero-cta-resume"
              href={contact.resume}
              className="btn btn-secondary"
              target="_blank"
              rel="noreferrer"
              download
            >
              Resume ↓
            </a>
          )}
        </div>

        {/* ── TUI Panel ── */}
        <div
          className="hero__tui"
          role="img"
          aria-label="Terminal interface — Vedant.S.Mungapatil portfolio"
        >
          {bootDone ? (
            <div className="tui-fade-in">
              {/* ASCII wordmark — position:relative, no transform */}
              <pre className="hero__tui-ascii" aria-hidden="true">
                {ASCII_WORDMARK}
              </pre>

              {/* Identity block moved inside panel */}
              <div className="hero__tui-identity" aria-label="Vedant S. Mungapatil — portfolio introduction">
                <h1 id="hero-name" className="hero__tui-name">
                  Vedant.S.Mungapatil
                </h1>
                <p className="hero__tui-tagline">
                  <span className="hero__tui-prompt-pipe">│</span>{' '}
                  Diploma student building in DevOps &amp; Web Development
                </p>
                <p className="hero__tui-hook">
                  <span className="hero__tui-prompt-pipe">│</span>{' '}
                  I build and ship things — exploring DevOps tooling &amp; full-stack web apps.
                </p>
              </div>

              {/* Fake terminal prompt row */}
              <div className="hero__tui-prompt" aria-hidden="true" style={{ marginTop: 'var(--space-xl)' }}>
                <span className="hero__tui-prompt-pipe">│</span>
                <span className="hero__tui-prompt-cmd">Build</span>
                <span className="hero__tui-prompt-pipe"> · </span>
                <span className="hero__tui-prompt-model">Gemini 2.0 Flash</span>
                <span className="hero__tui-prompt-pipe"> · </span>
                <span style={{ color: 'var(--color-on-dark-mute)' }}>portfolio v1</span>
              </div>

              {/* Keybinding hints */}
              <div className="hero__tui-hints" aria-hidden="true">
                <span><span className="hero__tui-hint-key">tab</span> switch panel</span>
                <span><span className="hero__tui-hint-key">ctrl-p</span> commands</span>
                <span><span className="hero__tui-hint-key">esc</span> exit</span>
              </div>
            </div>
          ) : (
            /* Boot sequence */
            <div className="hero__tui-boot" aria-live="polite" aria-label="Terminal boot sequence">
              {completedLines.map((line, i) =>
                line.isGap ? (
                  <div key={i} className="boot-line boot-line--gap" />
                ) : (
                  <div
                    key={i}
                    className={`boot-line ${line.isCmd ? 'boot-line--cmd' : 'boot-line--out'}`}
                  >
                    {line.text}
                  </div>
                )
              )}
              {typingText && (
                <div className="boot-line boot-line--typing">
                  {typingText}<span className="tw-cursor">▌</span>
                </div>
              )}
              {!typingText && completedLines.length === 0 && (
                <span className="tw-cursor" style={{ fontSize: 18 }}>▌</span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
