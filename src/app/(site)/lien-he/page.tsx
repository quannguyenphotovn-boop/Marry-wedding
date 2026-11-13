import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BookingForm } from "@/components/site/BookingForm";

export const metadata: Metadata = {
  title: "Liên hệ & Đặt lịch tư vấn",
  description:
    "Đặt lịch tư vấn miễn phí với MARRY WEDDING — studio ảnh & phim cưới cao cấp tại Bắc Ninh.",
};

export const revalidate = 3600;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ goi?: string }>;
}) {
  const { goi } = await searchParams;

  const packages = await prisma.pricingPackage.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    select: { slug: true, name: true },
  });

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          kicker="Liên hệ"
          title="Đặt lịch tư vấn miễn phí"
          description="Chia sẻ với chúng tôi về ngày cưới mơ ước của bạn — MARRY WEDDING sẽ liên hệ lại trong thời gian sớm nhất."
        />

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <div className="relative">
            <BookingForm packages={packages} initialPackageSlug={goi} />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gold-100 bg-ivory-50 p-8">
              <h3 className="font-serif text-xl text-charcoal-900">Thông tin liên hệ</h3>
              <ul className="mt-4 space-y-3 text-charcoal-700">
                <li>
                  <span className="font-medium">Địa chỉ:</span> Số 255D Nguyễn Gia Thiều, TP. Bắc
                  Ninh
                </li>
                <li>
                  <span className="font-medium">Hotline:</span>{" "}
                  <a href="tel:0826888198" className="text-gold-600">
                    0826 888 198
                  </a>
                </li>
                <li>
                  <span className="font-medium">Email:</span>{" "}
                  <a href="mailto:marrywedding95@gmail.com" className="text-gold-600">
                    marrywedding95@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-gold-100">
              <iframe
                title="Bản đồ MARRY WEDDING"
                src="https://www.google.com/maps?q=S%E1%BB%91+255D+Nguy%E1%BB%85n+Gia+Thi%E1%BB%81u%2C+B%E1%BA%AFc+Ninh&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
