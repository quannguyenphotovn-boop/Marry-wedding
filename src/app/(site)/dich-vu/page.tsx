import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PackageCard } from "@/components/site/PackageCard";
import { CtaBanner } from "@/components/site/CtaBanner";

export const metadata: Metadata = {
  title: "Dịch vụ & Bảng giá",
  description:
    "Các gói chụp ảnh và quay phim cưới cao cấp của MARRY WEDDING — từ Gói Tình Yêu đến Gói Hoàng Gia.",
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const packages = await prisma.pricingPackage.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            kicker="Dịch vụ & Bảng giá"
            title="Gói chụp ảnh & quay phim cưới cao cấp"
            description="Mỗi gói dịch vụ được thiết kế để phù hợp với từng câu chuyện tình yêu. Liên hệ để được tư vấn chi tiết và tùy chỉnh theo nhu cầu riêng."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={{
                  slug: pkg.slug,
                  name: pkg.name,
                  tagline: pkg.tagline,
                  priceLabel: pkg.priceLabel,
                  features: JSON.parse(pkg.featuresRaw) as string[],
                  isFeatured: pkg.isFeatured,
                }}
              />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-charcoal-500">
            * Giá có thể thay đổi theo thời điểm và yêu cầu riêng. Vui lòng liên hệ hotline{" "}
            <a href="tel:0826888198" className="text-gold-500 font-medium">
              0826 888 198
            </a>{" "}
            để nhận bảng giá chi tiết và ưu đãi mới nhất.
          </p>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
