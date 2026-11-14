import type { Metadata } from "next";
import "../globals.css";
import { display, body } from "../../lib/fonts";

export const metadata: Metadata = {
  title: {
    default: "Quản trị | MARRY WEDDING",
    template: "%s | Quản trị MARRY WEDDING",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-ivory-100 text-charcoal-900">
        {children}
      </body>
    </html>
  );
}
