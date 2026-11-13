import nodemailer from "nodemailer";
import type { BookingInput } from "./validation";

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 465),
    secure: SMTP_SECURE !== "false",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

/**
 * Sends a notification for a new booking lead. Never throws — the lead is
 * already persisted by the time this runs, so an SMTP failure should not
 * fail the user-facing request. Returns whether the send actually succeeded
 * so the caller can set BookingLead.notified accordingly.
 */
export async function sendBookingNotification(lead: BookingInput): Promise<boolean> {
  const transport = getTransport();
  if (!transport) {
    console.error("[mailer] SMTP not configured — skipping booking notification email.");
    return false;
  }

  const mailTo = process.env.MAIL_TO || process.env.SMTP_USER;
  const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER;

  const lines = [
    `Họ tên: ${lead.fullName}`,
    `Điện thoại: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    lead.weddingDate ? `Ngày cưới dự kiến: ${lead.weddingDate}` : null,
    lead.packageInterest ? `Gói quan tâm: ${lead.packageInterest}` : null,
    lead.message ? `Lời nhắn: ${lead.message}` : null,
  ].filter(Boolean);

  try {
    await transport.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: `[MARRY WEDDING] Lead đặt lịch tư vấn mới: ${lead.fullName}`,
      text: lines.join("\n"),
      html: `<p>${lines.join("<br/>")}</p>`,
    });
    return true;
  } catch (err) {
    console.error("[mailer] Failed to send booking notification email:", err);
    return false;
  }
}
