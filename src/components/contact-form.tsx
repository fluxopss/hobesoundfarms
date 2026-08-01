"use client";

import { FormEvent, useState } from "react";

export function ContactForm({
  defaultMessage = "",
}: {
  defaultMessage?: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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
      source: "hobesoundfarms-visit-os",
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
      className="relative grid gap-4 border border-soil/12 bg-white/80 p-6 shadow-[0_20px_60px_rgba(11,18,16,0.06)] sm:p-8"
    >
      <p className="font-atlas text-[10px] text-citrus">Inquire</p>
      <h3 className="font-display text-2xl tracking-tight">Send a message</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">Name</span>
          <input
            required
            name="name"
            className="border border-soil/15 bg-shell px-4 py-3 outline-none transition focus:border-citrus"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">Email</span>
          <input
            required
            type="email"
            name="email"
            className="border border-soil/15 bg-shell px-4 py-3 outline-none transition focus:border-citrus"
          />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">Phone</span>
        <input
          name="phone"
          className="border border-soil/15 bg-shell px-4 py-3 outline-none transition focus:border-citrus"
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">What are you planning?</span>
        <textarea
          name="message"
          rows={4}
          defaultValue={defaultMessage}
          placeholder="Market visit, wedding, field trip, animal encounter, tickets…"
          className="border border-soil/15 bg-shell px-4 py-3 outline-none transition focus:border-citrus"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-soil px-5 py-3.5 font-semibold text-shell transition hover:bg-citrus hover:text-soil disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-canopy" role="status" aria-live="polite">
          Thanks — see you at the farm.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-citrus-deep" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
