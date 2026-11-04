"use client";

import Link from "next/link";
import { CvButton } from "./CvButton";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";
import { GuideToggle } from "./GuideToggle";
import { Logo } from "./Logo";
import { getLenis } from "./SmoothScroll";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

/** Picks its colour from whichever section is under it (data-theme on sections). */
export function Nav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("blue");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const probe = 28;
      const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
      let current = "paper";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) current = section.dataset.theme ?? current;
      });
      setTheme(current);

      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > lastY + 2);
      if (y < lastY - 2 || y <= 240) setHidden(false);
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // On the homepage, the logo and section links scroll in place instead of navigating,
  // because a link to the current page doesn't move the (smooth-scrolled) page.
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (pathname !== "/") return;
    const el = target === "top" ? null : document.querySelector(target);
    if (target !== "top" && !el) return;
    e.preventDefault();
    const lenis = getLenis();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenis) lenis.scrollTo(target === "top" ? 0 : (el as HTMLElement), { duration: 1.4 });
    else if (target === "top") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    else (el as HTMLElement).scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", target === "top" ? "/" : `/${target}`);
    e.currentTarget.blur();
  };

  return (
    <header className={`site-nav on-${theme}${hidden ? " is-hidden" : ""}${scrolled ? " is-scrolled" : ""}`}>
      <Link href="/" className="nav-mark" aria-label={`${profile.name}, home`} onClick={(e) => scrollTo(e, "top")}>
        <Logo />
        <span className="nav-name">Vinira Jayasingha</span>
      </Link>
      <nav aria-label="Primary">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={(e) => scrollTo(e, link.href.slice(1))}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="nav-end">
        <GuideToggle className="nav-guide" />
        <CvButton size="sm" label="CV" className="nav-cv-btn" />
      </div>
    </header>
  );
}
