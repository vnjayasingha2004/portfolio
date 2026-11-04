import { ContactFooter } from "@/components/ContactFooter";
import { CvButton } from "@/components/CvButton";
import { HeroScene } from "@/components/HeroScene";
import { Journey } from "@/components/Journey";
import { KineticName } from "@/components/KineticName";
import { LocalTime } from "@/components/LocalTime";
import { MaskText } from "@/components/MaskText";
import { OpeningScene } from "@/components/OpeningScene";
import { RevealStatement } from "@/components/RevealStatement";
import { RotatingWord } from "@/components/RotatingWord";
import { ScrollCue } from "@/components/ScrollCue";
import { StackMap } from "@/components/StackMap";
import { VelocityMarquee } from "@/components/VelocityMarquee";
import { WalkThrough } from "@/components/WalkThrough";
import { WorkButton } from "@/components/WorkButton";
import { profile } from "@/lib/profile";
import { projects } from "@/lib/projects";

const facts = [
  { label: "Studying", value: "BSc (Hons) Computer Science, NSBM Green University (University of Plymouth)" },
  { label: "Based in", value: profile.location },
  { label: "Builds", value: "Web apps, mobile apps, desktop software" },
  { label: "Looking for", value: "Internships and junior developer roles" },
];

export default function Home() {
  return (
    <main id="main">
      <OpeningScene />

      <HeroScene>
        <div className="hero-center">
          <div className="hero-title">
            <KineticName lines={["Vinira", "Jayasingha"]} className="hero-name" waitForIntro />
            <div className="mascot-spot" data-mascot-spot aria-hidden="true" />
          </div>
          <p className="hero-role">
            I build <RotatingWord words={["full-stack web apps", "mobile apps", "desktop software", "AI-powered tools"]} />
          </p>
          <p className="hero-lede">
            A Computer Science undergraduate in Sri Lanka, shipping real products, from an AI planning workspace to a
            point-of-sale system running in a hardware shop.
          </p>
          <div className="hero-actions">
            <CvButton />
            <WorkButton />
          </div>
        </div>

        <div className="hero-bottom">
          <p className="hero-status">
            <span className="status-dot" aria-hidden="true" />
            Available for work
          </p>
          <ScrollCue target="#about" />
          <p className="hero-where">
            Tangalle, Sri Lanka <LocalTime />
          </p>
        </div>
      </HeroScene>

      <section className="section about" id="about" data-theme="space" data-bot-say="First, a little about Vinira.">
        <div className="shell about-grid">
          <MaskText className="section-label">About</MaskText>
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

      <section className="section stack" id="stack" data-theme="space" data-bot-say="His toolbox. Pick a tool to see where he used it.">
        <div className="shell">
          <div className="section-head">
            <MaskText className="section-title">What I work with</MaskText>
          </div>
          <StackMap projects={projects} />
        </div>
      </section>

      <WalkThrough projects={projects} />

      <Journey />

      <VelocityMarquee />

      <ContactFooter />
    </main>
  );
}
