import { NextResponse } from "next/server";
import { sendLeadToGhl, type LeadPayload } from "@/lib/ghl";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required" },
        { status: 400 },
      );
    }

    const result = await sendLeadToGhl({
      ...body,
      source: body.source ?? "website-contact-form",
    });

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
