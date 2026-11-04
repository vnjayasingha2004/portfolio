"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
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

/** Education, client work and projects on a timeline whose line fills as you scroll. */
export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <div className="shell journey-grid" id="journey" data-bot-say="Here's the road so far: study, client work and projects.">
        <div className="journey-head">
          <MaskText as="h3" className="journey-title">The road so far</MaskText>
          <p className="section-note">Study, client work and the products along the way.</p>
        </div>
        <ol ref={ref} className="journey-list">
          <span className="journey-line" aria-hidden="true">
            <motion.span style={{ scaleY: reduce ? 1 : fill }} />
          </span>
          {stops.map((stop) => (
            <motion.li
              key={stop.title}
              className={`journey-stop${stop.current ? " is-current" : ""}`}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="journey-dot" aria-hidden="true" />
              <p className="journey-when">{stop.when}</p>
              <h3>{stop.title}</h3>
              <p className="journey-place">{stop.place}</p>
              <p className="journey-text">{stop.text}</p>
            </motion.li>
          ))}
        </ol>
    </div>
  );
}
