import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "./LogoutButton";

const NAV = [
  { href: "/admin", label: "Tổng quan" },
  { href: "/admin/leads", label: "Khách hàng đặt lịch" },
  { href: "/admin/gallery", label: "Bộ sưu tập ảnh" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/pricing", label: "Bảng giá" },
  { href: "/admin/testimonials", label: "Đánh giá khách hàng" },
];

export function AdminShell({
  children,
  adminName,
}: {
  children: ReactNode;
  adminName: string;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex w-64 flex-col border-r border-gold-100 bg-ivory-50 p-6">
        <span className="font-serif text-lg text-charcoal-900">MARRY WEDDING</span>
        <span className="text-xs uppercase tracking-wide text-gold-500">Quản trị</span>
        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-sm text-charcoal-700 hover:bg-gold-50 hover:text-gold-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-6">
          <Link href="/" target="_blank" className="text-xs text-charcoal-500 hover:text-gold-600">
            Xem trang web &rarr;
          </Link>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-gold-100 bg-ivory-50 px-6 py-4 md:px-10">
          <span className="text-sm text-charcoal-500">Xin chào, {adminName}</span>
          <LogoutButton />
        </header>

        <nav className="md:hidden flex gap-2 overflow-x-auto border-b border-gold-100 bg-ivory-50 px-4 py-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-gold-200 px-4 py-2 text-xs text-charcoal-700 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
