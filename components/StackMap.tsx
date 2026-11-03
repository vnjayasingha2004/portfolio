"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project, StackGroup } from "@/lib/projects";

type Tool = { name: string; note?: string; projects: string[] };

const layers: { title: string; groups: StackGroup[] }[] = [
  { title: "Interface", groups: ["Frontend"] },
  { title: "Server & data", groups: ["Backend", "Database"] },
  { title: "Mobile & desktop", groups: ["Mobile", "Desktop"] },
  { title: "AI, security & languages", groups: ["AI", "Security", "Language"] },
];

// Practices and features rather than tools; they're covered on each case study instead.
const notTools = new Set([
  "Route Guards",
  "Validation",
  "Auth Rules",
  "Barcode Flow",
  "Receipt Print",
  "Notifications",
  "Push Notifications",
  "IPC Bridge",
]);

function buildLayers(projects: Project[]) {
  return layers.map((layer) => {
    const tools = new Map<string, Tool>();
    projects.forEach((project) => {
      project.stack
        .filter((item) => layer.groups.includes(item.group) && !notTools.has(item.name))
        .forEach((item) => {
          const tool = tools.get(item.name) ?? { name: item.name, note: item.note, projects: [] };
          tool.projects.push(project.slug);
          tools.set(item.name, tool);
        });
    });
    return { title: layer.title, tools: Array.from(tools.values()) };
  });
}

/** Tools grouped by layer. Pointing at (or tapping) a tool lights up the projects that used it. */
export function StackMap({ projects }: { projects: Project[] }) {
  const [focus, setFocus] = useState<Tool | null>(null);
  const [pinned, setPinned] = useState<Tool | null>(null);
  const current = focus ?? pinned;
  const data = buildLayers(projects);

  return (
    <div className={`stack-map${current ? " has-focus" : ""}`}>
      <div className="stack-layers">
        {data.map((layer) => (
          <div className="stack-layer" key={layer.title}>
            <h3>{layer.title}</h3>
            <ul>
              {layer.tools.map((tool) => {
                const on = current?.name === tool.name;
                return (
                  <li key={tool.name}>
                    <button
                      type="button"
                      className={on ? "is-on" : undefined}
                      aria-pressed={pinned?.name === tool.name}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setFocus(tool)}
                      onPointerLeave={() => setFocus(null)}
                      onFocus={() => setFocus(tool)}
                      onBlur={() => setFocus(null)}
                      onClick={() => setPinned(pinned?.name === tool.name ? null : tool)}
                    >
                      {tool.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <aside className="stack-projects" aria-live="polite">
        <p className="stack-caption">
          {current ? (
            <>
              <strong>{current.name}</strong>
              {current.note ? `, ${current.note.toLowerCase()}` : ""}. Used in {current.projects.length}{" "}
              {current.projects.length === 1 ? "project" : "projects"}.
            </>
          ) : (
            "Point at or tap a tool to see where I used it."
          )}
        </p>
        <ul>
          {projects.map((project) => {
            const lit = !current || current.projects.includes(project.slug);
            return (
              <li key={project.slug} className={lit ? "is-lit" : "is-dim"}>
                <Link href={`/projects/${project.slug}`}>
                  <span>{project.title}</span>
                  <small>{project.type}</small>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
