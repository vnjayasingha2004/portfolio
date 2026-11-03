"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Spark() {
  return (
    <svg className="marquee-spark" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 0c1.6 10.6 8.8 17.9 20 20-11.2 2.1-18.4 9.4-20 20-1.6-10.6-8.8-17.9-20-20C11.2 17.9 18.4 10.6 20 0Z" />
    </svg>
  );
}

function Row({ words, speed, outline = false }: { words: string[]; speed: number; outline?: boolean }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1200, 0, 1200], [-5, 0, 5], { clamp: false });
  const skewX = useTransform(velocity, [-2400, 2400], [12, -12]);
  const direction = useRef(speed > 0 ? 1 : -1);
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = -Math.sign(speed);
    else if (b > 0) direction.current = Math.sign(speed);
    const move = direction.current * Math.abs(speed) * (delta / 1000) * (1 + Math.abs(b));
    base.set(base.get() + move);
  });

  return (
    <div className={`marquee-row${outline ? " is-outline" : ""}`}>
      <motion.div className="marquee-track" style={{ x, skewX: reduce ? 0 : skewX }}>
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="marquee-group">
            {words.map((word) => (
              <span key={word} className="marquee-item">
                {word}
                <Spark />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Two bands of words that drift on their own and race and lean with your scroll speed. */
export function VelocityMarquee() {
  return (
    <section className="marquee" data-theme="paper" aria-label="What I build">
      <p className="sr-only">Full-stack web apps, mobile apps, desktop software and AI tools, built for real use.</p>
      <div aria-hidden="true">
        <Row words={["Full-stack web", "Mobile apps", "Desktop software", "AI tools"]} speed={-2.2} />
        <Row words={["Built for real use", "Clean code", "Careful UI", "Shipped"]} speed={2.2} outline />
      </div>
    </section>
  );
}
