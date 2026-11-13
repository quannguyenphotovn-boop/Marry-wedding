"use client";

import { useState } from "react";
import Image from "next/image";

export function ImageUploader({
  name,
  entity,
  initialUrl,
  label,
}: {
  name: string;
  entity: string;
  initialUrl?: string;
  label: string;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("entity", entity);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Tải ảnh lên thất bại.");
        return;
      }
      setUrl(data.url);
    } catch {
      setError("Không thể tải ảnh lên. Vui lòng thử lại.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <div className="mt-2 flex items-start gap-4">
        {url ? (
          <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-gold-200">
            <Image src={url} alt="" fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed border-gold-200 text-xs text-charcoal-400">
            Chưa có ảnh
          </div>
        )}

        <div className="flex-1">
          <input
            type="text"
            name={name}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Đường dẫn ảnh (tự điền sau khi tải lên)"
            className="w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-2.5 text-sm"
          />
          <label className="mt-2 inline-flex cursor-pointer items-center rounded-full border border-gold-300 px-4 py-2 text-xs text-charcoal-700 hover:bg-gold-50">
            {uploading ? "Đang tải lên..." : "Chọn ảnh từ máy"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
