"use client";

import { useState } from "react";

interface PricingCardProps {
  name: string;
  priceLabel: string;
  amountCents: number;
  features: readonly string[] | string[];
  featured?: boolean;
}

export function PricingCard({ name, priceLabel, amountCents, features, featured }: PricingCardProps) {
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
      className={`relative flex h-full flex-col border-2 p-6 sm:p-8 ${
        featured ? "border-flare bg-ink text-bleach" : "border-ink/20 bg-bleach text-ink"
      }`}
    >
      <p className="font-stamp text-[9px] text-flare">Stamped pass</p>
      <h3 className="font-display mt-2 text-2xl uppercase tracking-tight">{name}</h3>
      <p className="font-display mt-2 text-5xl">{priceLabel}</p>
      <ul className={`mt-6 space-y-2 text-sm ${featured ? "text-bleach/75" : "text-mute"}`}>
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
            ? "mt-8 bg-flare text-ink hover:bg-flare-deep hover:text-bleach"
            : "mt-8 bg-ink text-bleach hover:bg-flare hover:text-ink"
        }`}
      >
        {loading ? "Redirecting…" : "Pay with Square"}
      </button>
      {error && <p className="mt-2 text-sm text-flare">{error}</p>}
    </div>
  );
}
