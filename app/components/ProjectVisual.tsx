import type { Project } from "../data/projects";

export default function ProjectVisual({
  project,
  size = "default",
}: {
  project: Project;
  size?: "default" | "large";
}) {
  const big = size === "large";

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-2xl shadow-black/30 backdrop-blur-xl ${big ? "min-h-[31rem] p-6" : "min-h-[24rem] p-5"}`}
      style={{
        backgroundImage: `radial-gradient(circle at 25% 20%, ${project.theme.accent}33, transparent 32%), linear-gradient(135deg, ${project.theme.from}, ${project.theme.via} 48%, ${project.theme.to})`,
      }}
    >
      <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/60">Case study</p>
            <h3 className="mt-2 text-2xl font-black text-white">{project.title}</h3>
          </div>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white">
            {project.timeline}
          </span>
        </div>

        <div className={`mt-5 grid gap-4 ${big ? "md:grid-cols-[0.95fr_1.05fr]" : ""}`}>
          <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-white">Product flow</p>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: project.theme.accent }} />
            </div>
            <div className="mt-5 space-y-3">
              {project.features.slice(0, 4).map((feature, index) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white/10 text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <span className="truncate text-sm font-semibold text-slate-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/55">{metric.label}</p>
                  <p className="mt-2 text-lg font-black text-white">{metric.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/55">Outcome</p>
              <p className="mt-2 text-sm leading-7 text-slate-200">{project.outcomes[0]}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 6).map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-bold text-white">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
