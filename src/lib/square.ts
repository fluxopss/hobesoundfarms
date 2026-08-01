const SQUARE_API_BASE = {
  sandbox: "https://connect.squareupsandbox.com",
  production: "https://connect.squareup.com",
} as const;

export type SquareEnvironment = keyof typeof SQUARE_API_BASE;

export interface CheckoutLinkInput {
  name: string;
  amountCents: number;
  currency?: string;
  redirectUrl?: string;
}

export interface CheckoutLinkResult {
  ok: boolean;
  checkoutUrl?: string;
  error?: string;
}

export async function createSquareCheckoutLink(
  input: CheckoutLinkInput,
): Promise<CheckoutLinkResult> {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  const environment = (process.env.SQUARE_ENVIRONMENT ?? "sandbox") as SquareEnvironment;

  if (!accessToken || !locationId) {
    return { ok: false, error: "Square credentials are not configured" };
  }

  const baseUrl = SQUARE_API_BASE[environment] ?? SQUARE_API_BASE.sandbox;
  const idempotencyKey = crypto.randomUUID();

  const response = await fetch(`${baseUrl}/v2/online-checkout/payment-links`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Square-Version": "2025-01-23",
    },
    body: JSON.stringify({
      idempotency_key: idempotencyKey,
      quick_pay: {
        name: input.name,
        price_money: {
          amount: input.amountCents,
          currency: input.currency ?? "USD",
        },
        location_id: locationId,
      },
      checkout_options: input.redirectUrl
        ? { redirect_url: input.redirectUrl }
        : undefined,
    }),
  });

  const data = (await response.json()) as {
    payment_link?: { url?: string };
    errors?: Array<{ detail?: string }>;
  };

  if (!response.ok) {
    const detail = data.errors?.[0]?.detail ?? `Square API error (${response.status})`;
    return { ok: false, error: detail };
  }

  const checkoutUrl = data.payment_link?.url;
  if (!checkoutUrl) {
    return { ok: false, error: "Square did not return a checkout URL" };
  }

  return { ok: true, checkoutUrl };
}
