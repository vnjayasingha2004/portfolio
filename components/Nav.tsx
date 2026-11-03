"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#stack", label: "Stack" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/** Picks its colour from whichever section is under it (data-theme on sections). */
export function Nav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("blue");
  const [hidden, setHidden] = useState(false);

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

  return (
    <header className={`site-nav on-${theme}${hidden ? " is-hidden" : ""}`}>
      <Link href="/" className="nav-mark" aria-label={`${profile.name}, home`}>
        Vinira J.
      </Link>
      <nav aria-label="Primary">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <a className="nav-cv" href={profile.cv} target="_blank" rel="noreferrer">
        CV
      </a>
    </header>
  );
}
