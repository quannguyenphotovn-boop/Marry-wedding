import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { Container } from "../../../components/ui/Container";
import { SectionHeading } from "../../../components/site/SectionHeading";
import { ProductCard } from "../../../components/site/ProductCard";
import { PRODUCT_CATEGORY_LABELS } from "../../../lib/validation";
import { CtaBanner } from "../../../components/site/CtaBanner";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description:
    "Các sản phẩm đi kèm dịch vụ chụp ảnh cưới của MARRY WEDDING: album, ảnh in cao cấp, khung ảnh, USB & quà tặng.",
};

export const revalidate = 3600;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      ...(category ? { category } : {}),
    },
    orderBy: { sortOrder: "asc" },
  });

  const categories = Object.entries(PRODUCT_CATEGORY_LABELS);

  return (
    <div key={category ?? "all"} className="page-enter">
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            kicker="Sản phẩm"
            title="Sản phẩm đi kèm trọn gói cưới"
            description="Ngoài dịch vụ chụp ảnh & quay phim, MARRY WEDDING mang đến các sản phẩm lưu niệm cao cấp hoàn thiện câu chuyện tình yêu của bạn."
          />

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/san-pham"
              className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                !category
                  ? "bg-gold-400 text-ivory-50 border-gold-400"
                  : "border-gold-200 text-charcoal-700 hover:border-gold-400"
              }`}
            >
              Tất cả
            </Link>
            {categories.map(([value, label]) => (
              <Link
                key={value}
                href={`/san-pham?category=${value}`}
                className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                  category === value
                    ? "bg-gold-400 text-ivory-50 border-gold-400"
                    : "border-gold-200 text-charcoal-700 hover:border-gold-400"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <p className="mt-12 text-center text-charcoal-500">
              Chưa có sản phẩm nào trong danh mục này.
            </p>
          )}
        </Container>
      </section>
      <CtaBanner />
    </div>
  );
}
