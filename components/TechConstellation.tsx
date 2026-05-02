"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { StackItem } from "@/lib/projects";
import { TechIcon } from "@/components/TechIcon";

type TechConstellationProps = {
  items: StackItem[];
  title?: string;
  description?: string;
  compact?: boolean;
};

type Node = StackItem & {
  id: string;
  x: number;
  y: number;
  size: number;
  floatX: number;
  floatY: number;
  floatR: number;
  delay: number;
  duration: number;
};

const positions = [
  [14, 45],
  [25, 29],
  [42, 38],
  [57, 24],
  [73, 38],
  [84, 56],
  [70, 72],
  [52, 78],
  [34, 68],
  [20, 62],
  [38, 52],
  [60, 54],
  [78, 78],
  [24, 80],
  [48, 18],
  [86, 30],
  [12, 72],
  [67, 19],
  [90, 70],
  [32, 18],
  [47, 88],
  [58, 40],
];

function round(value: number, decimals = 2) {
  return Number(value.toFixed(decimals));
}

function stableNumber(seed: string, min: number, max: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  }
  const normalized = hash / 100000;
  return round(min + normalized * (max - min));
}

function distance(a: Node, b: Node) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function TechConstellation({
  items,
  title = "Connected stack map",
  description,
  compact = false,
}: TechConstellationProps) {
  const [active, setActive] = useState<Node | null>(null);

  const nodes = useMemo<Node[]>(() => {
    return items.map((item, index) => {
      const [x, y] = positions[index % positions.length];

      return {
        ...item,
        id: `${item.name}-${index}`,
        x,
        y,
        size: compact ? 58 : index % 3 === 0 ? 74 : 64,
        floatX: stableNumber(`${item.name}-x`, -7, 7),
        floatY: stableNumber(`${item.name}-y`, -7, 7),
        floatR: stableNumber(`${item.name}-r`, -2, 2),
        delay: stableNumber(`${item.name}-d`, -4, 0),
        duration: stableNumber(`${item.name}-t`, 9, 14),
      };
    });
  }, [items, compact]);

  const edges = useMemo(() => {
    return nodes
      .flatMap((node) =>
        nodes
          .filter((candidate) => candidate.id !== node.id)
          .map((candidate) => ({
            id: [node.id, candidate.id].sort().join("-"),
            from: node,
            to: candidate,
            d: distance(node, candidate),
          }))
          .sort((a, b) => a.d - b.d)
          .slice(0, 2)
      )
      .filter((edge, index, array) => array.findIndex((item) => item.id === edge.id) === index)
      .slice(0, compact ? 8 : 14);
  }, [nodes, compact]);

  const readout = active ?? nodes[0];

  return (
    <div className={`constellation-panel reveal-on-scroll ${compact ? "constellation-compact" : ""}`}>
      <div className="constellation-heading">
        <p className="section-kicker"></p>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>

      <div className="constellation-stage">
        <svg className="constellation-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {edges.map((edge) => (
            <line
              key={edge.id}
              className="constellation-link"
              x1={edge.from.x}
              y1={edge.from.y}
              x2={edge.to.x}
              y2={edge.to.y}
            />
          ))}
        </svg>

        <div className="constellation-controls" aria-label="Technology stack logos">
          {nodes.map((node) => {
            const style = {
              left: `${round(node.x, 2)}%`,
              top: `${round(node.y, 2)}%`,
              width: `${round(node.size, 2)}px`,
              height: `${round(node.size, 2)}px`,
              "--float-x": `${round(node.floatX, 2)}px`,
              "--float-y": `${round(node.floatY, 2)}px`,
              "--float-r": `${round(node.floatR, 2)}deg`,
              "--float-delay": `${round(node.delay, 2)}s`,
              "--float-duration": `${round(node.duration, 2)}s`,
            } as CSSProperties;

            return (
              <button
                key={node.id}
                type="button"
                className={`stack-node ${active?.id === node.id ? "is-active" : ""}`}
                style={style}
                onMouseEnter={() => setActive(node)}
                onFocus={() => setActive(node)}
                onMouseLeave={() => setActive(null)}
                onBlur={() => setActive(null)}
                aria-label={`${node.name}, ${node.group}`}
              >
                <TechIcon item={node} />
                <em className="node-tooltip">
                  <strong>{node.name}</strong>
                  <small>{node.group}</small>
                  {node.note ? <span>{node.note}</span> : null}
                </em>
              </button>
            );
          })}
        </div>

        {readout ? (
          <div className="constellation-readout" aria-live="polite">
            <span>{active ? active.group : "Hover any logo"}</span>
            <strong>{active ? active.name : "Stack role"}</strong>
            <p>
              {active?.note ??
                "Each logo belongs to a product layer: frontend, backend, mobile, database, AI, security, desktop, tooling, or language."}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
