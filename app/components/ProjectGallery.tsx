"use client";

import { motion } from "motion/react";
import type { Project } from "../data/projects";

export default function ProjectGallery({ project }: { project: Project }) {
  return (
    <section className="mt-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Photos and screens</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Visual walkthrough
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-400">
          These SVG visuals are included so the page feels complete now. Replace them later with real screenshots using the same file paths in app/data/projects.ts.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {project.images.map((image, index) => (
          <motion.figure
            key={image.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className={index === 0 ? "lg:col-span-2" : ""}
          >
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full min-h-[18rem] w-full rounded-[1.5rem] object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-7 text-slate-400">
              {image.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
