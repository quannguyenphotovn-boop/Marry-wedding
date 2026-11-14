import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { changePasswordSchema } from "../../../../lib/validation";
import { getSession, hashPassword, verifyPassword } from "../../../../lib/auth";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const parsed = changePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." },
      { status: 400 },
    );
  }

  const admin = await prisma.adminUser.findUnique({ where: { id: session.adminId } });
  if (!admin) {
    return NextResponse.json({ error: "Không tìm thấy tài khoản." }, { status: 404 });
  }

  const valid = await verifyPassword(parsed.data.currentPassword, admin.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Mật khẩu hiện tại không đúng." }, { status: 401 });
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { passwordHash: await hashPassword(parsed.data.newPassword) },
  });

  return NextResponse.json({ ok: true });
}
