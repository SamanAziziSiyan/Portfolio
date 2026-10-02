"use client";

import { FormEvent, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import type { Locale } from "@/lib/language";
import { translations } from "@/lib/translations";

export function ContactForm({ locale }: { locale: Locale }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const t = translations[locale];

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
      if (!response.ok) {
        const localized = response.status === 429 ? t.formTooMany : response.status === 413 ? t.formTooLong : response.status === 503 ? t.formUnavailable : t.formError;
        throw new Error(locale === "fa" ? localized : result.message ?? localized);
      }
      form.reset();
      setState("success");
      setMessage(t.sent);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : t.formUnavailable);
    }
  }

  return <form className="contact-form" onSubmit={submit} noValidate={false}>
    <div className="field"><label htmlFor="contact-name">{t.nameLabel}</label><input id="contact-name" name="name" required minLength={2} maxLength={120} autoComplete="name" /></div>
    <div className="field"><label htmlFor="contact-email">{t.emailLabel}</label><input id="contact-email" name="email" type="email" required maxLength={254} autoComplete="email" dir="ltr" /></div>
    <div className="field"><label htmlFor="contact-message">{t.messageLabel}</label><textarea id="contact-message" name="message" required minLength={20} maxLength={5000} /></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">{t.honeypotLabel}</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <p className="form-note">{t.formNote}</p>
    <button className="primary-button" type="submit" disabled={state === "sending"}>{state === "sending" ? t.sending : t.sendMessage}<FiArrowUpRight aria-hidden="true" /></button>
    <p className={`form-status ${state}`} role="status" aria-live="polite">{message}</p>
  </form>;
}
