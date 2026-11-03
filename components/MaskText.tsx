"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: React.ReactNode;
};

/** Text that slides up from behind a mask the first time it comes into view. */
export function MaskText({ as: Tag = "h2", className = "", children }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`mask-text${shown ? " is-in" : ""} ${className}`}>
      <span className="mask-inner">{children}</span>
    </Tag>
  );
}
