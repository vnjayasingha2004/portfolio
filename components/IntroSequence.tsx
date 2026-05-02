"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function IntroSequence() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    document.body.classList.add("intro-lock");

    const timer = window.setTimeout(() => {
      setShowIntro(false);
      document.body.classList.remove("intro-lock");
    }, 2300);

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("intro-lock");
    };
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="intro-sequence"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(16px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <motion.div
            className="intro-content"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 1.02 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.h1
              className="intro-word"
              initial={{ letterSpacing: "-0.08em" }}
              animate={{ letterSpacing: "-0.045em" }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              VINIRA JAYASINGHA
            </motion.h1>

            <motion.div
              className="intro-line"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                delay: 0.25,
                duration: 0.75,
              }}
            />

            <motion.p
              className="intro-copy"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 0.65,
              }}
            >
              Product engineering / motion systems / real apps
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}