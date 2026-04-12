"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

type TechItem = {
  name: string;
  short: string;
  logo: string;
  color: string;
  left: string;
  top: string;
  size: string;
};

const technologies: TechItem[] = [
  {
    name: "Flutter",
    short: "FL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    color: "#38bdf8",
    left: "8%",
    top: "16%",
    size: "h-24 w-24",
  },
  {
    name: "React",
    short: "RE",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#22d3ee",
    left: "24%",
    top: "12%",
    size: "h-24 w-24",
  },
  {
    name: "Node.js",
    short: "ND",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#4ade80",
    left: "42%",
    top: "18%",
    size: "h-24 w-24",
  },
  {
    name: "Express",
    short: "EX",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#cbd5e1",
    left: "59%",
    top: "14%",
    size: "h-24 w-24",
  },
  {
    name: "PostgreSQL",
    short: "PG",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#60a5fa",
    left: "82%",
    top: "18%",
    size: "h-24 w-24",
  },
  {
    name: "SQLite",
    short: "SQ",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    color: "#38bdf8",
    left: "13%",
    top: "43%",
    size: "h-24 w-24",
  },
  {
    name: "Python",
    short: "PY",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#facc15",
    left: "30%",
    top: "55%",
    size: "h-24 w-24",
  },
  {
    name: "JavaScript",
    short: "JS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#facc15",
    left: "49%",
    top: "47%",
    size: "h-24 w-24",
  },
  {
    name: "C#",
    short: "C#",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    color: "#c084fc",
    left: "67%",
    top: "53%",
    size: "h-24 w-24",
  },
  {
    name: "Electron",
    short: "EL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg",
    color: "#22d3ee",
    left: "84%",
    top: "44%",
    size: "h-24 w-24",
  },
  {
    name: "HTML5",
    short: "HT",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#fb923c",
    left: "10%",
    top: "76%",
    size: "h-24 w-24",
  },
  {
    name: "CSS3",
    short: "CS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#60a5fa",
    left: "28%",
    top: "82%",
    size: "h-24 w-24",
  },
  {
    name: "Tailwind CSS",
    short: "TW",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#22d3ee",
    left: "47%",
    top: "78%",
    size: "h-24 w-24",
  },
  {
    name: "Git",
    short: "GT",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#f97316",
    left: "66%",
    top: "84%",
    size: "h-24 w-24",
  },
  {
    name: "Firebase",
    short: "FB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    color: "#f59e0b",
    left: "84%",
    top: "78%",
    size: "h-24 w-24",
  },
];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function buildFrames(seed: number, amplitude: number, count = 7) {
  const frames = [0];
  for (let i = 1; i < count; i += 1) {
    const value = (pseudoRandom(seed + i * 17) * 2 - 1) * amplitude;
    frames.push(Number(value.toFixed(2)));
  }
  return frames;
}

function FloatingLogo({
  tech,
  index,
}: {
  tech: TechItem;
  index: number;
}) {
  const seed = hashString(tech.name) + index * 31;

  const xFrames = useMemo(() => buildFrames(seed, 70), [seed]);
  const yFrames = useMemo(() => buildFrames(seed + 100, 55), [seed]);
  const rotateFrames = useMemo(() => buildFrames(seed + 200, 9), [seed]);
  const duration = 14 + (seed % 7);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="absolute hidden md:block"
      style={{
        left: tech.left,
        top: tech.top,
      }}
    >
      <motion.div
        animate={{
          x: xFrames,
          y: yFrames,
          rotate: rotateFrames,
        }}
        transition={{
          duration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        <motion.div whileHover={{ scale: 1.14 }} className="group relative">
          <div
            className={`relative ${tech.size} flex items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl shadow-2xl shadow-black/30`}
            style={{
              boxShadow: `0 0 40px ${tech.color}24, 0 18px 40px rgba(0,0,0,0.28)`,
            }}
          >
            <div
              className="absolute inset-[-18px] rounded-full blur-2xl opacity-35"
              style={{ backgroundColor: tech.color }}
            />

            <img
              src={tech.logo}
              alt={tech.name}
              className="relative z-10 h-12 w-12 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback =
                  e.currentTarget.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <span className="relative z-10 hidden h-12 w-12 items-center justify-center text-sm font-bold text-white">
              {tech.short}
            </span>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-[118%] z-20 -translate-x-1/2 rounded-full border border-white/10 bg-[rgba(7,16,31,0.92)] px-4 py-2 text-sm font-medium text-white opacity-0 shadow-xl transition duration-300 group-hover:opacity-100">
            {tech.name}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function MobileGrid() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-4 md:hidden">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.03 }}
          className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-6 backdrop-blur-xl"
        >
          <div
            className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)]"
            style={{ boxShadow: `0 0 28px ${tech.color}22` }}
          >
            <img
              src={tech.logo}
              alt={tech.name}
              className="h-10 w-10 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback =
                  e.currentTarget.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <span className="hidden h-10 w-10 items-center justify-center text-sm font-bold text-white">
              {tech.short}
            </span>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-200">{tech.name}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function SkillsShowcase() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-b border-white/10 px-6 py-24"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-8%] top-[5%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[-6%] top-[18%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[35%] h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-blue-300">
            Main Tech Stack
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
            Technologies I build with
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            My core stack for mobile apps, full-stack platforms, backend
            systems, desktop applications, and secure product development.
          </p>
        </motion.div>

        <div className="relative mt-14 hidden min-h-[780px] overflow-hidden rounded-[2.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] md:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_46%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(94,167,255,0.03),transparent)]" />

          {technologies.map((tech, index) => (
            <FloatingLogo key={tech.name} tech={tech} index={index} />
          ))}
        </div>

        <MobileGrid />
      </div>
    </section>
  );
}