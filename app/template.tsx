"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

let firstLoad = true;

/** A blue panel lifts off the page on every client-side navigation (not on first load). */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  // Server render and first hydration both see false, so markup matches.
  const [navigated] = useState(() => typeof window !== "undefined" && !firstLoad);
  const show = navigated && !reduce;

  useEffect(() => {
    firstLoad = false;
  }, []);

  return (
    <>
      {show && (
        <motion.div
          className="curtain"
          aria-hidden="true"
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        />
      )}
      {children}
    </>
  );
}
