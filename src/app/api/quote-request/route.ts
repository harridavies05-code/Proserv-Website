import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { generateQuotePdf } from "@/lib/quotePdf";
import { buildQuoteEmailHtml } from "@/lib/quoteEmailHtml";

// proservelectrical.co.uk verified in Resend 2026-09-16 (sending enabled),
// switched over from the interim harri.davies05@gmail.com / onboarding@
// resend.dev addresses used while waiting on the domain purchase.
const NOTIFY_TO = "Proservchester@sky.com";
const FROM_ADDRESS = "ProServ Electrical <quotes@proservelectrical.co.uk>";

const GENERIC_ERROR =
  "Something went wrong sending your enquiry. Please call or email us directly instead.";

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "quote-request"
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const service = typeof body?.service === "string" ? body.service.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !phone || !service) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  const createdAt = new Date();

  // service_role bypasses Row Level Security entirely, this is a trusted
  // server-side write, not the anon-key path the browser used before.
  const { error: insertError } = await supabaseAdmin
    .from("quote_requests")
    .insert({ name, email, phone, service, message });

  if (insertError) {
    console.error("Failed to insert quote request:", insertError);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  // Best-effort notification email (with a branded PDF copy attached). The
  // request is already safely stored in Supabase, so a failed or
  // unconfigured email must not turn this into a client-facing failure,
  // just log it so it doesn't go unnoticed.
  if (!process.env.RESEND_API_KEY) {
    console.error(
      "RESEND_API_KEY is not set, skipping quote notification email.",
    );
  } else {
    try {
      const fields = { name, email, phone, service, message, createdAt };
      const pdfBuffer = await generateQuotePdf(fields);

      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error: emailError } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: NOTIFY_TO,
        subject: `New quote request: ${service}`,
        html: buildQuoteEmailHtml(fields),
        text: [
          `New quote request from ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Service: ${service}`,
          "",
          "Message:",
          message || "(no message provided)",
        ].join("\n"),
        attachments: [
          {
            filename: `quote-request-${slugify(name)}.pdf`,
            content: pdfBuffer.toString("base64"),
          },
        ],
      });
      if (emailError) throw emailError;
    } catch (err) {
      console.error("Failed to send quote notification email:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
