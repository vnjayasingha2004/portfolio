"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { profile } from "@/lib/profile";
import { ProjectLaunchLink } from "./ProjectLaunchLink";

const identityRows = [
  {
    label: "Degree",
    value: "BSc (Hons) in Computer Science",
  },
  {
    label: "University",
    value: "Plymouth University",
  },
  {
    label: "Role",
    value: "Full-Stack Developer",
  },
];

export function HeroStage() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <motion.p
          className="section-kicker"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          Software developer / product-minded builder
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.42, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          I build real systems with restrained design and precise motion.
        </motion.h1>

        <motion.p
          className="hero-lede"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.58, duration: 0.8 }}
        >
          I focus on full-stack, mobile, and desktop products: AI planning tools,
          academic workflows, legal service apps, safety apps, and offline
          business software.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.74, duration: 0.65 }}
        >
          <ProjectLaunchLink href="/projects" className="primary-launch">
            View selected work
          </ProjectLaunchLink>

          <Link className="quiet-link" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </Link>

          <Link className="quiet-link" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </Link>

          <Link className="quiet-link" href={profile.cv} target="_blank">
            CV
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="product-stage"
        initial={{ opacity: 0, x: 36, rotateY: -12 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ delay: 1.46, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="stage-browser identity-browser">
          <div className="browser-topbar">
            <span />
            <span />
            <span />
            <em>vinira.profile</em>
          </div>

          <div className="stage-screen identity-stage">
            <div className="identity-orbit identity-orbit-one" aria-hidden="true" />
            <div className="identity-orbit identity-orbit-two" aria-hidden="true" />
            <div className="identity-scanline" aria-hidden="true" />

            <div className="identity-stage-header">
              <span>Developer identity</span>
              <strong>Computer Science</strong>
            </div>

            <motion.div
              className="identity-main"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.75, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="identity-kicker">Full-stack / mobile / desktop</p>
              <h2>Vinira Jayasingha</h2>
              <p>
                Computer Science undergraduate focused on building useful,
                polished software with clean interfaces and reliable engineering.
              </p>
            </motion.div>

            <div className="identity-profile-grid">
              <div className="identity-data-list">
                {identityRows.map((row, index) => (
                  <motion.div
                    key={row.label}
                    className="identity-data-row"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 1.95 + index * 0.12,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <small>{row.label}</small>
                    <strong>{row.value}</strong>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="identity-mini-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.28, duration: 0.7 }}
              >
                <span>Focus</span>
                <strong>Product-minded developer</strong>
                <p>
                  Clean UI, practical workflows, structured backend logic, and
                  software built for real use.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}