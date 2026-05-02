"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

type ProjectLaunchLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function ProjectLaunchLink({ href, children, className = "", ariaLabel }: ProjectLaunchLinkProps) {
  const router = useRouter();
  const [launching, setLaunching] = useState(false);

  const launch = () => {
    if (launching) return;
    setLaunching(true);
    document.documentElement.classList.add("route-launching");
    window.setTimeout(() => router.push(href), 460);
    window.setTimeout(() => document.documentElement.classList.remove("route-launching"), 950);
  };

  return (
    <button type="button" aria-label={ariaLabel} className={`launch-link ${className}`} onClick={launch}>
      <span>{children}</span>
      <i aria-hidden="true" />
    </button>
  );
}
