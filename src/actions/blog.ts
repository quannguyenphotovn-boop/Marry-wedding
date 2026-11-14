"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";
import { getSession } from "../lib/auth";
import { blogPostSchema } from "../lib/validation";

function formToInput(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    contentMarkdown: String(formData.get("contentMarkdown") ?? ""),
    coverImageUrl: String(formData.get("coverImageUrl") ?? ""),
    authorName: String(formData.get("authorName") ?? "MARRY WEDDING"),
    isPublished: formData.get("isPublished") === "on",
    metaTitle: String(formData.get("metaTitle") ?? ""),
    metaDescription: String(formData.get("metaDescription") ?? ""),
  };
}

export async function createBlogPost(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = blogPostSchema.parse(formToInput(formData));
  const isPublished = parsed.isPublished ?? false;

  await prisma.blogPost.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      excerpt: parsed.excerpt,
      contentMarkdown: parsed.contentMarkdown,
      coverImageUrl: parsed.coverImageUrl,
      authorName: parsed.authorName,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
      metaTitle: parsed.metaTitle || null,
      metaDescription: parsed.metaDescription || null,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = blogPostSchema.parse(formToInput(formData));
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  const isPublished = parsed.isPublished ?? false;
  const publishedAt = isPublished ? existing?.publishedAt ?? new Date() : existing?.publishedAt ?? null;

  await prisma.blogPost.update({
    where: { id },
    data: {
      title: parsed.title,
      slug: parsed.slug,
      excerpt: parsed.excerpt,
      contentMarkdown: parsed.contentMarkdown,
      coverImageUrl: parsed.coverImageUrl,
      authorName: parsed.authorName,
      isPublished,
      publishedAt,
      metaTitle: parsed.metaTitle || null,
      metaDescription: parsed.metaDescription || null,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.slug}`);
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
