import type { Metadata } from "next";
import "../globals.css";
import { display, body } from "@/lib/fonts";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MARRY WEDDING — Studio Ảnh & Phim Cưới Cao Cấp Tại Bắc Ninh",
    template: "%s | MARRY WEDDING",
  },
  description:
    "MARRY WEDDING — studio chụp ảnh và quay phim cưới cao cấp tại Bắc Ninh. Lưu giữ trọn vẹn khoảnh khắc thiêng liêng trong ngày cưới của bạn.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "MARRY WEDDING",
    title: "MARRY WEDDING — Studio Ảnh & Phim Cưới Cao Cấp Tại Bắc Ninh",
    description:
      "Studio chụp ảnh và quay phim cưới cao cấp tại Bắc Ninh. Đặt lịch tư vấn miễn phí ngay hôm nay.",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MARRY WEDDING",
  image: `${siteUrl}/images/placeholder/hero-01.svg`,
  telephone: "+84826888198",
  email: "marrywedding95@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Số 255D Nguyễn Gia Thiều",
    addressLocality: "Bắc Ninh",
    addressCountry: "VN",
  },
  priceRange: "$$$",
  url: siteUrl,
};

export default function SiteRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
