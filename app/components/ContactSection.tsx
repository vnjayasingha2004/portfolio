import Link from "next/link";
import { profile } from "@/lib/profile";

export function ContactSection() {
  return (
    <section className="contact-panel" id="contact">
      <div>
        <p className="section-kicker">Contact</p>
        <h2>Let's build something useful.</h2>

        <p>
          I am open to internships, junior software opportunities, and product
          work where I can keep learning while building meaningful software.
        </p>

        <div className="contact-actions">
          <Link className="quiet-link light" href={`mailto:${profile.email}`}>
            Email me
          </Link>

          <Link
            className="quiet-link"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </Link>

          <Link
            className="quiet-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>

          <Link className="quiet-link" href={profile.cv} target="_blank">
            CV
          </Link>
        </div>
      </div>

      <div className="contact-grid">
        <a href={`mailto:${profile.email}`}>
          <span>Email</span>
          <strong>{profile.email}</strong>
        </a>

        <a href={`tel:${profile.phoneDisplay.replace(/\s/g, "")}`}>
          <span>Phone</span>
          <strong>{profile.phoneDisplay}</strong>
        </a>

        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <span>LinkedIn</span>
          <strong>vinira-jayasingha</strong>
        </a>

        <a href={profile.github} target="_blank" rel="noreferrer">
          <span>GitHub</span>
          <strong>@vnjayasingha2004</strong>
        </a>

        <div className="contact-info-card">
          <span>Location</span>
          <strong>{profile.location}</strong>
        </div>

        <div className="contact-info-card">
          <span>Focus</span>
          <strong>Full-stack, mobile, desktop, and product development</strong>
        </div>
      </div>
    </section>
  );
}