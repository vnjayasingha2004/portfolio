import { profile } from "@/lib/profile";
import { CvButton } from "./CvButton";
import { MaskText } from "./MaskText";
import { GuideToggle } from "./GuideToggle";
import { LocalTime } from "./LocalTime";
import { KineticName } from "./KineticName";
import { ContactForm } from "./ContactForm";

export function ContactFooter({ heading = "Have something worth building?" }: { heading?: string }) {
  return (
    <footer className="contact" id="contact" data-theme="space" data-bot-say="Like his work? Grab his CV or say hi!">
      <div className="contact-inner">
        <div className="contact-grid">
          <div className="contact-main">
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
          </div>

          <div className="contact-side">
            <ContactForm />
            <div className="contact-cv">
              <CvButton size="lg" />
              <p>One page, PDF, 105 KB. Education, projects and the stack I work with.</p>
            </div>
          </div>
        </div>

        <div className="contact-base">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="contact-base-links">
            <GuideToggle />
          </span>
        </div>
      </div>
    </footer>
  );
}
