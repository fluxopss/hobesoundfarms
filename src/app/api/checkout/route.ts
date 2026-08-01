import { NextResponse } from "next/server";
import { createSquareCheckoutLink } from "@/lib/square";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      amountCents?: number;
      redirectUrl?: string;
    };

    if (!body.name?.trim() || !body.amountCents || body.amountCents < 100) {
      return NextResponse.json(
        { ok: false, error: "Valid name and amount (min $1.00) are required" },
        { status: 400 },
      );
    }

    const result = await createSquareCheckoutLink({
      name: body.name,
      amountCents: body.amountCents,
      redirectUrl: body.redirectUrl,
    });

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
    }

    return NextResponse.json({ ok: true, checkoutUrl: result.checkoutUrl });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
