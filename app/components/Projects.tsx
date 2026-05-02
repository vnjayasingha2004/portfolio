"use client";

import { motion } from "motion/react";

type Project = {
  title: string;
  status: string;
  stack: string[];
  summary: string;
  features: string[];
  repo?: string;
  note?: string;
  gradientFrom: string;
  gradientTo: string;
};

const projects: Project[] = [


  {
  title: "SprintFlow AI",
  status: "AI-powered project planning SaaS",
  stack: [
    "Next.js 16.2.4",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Supabase",
    "Gemini AI"
  ],
  summary:
    "SprintFlow AI is a modern SaaS project planning platform that helps users create projects, manage tasks, and generate structured plans with AI assistance.",
  features: [
    "Protected authentication with Supabase Auth",
    "AI Planner from prompt, file, or saved document",
    "Task detail page with built-in AI chat",
    "User-owned projects, tasks, documents, and storage",
    "Dashboard analytics, project boards, and polished responsive UI"
  ],
  repo: "https://github.com/vnjayasingha2004/sprintflow-ai",
  note:
    "Built with Next.js, TypeScript, Tailwind CSS, Supabase, and Gemini AI as a professional SaaS-style productivity platform.",
  gradientFrom: "#1d4ed8",
  gradientTo: "#0f172a",
},



  {
  title: "BlindMatch PAS",
  status: "Role-based academic workflow platform",
  stack: ["ASP.NET Core MVC", "C#", "SQL Server", "Entity Framework Core", "Identity"],
  summary:
    "A project approval platform for students, supervisors, module leaders, and administrators with blind proposal submission, review workflows, dashboard views, and secure proposal management.",
  features: [
    "Role-based dashboards for Student, Supervisor, Module Leader, and System Admin",
    "Blind proposal submission and review workflow",
    "Secure authentication and authorization with ASP.NET Core Identity",
    "Proposal attachments, validation, and admin oversight"
  ],
  repo: "https://github.com/vnjayasingha2004/BlindMatchPAS",
  note:
    "Built as an enterprise-style academic workflow system focused on role separation, approval flow, and secure data handling.",
  gradientFrom: "#1e3a8a",
  gradientTo: "#111827",
},


  
  {
    title: "LawPoint",
    status: "Full-stack legal services mobile platform",
    stack: ["Flutter", "Node.js", "Express.js", "PostgreSQL"],
    summary:
      "A legal-tech app for verified lawyers, appointment booking, secure messaging, legal locker features, case tracking, and multilingual legal knowledge access.",
    features: [
      "Verified lawyer profiles and admin verification workflow",
      "Booking, scheduling, reminders, and secure client-lawyer messaging",
      "Legal locker with security-focused document handling",
      "English, Sinhala, and Tamil knowledge hub support",
    ],
    repo: "https://github.com/vnjayasingha2004/Lawpoint_App",
    note: "Security work included protected auth flows, hashed verification/reset codes, secure storage, and sensitive document handling.",
    gradientFrom: "#172554",
    gradientTo: "#0f172a",
  },
  {
    title: "SafeSound",
    status: "Real-time hearing safety mobile app",
    stack: ["Flutter"],
    summary:
      "A mobile app that uses live microphone input to monitor sound exposure, estimate unsafe listening conditions, and guide users with practical hearing-safety insights.",
    features: [
      "Real-time live sound monitoring and unsafe exposure alerts",
      "Sound-scene detection for traffic, crowd, conversation, machinery, music/event, and quiet indoor",
      "History, trends, CSV export, location tagging, and coach summaries",
      "Personalized threshold settings and listening insights",
    ],
    repo: "https://github.com/vnjayasingha2004/safesound-app",
    note: "Built as an end-to-end working app with real monitoring, saved sessions, dashboards, and hearing profile settings.",
    gradientFrom: "#14532d",
    gradientTo: "#1f2937",
  },
  {
    title: "Offline Hardware POS + Inventory System",
    status: "Desktop app built for a real business",
    stack: ["Electron", "HTML", "CSS", "JavaScript", "SQLite"],
    summary:
      "An offline desktop POS system designed for Sumith Hardware with billing, local inventory management, barcode-based checkout, and receipt printing.",
    features: [
      "Offline-first billing and inventory tracking",
      "Barcode workflow, cart totals, and local SQLite storage",
      "Auto receipt printing and cash drawer support",
      "Secure Electron preload.js and IPC bridge approach",
    ],
    note: "This was built and sold as a real client project, so I present it here as a practical product build rather than a public repository.",
    gradientFrom: "#78350f",
    gradientTo: "#1f2937",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-b border-white/10 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.28em] text-blue-300">
            Projects
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            A few things I’ve built
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-slate-300">
            These projects reflect enterprise workflow systems, mobile applications, desktop software, and secure full-stack product development with real-world business and academic use cases.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl"
            >
              <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div
                  className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                  }}
                >
                  <p className="text-sm uppercase tracking-[0.22em] text-blue-200/90">
                    {project.status}
                  </p>

                  <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/10 p-5 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-white">
                      {project.title}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 space-y-3">
                      {project.features.slice(0, 3).map((feature) => (
                        <div
                          key={feature}
                          className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-100"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>

                  <p className="mt-4 leading-8 text-slate-300">
                    {project.summary}
                  </p>

                  <ul className="mt-6 space-y-3 text-slate-300">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {project.note ? (
                    <div className="mt-6 rounded-[1.5rem] border border-blue-400/15 bg-blue-400/10 p-4 text-sm leading-7 text-slate-200">
                      {project.note}
                    </div>
                  ) : null}

                  <div className="mt-6 flex flex-wrap gap-4">
                    {project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
                      >
                        View Repository
                      </a>
                    ) : (
                      <span className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300">
                        Private client project
                      </span>
                    )}

                    <a
                      href="mailto:viniraj20040806@gmail.com"
                      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Ask about this project
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
