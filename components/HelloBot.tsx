"use client";

import { useEffect, useRef, useState } from "react";

const intro = ["Hello! 👋", "I'm Vinira's bot. I'll keep an eye on your cursor."];

const tips = [
  "Move over the name. The letters stretch.",
  "Scroll down to see what Vinira has built.",
  "He's open to internships and junior roles.",
  "Hover a project to peek at a screenshot.",
  "Want to work together? The email is at the bottom.",
  "Beep boop. That tickles.",
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * A small layered robot. The head turns in 3D toward the pointer, the eyes follow it,
 * it blinks now and then, waves hello after the name unfolds, and gives a tip when clicked.
 */
export function HelloBot() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [waving, setWaving] = useState(false);
  const [happy, setHappy] = useState(false);
  const [shown, setShown] = useState(false);
  const tipIndex = useRef(0);
  const hideTimer = useRef<number>(0);

  // Hello sequence once the name has unfolded
  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setShown(true), 1500));
    timers.push(
      window.setTimeout(() => {
        setWaving(true);
        setMessage(intro[0]);
      }, 2100),
    );
    timers.push(window.setTimeout(() => setMessage(intro[1]), 4300));
    timers.push(window.setTimeout(() => setWaving(false), 4600));
    timers.push(window.setTimeout(() => setMessage(null), 8800));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  // Head + eye tracking, blinking and idle glancing
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let lastMove = performance.now();
    let frame = 0;
    let visible = true;

    const aimAt = (clientX: number, clientY: number) => {
      const r = root.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.32;
      // -1..1 across a comfortable range around the bot
      target.x = clamp((clientX - cx) / (window.innerWidth * 0.45), -1, 1);
      target.y = clamp((clientY - cy) / (window.innerHeight * 0.5), -1, 1);
      lastMove = performance.now();
    };

    const onMove = (e: PointerEvent) => aimAt(e.clientX, e.clientY);

    const tick = (now: number) => {
      // Glance around when nobody is moving the pointer
      if (now - lastMove > 4500) {
        const t = now / 1000;
        target.x = Math.sin(t * 0.55) * 0.55;
        target.y = Math.sin(t * 0.37 + 1) * 0.25;
      }
      const k = reduce ? 1 : 0.09;
      current.x += (target.x - current.x) * k;
      current.y += (target.y - current.y) * k;
      root.style.setProperty("--look-x", current.x.toFixed(4));
      root.style.setProperty("--look-y", current.y.toFixed(4));
      if (visible) frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(tick);
    });
    io.observe(root);

    let blinkTimer = 0;
    const blink = () => {
      root.classList.add("is-blinking");
      window.setTimeout(() => root.classList.remove("is-blinking"), 140);
      blinkTimer = window.setTimeout(blink, 2600 + Math.random() * 3600);
    };
    if (!reduce) blinkTimer = window.setTimeout(blink, 3000);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(blinkTimer);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
    };
  }, []);

  const say = (text: string, ms = 3800) => {
    setMessage(text);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setMessage(null), ms);
  };

  const onClick = () => {
    say(tips[tipIndex.current % tips.length]);
    tipIndex.current += 1;
    setWaving(true);
    setHappy(true);
    window.setTimeout(() => setWaving(false), 1300);
    window.setTimeout(() => setHappy(false), 900);
  };

  return (
    <div
      ref={rootRef}
      className={`bot${shown ? " is-shown" : ""}${waving ? " is-waving" : ""}${happy ? " is-happy" : ""}`}
    >
      <p className={`bot-bubble${message ? " is-open" : ""}`} role="status" aria-live="polite">
        {message}
      </p>

      <button type="button" className="bot-button" onClick={onClick} aria-label="Vinira's bot. Press for a tip.">
        <span className="bot-float">
          <span className="bot-head">
            <span className="bot-antenna">
              <i />
            </span>
            <span className="bot-ear bot-ear-l" />
            <span className="bot-ear bot-ear-r" />
            <span className="bot-face">
              <span className="bot-eyes">
                <span className="bot-eye" />
                <span className="bot-eye" />
              </span>
              <span className="bot-mouth" />
            </span>
          </span>
          <span className="bot-torso">
            <span className="bot-arm bot-arm-l" />
            <span className="bot-arm bot-arm-r" />
            <span className="bot-core" />
          </span>
        </span>
      </button>
      <span className="bot-shadow" aria-hidden="true" />
    </div>
  );
}
