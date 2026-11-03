"use client";

import { useEffect, useRef } from "react";

type Props = {
  lines: string[];
  className?: string;
  /** Run the unfold-on-load sequence */
  intro?: boolean;
  as?: "h1" | "p" | "span";
};

const REST = { w: 96, g: 520 };
const PEAK = { w: 150, g: 900 };
const START = { w: 50, g: 120 };

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/**
 * Display type built from Anybody's width + weight axes.
 * Letters near the pointer stretch wide and heavy; on load they unfold from condensed.
 */
export function KineticName({ lines, className = "", intro = true, as = "h1" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const letters = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-l]"));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = (el: HTMLSpanElement, w: number, g: number) => {
      el.style.fontVariationSettings = `"wdth" ${w.toFixed(1)}, "wght" ${g.toFixed(0)}`;
    };

    if (reduce) {
      letters.forEach((el) => {
        apply(el, REST.w, REST.g);
        el.style.opacity = "1";
      });
      return;
    }

    const from = intro ? START : REST;
    const state = letters.map((el) => {
      apply(el, from.w, from.g);
      return { w: from.w, g: from.g, cx: 0, cy: 0 };
    });
    const lineEls = Array.from(root.querySelectorAll<HTMLElement>(".kinetic-line"));
    const lineOf = letters.map((el) => lineEls.indexOf(el.parentElement as HTMLElement));
    const lineGroups = lineEls.map((_, li) => lineOf.flatMap((l, i) => (l === li ? [i] : [])));
    const pointer = { x: -1e5, y: -1e5 };
    let fontSize = 100;
    let visible = true;
    let running = false;
    let frame = 0;
    const start = performance.now();
    const introDone = intro ? 260 + letters.length * 55 + 1100 : 0;

    const measure = () => {
      fontSize = parseFloat(getComputedStyle(root).fontSize) || 100;
      letters.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        state[i].cx = r.left + r.width / 2;
        state[i].cy = r.top + window.scrollY + r.height / 2;
      });
    };

    // Touch screens have no hover, so a virtual pointer drives the letters there:
    // a sweep once the name has unfolded, a ripple that runs with the scroll,
    // and the finger itself while touching.
    const coarse = matchMedia("(pointer: coarse)").matches;
    let touchAt = -1e9;
    let scrollAt = -1e9;
    const sweepStart = start + introDone - 300;

    const virtualPointer = (now: number, sigma: number) => {
      if (now - touchAt < 900) return true;
      let minX = Infinity;
      let maxX = -Infinity;
      let sumY = 0;
      state.forEach((s) => {
        minX = Math.min(minX, s.cx);
        maxX = Math.max(maxX, s.cx);
        sumY += s.cy;
      });
      const from = minX - sigma * 1.6;
      const span = maxX - minX + sigma * 3.2;
      pointer.y = sumY / state.length;

      const sweep = (now - sweepStart) / 1500;
      if (intro && sweep > 0 && sweep < 1) {
        pointer.x = from + span * easeInOut(sweep);
        return true;
      }
      if (now - scrollAt < 420) {
        const r = root.getBoundingClientRect();
        const p = clamp((window.innerHeight - r.top) / (window.innerHeight + r.height));
        pointer.x = from + span * clamp((p - 0.35) / 0.6);
        return true;
      }
      pointer.x = -1e5;
      pointer.y = -1e5;
      return false;
    };

    const tick = (now: number) => {
      const t = now - start;
      const sigma = fontSize * 0.75;
      let moving = t < introDone;
      if (coarse && virtualPointer(now, sigma)) moving = true;

      // Influence of the pointer on each letter
      const influence = state.map((s) => {
        const dx = pointer.x - s.cx;
        const dy = pointer.y - s.cy;
        return Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
      });

      // Per line, letters away from the pointer narrow to pay for the ones that widen,
      // so the line keeps roughly the same length and never runs off the edge.
      const squeeze = lineEls.map(() => 0);
      lineGroups.forEach((group, li) => {
        let grow = 0;
        let rest = 0;
        group.forEach((i) => {
          grow += influence[i] * (PEAK.w - REST.w);
          rest += 1 - influence[i];
        });
        squeeze[li] = rest > 0.5 ? Math.min(REST.w - START.w, grow / rest) : 0;
      });

      letters.forEach((el, i) => {
        const s = state[i];
        const f = influence[i];
        const p = intro ? easeOutExpo(clamp((t - 260 - i * 55) / 1100)) : 1;
        const tw = REST.w + (PEAK.w - REST.w) * f - squeeze[lineOf[i]] * (1 - f);
        const tg = REST.g + (PEAK.g - REST.g) * f - 160 * (squeeze[lineOf[i]] / (REST.w - START.w)) * (1 - f);
        const goalW = START.w + (tw - START.w) * p;
        const goalG = START.g + (tg - START.g) * p;
        const k = p < 1 ? 1 : 0.14;
        s.w += (goalW - s.w) * k;
        s.g += (goalG - s.g) * k;
        if (Math.abs(goalW - s.w) > 0.2 || Math.abs(goalG - s.g) > 1) moving = true;
        apply(el, s.w, s.g);
        el.style.opacity = String(intro ? clamp((t - 260 - i * 55) / 500) : 1);
        el.style.transform = `translateY(${((1 - p) * 0.35).toFixed(3)}em)`;
      });

      if (moving && visible) frame = requestAnimationFrame(tick);
      else running = false;
    };

    const wake = () => {
      if (running || !visible) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    let measureTimer = 0;
    const scheduleMeasure = () => {
      window.clearTimeout(measureTimer);
      measureTimer = window.setTimeout(measure, 120);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY + window.scrollY;
      wake();
    };
    const onLeave = () => {
      pointer.x = -1e5;
      pointer.y = -1e5;
      wake();
    };
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      pointer.x = touch.clientX;
      pointer.y = touch.clientY + window.scrollY;
      touchAt = performance.now();
      wake();
    };
    const onScroll = () => {
      scrollAt = performance.now();
      wake();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    io.observe(root);

    measure();
    window.setTimeout(measure, introDone + 50);
    document.fonts?.ready.then(measure);
    wake();

    if (coarse) {
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(measureTimer);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [intro, lines]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={`kinetic ${className}`} aria-label={lines.join(" ")}>
      {lines.map((line) => (
        <span className="kinetic-line" key={line} aria-hidden="true">
          {Array.from(line).map((char, i) => (
            <span data-l key={i} className="kinetic-letter" style={{ opacity: intro ? 0 : 1 }}>
              {char === " " ? " " : char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
