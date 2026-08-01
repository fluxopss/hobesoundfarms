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
        featured
          ? "border-flare bg-ink text-bleach shadow-[6px_6px_0_0_rgba(255,90,60,0.45)]"
          : "border-ink/25 bg-[#f7f3ea] text-ink shadow-[6px_6px_0_0_rgba(14,21,18,0.12)]"
      }`}
    >
      <div
        className={`font-stamp absolute -right-1 top-4 rotate-3 border px-2 py-1 text-[8px] ${
          featured ? "border-flare bg-flare text-ink" : "border-ink bg-ink text-bleach"
        }`}
      >
        PASS
      </div>
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
        {loading ? "Redirecting…" : "Get pass"}
      </button>
      {error && <p className="mt-2 text-sm text-flare">{error}</p>}
    </div>
  );
}
