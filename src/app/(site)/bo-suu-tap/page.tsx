import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/site/SectionHeading";
import { AlbumCard } from "@/components/site/AlbumCard";
import { GALLERY_CATEGORY_LABELS } from "@/lib/validation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bộ sưu tập ảnh cưới",
  description: "Khám phá các bộ sưu tập ảnh cưới, pre-wedding và destination wedding của MARRY WEDDING.",
};

export const revalidate = 3600;

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const albums = await prisma.galleryAlbum.findMany({
    where: {
      isPublished: true,
      ...(category ? { category } : {}),
    },
    orderBy: { sortOrder: "asc" },
  });

  const categories = Object.entries(GALLERY_CATEGORY_LABELS);

  return (
    <section key={category ?? "all"} className="page-enter py-16 md:py-24">
      <Container>
        <SectionHeading
          kicker="Bộ sưu tập"
          title="Những khung hình đáng nhớ"
          description="Mỗi album là một câu chuyện tình yêu riêng biệt được MARRY WEDDING trân trọng lưu giữ."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/bo-suu-tap"
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
              href={`/bo-suu-tap?category=${value}`}
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
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>

        {albums.length === 0 && (
          <p className="mt-12 text-center text-charcoal-500">
            Chưa có album nào trong danh mục này.
          </p>
        )}
      </Container>
    </section>
  );
}
