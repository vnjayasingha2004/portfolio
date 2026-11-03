"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const tips = [
  "Move over the name. The letters stretch!",
  "Scroll on, there's a 3D tour of the projects.",
  "Vinira is open to internships and junior roles.",
  "Hover a project to peek at a screenshot.",
  "Want to work together? The email is at the bottom.",
  "Hehe, that tickles.",
];

// Size of the character box in em; the hero spot uses the same size so they line up.
const BASE_W = 14;
const BASE_H = 16;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * The site's companion. On the homepage it stands next to the name; once you scroll
 * past the hero it hops down to the corner and follows you through every page,
 * saying a line when you reach a section marked with data-bot-say.
 */
export function Mascot() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const [waving, setWaving] = useState(false);
  const [hopping, setHopping] = useState(false);
  const [happy, setHappy] = useState(false);
  const [docked, setDocked] = useState(false);
  const hideTimer = useRef(0);
  const quietUntil = useRef(0);
  const tipIndex = useRef(0);

  const hop = useCallback(() => {
    setHopping(false);
    requestAnimationFrame(() => setHopping(true));
    window.setTimeout(() => setHopping(false), 750);
  }, []);

  const say = useCallback((text: string, ms = 4000, wave = false) => {
    setMessage(text);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setMessage(null), ms);
    if (wave) {
      setWaving(true);
      window.setTimeout(() => setWaving(false), 2200);
    }
  }, []);

  // Entrance and greeting on each page
  useEffect(() => {
    const onHome = !!document.querySelector("[data-mascot-spot]");
    const timers: number[] = [];
    setMessage(null);

    if (onHome) {
      quietUntil.current = performance.now() + 9500;
      timers.push(window.setTimeout(() => {
        setShown(true);
        hop();
      }, 1500));
      timers.push(window.setTimeout(() => say("Hello! Welcome to my portfolio 👋", 3900, true), 2100));
      timers.push(window.setTimeout(() => say("Move your cursor around. I'll follow it!", 3400), 6100));
    } else {
      quietUntil.current = performance.now() + 900;
      timers.push(window.setTimeout(() => {
        setShown(true);
        hop();
      }, 650));
    }
    return () => timers.forEach(window.clearTimeout);
  }, [pathname, hop, say]);

  // A line for each section, once per visit to a page
  useEffect(() => {
    const said = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || said.has(entry.target)) return;
          if (performance.now() < quietUntil.current) return;
          const line = (entry.target as HTMLElement).dataset.botSay;
          if (!line) return;
          said.add(entry.target);
          say(line, 3800);
          hop();
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    const timer = window.setTimeout(() => {
      document.querySelectorAll("[data-bot-say]").forEach((el) => io.observe(el));
    }, 300);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [pathname, say, hop]);

  // Position (hero spot or corner dock) and gaze, every frame
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pos = { x: 0, y: 0, s: 1 };
    const look = { x: 0, y: 0, tx: 0, ty: 0 };
    let unit = 10;
    let init = false;
    let mode: "spot" | "dock" | null = null;
    let flying = false;
    let lastMove = 0;
    let frame = 0;

    const measure = () => {
      unit = parseFloat(getComputedStyle(root).fontSize) || 10;
    };
    measure();

    const onMove = (e: PointerEvent) => {
      const w = BASE_W * unit * pos.s;
      const h = BASE_H * unit * pos.s;
      const cx = pos.x + w / 2;
      const cy = pos.y + h * 0.42;
      look.tx = clamp((e.clientX - cx) / (window.innerWidth * 0.4), -1, 1);
      look.ty = clamp((e.clientY - cy) / (window.innerHeight * 0.45), -1, 1);
      lastMove = performance.now();
    };

    const tick = (now: number) => {
      const spot = document.querySelector<HTMLElement>("[data-mascot-spot]");
      const r = spot?.getBoundingClientRect();
      const inSpot = !!r && r.bottom > 90 && r.top < window.innerHeight - 60;
      const narrow = window.innerWidth < 720;

      let tx: number;
      let ty: number;
      let ts: number;
      if (inSpot && r) {
        tx = r.left;
        ty = r.top;
        ts = 1;
      } else {
        ts = narrow ? 0.62 : 0.5;
        tx = window.innerWidth - BASE_W * unit * ts - (narrow ? 8 : 18);
        ty = window.innerHeight - BASE_H * unit * ts - (narrow ? 6 : 12);
      }

      const nextMode = inSpot ? "spot" : "dock";
      if (nextMode !== mode) {
        if (mode !== null && !reduce) {
          flying = true;
          root.classList.add("is-flying");
        }
        mode = nextMode;
        setDocked(nextMode === "dock");
      }

      if (!init) {
        pos.x = tx;
        pos.y = ty;
        pos.s = ts;
        init = true;
      }

      const k = flying ? 0.11 : 1;
      pos.x += (tx - pos.x) * k;
      pos.y += (ty - pos.y) * k;
      pos.s += (ts - pos.s) * k;
      if (flying && Math.abs(tx - pos.x) < 0.6 && Math.abs(ty - pos.y) < 0.6 && Math.abs(ts - pos.s) < 0.004) {
        flying = false;
        root.classList.remove("is-flying");
      }

      if (now - lastMove > 4500) {
        const t = now / 1000;
        look.tx = Math.sin(t * 0.6) * 0.6;
        look.ty = Math.sin(t * 0.41 + 1) * 0.3;
      }
      const lk = reduce ? 1 : 0.1;
      look.x += (look.tx - look.x) * lk;
      look.y += (look.ty - look.y) * lk;

      root.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
      root.style.setProperty("--s", pos.s.toFixed(4));
      root.style.setProperty("--look-x", look.x.toFixed(4));
      root.style.setProperty("--look-y", look.y.toFixed(4));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    let blinkTimer = 0;
    const blink = () => {
      root.classList.add("is-blinking");
      window.setTimeout(() => root.classList.remove("is-blinking"), 130);
      blinkTimer = window.setTimeout(blink, 2400 + Math.random() * 3600);
    };
    if (!reduce) blinkTimer = window.setTimeout(blink, 3000);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(blinkTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const onClick = () => {
    say(tips[tipIndex.current % tips.length], 3800, true);
    tipIndex.current += 1;
    hop();
    setHappy(true);
    window.setTimeout(() => setHappy(false), 1000);
  };

  const classes = [
    "mascot",
    shown && "is-shown",
    waving && "is-waving",
    hopping && "is-hopping",
    happy && "is-happy",
    docked && "is-docked",
    message && "is-talking",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={classes}>
      <p className={`m-bubble${message ? " is-open" : ""}`} role="status" aria-live="polite">
        {message}
      </p>
      <div className="m-scale">
        <button type="button" className="m-button" onClick={onClick} aria-label="Portfolio mascot. Press for a tip.">
          <span className="m-hop">
            <span className="m-turn">
              <span className="m-antenna">
                <i />
              </span>
              <span className="m-arm m-arm-l" />
              <span className="m-arm m-arm-r" />
              <span className="m-foot m-foot-l" />
              <span className="m-foot m-foot-r" />
              <span className="m-body">
                <span className="m-face">
                  <span className="m-eyes">
                    <span className="m-eye">
                      <i />
                    </span>
                    <span className="m-eye">
                      <i />
                    </span>
                  </span>
                  <span className="m-cheeks">
                    <span />
                    <span />
                  </span>
                  <span className="m-mouth" />
                </span>
              </span>
            </span>
          </span>
        </button>
        <span className="m-shadow" aria-hidden="true" />
      </div>
    </div>
  );
}
