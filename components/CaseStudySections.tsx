import type { Project } from "@/lib/projects";

export function CaseStudySections({ project }: { project: Project }) {
  const blocks = [
    { label: "Problem", text: project.problem },
    { label: "Approach", text: project.approach },
    { label: "Result", text: project.result },
  ];

  return (
    <section className="case-study-grid section-shell">
      {blocks.map((block) => (
        <article key={block.label}>
          <span>{block.label}</span>
          <p>{block.text}</p>
        </article>
      ))}
    </section>
  );
}

export function CaseArchitecture({ project }: { project: Project }) {
  return (
    <section className="architecture-section section-shell">
      <div className="section-heading-row">
        <div>
          <p className="section-kicker">Build notes</p>
          <h2>How the system is shaped</h2>
        </div>
        <p>{project.role}</p>
      </div>
      <div className="architecture-grid">
        {project.architecture.map((item, index) => (
          <article key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
