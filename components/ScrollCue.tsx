"use client";

import { getLenis } from "./SmoothScroll";

/** A small "scroll" prompt at the foot of the hero; clicking it glides to the next section. */
export function ScrollCue({ target }: { target: string }) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.querySelector<HTMLElement>(target);
    if (!el) return;
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return (
    <a className="scroll-cue" href={target} onClick={onClick}>
      <span className="scroll-mouse" aria-hidden="true">
        <i />
      </span>
      Scroll
    </a>
  );
}
