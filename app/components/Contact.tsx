"use client";

import { motion } from "motion/react";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-blue-300">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Let’s build something useful
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-slate-300">
            I’m open to internships, junior software opportunities, and product
            work where I can keep learning while building meaningful software.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:viniraj20040806@gmail.com"
              className="rounded-2xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
            >
              Email Me
            </a>

            <a
              href="https://github.com/vnjayasingha2004"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              GitHub Profile
            </a>
            <a
                 href="https://www.linkedin.com/in/vinira-jayasingha-472398324/"
                 target="_blank"
                 rel="noreferrer"
                 className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
             LinkedIn
             </a>

            <a
              href="/Vinira_Jayasingha_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-blue-400/20 bg-blue-400/10 px-6 py-3 font-semibold text-blue-200 transition hover:bg-blue-400/20"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
              Email
            </p>
            <a
              href="mailto:viniraj20040806@gmail.com"
              className="mt-3 block text-lg font-semibold text-white transition hover:text-blue-300"
            >
              viniraj20040806@gmail.com
            </a>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
              Phone
            </p>
            <a
              href="tel:0715542899"
              className="mt-3 block text-lg font-semibold text-white transition hover:text-blue-300"
            >
              071 554 2899
            </a>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
              Location
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              Tangalle, Sri Lanka
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">
              Focus
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              Full-stack, mobile, and product development
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
