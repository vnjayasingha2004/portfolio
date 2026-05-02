"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectIndex() {
  return (
    <section className="px-5 pb-24 pt-28 sm:px-8 lg:pt-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="grid gap-8 rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/25 backdrop-blur-xl lg:grid-cols-[1fr_0.72fr] lg:items-end sm:p-10"
        >
          <div>
            <p className="eyebrow">Projects</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-7xl">
              Product stories, not just screenshots.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-300">
              Each card opens a dedicated route with a short introduction, generated project visuals, links, technology stack, features, and a clearer explanation of your role and product value.
            </p>
          </div>
          <div className="rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.08] p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/80">Portfolio structure</p>
            <p className="mt-3 text-2xl font-black text-white">Home → Projects → Case study</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              This route-based layout makes the site feel more professional and easier to expand later.
            </p>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-white"
            >
              {project.title}
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
