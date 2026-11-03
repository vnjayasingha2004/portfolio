import type { Project, ProjectImage } from "@/lib/projects";

/** Frames screenshots according to the device they came from. */
export function ProjectMedia({
  project,
  images = project.images,
  priority = false,
}: {
  project: Project;
  images?: ProjectImage[];
  priority?: boolean;
}) {
  if (project.device === "phone") {
    return (
      <div className="media media-phones">
        {images.map((image) => (
          <figure className="phone" key={image.src}>
            <img src={image.src} alt={image.alt} loading={priority ? "eager" : "lazy"} />
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div className="media media-web">
      {images.map((image) => (
        <figure className="screen" key={image.src}>
          <img src={image.src} alt={image.alt} loading={priority ? "eager" : "lazy"} />
        </figure>
      ))}
    </div>
  );
}
