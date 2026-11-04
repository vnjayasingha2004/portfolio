"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// The mascot is Vinira's guide: it shows visitors around and talks about him.
const tips = [
  "Try his name at the top. The letters stretch!",
  "Scroll through his selected work, it spins in 3D.",
  "Vinira is open to internships and junior roles.",
  "His CV is one click away, top right!",
  "Every project opens into the full story of how he built it.",
  "Want to work with him? His email is at the bottom.",
  "Hehe, that tickles.",
];

// Size of the character box in em; the hero spot uses the same size so they line up.
const BASE_W = 14;
const BASE_H = 16;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Vinira's guide. On the homepage it stands next to the name; once you scroll
 * past the hero it hops down to the corner and follows you through every page,
 * introducing each part of the site when you reach a section marked with data-bot-say.
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
  const [hidden, setHidden] = useState(false);
  const hiddenRef = useRef(false);
  const hideTimer = useRef(0);
  const quietUntil = useRef(0);
  const tipIndex = useRef(0);

  const hop = useCallback(() => {
    setHopping(false);
    requestAnimationFrame(() => setHopping(true));
    window.setTimeout(() => setHopping(false), 750);
  }, []);

  // Visitors can switch the guide off; remembered per browser
  useEffect(() => {
    const apply = (value: boolean) => {
      hiddenRef.current = value;
      setHidden(value);
      if (value) setMessage(null);
    };
    try {
      apply(localStorage.getItem("guide-hidden") === "1");
    } catch {}
    const onToggle = (e: Event) => apply((e as CustomEvent<{ hidden: boolean }>).detail.hidden);
    window.addEventListener("guide:toggle", onToggle);
    return () => window.removeEventListener("guide:toggle", onToggle);
  }, []);

  const say = useCallback((text: string, ms = 4000, wave = false) => {
    if (hiddenRef.current) return;
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
    const cleanups: (() => void)[] = [];
    setMessage(null);

    if (onHome) {
      const greet = () => {
        quietUntil.current = performance.now() + 9500;
        timers.push(window.setTimeout(() => {
          setShown(true);
          hop();
        }, 1500));
        timers.push(window.setTimeout(() => say("Hello! Welcome to Vinira's portfolio 👋 I'm your guide.", 4200, true), 2100));
        const coarse = matchMedia("(pointer: coarse)").matches;
        timers.push(
          window.setTimeout(
            () => say(coarse ? "Tap anywhere and I'll look. Scroll and I'll show you around!" : "Move your cursor, I'll follow it. Scroll and I'll show you around!", 3600),
            6200,
          ),
        );
      };
      // Wait for the opening scene, if it's playing
      if (window.__introDone === false) {
        quietUntil.current = Infinity;
        const onDone = () => greet();
        window.addEventListener("intro:done", onDone, { once: true });
        cleanups.push(() => window.removeEventListener("intro:done", onDone));
      } else {
        greet();
      }
    } else {
      quietUntil.current = performance.now() + 900;
      timers.push(window.setTimeout(() => {
        setShown(true);
        hop();
      }, 650));
    }
    return () => {
      timers.forEach(window.clearTimeout);
      cleanups.forEach((fn) => fn());
    };
  }, [pathname, hop, say]);

  // Lines sent by other parts of the page (the work walk-through), and riding
  // the curtain up and dropping back in on page changes.
  useEffect(() => {
    const onSay = (e: Event) => {
      const detail = (e as CustomEvent<{ text: string; wave?: boolean }>).detail;
      if (!detail?.text) return;
      say(detail.text, 4200, detail.wave);
      hop();
    };
    let rideTimer = 0;
    const onCurtain = () => {
      const root = rootRef.current;
      if (!root) return;
      root.classList.remove("is-riding");
      void root.offsetWidth;
      root.classList.add("is-riding");
      window.clearTimeout(rideTimer);
      rideTimer = window.setTimeout(() => root.classList.remove("is-riding"), 1600);
    };
    window.addEventListener("guide:say", onSay);
    window.addEventListener("guide:curtain", onCurtain);
    return () => {
      window.clearTimeout(rideTimer);
      window.removeEventListener("guide:say", onSay);
      window.removeEventListener("guide:curtain", onCurtain);
    };
  }, [say, hop]);

  // A goodbye once the visitor reaches the very bottom of a page
  useEffect(() => {
    let done = false;
    const onScroll = () => {
      if (done) return;
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6;
      if (bottom && performance.now() > quietUntil.current) {
        done = true;
        say("Thanks for visiting! See you soon 👋", 4500, true);
        hop();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, say, hop]);

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
    // Where the pointer is now, in viewport coordinates. Kept between events so the
    // gaze is re-aimed every frame, including while the page or the mascot moves.
    const pointer = { x: 0, y: 0, mouse: false, touchAt: -1e9 };
    const coarse = matchMedia("(pointer: coarse)").matches;
    let unit = 10;
    let init = false;
    let mode: "spot" | "walk" | "dock" | null = null;
    let flying = false;
    let frame = 0;
    let spotsAt = -1e9;
    let nextGlance = 0;
    const written = { tf: "", s: "", lx: "", ly: "" };
    let heroSpot: HTMLElement | null = null;
    let walkSpot: HTMLElement | null = null;
    let lastScroll = window.scrollY;
    let scrollVel = 0;

    const measure = () => {
      unit = parseFloat(getComputedStyle(root).fontSize) || 10;
    };
    measure();

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (e.pointerType === "mouse") pointer.mouse = true;
      else pointer.touchAt = performance.now();
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      pointer.x = t.clientX;
      pointer.y = t.clientY;
      pointer.touchAt = performance.now();
    };
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) pointer.mouse = false;
    };

    const tick = (now: number) => {
      // Where to stand: next to the name in the hero, on the ground line while the
      // work walk-through is pinned, otherwise docked in the corner.
      if (now - spotsAt > 500) {
        spotsAt = now;
        heroSpot = document.querySelector<HTMLElement>("[data-mascot-spot]");
        walkSpot = document.querySelector<HTMLElement>("[data-mascot-walk]");
      }
      const hr = heroSpot?.getBoundingClientRect();
      const wr = walkSpot?.getBoundingClientRect();
      const narrow = window.innerWidth < 720;
      const full = BASE_W * unit;

      let nextMode: "spot" | "walk" | "dock";
      let tx: number;
      let ty: number;
      let ts: number;
      if (hr && hr.bottom > 90 && hr.top < window.innerHeight - 60) {
        nextMode = "spot";
        tx = hr.left;
        ty = hr.top;
        ts = hr.width / full;
      } else if (wr && wr.width > 0 && wr.top >= -2 && wr.bottom <= window.innerHeight + 2) {
        nextMode = "walk";
        tx = wr.left;
        ty = wr.top;
        ts = wr.width / full;
      } else {
        nextMode = "dock";
        ts = narrow ? 0.62 : 0.5;
        tx = window.innerWidth - full * ts - (narrow ? 8 : 18);
        ty = window.innerHeight - BASE_H * unit * ts - (narrow ? 6 : 12);
      }

      if (nextMode !== mode) {
        if (mode !== null && !reduce) {
          flying = true;
          root.classList.add("is-flying");
        }
        mode = nextMode;
        setDocked(nextMode === "dock");
      }

      const walking = mode === "walk" && walkSpot?.dataset.walking === "true" && !flying;
      const facing = walkSpot?.dataset.facing === "-1" ? -1 : 1;
      root.classList.toggle("is-walking", walking);
      root.classList.toggle("is-on-walk", mode === "walk");
      root.classList.toggle("is-in-spot", mode === "spot");
      root.classList.toggle("is-facing-left", mode === "walk" && facing === -1);

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

      // Scroll speed, used on touch screens to look the way the page is going
      const y = window.scrollY;
      scrollVel += (y - lastScroll - scrollVel) * 0.2;
      lastScroll = y;

      // Aim at the pointer: direction from the face to the pointer, full strength
      // once it's more than about a head's width away.
      const size = BASE_W * unit * pos.s;
      const cx = pos.x + size / 2;
      const cy = pos.y + BASE_H * unit * pos.s * 0.42;
      const recentTouch = now - pointer.touchAt < 2600;

      if (walking) {
        look.tx = facing * 0.9;
        look.ty = 0.12;
      } else if (pointer.mouse || recentTouch) {
        const dx = pointer.x - cx;
        const dy = pointer.y - cy;
        const d = Math.hypot(dx, dy);
        const m = Math.min(1, d / Math.max(60, size * 0.9));
        look.tx = d > 1 ? (dx / d) * m : 0;
        look.ty = d > 1 ? (dy / d) * m : 0;
      } else if (coarse && Math.abs(scrollVel) > 0.6) {
        look.tx = Math.sin(now / 900) * 0.25;
        look.ty = clamp(scrollVel / 14, -1, 1);
      } else if (now > nextGlance) {
        // Idle: glance somewhere new every couple of seconds, then hold still
        nextGlance = now + 1600 + Math.random() * 2200;
        look.tx = (Math.random() - 0.5) * 1.3;
        look.ty = (Math.random() - 0.5) * 0.6;
      }

      const lk = reduce ? 1 : 0.16;
      look.x += (look.tx - look.x) * lk;
      look.y += (look.ty - look.y) * lk;

      // Only touch styles when something visibly changed
      const tf = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
      if (tf !== written.tf) {
        written.tf = tf;
        root.style.transform = tf;
      }
      const sc = pos.s.toFixed(3);
      if (sc !== written.s) {
        written.s = sc;
        root.style.setProperty("--s", sc);
      }
      const lx = look.x.toFixed(3);
      const ly = look.y.toFixed(3);
      if (lx !== written.lx || ly !== written.ly) {
        written.lx = lx;
        written.ly = ly;
        root.style.setProperty("--look-x", lx);
        root.style.setProperty("--look-y", ly);
      }
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

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    document.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(blinkTimer);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const onClick = () => {
    say(tips[tipIndex.current % tips.length], 3800, true);
    tipIndex.current += 1;
    hop();
    navigator.vibrate?.(12);
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
    hidden && "is-hidden",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={classes}>
      <p className={`m-bubble${message ? " is-open" : ""}`} role="status" aria-live="polite">
        {message}
      </p>
      <div className="m-scale">
        <button type="button" className="m-button" onClick={onClick} aria-label="Your guide to Vinira's portfolio. Press for a tip.">
          <span className="m-hop">
            <span className="m-turn">
              <span className="m-pack">
                <i className="m-flame m-flame-l" />
                <i className="m-flame m-flame-r" />
              </span>
              <span className="m-foot m-foot-l" />
              <span className="m-foot m-foot-r" />
              <span className="m-arm m-arm-l" />
              <span className="m-arm m-arm-r" />
              <span className="m-body">
                <span className="m-badge" />
              </span>
              <span className="m-antenna">
                <i />
              </span>
              <span className="m-helmet">
                <span className="m-visor">
                  <span className="m-eyes">
                    <span className="m-eye" />
                    <span className="m-eye" />
                  </span>
                  <span className="m-mouth" />
                  <span className="m-glare" />
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
