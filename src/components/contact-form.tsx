"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? ""),
      source: "hobesoundfarms-trail",
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { ok: boolean; error?: string };
    if (!response.ok || !data.ok) {
      setStatus("error");
      setError(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    event.currentTarget.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative grid gap-4 border-2 border-ink/15 bg-[#f7f3ea] p-6 shadow-[8px_8px_0_0_rgba(14,21,18,0.12)] sm:p-8"
    >
      <div className="pointer-events-none absolute -right-2 -top-2 rotate-6 border-2 border-flare bg-bleach px-2 py-1 font-stamp text-[9px] text-flare">
        Filed
      </div>
      <p className="font-stamp text-[10px] text-flare">Trail clipboard</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">Name</span>
          <input
            required
            name="name"
            className="border border-ink/20 bg-white px-4 py-3 outline-none focus:border-flare"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">Email</span>
          <input
            required
            type="email"
            name="email"
            className="border border-ink/20 bg-white px-4 py-3 outline-none focus:border-flare"
          />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">Phone</span>
        <input name="phone" className="border border-ink/20 bg-white px-4 py-3 outline-none focus:border-flare" />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">What are you planning?</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Market visit, wedding, field trip, animal encounter, tickets…"
          className="border border-ink/20 bg-white px-4 py-3 outline-none focus:border-flare"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-ink px-5 py-3.5 font-semibold text-bleach transition hover:bg-flare hover:text-ink disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-shade" role="status" aria-live="polite">
          Thanks — see you at the farm.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-flare-deep" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
