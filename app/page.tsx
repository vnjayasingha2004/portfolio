import { ContactSection } from "@/app/components/ContactSection";
import { HeroStage } from "@/components/HeroStage";
import { IntroSequence } from "@/components/IntroSequence";
import { Nav } from "@/components/Nav";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectLaunchLink } from "@/components/ProjectLaunchLink";
import { TechConstellation } from "@/components/TechConstellation";
import { globalStack, projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <IntroSequence />
      <Nav />

      <main>
        <HeroStage />

        <section className="section-shell stack-shell" id="stack">
          <TechConstellation
            items={globalStack}
            title="A connected map of the stack I build with"
            description="Tools are treated like parts of one system. Hover a logo to see its name, role, and where it sits in the product layer."
          />
        </section>

        <section className="section-shell" id="projects">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">Selected work</p>
              <h2>What I Built.</h2>
            </div>

            <ProjectLaunchLink href="/projects">
              View all projects
            </ProjectLaunchLink>
          </div>

          <div className="project-rail">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                large={index === 0}
              />
            ))}
          </div>
        </section>

        <ContactSection />
      </main>
    </>
  );
}