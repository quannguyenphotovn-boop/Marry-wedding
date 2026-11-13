"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

interface PackageOption {
  slug: string;
  name: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function BookingForm({
  packages,
  initialPackageSlug,
}: {
  packages: PackageOption[];
  initialPackageSlug?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      weddingDate: String(formData.get("weddingDate") ?? ""),
      packageInterest: String(formData.get("packageInterest") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const data = await res.json().catch(() => null);
      setErrorMessage(data?.error ?? "Có lỗi xảy ra, vui lòng thử lại.");
      setStatus("error");
    } catch {
      setErrorMessage("Không thể kết nối. Vui lòng thử lại hoặc gọi hotline.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-gold-200 bg-ivory-50 p-8 text-center">
        <h3 className="font-serif text-2xl text-charcoal-900">Cảm ơn bạn đã liên hệ!</h3>
        <p className="mt-3 text-charcoal-600">
          MARRY WEDDING sẽ liên hệ lại với bạn trong thời gian sớm nhất. Nếu cần hỗ trợ ngay, vui
          lòng gọi hotline{" "}
          <a href="tel:0826888198" className="text-gold-600 font-medium">
            0826 888 198
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot field — kept visually off-screen (not display:none) so bots that
          check computed style still fill it in, while real users never notice it. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-charcoal-700">
            Họ và tên *
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            minLength={2}
            className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal-700">
            Số điện thoại *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>
        <div>
          <label htmlFor="weddingDate" className="block text-sm font-medium text-charcoal-700">
            Ngày cưới dự kiến
          </label>
          <input
            id="weddingDate"
            name="weddingDate"
            type="date"
            className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor="packageInterest" className="block text-sm font-medium text-charcoal-700">
          Gói dịch vụ quan tâm
        </label>
        <select
          id="packageInterest"
          name="packageInterest"
          defaultValue={initialPackageSlug ?? ""}
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-400"
        >
          <option value="">-- Chọn gói (tùy chọn) --</option>
          {packages.map((pkg) => (
            <option key={pkg.slug} value={pkg.slug}>
              {pkg.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal-700">
          Lời nhắn
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-400"
        />
      </div>

      {status === "error" && errorMessage && (
        <p role="alert" className="text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-full md:w-auto">
        {status === "submitting" ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
      </Button>
    </form>
  );
}
