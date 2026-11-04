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

const smooth = (a: number, b: number, t: number) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * x * (x * (x * 6 - 15) + 10); // smootherstep
};

// Timeline (ms)
const RISE_START = 700;
const RISE_END = 1900;
const FALL_START = 2300;
const FALL_END = 3300;
const LEAVE_AT = 2750;
const V_MIN = 0.0012;
const V_MAX = 0.042;

// Stars are drawn in a few batches (by depth and colour) instead of one stroke each
const DEPTH_BANDS = 4;
const COLORS = ["255,255,255", "184,170,255"];

/**
 * The opening scene on the homepage: the logo appears over a still sky, the stars
 * stretch into a jump to light speed, then ease out as the page fades in and the
 * name unfolds. Plays once per browser session; any click, key or scroll skips it.
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
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) {
      finish();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    const cx = w / 2;
    const cy = h / 2;
    const spread = Math.max(w, h);

    const count = Math.min(460, Math.round((w * h) / 3200));
    const xs = new Float32Array(count);
    const ys = new Float32Array(count);
    const zs = new Float32Array(count);
    const tint = new Uint8Array(count);
    for (let i = 0; i < count; i++) {
      xs[i] = (Math.random() - 0.5) * spread;
      ys[i] = (Math.random() - 0.5) * spread;
      zs[i] = 0.05 + Math.random() * 0.95;
      tint[i] = Math.random() < 0.28 ? 1 : 0;
    }

    const speedAt = (t: number) => V_MIN + (V_MAX - V_MIN) * (smooth(RISE_START, RISE_END, t) - smooth(FALL_START, FALL_END, t));

    let start = 0;
    let last = 0;
    let frame = 0;
    let leaving = false;
    let stopped = false;

    const leave = () => {
      if (leaving) return;
      leaving = true;
      setPhase("leave");
      finish();
      window.setTimeout(() => {
        stopped = true;
        cancelAnimationFrame(frame);
        setPhase("gone");
        document.documentElement.classList.remove("is-intro");
        lenis?.start();
      }, 1100);
    };

    const tick = (now: number) => {
      if (!start) {
        start = now;
        last = now;
      }
      const t = now - start;
      const dt = Math.min(48, now - last) / 16.67; // frame-rate independent
      last = now;
      const v = speedAt(t) * dt;
      // Each streak shows where the star was ~14 frames ago: dots at rest, long lines at light speed
      const trail = speedAt(t) * 14;

      ctx.clearRect(0, 0, w, h);
      for (let band = 0; band < DEPTH_BANDS; band++) {
        for (let c = 0; c < COLORS.length; c++) {
          const near = (band + 0.5) / DEPTH_BANDS;
          ctx.strokeStyle = `rgba(${COLORS[c]},${(0.35 + near * 0.65).toFixed(2)})`;
          ctx.lineWidth = 0.6 + near * 1.9;
          ctx.beginPath();
          for (let i = 0; i < count; i++) {
            if (tint[i] !== c) continue;
            const z = zs[i];
            if (Math.min(DEPTH_BANDS - 1, Math.floor((1 - z) * DEPTH_BANDS)) !== band) continue;
            const sx = cx + (xs[i] / z) * 0.5;
            const sy = cy + (ys[i] / z) * 0.5;
            if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue;
            const tail = Math.min(z + trail, 1.2);
            const px = cx + (xs[i] / tail) * 0.5;
            const py = cy + (ys[i] / tail) * 0.5;
            ctx.moveTo(px, py);
            ctx.lineTo(sx + 0.01, sy + 0.01);
          }
          ctx.stroke();
        }
      }

      for (let i = 0; i < count; i++) {
        zs[i] -= v;
        if (zs[i] <= 0.03) {
          xs[i] = (Math.random() - 0.5) * spread;
          ys[i] = (Math.random() - 0.5) * spread;
          zs[i] = 1;
        }
      }

      if (!leaving && t > LEAVE_AT) leave();
      if (!stopped) frame = requestAnimationFrame(tick);
    };
    // Start on the next frame so hydration work doesn't eat the first moments
    frame = requestAnimationFrame(() => (frame = requestAnimationFrame(tick)));

    const skip = () => leave();
    const opts = { once: true, passive: true } as const;
    window.addEventListener("keydown", skip, opts);
    window.addEventListener("wheel", skip, opts);
    window.addEventListener("touchstart", skip, opts);
    window.addEventListener("pointerdown", skip, opts);

    return () => {
      stopped = true;
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
        <span className="opening-glow" />
        <Logo className="opening-logo" />
        <p>Departing from Tangalle, Sri Lanka</p>
      </div>
      <span className="opening-skip">Click or press any key to skip</span>
    </div>
  );
}
