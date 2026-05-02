"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";

const techNodes = [
  { name: "Next.js", short: "Nx", x: 50, y: 11, group: "Full-stack", detail: "App Router, server components, SaaS pages", color: "#ffffff" },
  { name: "React", short: "Re", x: 30, y: 21, group: "Frontend", detail: "Reusable UI systems and animated components", color: "#67e8f9" },
  { name: "TypeScript", short: "Ts", x: 69, y: 24, group: "Frontend", detail: "Typed data models, safer interfaces, maintainable code", color: "#93c5fd" },
  { name: "Tailwind", short: "Tw", x: 46, y: 34, group: "Design", detail: "Responsive design systems and fast polish", color: "#22d3ee" },
  { name: "Flutter", short: "Fl", x: 18, y: 48, group: "Mobile", detail: "Cross-platform mobile apps and product screens", color: "#38bdf8" },
  { name: "Dart", short: "Da", x: 30, y: 66, group: "Mobile", detail: "App logic, state, and device-oriented features", color: "#60a5fa" },
  { name: "Node.js", short: "No", x: 62, y: 51, group: "Backend", detail: "APIs, services, and server-side product logic", color: "#86efac" },
  { name: "Express", short: "Ex", x: 77, y: 42, group: "Backend", detail: "REST endpoints and lightweight backend services", color: "#cbd5e1" },
  { name: "C#", short: "C#", x: 83, y: 64, group: "Backend", detail: "Enterprise workflows and ASP.NET Core applications", color: "#c4b5fd" },
  { name: "ASP.NET", short: ".N", x: 72, y: 75, group: "Backend", detail: "Identity, role-based access, and MVC workflow systems", color: "#a78bfa" },
  { name: "PostgreSQL", short: "Pg", x: 88, y: 21, group: "Data", detail: "Relational data for product backends", color: "#93c5fd" },
  { name: "SQL Server", short: "SQL", x: 62, y: 84, group: "Data", detail: "Structured data for enterprise-style systems", color: "#fde68a" },
  { name: "SQLite", short: "Lite", x: 38, y: 82, group: "Desktop", detail: "Offline-first local storage for desktop apps", color: "#7dd3fc" },
  { name: "Electron", short: "El", x: 15, y: 76, group: "Desktop", detail: "Offline desktop apps with secure IPC boundaries", color: "#fb923c" },
  { name: "Git", short: "Git", x: 52, y: 93, group: "Workflow", detail: "Version control and deployment workflow", color: "#f97316" },
  { name: "Firebase", short: "Fb", x: 86, y: 90, group: "Cloud", detail: "Realtime app services and product prototypes", color: "#fbbf24" },
];

const edges = [
  ["Next.js", "React"],
  ["Next.js", "TypeScript"],
  ["React", "Tailwind"],
  ["TypeScript", "Node.js"],
  ["Node.js", "Express"],
  ["Node.js", "PostgreSQL"],
  ["C#", "ASP.NET"],
  ["ASP.NET", "SQL Server"],
  ["Flutter", "Dart"],
  ["Electron", "SQLite"],
  ["SQLite", "Git"],
  ["Git", "Firebase"],
  ["Tailwind", "Node.js"],
  ["PostgreSQL", "C#"],
  ["Flutter", "React"],
  ["Firebase", "C#"],
];

const orbitLabels = ["Frontend", "Backend", "Mobile", "Desktop", "Data", "Cloud"];

export default function TechConstellation() {
  const [active, setActive] = useState(techNodes[0]);
  const nodesByName = useMemo(() => new Map(techNodes.map((node) => [node.name, node])), []);

  return (
    <section id="skills" className="relative px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <p className="eyebrow">Main tech stack</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              A connected stack, not just random logos.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-9 text-slate-300">
              I redesigned your skills section as a living constellation. Hover each star to see how the tool fits into your product-building workflow.
            </p>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Selected node</p>
                  <h3 className="mt-3 text-3xl font-black text-white">{active.name}</h3>
                </div>
                <span
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-black text-white"
                  style={{ backgroundColor: `${active.color}22`, borderColor: `${active.color}55` }}
                >
                  {active.group}
                </span>
              </div>
              <p className="mt-5 text-base leading-8 text-slate-300">{active.detail}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {orbitLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-slate-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-cyan-400/10 blur-3xl" />
            <div className="constellation relative min-h-[38rem] overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/58 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_45%),radial-gradient(circle_at_35%_65%,rgba(124,58,237,0.16),transparent_38%)]" />
              <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:24px_24px]" />

              <svg className="absolute inset-0 h-full w-full" role="img" aria-label="Connected technology constellation">
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(34,211,238,0.2)" />
                    <stop offset="50%" stopColor="rgba(147,197,253,0.55)" />
                    <stop offset="100%" stopColor="rgba(196,181,253,0.22)" />
                  </linearGradient>
                </defs>
                {edges.map(([fromName, toName], index) => {
                  const from = nodesByName.get(fromName);
                  const to = nodesByName.get(toName);

                  if (!from || !to) return null;

                  const highlighted = active.name === fromName || active.name === toName;
                  return (
                    <motion.line
                      key={`${fromName}-${toName}`}
                      x1={`${from.x}%`}
                      y1={`${from.y}%`}
                      x2={`${to.x}%`}
                      y2={`${to.y}%`}
                      stroke={highlighted ? active.color : "url(#lineGradient)"}
                      strokeWidth={highlighted ? 1.8 : 1}
                      strokeDasharray="5 12"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: highlighted ? 0.95 : 0.45 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.04 }}
                    />
                  );
                })}
              </svg>

              {techNodes.map((node, index) => (
                <div
                  key={node.name}
                  className="absolute"
                  style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <motion.button
                    type="button"
                    onMouseEnter={() => setActive(node)}
                    onFocus={() => setActive(node)}
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.16, y: -4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.12 + index * 0.035 }}
                    className="tech-star group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-sm font-black text-white shadow-2xl backdrop-blur-xl outline-none transition focus:ring-2 focus:ring-cyan-300 sm:h-20 sm:w-20"
                    style={{ boxShadow: `0 0 34px ${node.color}30` }}
                  >
                    <span className="absolute inset-[-7px] rounded-full border border-white/5 opacity-0 transition group-hover:opacity-100" />
                    <span className="absolute inset-0 rounded-full opacity-70 blur-xl" style={{ backgroundColor: `${node.color}22` }} />
                    <span className="relative">{node.short}</span>
                    <span className="absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/90 px-3 py-1 text-xs font-bold text-slate-200 shadow-xl group-hover:block">
                      {node.name}
                    </span>
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
