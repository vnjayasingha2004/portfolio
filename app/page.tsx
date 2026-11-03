import Link from "next/link";
import { ContactFooter } from "@/components/ContactFooter";
import { HeroScene } from "@/components/HeroScene";
import { HeroVideo } from "@/components/HeroVideo";
import { KineticName } from "@/components/KineticName";
import { LocalTime } from "@/components/LocalTime";
import { RevealStatement } from "@/components/RevealStatement";
import { StackMap } from "@/components/StackMap";
import { VelocityMarquee } from "@/components/VelocityMarquee";
import { WorkReel } from "@/components/WorkReel";
import { WorkIndex } from "@/components/WorkIndex";
import { profile } from "@/lib/profile";
import { projects } from "@/lib/projects";

const facts = [
  { label: "Studying", value: "BSc (Hons) Computer Science, Plymouth University" },
  { label: "Based in", value: profile.location },
  { label: "Builds", value: "Web apps, mobile apps, desktop software" },
  { label: "Looking for", value: "Internships and junior developer roles" },
];

export default function Home() {
  return (
    <main id="main">
      <HeroScene background={<HeroVideo />}>
        <div className="hero-title">
          <KineticName lines={["Vinira", "Jayasingha"]} className="hero-name" />
          <div className="mascot-spot" data-mascot-spot aria-hidden="true" />
        </div>

        <div className="hero-foot">
          <p className="hero-lede">
            Software developer building full-stack, mobile and desktop products, from AI planning tools to
            a point-of-sale system running in a real hardware shop.
          </p>
          <div className="hero-meta">
            <p>
              <span className="status-dot" aria-hidden="true" />
              Available for work
            </p>
            <p>
              Tangalle, Sri Lanka <LocalTime />
            </p>
          </div>
        </div>
      </HeroScene>

      <section className="section about" id="about" data-theme="paper" data-bot-say="First, a little about Vinira.">
        <div className="shell about-grid">
          <h2 className="section-label">About</h2>
          <div>
            <RevealStatement text="I care about the part of software people actually touch. I take a product from a rough idea to something that runs: the data model, the auth rules, the screens and the small details that make it feel finished. I've built for students, lawyers, shop owners and anyone who needs help fast." />
            <dl className="facts">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <WorkReel projects={projects} />

      <section className="section work" id="work" data-theme="paper" data-bot-say="These are the projects he's built. Open one!">
        <div className="shell">
          <div className="section-head">
            <h2 className="section-title">Selected work</h2>
            <Link href="/projects" className="text-link">
              See every project in detail
            </Link>
          </div>
          <WorkIndex projects={projects} />
        </div>
      </section>

      <section className="section stack" id="stack" data-theme="ink" data-bot-say="His toolbox. Pick a tool to see where he used it.">
        <div className="shell">
          <div className="section-head">
            <h2 className="section-title">The stack, by layer</h2>
          </div>
          <StackMap projects={projects} />
        </div>
      </section>

      <VelocityMarquee />

      <ContactFooter />
    </main>
  );
}
