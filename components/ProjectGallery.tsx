import type { Project } from "@/lib/projects";

export function ProjectGallery({ project }: { project: Project }) {
  return (
    <section className="case-gallery section-shell">
      <div className="section-heading-row">
        <div>
          <p className="section-kicker">Product surface</p>
          <h2>Interface moments</h2>
        </div>
        
      </div>
      <div className="gallery-grid">
        {project.images.map((image, index) => (
          <figure key={image.src} className={index === 0 ? "gallery-feature" : ""}>
            <img src={image.src} alt={image.alt} />
            <figcaption>{image.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
