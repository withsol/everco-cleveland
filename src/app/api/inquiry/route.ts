/**
 * Contact-form inquiries — emails each submission to the Ever Co inbox.
 *
 * Sends through the same Resend setup as the deal finder (RESEND_API_KEY, the
 * verified FROM_EMAIL). Reply-To is the inquirer, so hitting Reply in the
 * inbox answers them directly.
 *
 * Spam: a hidden honeypot field and a minimum fill time. Bots that trip either
 * get a normal-looking success response and nothing is sent.
 */
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/deal-finder/emailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INQUIRY_TO_EMAIL =
  process.env.INQUIRY_TO_EMAIL || "hello@theevercocleveland.com";

/** Humans take longer than this to fill in the form. */
const MIN_FILL_MS = 3000;

const LIMITS = { name: 120, email: 254, phone: 40, property: 200, message: 5000 };

const EMAIL_RE = /^[^\s@<>(),;:"\\]+@[^\s@<>(),;:"\\]+\.[^\s@<>(),;:"\\]{2,}$/;

const PROPERTY_LABELS: Record<string, string> = {
  furnished: "Furnished / corporate housing",
  future: "A future home — keep me posted",
  general: "Not sure yet / general inquiry",
};

type Inquiry = {
  name: string;
  email: string;
  phone: string;
  property: string;
  message: string;
};

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

/** Collapse whitespace/newlines — used for anything that lands in a header. */
const oneLine = (s: string): string => s.replace(/\s+/g, " ");

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function validate(body: Record<string, unknown>):
  | { ok: true; inquiry: Inquiry }
  | { ok: false; error: string } {
  const inquiry: Inquiry = {
    name: oneLine(str(body.name)),
    email: str(body.email),
    phone: oneLine(str(body.phone)),
    property: oneLine(str(body.property)),
    message: str(body.message),
  };

  if (!inquiry.name) return { ok: false, error: "Please enter your name." };
  if (!inquiry.email || !EMAIL_RE.test(inquiry.email))
    return { ok: false, error: "Please enter a valid email address." };
  for (const key of Object.keys(LIMITS) as (keyof Inquiry)[]) {
    if (inquiry[key].length > LIMITS[key])
      return { ok: false, error: `Your ${key} is too long.` };
  }
  return { ok: true, inquiry };
}

function buildEmail(q: Inquiry) {
  const property = PROPERTY_LABELS[q.property] || q.property || "Not specified";
  const rows: [string, string][] = [
    ["Name", q.name],
    ["Email", q.email],
    ["Phone", q.phone || "—"],
    ["Home of interest", property],
  ];

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMessage:\n${q.message || "(no message)"}\n\n` +
    `— Sent from the contact form on theevercocleveland.com. Reply to this email to respond to ${q.name}.`;

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;background:#f4f6f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a2b33;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e3e8ea;border-radius:12px;">
    <tr><td style="padding:22px 24px 8px 24px;">
      <div style="font-size:12px;color:#0f766e;font-weight:700;letter-spacing:1px;text-transform:uppercase;">New website inquiry</div>
      <div style="font-size:22px;font-weight:700;margin-top:4px;">${escapeHtml(q.name)}</div>
    </td></tr>
    <tr><td style="padding:8px 24px;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#6b7c85;white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:4px 0;">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
    </td></tr>
    <tr><td style="padding:12px 24px 22px 24px;">
      <div style="font-size:12px;color:#6b7c85;text-transform:uppercase;letter-spacing:.4px;">Message</div>
      <div style="font-size:15px;line-height:1.55;margin-top:6px;white-space:pre-wrap;">${escapeHtml(q.message || "(no message)")}</div>
    </td></tr>
    <tr><td style="padding:12px 24px;border-top:1px solid #e3e8ea;font-size:12px;color:#6b7c85;">
      Sent from the contact form on theevercocleveland.com. Reply to this email to respond to ${escapeHtml(q.name)}.
    </td></tr>
  </table>
</body></html>`;

  const subject = `Website inquiry: ${q.name}${q.property ? ` — ${property}` : ""}`;
  return { subject, html, text };
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object") throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot / too-fast (or no render timestamp at all): pretend it worked,
  // send nothing.
  const startedAt = Number(body.startedAt);
  const tooFast = !(startedAt > 0) || Date.now() - startedAt < MIN_FILL_MS;
  if (str(body.website) || tooFast) {
    console.warn("inquiry: dropped likely spam", { honeypot: !!str(body.website), tooFast });
    return NextResponse.json({ ok: true });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 422 });
  }

  const { subject, html, text } = buildEmail(result.inquiry);
  try {
    const sent = await sendEmail(html, subject, {
      toEmails: [INQUIRY_TO_EMAIL],
      fromName: "Ever Co Website",
      replyTo: result.inquiry.email,
      text,
    });
    console.log("inquiry: sent", (sent as { id?: string })?.id);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("inquiry: send failed:", message);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
