import Link from "next/link";
import { ContactPanel } from "@/components/ContactPanel";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Nav } from "@/components/Nav";
import { ProjectRail } from "@/components/ProjectRail";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Projects - Vinira Jayasingha",
  description: "Selected projects by Vinira Jayasingha with product context, technology stack, and case study pages.",
};

export default function ProjectsPage() {
  return (
    <>
      <InteractiveBackground density={42} />
      <Nav />
      <main>
        <section className="projects-hero section-shell">
          <Link href="/" className="text-link muted-back">
            Back home
          </Link>
          <p className="section-kicker">Projects</p>
          <h1>Systems I can explain from product idea to implementation.</h1>
          <p>
            Each project opens into a case study page with screenshots, repository links, product notes, and a live constellation of the stack used to build it.
          </p>
        </section>
        <section className="section-shell">
          <ProjectRail projects={projects} large />
        </section>
        <ContactPanel />
      </main>
    </>
  );
}
