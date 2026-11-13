import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PhotoLightbox } from "@/components/site/PhotoLightbox";
import { GALLERY_CATEGORY_LABELS } from "@/lib/validation";
import { CtaBanner } from "@/components/site/CtaBanner";

export const revalidate = 3600;

async function getAlbum(slug: string) {
  return prisma.galleryAlbum.findFirst({
    where: { slug, isPublished: true },
    include: { photos: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = await getAlbum(slug);
  if (!album) return {};

  return {
    title: album.title,
    description: album.description ?? `Bộ sưu tập ảnh ${album.title} tại MARRY WEDDING.`,
    openGraph: { images: [album.coverImageUrl] },
  };
}

export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = await getAlbum(slug);
  if (!album) notFound();

  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            kicker={GALLERY_CATEGORY_LABELS[album.category] ?? album.category}
            title={album.title}
            description={album.description ?? undefined}
          />
          <div className="mt-12">
            <PhotoLightbox
              photos={album.photos.map((p) => ({
                id: p.id,
                imageUrl: p.imageUrl,
                altText: p.altText,
              }))}
            />
          </div>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
