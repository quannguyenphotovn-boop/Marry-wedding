import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { getSession } from "../../../../lib/auth";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const entity = String(formData.get("entity") ?? "misc").replace(/[^a-z0-9_-]/gi, "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Không có file nào được gửi lên." }, { status: 400 });
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Chỉ hỗ trợ ảnh JPEG, PNG hoặc WEBP." },
      { status: 400 },
    );
  }

  const maxSizeBytes = Number(process.env.UPLOAD_MAX_SIZE_MB ?? 5) * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return NextResponse.json(
      { error: `Kích thước ảnh vượt quá ${process.env.UPLOAD_MAX_SIZE_MB ?? 5}MB.` },
      { status: 400 },
    );
  }

  const filename = `${crypto.randomUUID()}.${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", entity || "misc");
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  const publicUrl = `/uploads/${entity || "misc"}/${filename}`;
  return NextResponse.json({ url: publicUrl });
}
