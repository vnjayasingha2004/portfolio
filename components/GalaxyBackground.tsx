"use client";

import { useEffect, useRef } from "react";

const TILE = 640; // CSS px; each star layer is a repeating tile this size

type LayerSpec = { count: number; min: number; max: number; glow: boolean };

/** Paints one repeating tile of stars once, so the browser can move it around for free. */
function paintTile(spec: LayerSpec, dpr: number) {
  const c = document.createElement("canvas");
  c.width = c.height = Math.round(TILE * dpr);
  const ctx = c.getContext("2d");
  if (!ctx) return "";
  ctx.scale(dpr, dpr);
  for (let i = 0; i < spec.count; i++) {
    const x = Math.random() * TILE;
    const y = Math.random() * TILE;
    const r = spec.min + Math.random() * (spec.max - spec.min);
    const tint = Math.random();
    const color = tint < 0.7 ? "255,255,255" : tint < 0.85 ? "190,200,255" : tint < 0.95 ? "205,180,255" : "170,255,230";
    if (spec.glow) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
      g.addColorStop(0, `rgba(${color},0.55)`);
      g.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(x - r * 4, y - r * 4, r * 8, r * 8);
    }
    ctx.fillStyle = `rgba(${color},${0.55 + Math.random() * 0.45})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return c.toDataURL("image/png");
}

const LAYERS: (LayerSpec & { depth: number; cls: string })[] = [
  { cls: "sky-far", depth: 0.05, count: 320, min: 0.35, max: 0.9, glow: false },
  { cls: "sky-near", depth: 0.16, count: 34, min: 0.9, max: 1.7, glow: true },
];
const TWINKLES = 24;

/**
 * The site-wide night sky. The nebula is a still gradient; two star layers are painted
 * once into repeating tiles. The page scrolls over a still sky (stars are far away), and
 * the layers only shift on the GPU when the mouse moves; a few tiny stars twinkle and the
 * odd shooting star crosses. When nothing is happening, nothing is being redrawn.
 */
export function GalaxyBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const meteorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const layers = LAYERS.map((spec) => {
      const el = root.querySelector<HTMLElement>(`.${spec.cls}`)!;
      el.style.backgroundImage = `url(${paintTile(spec, dpr)})`;
      return { el, depth: spec.depth };
    });
    // A couple of dozen tiny twinkling stars (cheap: each is a few pixels)
    const twinkleWrap = root.querySelector<HTMLElement>(".twinkles")!;
    for (let i = 0; i < TWINKLES; i++) {
      const star = document.createElement("i");
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${3 + Math.random() * 4}s`;
      star.style.animationDelay = `${-Math.random() * 6}s`;
      const size = 2 + Math.random() * 2.5;
      star.style.width = star.style.height = `${size}px`;
      twinkleWrap.appendChild(star);
    }
    root.classList.add("is-ready");

    // Parallax: only runs while the scroll or pointer target is changing
    const target = { x: 0, y: 0, s: window.scrollY };
    const now = { x: 0, y: 0, s: window.scrollY };
    let frame = 0;
    const tick = () => {
      now.x += (target.x - now.x) * 0.06;
      now.y += (target.y - now.y) * 0.06;
      now.s += (target.s - now.s) * 0.25;
      for (const { el, depth } of layers) {
        const ty = -((now.s * depth) % TILE) - now.y * 40 * depth;
        el.style.transform = `translate3d(${(-now.x * 60 * depth).toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      }
      const settled = Math.abs(target.x - now.x) < 0.001 && Math.abs(target.y - now.y) < 0.001 && Math.abs(target.s - now.s) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
      wake();
    };
    tick();

    // A shooting star every so often (CSS-animated)
    let meteorTimer = 0;
    const meteor = meteorRef.current;
    const launch = () => {
      if (meteor && document.visibilityState === "visible") {
        const fromLeft = Math.random() < 0.5;
        meteor.style.setProperty("--mx", `${(fromLeft ? 5 : 45) + Math.random() * 45}vw`);
        meteor.style.setProperty("--my", `${Math.random() * 35}vh`);
        meteor.style.setProperty("--dir", fromLeft ? "1" : "-1");
        meteor.classList.remove("is-flying");
        void meteor.offsetWidth;
        meteor.classList.add("is-flying");
      }
      meteorTimer = window.setTimeout(launch, 6000 + Math.random() * 9000);
    };
    if (!reduce) meteorTimer = window.setTimeout(launch, 4000);

    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(meteorTimer);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div ref={rootRef} className="galaxy" aria-hidden="true">
      <div className="sky sky-far" />
      <div className="sky sky-near" />
      <div className="twinkles" />
      <span ref={meteorRef} className="meteor" />
    </div>
  );
}
