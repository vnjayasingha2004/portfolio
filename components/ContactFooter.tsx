import { profile } from "@/lib/profile";
import { MaskText } from "./MaskText";
import { GuideToggle } from "./GuideToggle";
import { LocalTime } from "./LocalTime";
import { KineticName } from "./KineticName";

export function ContactFooter({ heading = "Have something worth building?" }: { heading?: string }) {
  return (
    <footer className="contact" id="contact" data-theme="blue" data-bot-say="Like his work? Say hi, he replies fast!">
      <div className="contact-inner">
        <MaskText className="contact-heading">{heading}</MaskText>
        <p className="contact-lede">
          I&apos;m open to internships, junior developer roles and freelance product work. Email is the
          fastest way to reach me.
        </p>

        <a className="contact-email" href={`mailto:${profile.email}`}>
          <KineticName as="span" intro={false} lines={["Say hello"]} className="contact-kinetic" />
          <span className="contact-address">{profile.email}</span>
        </a>

        <dl className="contact-details">
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${profile.phoneHref}`}>{profile.phoneDisplay}</a>
            </dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                {profile.linkedinLabel}
              </a>
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <a href={profile.github} target="_blank" rel="noreferrer">
                {profile.githubLabel}
              </a>
            </dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>
              {profile.location}, <LocalTime /> now
            </dd>
          </div>
        </dl>

        <div className="contact-base">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="contact-base-links">
            <GuideToggle />
            <a href={profile.cv} target="_blank" rel="noreferrer">
              Download CV (PDF)
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
