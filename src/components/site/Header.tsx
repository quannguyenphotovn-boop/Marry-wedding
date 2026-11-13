"use client";

import Link from "next/link";
import { useState } from "react";
import { WordmarkLogo } from "./WordmarkLogo";

const NAV_LINKS = [
  { href: "/ve-chung-toi", label: "Giới thiệu" },
  { href: "/dich-vu", label: "Dịch vụ & Bảng giá" },
  { href: "/bo-suu-tap", label: "Bộ sưu tập" },
  { href: "/blog", label: "Blog" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ivory-50/90 backdrop-blur border-b border-gold-100">
      <div className="mx-auto max-w-content px-4 md:px-8 flex items-center justify-between h-20">
        <WordmarkLogo />

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-wide text-charcoal-700 hover:text-gold-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:0826888198"
            className="ml-2 inline-flex items-center justify-center rounded-full border border-gold-400 px-5 py-2.5 text-sm font-medium text-charcoal-900 hover:bg-gold-400 hover:text-ivory-50 transition-colors"
          >
            0826 888 198
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-200"
        >
          <span className="sr-only">{open ? "Đóng menu" : "Mở menu"}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 5h16M2 10h16M2 15h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-gold-100 bg-ivory-50 px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-charcoal-700 hover:text-gold-500 border-b border-ivory-200 last:border-none"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:0826888198"
            className="mt-3 inline-flex items-center justify-center rounded-full bg-gold-400 px-5 py-3 text-sm font-medium text-ivory-50"
          >
            Gọi ngay 0826 888 198
          </a>
        </nav>
      )}
    </header>
  );
}
