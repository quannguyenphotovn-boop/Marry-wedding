import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validation";
import { sendBookingNotification } from "@/lib/mailer";
import { getClientIp, hashIp, isBookingRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Vui lòng kiểm tra lại thông tin đã nhập.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: silently pretend success so bots don't learn the field is checked.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const ipHash = hashIp(getClientIp(request));

  if (await isBookingRateLimited(ipHash)) {
    return NextResponse.json(
      { error: "Bạn đã gửi yêu cầu quá nhiều lần. Vui lòng thử lại sau ít phút." },
      { status: 429 },
    );
  }

  const lead = await prisma.bookingLead.create({
    data: {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || null,
      weddingDate: data.weddingDate ? new Date(data.weddingDate) : null,
      packageInterest: data.packageInterest || null,
      message: data.message || null,
      ipHash,
    },
  });

  const notified = await sendBookingNotification(data);
  if (notified) {
    await prisma.bookingLead.update({ where: { id: lead.id }, data: { notified: true } });
  }

  return NextResponse.json({ ok: true });
}
