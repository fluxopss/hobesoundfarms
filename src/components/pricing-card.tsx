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
      className={`flex h-full flex-col border p-6 sm:p-8 ${
        featured
          ? "border-mangrove bg-mangrove text-bg-chalk"
          : "border-ink/10 bg-bg-chalk text-ink"
      }`}
    >
      <h3 className="font-display text-2xl">{name}</h3>
      <p className="mt-2 font-display text-4xl">{priceLabel}</p>
      <ul className={`mt-6 space-y-2 text-sm ${featured ? "text-bg-chalk/80" : "text-ink-muted"}`}>
        {features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={`mt-auto rounded-full px-4 py-3 font-medium transition disabled:opacity-60 ${
          featured
            ? "mt-8 bg-citrus text-mangrove hover:bg-citrus-deep hover:text-bg-chalk"
            : "mt-8 bg-mangrove text-bg-chalk hover:bg-sky-deep"
        }`}
      >
        {loading ? "Redirecting…" : "Pay with Square"}
      </button>
      {error && (
        <p className={`mt-2 text-sm ${featured ? "text-citrus" : "text-red-700"}`}>{error}</p>
      )}
    </div>
  );
}
