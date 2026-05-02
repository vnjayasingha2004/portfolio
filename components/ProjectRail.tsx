import type { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectRail({ projects, large = false }: { projects: Project[]; large?: boolean }) {
  return (
    <div className="project-rail">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} large={large} />
      ))}
    </div>
  );
}
