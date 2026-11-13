"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { WordmarkLogo } from "@/components/site/WordmarkLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
      return;
    }

    const data = await res.json().catch(() => null);
    setError(data?.error ?? "Đăng nhập thất bại.");
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gold-100 bg-ivory-50 p-8 shadow-luxury">
        <div className="flex justify-center">
          <WordmarkLogo />
        </div>
        <h1 className="mt-6 text-center font-serif text-xl text-charcoal-900">
          Đăng nhập quản trị
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-charcoal-700">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-ivory-50 hover:bg-gold-500 transition-colors min-h-11 disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
