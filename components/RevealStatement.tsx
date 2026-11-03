"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className="reveal-word" style={{ opacity }}>
      {word}{" "}
    </motion.span>
  );
}

/** A statement whose words ink in as it scrolls through the viewport. */
export function RevealStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className="reveal-statement">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            word={word}
            progress={scrollYProgress}
            range={[i / words.length, Math.min(1, (i + 2) / words.length)]}
          />
        ))}
      </span>
    </p>
  );
}
