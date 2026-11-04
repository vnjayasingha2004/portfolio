import Link from "next/link";
import { MaskText } from "@/components/MaskText";
import { notFound } from "next/navigation";
import { ContactFooter } from "@/components/ContactFooter";
import { KineticName } from "@/components/KineticName";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ScrollScale } from "@/components/ScrollScale";
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
    title: `${project.title} — Vinira Jayasingha`,
    description: project.short,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  const story = [
    { label: "The problem", text: project.problem },
    { label: "How I approached it", text: project.approach },
    { label: "What came out of it", text: project.result },
  ];

  const titleLines = project.title.length > 16 ? splitTitle(project.title) : [project.title];

  return (
    <main id="main">
      <section className="case-head" data-theme="space" data-bot-say={`This is ${project.title}. Let me walk you through it!`}>
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/projects">Work</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <KineticName lines={titleLines} className="case-title" />

          <div className="case-intro">
            <p className="case-summary">{project.summary}</p>
            <dl className="case-spec">
              <div>
                <dt>Type</dt>
                <dd>{project.type}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>My role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>
                  {project.links.length ? (
                    project.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ))
                  ) : (
                    <>Private client project</>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="case-hero-media" data-theme="space">
        <div className="shell">
          <ScrollScale className={`case-frame frame-${project.device}`}>
            <ProjectMedia project={project} images={project.device === "phone" ? project.images : project.images.slice(0, 1)} priority />
          </ScrollScale>
        </div>
      </section>

      <section className="section case-story" data-theme="space">
        <div className="shell story-grid">
          {story.map((block) => (
            <article key={block.label}>
              <MaskText as="h2">{block.label}</MaskText>
              <p>{block.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section case-features" data-theme="space">
        <div className="shell split">
          <MaskText className="section-label">What it does</MaskText>
          <ul className="feature-list">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      </section>

      {project.device === "web" && project.images.length > 1 && (
        <section className="section case-gallery" data-theme="space">
          <div className="shell">
            <ScrollScale className="case-frame frame-web">
              <ProjectMedia project={project} images={project.images.slice(1)} />
            </ScrollScale>
          </div>
        </section>
      )}

      <section className="section case-build" data-theme="space" data-bot-say="Here's how he built it.">
        <div className="shell split">
          <MaskText className="section-label">How it&apos;s built</MaskText>
          <div>
            <ul className="build-notes">
              {project.architecture.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <dl className="stack-table">
              {project.stack.map((item) => (
                <div key={item.name}>
                  <dt>{item.name}</dt>
                  <dd>{item.note ?? item.group}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="next-case" data-theme="space">
        <Link href={`/projects/${next.slug}`} className="next-link">
          <span className="next-fill" aria-hidden="true" />
          <span className="next-label">Next project</span>
          <span className="next-title">{next.title}</span>
          <span className="next-short">{next.short}</span>
        </Link>
      </section>

      <ContactFooter heading="Like what you see?" />
    </main>
  );
}

function splitTitle(title: string) {
  const words = title.split(" ");
  const lines: string[] = [];
  let line = "";
  words.forEach((word) => {
    if ((line + " " + word).trim().length > 16 && line) {
      lines.push(line.trim());
      line = word;
    } else {
      line = `${line} ${word}`;
    }
  });
  if (line.trim()) lines.push(line.trim());
  return lines;
}
