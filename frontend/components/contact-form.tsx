"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Please check your details and try again.");
      form.reset();
      setState("success");
      setMessage("Your message was received. Thank you.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "The message could not be sent. Please try again.");
    }
  }

  return <form className="contact-form" onSubmit={submit} noValidate={false}>
    <div className="field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" required minLength={2} maxLength={120} autoComplete="name" /></div>
    <div className="field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" required maxLength={254} autoComplete="email" /></div>
    <div className="field"><label htmlFor="contact-message">What are you working on?</label><textarea id="contact-message" name="message" required minLength={20} maxLength={5000} /></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <p className="form-note">The form stores your name, email, and message so Saman can respond. Please do not include passwords or confidential data.</p>
    <button className="primary-button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send a message"}<span aria-hidden="true">↗</span></button>
    <p className={`form-status ${state}`} role="status" aria-live="polite">{message}</p>
  </form>;
}
