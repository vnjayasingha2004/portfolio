"use client";

import { motion } from "motion/react";

const cards = [
  {
    title: "Product thinking",
    text: "I care about the user journey, not only the code. The interface should explain the product quickly and feel easy to use.",
  },
  {
    title: "Secure workflows",
    text: "Many of my builds include authentication, roles, ownership, validation, or local/offline data handling.",
  },
  {
    title: "Practical delivery",
    text: "I like building software that can be used in real situations, from SaaS planning flows to a desktop POS for a real business.",
  },
];

const timeline = [
  "Full-stack platforms with Next.js, React, Node.js, ASP.NET Core, and databases",
  "Mobile apps with Flutter, Dart, secure storage, and device-oriented features",
  "Desktop tools with Electron, SQLite, printing, and offline-first workflows",
];

export default function AboutSection() {
  return (
    <section id="about" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-10"
          >
            <p className="eyebrow">About me</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Computer Science undergraduate building with clean design and real impact.
            </h2>
            <p className="mt-6 text-lg leading-9 text-slate-300">
              I am based in Tangalle, Sri Lanka, and I am open to internships, junior software opportunities, and collaborative product work. My projects cover SaaS planning, legal-tech mobile workflows, academic approval systems, hearing-safety tools, and offline business software.
            </p>
            <p className="mt-5 text-lg leading-9 text-slate-300">
              This redesign makes the portfolio feel more like a premium product site: fewer long sections on the homepage, clearer project routes, stronger visual hierarchy, and interactive motion that supports the story instead of distracting from it.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-slate-950/45 p-5"
                >
                  <h3 className="text-lg font-black text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{card.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="rounded-[2.5rem] border border-white/10 bg-slate-950/62 p-7 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8"
          >
            <p className="eyebrow">Engineering style</p>
            <h3 className="mt-4 text-3xl font-black text-white">Workflow + security + polish</h3>
            <div className="mt-8 space-y-5">
              {timeline.map((item, index) => (
                <div key={item} className="relative pl-10">
                  <span className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-xs font-black text-cyan-100">
                    {index + 1}
                  </span>
                  {index !== timeline.length - 1 ? (
                    <span className="absolute left-[13px] top-9 h-full w-px bg-gradient-to-b from-cyan-300/40 to-transparent" />
                  ) : null}
                  <p className="text-base leading-8 text-slate-300">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.08] p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/80">Availability</p>
              <p className="mt-3 text-xl font-black text-white">Open to internships and junior software roles</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Best fit: product teams, full-stack teams, mobile app teams, or practical business software work.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
