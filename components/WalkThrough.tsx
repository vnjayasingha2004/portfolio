"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { MaskText } from "./MaskText";
import { Magnetic } from "./Magnetic";

// Scroll is split into "hold" (standing at a project) and "move" (walking to the next).
const HOLD = 1;
const MOVE = 1.3;
// Viewport heights of scrolling per unit above
const VH_PER_UNIT = 42;

const easeInOut = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

/** Map section progress (0..1) to a position along the projects, with pauses at each one. */
function positionAt(progress: number, n: number) {
  const total = n * HOLD + (n - 1) * MOVE;
  let u = Math.min(Math.max(progress, 0), 1) * total;
  for (let i = 0; i < n; i++) {
    if (u <= HOLD || i === n - 1) return { f: i, moving: false };
    u -= HOLD;
    if (u <= MOVE) return { f: i + easeInOut(u / MOVE), moving: true };
    u -= MOVE;
  }
  return { f: n - 1, moving: false };
}

/**
 * Selected work as side-scrolling "levels". The section pins, vertical scroll walks
 * the guide along a ground line, and it stops at each project to introduce it.
 * The guide itself is the global Mascot, which follows the [data-mascot-walk] spot.
 */
export function WalkThrough({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const n = projects.length;
  const total = n * HOLD + (n - 1) * MOVE;

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const spot = spotRef.current;
    if (!section || !track || !spot) return;
    const panels = Array.from(track.querySelectorAll<HTMLElement>(".walk-panel"));
    const flags = Array.from(track.querySelectorAll<HTMLElement>(".walk-flag"));

    let base = 0;
    let step = 0;
    let lastY = window.scrollY;
    let lastMoveAt = 0;
    let facing = 1;
    let saidAt = -1;
    let current = -1;
    let frame = 0;

    const measure = () => {
      const w = panels[0].offsetWidth;
      step = panels.length > 1 ? panels[1].offsetLeft - panels[0].offsetLeft : w;
      base = window.innerWidth / 2 - panels[0].offsetLeft - w / 2;
    };

    const tick = (now: number) => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? -rect.top / scrollable : 0;
      const { f, moving } = positionAt(progress, n);

      const y = window.scrollY;
      if (y !== lastY) {
        facing = y > lastY ? 1 : -1;
        lastMoveAt = now;
        lastY = y;
      }
      const walking = moving && now - lastMoveAt < 160;

      track.style.transform = `translate3d(${(base - f * step).toFixed(1)}px, 0, 0)`;
      panels.forEach((panel, i) => {
        const d = Math.min(1, Math.abs(f - i));
        panel.style.setProperty("--d", d.toFixed(3));
        flags[i]?.classList.toggle("is-reached", d < 0.05);
      });
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;

      spot.dataset.walking = walking ? "true" : "false";
      spot.dataset.facing = String(facing);

      const index = Math.round(f);
      if (index !== current) {
        current = index;
        setActive(index);
      }

      // Introduce a project when the guide stops at it, while the section is pinned
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (pinned && !moving && saidAt !== index) {
        saidAt = index;
        const text = index === 0 ? `Here's his work! ${projects[0].guide}` : projects[index].guide;
        window.dispatchEvent(new CustomEvent("guide:say", { detail: { text } }));
      }
      if (!pinned && rect.top > 0) saidAt = -1;

      frame = requestAnimationFrame(tick);
    };

    measure();
    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [n, projects]);

  return (
    <section
      ref={sectionRef}
      className="walk"
      id="work"
      data-theme="ink"
      aria-label="Selected work"
      style={{ height: `calc(100vh + ${Math.round(total * VH_PER_UNIT)}vh)` }}
    >
      <div className="walk-sticky">
        <div className="shell walk-head">
          <MaskText as="h2" className="section-title">
            Selected work
          </MaskText>
          <div className="walk-meta">
            <p className="walk-count" aria-hidden="true">
              {active + 1} / {n}
            </p>
            <div className="walk-progress" aria-hidden="true">
              <span ref={progressRef} />
            </div>
            <Magnetic>
              <Link href="/projects" className="text-link walk-all">
                See all projects
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="walk-world">
          <div ref={trackRef} className="walk-track">
            {projects.map((project, i) => (
              <article key={project.slug} className="walk-panel" aria-hidden={i !== active}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={`walk-frame walk-frame-${project.device}`}
                  tabIndex={-1}
                >
                  {(project.device === "phone" ? project.images : project.images.slice(0, 1)).map((image) => (
                    <img key={image.src} src={image.src} alt={image.alt} loading="lazy" draggable={false} />
                  ))}
                </Link>
                <div className="walk-copy">
                  <p className="walk-type">
                    {project.type}, {project.year}
                  </p>
                  <h3>{project.title}</h3>
                  <p>{project.short}</p>
                  <Magnetic>
                    <Link href={`/projects/${project.slug}`} className="text-link" tabIndex={i === active ? 0 : -1}>
                      Open the case study
                    </Link>
                  </Magnetic>
                </div>
                <span className="walk-flag" aria-hidden="true">
                  <i />
                </span>
              </article>
            ))}
            <span className="walk-ground" aria-hidden="true" />
          </div>
          <div ref={spotRef} className="walk-spot" data-mascot-walk aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
