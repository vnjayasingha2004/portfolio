"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Media that tilts up in 3D and opens from an inset frame as it enters the viewport. */
export function ScrollScale({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });
  const inset = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}% round ${8 + v * 2}px)`);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { clipPath, y, rotateX, scale, transformPerspective: 1600, transformOrigin: "50% 100%" }}
    >
      {children}
    </motion.div>
  );
}
