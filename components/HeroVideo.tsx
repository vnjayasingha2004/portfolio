"use client";

import { useEffect, useRef } from "react";

/**
 * Particle-wave footage blended into the blue with `screen`, so black drops out
 * and only the light waves remain. Paused off-screen and for reduced motion.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      video.pause();
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div className="hero-bg" aria-hidden="true">
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-waves-poster.jpg"
        onCanPlay={(e) => e.currentTarget.classList.add("is-ready")}
      >
        <source src="/videos/hero-waves-540.mp4" type="video/mp4" media="(max-width: 720px)" />
        <source src="/videos/hero-waves-1080.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
