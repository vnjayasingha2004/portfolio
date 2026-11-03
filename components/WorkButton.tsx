"use client";

import { getLenis } from "./SmoothScroll";

/** Secondary hero action: glides down to the selected work. */
export function WorkButton() {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.querySelector<HTMLElement>("#work");
    if (!el) return;
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return (
    <a className="ghost-btn" href="#work" onClick={onClick}>
      See my work
    </a>
  );
}
