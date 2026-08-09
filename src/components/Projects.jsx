import { useScrollReveal } from '../hooks/useScrollReveal';
import TypewriterText from './TypewriterText';
import { projects } from '../data';
import ProjectCard from './ProjectCard';
import UiUxProjectCard from './UiUxProjectCard';


export default function Projects() {
  const gridRef = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <TypewriterText
          text="[+] Projects"
          as="span"
          speed={50}
          className="section-label heading-md"
          id="projects-heading"
        />

        <div ref={gridRef} className="projects__grid anim-fade-up">
          {projects.map((project) =>
            project.id === 'ui-ux-case-study' ? (
              <UiUxProjectCard key={project.id} project={project} />
            ) : (
              <ProjectCard key={project.id} project={project} />
            )
          )}


          {/* Placeholder slot — always the last cell */}
          <div
            className="project-card__placeholder anim-fade-up"
            data-delay="2"
            aria-label="Placeholder for a future project"
          >
            <span className="color-mute body-strong">[-] Next project</span>
            <p className="body-md color-mute">
              Reserved for a future hackathon submission.
            </p>
            <p className="caption-md color-ash">
              Add an entry to <code>src/data.js → projects[]</code> to fill this slot.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
