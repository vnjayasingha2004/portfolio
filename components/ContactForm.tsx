"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";

/**
 * A message form with no server behind it: it fills in an email in the visitor's
 * own email app, addressed to Vinira, so nothing is lost or stored anywhere.
 */
export function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !message) {
      setError("Add your name and a message, then try again.");
      return;
    }
    setError(null);
    const body = `${message}\n\n${name}${email ? `\n${email}` : ""}`;
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject || `Hello from ${name}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setOpened(true);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <h3>Send a message</h3>
      <div className="field-row">
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" />
        </label>
      </div>
      <label>
        <span>Subject</span>
        <input name="subject" />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows={5} required />
      </label>
      {error && (
        <p className="form-note is-error" role="alert">
          {error}
        </p>
      )}
      {opened && !error && (
        <p className="form-note" role="status">
          Your email app should open with the message ready. If it didn&apos;t, write to {profile.email}.
        </p>
      )}
      <button type="submit" className="send-btn">
        Open in my email app
      </button>
    </form>
  );
}
