import Link from "next/link";
import { profile } from "@/lib/profile";

export function ContactPanel() {
  return (
    <section id="contact" className="contact-panel">
      <div>
        <p className="section-kicker">Contact</p>
        <h2>Let&apos;s build something useful.</h2>
        <p>
          I am open to internships, junior software opportunities, and product work where I can keep learning while building meaningful software.
        </p>
        <div className="contact-actions">
          <a className="quiet-link light" href={`mailto:${profile.email}`}>Email me</a>
          <Link className="quiet-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</Link>
          <Link className="quiet-link" href={profile.github} target="_blank" rel="noreferrer">GitHub</Link>
          <Link className="quiet-link" href={profile.cv} target="_blank">CV</Link>
        </div>
      </div>
      <div className="contact-grid">
        <a href={`mailto:${profile.email}`}>
          <span>Email</span>
          <strong>{profile.email}</strong>
        </a>
        <a href={`tel:${profile.phoneHref}`}>
          <span>Phone</span>
          <strong>{profile.phoneDisplay}</strong>
        </a>
        <Link href={profile.linkedin} target="_blank" rel="noreferrer">
          <span>LinkedIn</span>
          <strong>{profile.linkedinLabel}</strong>
        </Link>
        <Link href={profile.github} target="_blank" rel="noreferrer">
          <span>GitHub</span>
          <strong>{profile.githubLabel}</strong>
        </Link>
        <div className="contact-info-card">
          <span>Location</span>
          <strong>{profile.location}</strong>
        </div>
        <div className="contact-info-card">
          <span>Focus</span>
          <strong>{profile.focus}</strong>
        </div>
      </div>
    </section>
  );
}
