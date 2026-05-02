"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "../data/projects";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/25 backdrop-blur-xl"
    >
      <Link href={`/projects/${project.slug}`} className="grid h-full gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <ProjectVisual project={project} />
        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
              {project.eyebrow}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-bold text-slate-300">
              {project.timeline}
            </span>
          </div>

          <h3 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-8 text-slate-300">{project.short}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-semibold text-slate-200">
                {item}
              </span>
            ))}
          </div>

          <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
            {project.outcomes.slice(0, 3).map((outcome) => (
              <li key={outcome} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.75)]" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition group-hover:bg-cyan-200">
              Open case study
              <span aria-hidden className="transition group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
