"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** As the hero scrolls away it shrinks back and fades; the starfield behind keeps drifting. */
export function HeroScene({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <section ref={ref} className="hero" data-theme="space">
      <motion.div
        className="hero-content"
        style={reduce ? undefined : { scale, y, opacity }}
      >
        {children}
      </motion.div>
    </section>
  );
}
