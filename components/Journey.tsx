"use client";

import { useEffect, useRef, useState } from "react";
import { MaskText } from "./MaskText";

type Stop = { when: string; title: string; place: string; text: string; current?: boolean };

// From Vinira's CV
const stops: Stop[] = [
  {
    when: "2025 – 2026",
    title: "Product projects",
    place: "SprintFlow AI, BlindMatch PAS, LawPoint, SafeSound",
    text: "Full-stack, mobile and AI-assisted products built end to end: auth, role-based workflows, database design, APIs and the interface.",
    current: true,
  },
  {
    when: "2025",
    title: "Offline POS and inventory system",
    place: "Client project for Sumith Hardware",
    text: "Built and sold a desktop point-of-sale with barcode billing, receipt printing, cash drawer support and local SQLite storage that works without internet.",
  },
  {
    when: "2024 – 2027",
    title: "BSc (Hons) Computer Science",
    place: "NSBM Green University, affiliated with the University of Plymouth",
    text: "Currently studying, with a focus on software engineering across web, mobile and desktop.",
    current: true,
  },
  {
    when: "Leadership",
    title: "Events subcommittee member",
    place: "CSSL GenZ Chapter, NSBM Green University",
    text: "Helping plan and run events for the computing student community.",
  },
  {
    when: "Certifications",
    title: "AI Foundations Associate",
    place: "Also: EF SET English Certificate, 71/100 (C2 Proficient)",
    text: "Grounding in how modern AI systems work, which feeds into features like SprintFlow AI's planner.",
  },
];

/**
 * Education, client work and projects on a timeline. The glowing line grows to wherever
 * the middle of the screen is, and each dot lights up the moment the line reaches it.
 */
export function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = Array.from(list.querySelectorAll<HTMLElement>(".journey-dot"));
    const line = fill.parentElement as HTMLElement;
    const tipEl = tipRef.current;
    let frame = 0;
    let count = -1;

    // The line runs exactly from the first dot to the last
    const measure = () => {
      const lr = list.getBoundingClientRect();
      const first = dots[0].getBoundingClientRect();
      const last = dots[dots.length - 1].getBoundingClientRect();
      const top = first.top + first.height / 2 - lr.top;
      line.style.top = `${top}px`;
      line.style.height = `${last.top + last.height / 2 - lr.top - top}px`;
      line.style.bottom = "auto";
    };

    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.55;
      const lr = line.getBoundingClientRect();
      const length = reduce ? lr.height : Math.min(lr.height, Math.max(0, marker - lr.top));
      fill.style.transform = `scaleY(${lr.height ? (length / lr.height).toFixed(4) : 0})`;
      if (tipEl) {
        tipEl.style.transform = `translate3d(0, ${length.toFixed(1)}px, 0)`;
        tipEl.style.opacity = length > 2 && length < lr.height - 2 ? "1" : "0";
      }
      const tip = lr.top + length;
      let n = 0;
      dots.forEach((dot) => {
        const r = dot.getBoundingClientRect();
        if (r.top + r.height / 2 <= Math.min(tip, marker) + 1 && length > 0) n++;
      });
      if (n !== count) {
        count = n;
        setReached(n);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    update();
    // Card heights can change once fonts load
    document.fonts?.ready.then(onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(list);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="shell journey-grid" id="journey" data-bot-say="Here's the road so far: study, client work and projects.">
      <div className="journey-head">
        <MaskText as="h3" className="journey-title">
          The road so far
        </MaskText>
        <p className="section-note">Study, client work and the products along the way.</p>
      </div>
      <ol ref={listRef} className="journey-list">
        <span className="journey-line" aria-hidden="true">
          <span ref={fillRef} className="journey-fill" />
          <span ref={tipRef} className="journey-tip" />
        </span>
        {stops.map((stop, i) => (
          <li key={stop.title} className={`journey-stop${i < reached ? " is-reached" : ""}`}>
            <span className="journey-dot" aria-hidden="true" />
            <p className="journey-when">
              {stop.when}
              {stop.current && <span className="journey-now">Now</span>}
            </p>
            <h3>{stop.title}</h3>
            <p className="journey-place">{stop.place}</p>
            <p className="journey-text">{stop.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
