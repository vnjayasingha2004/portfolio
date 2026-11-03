"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

/**
 * A blue panel that lifts off the page after every client-side navigation (not on first
 * load), with the guide riding up on it. Keyed by pathname, because the root template
 * only remounts when the first URL segment changes.
 */
export function PageCurtain() {
  const pathname = usePathname();
  const first = useRef(true);
  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setKey(`${pathname}-${Date.now()}`);
    window.dispatchEvent(new Event("guide:curtain"));
  }, [pathname]);

  if (!key) return null;
  return (
    <motion.div
      key={key}
      className="curtain"
      aria-hidden="true"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
    />
  );
}
