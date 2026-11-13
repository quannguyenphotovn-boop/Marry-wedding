import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/site/Hero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PackageCard } from "@/components/site/PackageCard";
import { ProductCard } from "@/components/site/ProductCard";
import { AlbumCard } from "@/components/site/AlbumCard";
import { MomentsShowcase } from "@/components/site/MomentsShowcase";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export const revalidate = 3600;

export default async function HomePage() {
  const [packages, products, albums, testimonials] = await Promise.all([
    prisma.pricingPackage.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      take: 3,
    }),
    prisma.product.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      take: 3,
    }),
    prisma.galleryAlbum.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      take: 3,
    }),
    prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      take: 4,
    }),
  ]);

  return (
    <div className="page-enter">
      <Hero />

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            kicker="Về MARRY WEDDING"
            title="Nghệ thuật kể chuyện tình yêu bằng hình ảnh"
            description="Với đội ngũ nhiếp ảnh gia và đạo diễn hình ảnh giàu kinh nghiệm, MARRY WEDDING mang đến những bộ ảnh cưới và phim cưới đẳng cấp, tôn vinh vẻ đẹp riêng của mỗi cặp đôi."
          />
          <div className="mt-8 flex justify-center">
            <LinkButton href="/ve-chung-toi" variant="ghost">
              Tìm hiểu thêm về chúng tôi &rarr;
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            kicker="Khoảnh khắc thực tế"
            title="Những câu chuyện tình yêu đã được MARRY WEDDING ghi lại"
            description="Một vài khoảnh khắc thật từ các buổi chụp — không phải ảnh minh họa."
          />
          <div className="mt-12">
            <MomentsShowcase />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-ivory-100">
        <Container>
          <SectionHeading
            kicker="Dịch vụ"
            title="Các gói chụp ảnh & quay phim cưới"
            description="Lựa chọn gói dịch vụ phù hợp nhất với câu chuyện tình yêu của bạn."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
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
          <div className="mt-10 flex justify-center">
            <LinkButton href="/dich-vu" variant="outline">
              Xem tất cả bảng giá
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            kicker="Sản phẩm"
            title="Sản phẩm lưu niệm cao cấp"
            description="Hoàn thiện câu chuyện tình yêu của bạn với album, ảnh in và quà tặng được chế tác tinh xảo."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <LinkButton href="/san-pham" variant="outline">
              Xem tất cả sản phẩm
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-ivory-100">
        <Container>
          <SectionHeading
            kicker="Bộ sưu tập"
            title="Những khoảnh khắc đã lưu giữ"
            description="Một vài album nổi bật từ các cặp đôi đã tin tưởng MARRY WEDDING."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <LinkButton href="/bo-suu-tap" variant="outline">
              Xem toàn bộ bộ sưu tập
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            kicker="Cảm nhận khách hàng"
            title="Những lời chia sẻ từ cô dâu, chú rể"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </div>
  );
}
