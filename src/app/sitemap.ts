import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const STATIC_ROUTES = ["/", "/ve-chung-toi", "/dich-vu", "/bo-suu-tap", "/blog", "/lien-he"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const [albums, posts] = await Promise.all([
    prisma.galleryAlbum.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const albumEntries: MetadataRoute.Sitemap = albums.map((a) => ({
    url: `${siteUrl}/bo-suu-tap/${a.slug}`,
    lastModified: a.updatedAt,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  return [...staticEntries, ...albumEntries, ...postEntries];
}
