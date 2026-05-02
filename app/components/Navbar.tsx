"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
            <span className="absolute inset-1 rounded-xl bg-gradient-to-br from-cyan-300/25 to-blue-500/10 blur" />
            <span className="relative text-sm font-black tracking-tight text-cyan-100">VJ</span>
          </span>
          <span>
            <span className="block text-sm font-black tracking-tight text-white">Vinira Jayasingha</span>
            <span className="block text-[0.68rem] uppercase tracking-[0.24em] text-cyan-200/70">Software Developer</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 lg:flex">
          {navItems.map((item) => {
            const active = item.href === "/projects" ? pathname.startsWith("/projects") : pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                {active ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-cyan-300/10 ring-1 ring-cyan-300/25"
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://github.com/vnjayasingha2004"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
          >
            GitHub
          </a>
          <a
            href="/Vinira_Jayasingha_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
          >
            CV
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-white lg:hidden"
        >
          <span className="block h-0.5 w-5 bg-white" />
          <span className="mt-1.5 block h-0.5 w-5 bg-white" />
          <span className="mt-1.5 block h-0.5 w-5 bg-white" />
        </button>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="border-t border-white/10 bg-slate-950/92 px-5 py-4 backdrop-blur-2xl lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
