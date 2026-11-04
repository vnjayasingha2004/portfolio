"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; depth: number; tw: number; phase: number; hue: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number };

const HUES = [0, 0, 0, 220, 250, 190]; // mostly white, some blue, violet and teal stars

/**
 * The site-wide night sky: three depths of stars that drift with scroll and the
 * pointer, twinkle, and the odd shooting star. Nebula clouds are CSS layers behind it.
 */
export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    const meteors: Meteor[] = [];
    let nextMeteor = performance.now() + 3500;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let frame = 0;
    let running = true;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(900, Math.round((w * h) / 2200));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() < 0.6 ? 0.25 : Math.random() < 0.75 ? 0.55 : 1;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: depth === 1 ? 0.9 + Math.random() * 0.9 : depth === 0.55 ? 0.6 + Math.random() * 0.6 : 0.35 + Math.random() * 0.45,
          depth,
          tw: 0.6 + Math.random() * 2.2,
          phase: Math.random() * Math.PI * 2,
          hue: HUES[Math.floor(Math.random() * HUES.length)],
        };
      });
    };

    const draw = (now: number) => {
      const t = now / 1000;
      const scroll = window.scrollY;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const px = s.x - pointer.x * 14 * s.depth;
        const py = s.y - scroll * 0.12 * s.depth - pointer.y * 10 * s.depth;
        const x = ((px % w) + w) % w;
        const y = ((py % h) + h) % h;
        const a = reduce ? 0.8 : 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.tw + s.phase));
        ctx.globalAlpha = a * (0.45 + s.depth * 0.55);
        ctx.fillStyle = s.hue ? `hsl(${s.hue} 90% 82%)` : "#fff";
        if (s.r < 0.8) {
          ctx.fillRect(x, y, s.r * 1.6, s.r * 1.6);
        } else {
          ctx.beginPath();
          ctx.arc(x, y, s.r, 0, Math.PI * 2);
          ctx.fill();
          if (s.depth === 1 && s.r > 1.5) {
            ctx.globalAlpha *= 0.25;
            ctx.beginPath();
            ctx.arc(x, y, s.r * 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Shooting stars
      if (!reduce && now > nextMeteor) {
        nextMeteor = now + 5000 + Math.random() * 8000;
        const fromLeft = Math.random() < 0.5;
        const speed = 9 + Math.random() * 6;
        meteors.push({
          x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
          y: Math.random() * h * 0.4,
          vx: (fromLeft ? 1 : -1) * speed,
          vy: speed * 0.45,
          life: 0,
          max: 55 + Math.random() * 30,
        });
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life += 1;
        m.x += m.vx;
        m.y += m.vy;
        const fade = Math.sin((m.life / m.max) * Math.PI);
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 9, m.y - m.vy * 9);
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`);
        grad.addColorStop(1, "rgba(160,170,255,0)");
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 9, m.y - m.vy * 9);
        ctx.stroke();
        if (m.life >= m.max) meteors.splice(i, 1);
      }
      ctx.globalAlpha = 1;

      if (nebulaRef.current) nebulaRef.current.style.transform = `translate3d(${(-pointer.x * 12).toFixed(1)}px, ${(-scroll * 0.05 - pointer.y * 8).toFixed(1)}px, 0)`;

      if (running && !reduce) frame = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / w - 0.5;
      pointer.ty = e.clientY / h - 0.5;
    };
    const onVisibility = () => {
      running = document.visibilityState === "visible";
      cancelAnimationFrame(frame);
      if (running) frame = requestAnimationFrame(draw);
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reduce) draw(performance.now());
      }, 150);
    };
    const onScroll = () => {
      if (reduce) draw(performance.now());
    };

    build();
    frame = requestAnimationFrame(draw);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="galaxy" aria-hidden="true">
      <div ref={nebulaRef} className="nebula">
        <span className="nebula-a" />
        <span className="nebula-b" />
        <span className="nebula-c" />
      </div>
      <canvas ref={canvasRef} className="stars" />
    </div>
  );
}
