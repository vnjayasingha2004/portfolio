import Link from "next/link";
import { ContactFooter } from "@/components/ContactFooter";
import { KineticName } from "@/components/KineticName";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ScrollScale } from "@/components/ScrollScale";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Work — Vinira Jayasingha",
  description: "Projects by Vinira Jayasingha with product context, screenshots, tech stack and case studies.",
};

export default function ProjectsPage() {
  return (
    <main id="main">
      <section className="page-head" data-theme="blue" data-bot-say="Every project, with the full story.">
        <div className="shell">
          <KineticName lines={["Work"]} className="page-title" />
          <p className="page-lede">
            {projects.length} products, each with the problem it solves, how I built it and the stack
            behind it.
          </p>
        </div>
      </section>

      <section className="section showcase" data-theme="paper">
        <div className="shell">
          {projects.map((project, index) => (
            <article className={`showcase-item${index % 2 ? " is-flipped" : ""}`} key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="showcase-media" tabIndex={-1} aria-hidden="true">
                <ScrollScale className={`showcase-frame frame-${project.device}`}>
                  <ProjectMedia project={project} images={project.device === "phone" ? project.images : project.images.slice(0, 1)} />
                </ScrollScale>
              </Link>
              <div className="showcase-copy">
                <p className="showcase-meta">
                  {project.type}, {project.year}
                </p>
                <h2>
                  <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                </h2>
                <p>{project.short}</p>
                <ul className="tag-list" aria-label="Tech stack">
                  {project.stack.slice(0, 5).map((item) => (
                    <li key={item.name}>{item.name}</li>
                  ))}
                </ul>
                <Link href={`/projects/${project.slug}`} className="text-link">
                  Read the case study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
