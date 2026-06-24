import { useScrollReveal } from '../hooks/useScrollReveal';
import TypewriterText from './TypewriterText';

export default function About() {
  const leftRef  = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });
  const rightRef = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });

  return (
    <section id="about" aria-labelledby="about-heading">
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
              I&apos;m a 20-year-old diploma college student with a focus on
              DevOps and web development. I learn by building — most of what I
              know has come from shipping real (if imperfect) projects and
              hackathons rather than just coursework.
            </p>
            <p className="about__text" style={{ marginTop: 'var(--space-xl)' }}>
              Right now I&apos;m sharpening my skills with containerization,
              cloud basics, and full-stack development — and actively
              participating in hackathons to stress-test what I build under
              time pressure.
            </p>
          </div>

          {/* Right — terminal stat card */}
          <div ref={rightRef} className="about__right anim-fade-up" data-delay="2" aria-hidden="true">
            <div className="about__stat-card">
              <div className="about__stat-header">
                <span className="about__stat-label">$ cat profile.json</span>
              </div>
              <div className="about__stat-body">
                <div className="about__stat-row">
                  <span className="about__stat-key">&quot;age&quot;</span>
                  <span className="about__stat-colon">:</span>
                  <span className="about__stat-val about__stat-val--num">20</span>
                </div>
                <div className="about__stat-row">
                  <span className="about__stat-key">&quot;focus&quot;</span>
                  <span className="about__stat-colon">:</span>
                  <span className="about__stat-val">&quot;DevOps + Web Dev&quot;</span>
                </div>
                <div className="about__stat-row">
                  <span className="about__stat-key">&quot;learning&quot;</span>
                  <span className="about__stat-colon">:</span>
                  <span className="about__stat-val">&quot;by building&quot;</span>
                </div>
                <div className="about__stat-row">
                  <span className="about__stat-key">&quot;status&quot;</span>
                  <span className="about__stat-colon">:</span>
                  <span className="about__stat-val about__stat-val--green">&quot;actively building&quot;</span>
                </div>
                <div className="about__stat-row">
                  <span className="about__stat-key">&quot;open_to&quot;</span>
                  <span className="about__stat-colon">:</span>
                  <span className="about__stat-val">&quot;collabs + hackathons&quot;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
