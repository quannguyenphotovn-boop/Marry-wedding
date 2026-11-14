"use client";

import { useState, type FormEvent } from "react";

export function ChangePasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const currentPassword = String(formData.get("currentPassword") ?? "");
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới nhập lại không khớp.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (res.ok) {
      setSuccess(true);
      form.reset();
      setLoading(false);
      return;
    }

    const data = await res.json().catch(() => null);
    setError(data?.error ?? "Đổi mật khẩu thất bại.");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-charcoal-700">
          Mật khẩu hiện tại
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
        />
      </div>
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-charcoal-700">
          Mật khẩu mới
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
        />
        <p className="mt-1 text-xs text-charcoal-500">Tối thiểu 8 ký tự.</p>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal-700">
          Nhập lại mật khẩu mới
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      {success && <p className="text-sm text-green-600">Đổi mật khẩu thành công.</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-ivory-50 hover:bg-gold-500 transition-colors disabled:opacity-60"
      >
        {loading ? "Đang lưu..." : "Đổi mật khẩu"}
      </button>
    </form>
  );
}
