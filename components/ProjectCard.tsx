import type { Project } from "@/lib/projects";
import { TechIcon } from "./TechIcon";
import { ProjectLaunchLink } from "./ProjectLaunchLink";

type ProjectCardProps = {
  project: Project;
  index: number;
  large?: boolean;
};

export function ProjectCard({ project, index, large = false }: ProjectCardProps) {
  return (
    <article className={`project-card ${large ? "project-card-large" : ""}`}>
      <div className="project-index">{String(index + 1).padStart(2, "0")}</div>
      <div className="project-card-media">
        <img src={project.images[0]?.src} alt={project.images[0]?.alt ?? `${project.title} visual`} />
        <div className="media-scan" aria-hidden="true" />
      </div>
      <div className="project-card-body">
        <p className="section-kicker">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p>{project.short}</p>
        <div className="project-meta-row">
          <span>{project.type}</span>
          <span>{project.year}</span>
          <span>{project.status}</span>
        </div>
        <div className="mini-stack" aria-label={`${project.title} technology stack preview`}>
          {project.stack.slice(0, 6).map((item) => (
            <span key={item.name} className="mini-stack-item" title={`${item.name} - ${item.group}`}>
              <TechIcon item={item} />
              <em>
                <strong>{item.name}</strong>
                <small>{item.group}</small>
              </em>
            </span>
          ))}
        </div>
        <ProjectLaunchLink href={`/projects/${project.slug}`} ariaLabel={`Open ${project.title} case study`}>
          Open case study
        </ProjectLaunchLink>
      </div>
    </article>
  );
}
