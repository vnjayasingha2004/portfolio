import { profile } from "@/lib/profile";
import { Magnetic } from "./Magnetic";

function DownloadIcon() {
  return (
    <svg className="cv-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The CV download, styled as the site's one solid call to action. */
export function CvButton({ size = "md", label = "Download CV", className = "" }: { size?: "sm" | "md" | "lg"; label?: string; className?: string }) {
  return (
    <Magnetic strength={size === "sm" ? 0.2 : 0.3}>
      <a
        className={`cv-btn cv-btn-${size} ${className}`}
        href={profile.cv}
        download="Vinira-Jayasingha-CV.pdf"
        aria-label={`${label} (PDF, 1 page)`}
      >
        <span className="cv-btn-label">{label}</span>
        <DownloadIcon />
      </a>
    </Magnetic>
  );
}
