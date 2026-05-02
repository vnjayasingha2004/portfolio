"use client";

import Link from "next/link";
import { motion } from "motion/react";

const heroStats = [
  { label: "Featured builds", value: "5" },
  { label: "Product focus", value: "Full-stack" },
  { label: "Based in", value: "Sri Lanka" },
];

const workflowSteps = [
  "Understand the user problem",
  "Design a clean product flow",
  "Build secure, practical software",
  "Polish the interface and motion",
];

export default function Hero() {
  return (
    <section className="relative px-5 pb-20 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-4 py-2 text-sm font-bold text-cyan-100 shadow-[0_0_45px_rgba(34,211,238,0.12)] backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-200" />
            </span>
            Computer Science Undergraduate - Aspiring Software Engineer
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            I design and build software that feels like a product.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-300 sm:text-xl">
            I am Vinira Jayasingha, a developer focused on modern full-stack, mobile, desktop, and AI-assisted applications. I like turning complex workflows into clear interfaces with reliable engineering behind them.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="button-glow rounded-2xl bg-cyan-300 px-6 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-1 hover:bg-white"
            >
              Explore projects
            </Link>
            <a
              href="https://github.com/vnjayasingha2004"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/10"
            >
              GitHub profile
            </a>
            <a
              href="mailto:viniraj20040806@gmail.com"
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.12]"
            >
              Contact me
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.55 }}
                className="rounded-3xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{stat.label}</p>
                <p className="mt-2 text-xl font-black text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[3rem] bg-cyan-400/10 blur-3xl" />
          <div className="hero-console relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
              </div>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-bold text-cyan-100">
                live portfolio system
              </span>
            </div>

            <div className="grid gap-5 pt-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5">
                <p className="eyebrow">Quick profile</p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-white">
                  Product-minded developer
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  I build interfaces that look polished, behave smoothly, and explain the value of the software quickly.
                </p>
                <div className="mt-6 space-y-3">
                  {workflowSteps.map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + index * 0.12, duration: 0.45 }}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-300/10 text-xs font-black text-cyan-200">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-200">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[25rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.22),transparent_34%),linear-gradient(145deg,rgba(15,23,42,0.92),rgba(2,6,23,0.94))] p-5">
                <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:34px_34px]" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">Currently highlighting</p>
                      <p className="mt-2 text-xl font-black text-white">SprintFlow AI</p>
                    </div>
                    <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">SaaS</span>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <p className="text-sm font-bold text-white">AI planner</p>
                      <div className="mt-4 space-y-2">
                        <span className="block h-2 rounded-full bg-cyan-300/60" />
                        <span className="block h-2 w-4/5 rounded-full bg-white/20" />
                        <span className="block h-2 w-2/3 rounded-full bg-white/15" />
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <p className="text-sm font-bold text-white">Secure auth</p>
                      <div className="mt-4 flex gap-2">
                        <span className="h-9 flex-1 rounded-xl bg-blue-400/25" />
                        <span className="h-9 flex-1 rounded-xl bg-cyan-300/20" />
                        <span className="h-9 flex-1 rounded-xl bg-violet-300/20" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.08] p-4">
                    <p className="text-sm leading-7 text-cyan-50">
                      Clean UI + real workflow engineering + route-based project stories.
                    </p>
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-6 right-6 h-28 w-28 rounded-full border border-cyan-300/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                >
                  <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
