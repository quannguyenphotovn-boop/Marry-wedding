import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { renderMarkdown } from "@/lib/markdown";
import { CtaBanner } from "@/components/site/CtaBanner";

export const revalidate = 3600;

async function getPost(slug: string) {
  return prisma.blogPost.findFirst({ where: { slug, isPublished: true } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: { images: [post.coverImageUrl] },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.contentMarkdown);

  return (
    <>
      <article className="py-16 md:py-24">
        <Container className="max-w-3xl">
          {post.publishedAt && (
            <time className="section-kicker block text-center">
              {new Intl.DateTimeFormat("vi-VN").format(post.publishedAt)}
            </time>
          )}
          <h1 className="mt-3 font-serif text-3xl md:text-4xl text-center text-charcoal-900">
            {post.title}
          </h1>
          <p className="mt-4 text-center text-sm text-charcoal-500">Bởi {post.authorName}</p>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl">
            <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" />
          </div>

          <div
            className="prose prose-charcoal max-w-none mt-10 prose-headings:font-serif prose-a:text-gold-600"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>
      </article>
      <CtaBanner />
    </>
  );
}
