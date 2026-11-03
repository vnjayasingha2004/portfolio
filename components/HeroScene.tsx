"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** As the hero scrolls away it tips back slightly and recedes; the background drifts slower. */
export function HeroScene({ background, children }: { background: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="hero" data-theme="blue">
      <motion.div className="hero-bg-wrap" style={reduce ? undefined : { scale: bgScale, y: bgY }}>
        {background}
      </motion.div>
      <motion.div
        className="hero-content"
        style={reduce ? undefined : { rotateX, scale, y, opacity, transformPerspective: 1400 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
