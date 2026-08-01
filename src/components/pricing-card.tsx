"use client";

import { useState } from "react";

interface PricingCardProps {
  name: string;
  priceLabel: string;
  amountCents: number;
  features: readonly string[] | string[];
  featured?: boolean;
}

export function PricingCard({
  name,
  priceLabel,
  amountCents,
  features,
  featured,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        amountCents,
        redirectUrl: `${window.location.origin}/thank-you`,
      }),
    });

    const data = (await response.json()) as {
      ok: boolean;
      checkoutUrl?: string;
      error?: string;
    };

    setLoading(false);

    if (!response.ok || !data.ok || !data.checkoutUrl) {
      setError(data.error ?? "Checkout is unavailable right now.");
      return;
    }

    window.location.href = data.checkoutUrl;
  }

  return (
    <div
      className={`relative flex h-full flex-col p-6 sm:p-8 ${
        featured
          ? "bg-soil text-shell"
          : "border border-soil/12 bg-white/70 text-soil"
      }`}
    >
      <p className="font-atlas text-[9px] text-citrus">Pass</p>
      <h3 className="font-display mt-2 text-2xl tracking-tight">{name}</h3>
      <p className="font-display mt-2 text-5xl text-citrus">{priceLabel}</p>
      <ul
        className={`mt-6 space-y-2 text-sm ${featured ? "text-shell/70" : "text-mute"}`}
      >
        {features.map((feature) => (
          <li key={feature}>— {feature}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={`mt-auto rounded-full px-4 py-3 font-semibold transition disabled:opacity-60 ${
          featured
            ? "mt-8 bg-citrus text-soil hover:bg-citrus-deep hover:text-shell"
            : "mt-8 bg-soil text-shell hover:bg-citrus hover:text-soil"
        }`}
      >
        {loading ? "Redirecting…" : "Get pass"}
      </button>
      {error && <p className="mt-2 text-sm text-citrus">{error}</p>}
    </div>
  );
}
