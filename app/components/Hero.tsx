"use client";

import { motion } from "motion/react";

const highlights = [
  { value: "3+", label: "Featured projects" },
  { value: "Mobile / Web / Desktop", label: "Build focus" },
  { value: "Security-first", label: "Problem solving style" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0 -z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,6,23,0.78),rgba(3,7,18,0.88))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.14),transparent_22%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.14),transparent_30%)]" />

      <div className="mx-auto grid min-h-[92vh] max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300 backdrop-blur-sm"
          >
            Computer Science Undergraduate • Aspiring Software Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="max-w-4xl text-5xl font-bold leading-tight sm:text-6xl md:text-7xl"
          >
            I build modern software
            <span className="block bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              with clean design and real impact.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            I’m Vinira Jayasingha, a developer focused on mobile, desktop, and
            full-stack applications. My featured work includes LawPoint,
            SafeSound, and an offline hardware POS system built for a real
            business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-2xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
            >
              View Projects
            </motion.a>

            <motion.a
              href="https://github.com/vnjayasingha2004"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              GitHub
            </motion.a>

            <motion.a
              href="/Vinira_Jayasingha_CV.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-2xl border border-blue-400/20 bg-blue-400/10 px-6 py-3 font-semibold text-blue-200 transition hover:bg-blue-400/20"
            >
              Download CV
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"
        >
          <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(17,24,39,0.55),rgba(11,23,48,0.88))] p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-blue-300">
              Quick Snapshot
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Product-minded developer
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              I enjoy building software that feels polished, solves real
              problems, and turns technical work into something people can
              actually use.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
              >
                <p className="text-lg font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm text-slate-400">{item.label}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.56 }}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:col-span-2"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                Based in
              </p>
              <p className="mt-2 text-xl font-semibold">Tangalle, Sri Lanka</p>
              <p className="mt-2 text-sm text-slate-400">
                Open to internships, junior opportunities, and collaborative
                product work.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}