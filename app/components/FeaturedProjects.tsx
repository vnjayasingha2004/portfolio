"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { featuredProjects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">Selected builds</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
              Project previews on the homepage, full stories on their own route.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-slate-300">
              The homepage now stays focused. Visitors get a short preview here, then move into a dedicated projects area for deeper descriptions, visuals, and links.
            </p>
          </motion.div>

          <Link
            href="/projects"
            className="inline-flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/10"
          >
            View all projects
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
