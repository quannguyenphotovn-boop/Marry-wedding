import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { Container } from "../../../components/ui/Container";
import { SectionHeading } from "../../../components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Blog cưới",
  description: "Kinh nghiệm, xu hướng và hậu trường chụp ảnh cưới từ MARRY WEDDING.",
};

export const revalidate = 3600;

export default async function BlogIndexPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <section className="page-enter py-16 md:py-24">
      <Container>
        <SectionHeading
          kicker="Blog"
          title="Kinh nghiệm & cảm hứng cho ngày cưới"
          description="Những bài viết hữu ích giúp bạn chuẩn bị cho hành trình chụp ảnh cưới trọn vẹn nhất."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-xl border border-gold-100 bg-ivory-50 transition-shadow duration-300 hover:shadow-luxury active:shadow-luxury"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                />
              </div>
              <div className="p-6">
                {post.publishedAt && (
                  <time className="text-xs uppercase tracking-wide text-gold-500">
                    {new Intl.DateTimeFormat("vi-VN").format(post.publishedAt)}
                  </time>
                )}
                <h3 className="mt-2 font-serif text-xl text-charcoal-900 transition-colors group-hover:text-gold-600 group-active:text-gold-600">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal-500 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
