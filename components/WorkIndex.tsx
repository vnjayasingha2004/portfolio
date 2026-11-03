"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Project } from "@/lib/projects";

const stackLine = (project: Project) =>
  project.stack
    .filter((item) => ["Frontend", "Backend", "Mobile", "Desktop", "AI", "Database"].includes(item.group))
    .slice(0, 3)
    .map((item) => item.name)
    .join(", ");

/**
 * Index of projects. On pointer devices a screenshot follows the cursor,
 * tilting with its velocity; on touch the screenshot sits inside the row.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const velocity = useMotionValue(0);
  const rotate = useSpring(useTransform(velocity, [-1600, 1600], [-9, 9]), { stiffness: 200, damping: 20 });
  const last = useRef({ x: 0, t: 0 });

  // On touch screens there's no hover, so the row crossing the middle of the screen lights up.
  useEffect(() => {
    if (!matchMedia("(hover: none)").matches) return;
    const rows = Array.from(listRef.current?.querySelectorAll<HTMLLIElement>(".work-list > li") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(rows.indexOf(entry.target as HTMLLIElement));
        });
      },
      { rootMargin: "-46% 0px -46% 0px" },
    );
    rows.forEach((row) => io.observe(row));
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    const now = performance.now();
    const dt = Math.max(1, now - last.current.t);
    velocity.set(((e.clientX - last.current.x) / dt) * 1000);
    last.current = { x: e.clientX, t: now };
  };

  return (
    <div
      ref={listRef}
      className="work-index"
      onPointerMove={onMove}
      onPointerLeave={() => {
        setActive(null);
        velocity.set(0);
      }}
    >
      <ol className="work-list">
        {projects.map((project, index) => (
          <li key={project.slug} className={active === index ? "is-active" : undefined}>
            <Link
              href={`/projects/${project.slug}`}
              className="work-row"
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            >
              <span className="work-fill" aria-hidden="true" />
              <span className="work-title">{project.title}</span>
              <span className="work-type">{project.eyebrow}</span>
              <span className="work-stack">{stackLine(project)}</span>
              <span className="work-year">{project.year}</span>
              <span className={`work-thumb work-thumb-${project.device}`} aria-hidden="true">
                <img src={project.images[0]?.src} alt="" loading="lazy" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <motion.div className="work-preview-anchor" style={{ x: sx, y: sy, rotate }} aria-hidden="true">
          <AnimatePresence mode="popLayout">
            {active !== null && (
              <motion.div
                key={projects[active].slug}
                className={`work-preview work-preview-${projects[active].device}`}
                initial={{ clipPath: "inset(50% 50% 50% 50% round 14px)", scale: 1.08 }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 14px)", scale: 1 }}
                exit={{ clipPath: "inset(50% 50% 50% 50% round 14px)", scale: 0.96, transition: { duration: 0.25 } }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={projects[active].images[0]?.src} alt="" />
              </motion.div>
            )}
          </AnimatePresence>
      </motion.div>
    </div>
  );
}
