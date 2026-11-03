"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { Project } from "@/lib/projects";
import { ProjectMedia } from "./ProjectMedia";

function ReelCard({
  project,
  index,
  step,
  rotation,
}: {
  project: Project;
  index: number;
  step: number;
  rotation: MotionValue<number>;
}) {
  // How far this card is from facing the viewer, in degrees (-180..180)
  const offset = useTransform(rotation, (r) => ((((index * step + r) % 360) + 540) % 360) - 180);
  const brightness = useTransform(offset, (a) => `brightness(${1 - Math.min(1, Math.abs(a) / 120) * 0.6})`);

  return (
    <motion.div
      className="reel-card"
      style={{ transform: `rotateY(${index * step}deg) translateZ(var(--reel-r))`, filter: brightness }}
    >
      <Link href={`/projects/${project.slug}`} className={`reel-frame frame-${project.device}`} tabIndex={-1}>
        <ProjectMedia
          project={project}
          images={project.device === "phone" ? project.images : project.images.slice(0, 1)}
        />
      </Link>
    </motion.div>
  );
}

/**
 * A pinned scene: projects sit on a 3D ring that turns as you scroll,
 * with the facing project's name and a link beneath.
 */
export function WorkReel({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const n = projects.length;
  const step = 360 / n;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0.05, 0.95], [0, -step * (n - 1)]);
  const rotation = useSpring(raw, { stiffness: 140, damping: 28, mass: 0.6 });
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [-14, -6, -14]);
  const [active, setActive] = useState(0);

  useMotionValueEvent(rotation, "change", (r) => {
    const i = Math.round(-r / step);
    setActive(Math.min(n - 1, Math.max(0, i)));
  });

  const project = projects[active];

  return (
    <section
      ref={ref}
      className="reel"
      data-theme="ink"
      style={{ height: `${n * 85 + 70}vh` }}
      data-bot-say="Here's a quick 3D tour of his work. Keep scrolling!"
      aria-label="Project tour"
    >
      <div className="reel-sticky">
        <div className="shell reel-head">
          <h2 className="section-title">A quick tour</h2>
          <div className="reel-meta" aria-hidden="true">
            <p className="reel-count">
              {active + 1} / {n}
            </p>
            <div className="reel-progress">
              <motion.span style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        </div>

        <div className="reel-stage" aria-hidden="true">
          <motion.div className="reel-tilt" style={{ rotateX: tilt }}>
            <div className="reel-depth">
              <motion.div className="reel-ring" style={{ rotateY: rotation }}>
                {projects.map((p, i) => (
                  <ReelCard key={p.slug} project={p} index={i} step={step} rotation={rotation} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="shell reel-caption">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.slug}
              className="reel-caption-inner"
              initial={{ opacity: 0, y: 24, rotateX: -50 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -18, rotateX: 40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3>{project.title}</h3>
              <p>{project.eyebrow}</p>
              <Link href={`/projects/${project.slug}`} className="text-link">
                Open the case study
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
