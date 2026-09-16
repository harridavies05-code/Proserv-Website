import { business } from "@/lib/business";

// Table-based layout with inline styles throughout, deliberately, most
// email clients (Outlook especially) strip <style> blocks and don't
// support flexbox/grid, this is the reliable-everywhere approach.

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type QuoteEmailFields = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: Date;
};

function detailRow(label: string, valueHtml: string, isLast = false) {
  const borderStyle = isLast ? "" : "border-bottom:1px solid #e5e7eb;";
  return `
    <tr>
      <td style="padding:8px 0;${borderStyle}color:#23731a;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;width:90px;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;${borderStyle}color:#111827;font-size:14px;vertical-align:top;">${valueHtml}</td>
    </tr>`;
}

export function buildQuoteEmailHtml({
  name,
  email,
  phone,
  service,
  message,
  createdAt,
}: QuoteEmailFields): string {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(createdAt);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeService = escapeHtml(service);
  const safeMessage = escapeHtml(message || "(no message provided)").replace(/\n/g, "<br/>");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background-color:#f4f4f4;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
      <tr>
        <td style="background-color:#0c1310;border-radius:10px 10px 0 0;padding:24px 28px;border-top:4px solid #23731a;">
          <span style="color:#ffffff;font-size:18px;font-weight:bold;">${escapeHtml(business.name)}</span><br/>
          <span style="color:#f59e0b;font-size:12px;">${escapeHtml(business.tagline)}</span>
        </td>
      </tr>
      <tr>
        <td style="background-color:#ffffff;padding:28px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
          <span style="display:inline-block;background-color:#f59e0b;color:#133f0e;font-size:11px;font-weight:bold;padding:4px 10px;border-radius:999px;">NEW QUOTE REQUEST</span>
          <p style="color:#6b7280;font-size:12px;margin:12px 0 20px;">Submitted ${formattedDate}</p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${detailRow("Name", safeName)}
            ${detailRow("Email", `<a href="mailto:${safeEmail}" style="color:#111827;">${safeEmail}</a>`)}
            ${detailRow("Phone", `<a href="tel:${safePhone}" style="color:#111827;">${safePhone}</a>`)}
            ${detailRow("Service", safeService, true)}
          </table>

          <div style="margin-top:20px;padding:14px 16px;background-color:#f8faf8;border:1px solid #e5e7eb;border-radius:6px;">
            <p style="margin:0 0 6px;color:#23731a;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
            <p style="margin:0;color:#111827;font-size:13px;line-height:1.6;">${safeMessage}</p>
          </div>

          <p style="margin-top:24px;color:#6b7280;font-size:11px;">A PDF copy of this quote request is attached.</p>
        </td>
      </tr>
      <tr>
        <td style="background-color:#0c1310;border-radius:0 0 10px 10px;padding:16px 28px;">
          <p style="margin:0;color:#9ca3af;font-size:10px;">${escapeHtml(business.name)} &middot; ${escapeHtml(business.addressLine)}</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
