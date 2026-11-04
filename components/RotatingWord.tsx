"use client";

import { useEffect, useState } from "react";

/** Cycles through a list of words, each sliding up into place. Screen readers get the full list once. */
export function RotatingWord({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  const list = words.length > 1 ? `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}` : words[0];

  return (
    <span className="rotating">
      <span className="sr-only">{list}</span>
      <span className="rotating-window" aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={word}
            className={`rotating-word${i === index ? " is-in" : ""}${i === (index - 1 + words.length) % words.length ? " is-out" : ""}`}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
