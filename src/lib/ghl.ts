export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
  [key: string]: string | undefined;
}

export async function sendLeadToGhl(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    return { ok: false, error: "GHL_WEBHOOK_URL is not configured" };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    return { ok: false, error: `GHL webhook failed (${response.status})` };
  }

  return { ok: true };
}
