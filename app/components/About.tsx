"use client";

import { motion } from "motion/react";

const techStack = [
  "Flutter",
  "React.js",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "Electron",
  "SQLite",
  "Python",
  "JavaScript",
  "C#",
  "SQL",
  "Authentication",
  "Application Security",
  "API Development",
];

export default function About() {
  return (
    <section id="about" className="border-b border-white/10 px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-blue-300">
            About Me
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Computer Science undergraduate building real products
          </h2>

          <p className="mt-5 leading-8 text-slate-300">
            I’m Vinira Jayasingha, a Computer Science undergraduate who enjoys
            building practical, polished software across mobile, desktop, and
            full-stack platforms.
          </p>

          <p className="mt-4 leading-8 text-slate-300">
            My work includes legal-tech, hearing-safety applications, and
            offline business software. I care about clean UI, useful product
            thinking, and secure system design.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
                Degree
              </p>
              <p className="mt-3 text-lg font-semibold">BSc in Computer Science</p>
              <p className="mt-2 text-sm text-slate-400">NSBM Green University</p>
              <p className="text-sm text-slate-400">2024 - 2027</p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
                Focus
              </p>
              <p className="mt-3 text-lg font-semibold">
                Full-stack, mobile, and product development
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Real-world apps with modern UI and strong technical foundations
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-blue-300">
            Tech Stack
          </p>

          <h3 className="mt-4 text-3xl font-bold">Tools I work with</h3>

          <div className="mt-6 flex flex-wrap gap-3">
            {techStack.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-blue-400/15 bg-blue-400/10 p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-blue-200">
              Goal
            </p>
            <p className="mt-3 text-lg font-semibold">
              Growing toward professional software engineering
            </p>
            <p className="mt-3 leading-7 text-slate-300">
              I’m building strong experience in software engineering,
              application architecture, backend systems, and user-focused
              product development.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}