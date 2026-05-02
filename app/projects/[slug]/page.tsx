import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseArchitecture, CaseStudySections } from "@/components/CaseStudySections";
import { ContactPanel } from "@/components/ContactPanel";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Nav } from "@/components/Nav";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectLaunchLink } from "@/components/ProjectLaunchLink";
import { TechConstellation } from "@/components/TechConstellation";
import { getNextProject, getProject, projects } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} - Vinira Jayasingha`,
    description: project.short,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject = getNextProject(slug);

  return (
    <>
      <InteractiveBackground density={34} />
      <Nav />
      <main>
        <section className="case-hero section-shell">
          <div className="case-breadcrumbs">
            <Link href="/projects">Projects</Link>
            <span>/</span>
            <span>{project.title}</span>
          </div>
          <div className="case-hero-grid">
            <div>
              <p className="section-kicker">{project.eyebrow}</p>
              <h1>{project.title}</h1>
              <p>{project.summary}</p>
              <div className="case-actions">
                {project.links.length ? (
                  project.links.map((link) => (
                    <Link key={link.href} className="quiet-link light" href={link.href} target="_blank">
                      {link.label}
                    </Link>
                  ))
                ) : (
                  <span className="private-pill">Private client project</span>
                )}
                <Link className="quiet-link" href="/projects">
                  All projects
                </Link>
              </div>
            </div>
            <aside className="case-spec">
              <div>
                <span>Type</span>
                <strong>{project.type}</strong>
              </div>
              <div>
                <span>Year</span>
                <strong>{project.year}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{project.status}</strong>
              </div>
              <div>
                <span>Role</span>
                <strong>{project.role}</strong>
              </div>
            </aside>
          </div>
        </section>

        <section className="case-visual section-shell">
          <div className="case-device">
            <img src={project.images[0]?.src} alt={project.images[0]?.alt ?? project.title} />
          </div>
          <div className="case-highlights">
            <p className="section-kicker">Core features</p>
            <h2>What the product does</h2>
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-shell project-constellation-section">
          <TechConstellation
            compact
            items={project.stack}
            title={`${project.title} stack connections`}
            description="This is the route-specific animation idea: the stack appears as connected logos. Hover each logo to see whether it is frontend, backend, database, mobile, AI, security, desktop, or language work."
          />
        </section>

        <CaseStudySections project={project} />
        <ProjectGallery project={project} />
        <CaseArchitecture project={project} />

        <section className="next-project section-shell">
          <div>
            <p className="section-kicker">Next project</p>
            <h2>{nextProject.title}</h2>
            <p>{nextProject.short}</p>
          </div>
          <ProjectLaunchLink href={`/projects/${nextProject.slug}`}>Open next case study</ProjectLaunchLink>
        </section>

        <ContactPanel />
      </main>
    </>
  );
}
