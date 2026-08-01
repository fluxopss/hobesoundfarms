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
      source: "hobesoundfarms-contact",
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
      className="grid gap-4 border border-ink/10 bg-bg p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">Full name</span>
          <input
            required
            name="name"
            className="border border-ink/15 bg-bg-chalk px-4 py-3 outline-none focus:border-sky"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">Email</span>
          <input
            required
            type="email"
            name="email"
            className="border border-ink/15 bg-bg-chalk px-4 py-3 outline-none focus:border-sky"
          />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ink">Phone (optional)</span>
        <input
          name="phone"
          className="border border-ink/15 bg-bg-chalk px-4 py-3 outline-none focus:border-sky"
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ink">How can we help?</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Market visit, wedding inquiry, field trip, tickets…"
          className="border border-ink/15 bg-bg-chalk px-4 py-3 outline-none focus:border-sky"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-mangrove px-5 py-3.5 font-medium text-bg-chalk transition hover:bg-sky-deep disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-sky-deep">Thanks — we will be in touch shortly.</p>
      )}
      {status === "error" && <p className="text-sm text-red-700">{error}</p>}
    </form>
  );
}
