"use client";

import { useEffect, useState } from "react";

const KEY = "guide-hidden";

/** Lets visitors hide or bring back the guide; the choice is remembered in this browser. */
export function GuideToggle({ className = "" }: { className?: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      setHidden(localStorage.getItem(KEY) === "1");
    } catch {}
    const onToggle = (e: Event) => setHidden((e as CustomEvent<{ hidden: boolean }>).detail.hidden);
    window.addEventListener("guide:toggle", onToggle);
    return () => window.removeEventListener("guide:toggle", onToggle);
  }, []);

  const toggle = () => {
    const next = !hidden;
    try {
      localStorage.setItem(KEY, next ? "1" : "0");
    } catch {}
    window.dispatchEvent(new CustomEvent("guide:toggle", { detail: { hidden: next } }));
  };

  return (
    <button type="button" className={`guide-toggle ${className}`} onClick={toggle} aria-pressed={hidden}>
      {hidden ? "Show guide" : "Hide guide"}
    </button>
  );
}
