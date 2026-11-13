import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [newLeads, totalLeads, albums, products, posts, packages, testimonials] = await Promise.all([
    prisma.bookingLead.count({ where: { status: "new" } }),
    prisma.bookingLead.count(),
    prisma.galleryAlbum.count(),
    prisma.product.count(),
    prisma.blogPost.count(),
    prisma.pricingPackage.count(),
    prisma.testimonial.count(),
  ]);

  const stats = [
    { label: "Lead mới", value: newLeads, href: "/admin/leads", highlight: true },
    { label: "Tổng lead", value: totalLeads, href: "/admin/leads" },
    { label: "Album ảnh", value: albums, href: "/admin/gallery" },
    { label: "Sản phẩm", value: products, href: "/admin/products" },
    { label: "Bài viết blog", value: posts, href: "/admin/blog" },
    { label: "Gói dịch vụ", value: packages, href: "/admin/pricing" },
    { label: "Đánh giá", value: testimonials, href: "/admin/testimonials" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal-900">Tổng quan</h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`rounded-xl border p-6 transition-colors hover:border-gold-400 ${
              stat.highlight ? "border-gold-400 bg-gold-50" : "border-gold-100 bg-ivory-50"
            }`}
          >
            <p className="text-sm text-charcoal-500">{stat.label}</p>
            <p className="mt-2 font-serif text-3xl text-charcoal-900">{stat.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
