"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: (index * 37) % 100,
  top: (index * 53) % 100,
  delay: (index % 9) * 0.42,
  size: 1 + (index % 3),
}));

export default function BackgroundStage() {
  const x = useMotionValue(50);
  const y = useMotionValue(40);
  const smoothX = useSpring(x, { stiffness: 55, damping: 22, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 55, damping: 22, mass: 0.4 });
  const spotlight = useMotionTemplate`radial-gradient(circle at ${smoothX}% ${smoothY}%, rgba(34, 211, 238, 0.16), transparent 28rem)`;

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      x.set((event.clientX / window.innerWidth) * 100);
      y.set((event.clientY / window.innerHeight) * 100);
    };

    window.addEventListener("pointermove", updatePointer);
    return () => window.removeEventListener("pointermove", updatePointer);
  }, [x, y]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.16] mix-blend-screen"
        src="/videos/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.2),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(6,182,212,0.18),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.78),rgba(2,6,23,0.92)_48%,rgba(3,7,18,1))]" />
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      <div className="cosmic-grid absolute inset-0 opacity-30" />
      <div className="noise-layer absolute inset-0 opacity-[0.08]" />

      <motion.div
        className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"
        animate={{ x: [0, 90, 20, 0], y: [0, -40, 60, 0], scale: [1, 1.18, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-36 bottom-12 h-[30rem] w-[30rem] rounded-full bg-violet-500/20 blur-3xl"
        animate={{ x: [0, -60, -120, 0], y: [0, 55, -35, 0], scale: [1, 0.9, 1.14, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="star-particle absolute rounded-full bg-white"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <span className="meteor meteor-one" />
      <span className="meteor meteor-two" />
    </div>
  );
}
