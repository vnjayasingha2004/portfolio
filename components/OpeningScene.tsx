"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { getLenis } from "./SmoothScroll";

const KEY = "intro-seen";

declare global {
  interface Window {
    __introDone?: boolean;
  }
}

/** Tell the rest of the page the opening scene is over (the name and the guide wait for this). */
function finish() {
  if (window.__introDone) return;
  window.__introDone = true;
  window.dispatchEvent(new Event("intro:done"));
}

type WarpStar = { x: number; y: number; z: number; pz: number; hue: number };

/**
 * The opening scene on the homepage: the logo appears over a still sky, the stars stretch
 * into a jump to light speed, then settle into the background as the name is revealed.
 * Plays once per browser session; any click, key or scroll skips it.
 */
export function OpeningScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"play" | "leave" | "gone">("play");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setPhase("gone");
      finish();
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}

    window.__introDone = false;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.classList.add("is-intro");

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cx = w / 2;
    const cy = h / 2;
    const focal = Math.max(w, h) * 0.5;

    const stars: WarpStar[] = Array.from({ length: Math.min(700, Math.round((w * h) / 2600)) }, () => {
      const z = Math.random();
      return {
        x: (Math.random() - 0.5) * w * 2,
        y: (Math.random() - 0.5) * h * 2,
        z,
        pz: z,
        hue: Math.random() < 0.3 ? 230 + Math.random() * 40 : 0,
      };
    });

    // Speed over time (ms): drift, build up, light speed, brake, settle
    const speedAt = (t: number) => {
      if (t < 900) return 0.0015;
      if (t < 2100) return 0.0015 + Math.pow((t - 900) / 1200, 2.2) * 0.05;
      if (t < 2600) return 0.0515;
      if (t < 3300) return 0.0515 * Math.pow(1 - (t - 2600) / 700, 2) + 0.001;
      return 0.001;
    };

    const start = performance.now();
    let frame = 0;
    let leaving = false;
    let doneAt = 0;

    const leave = () => {
      if (leaving) return;
      leaving = true;
      setPhase("leave");
      finish();
      doneAt = performance.now();
      window.setTimeout(() => {
        setPhase("gone");
        document.documentElement.classList.remove("is-intro");
        lenis?.start();
      }, 900);
    };

    const tick = (now: number) => {
      const t = now - start;
      const v = speedAt(t);
      const streak = Math.min(1, v / 0.02);
      ctx.fillStyle = `rgba(3,4,12,${0.35 + 0.5 * (1 - streak)})`;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        s.pz = s.z;
        s.z -= v;
        if (s.z <= 0.02) {
          s.x = (Math.random() - 0.5) * w * 2;
          s.y = (Math.random() - 0.5) * h * 2;
          s.z = 1;
          s.pz = 1;
        }
        const sx = cx + (s.x / s.z) * (focal / w);
        const sy = cy + (s.y / s.z) * (focal / h);
        const px = cx + (s.x / s.pz) * (focal / w);
        const py = cy + (s.y / s.pz) * (focal / h);
        if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) continue;
        const near = 1 - s.z;
        ctx.strokeStyle = s.hue ? `hsla(${s.hue},90%,80%,${0.4 + near * 0.6})` : `rgba(255,255,255,${0.35 + near * 0.65})`;
        ctx.lineWidth = 0.4 + near * 2.2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx + 0.1, sy + 0.1);
        ctx.stroke();
      }

      if (!leaving && t > 3000) leave();
      if (!leaving || now - doneAt < 1000) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const skip = () => leave();
    const opts = { once: true, passive: true } as const;
    window.addEventListener("keydown", skip, opts);
    window.addEventListener("wheel", skip, opts);
    window.addEventListener("touchstart", skip, opts);
    window.addEventListener("pointerdown", skip, opts);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("pointerdown", skip);
      document.documentElement.classList.remove("is-intro");
      lenis?.start();
      finish();
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`opening${phase === "leave" ? " is-leaving" : ""}`} aria-hidden="true">
      <noscript>
        <style>{`.opening{display:none}`}</style>
      </noscript>
      <canvas ref={canvasRef} className="opening-stars" />
      <div className="opening-mark">
        <Logo className="opening-logo" />
        <p>Departing from Tangalle, Sri Lanka</p>
      </div>
      <span className="opening-skip">Click or press any key to skip</span>
    </div>
  );
}
