import { notFound } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import { updateBlogPost } from "../../../../../actions/blog";
import { BlogPostForm } from "../../../../../components/admin/BlogPostForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal-900">Sửa bài viết: {post.title}</h1>
      <div className="mt-8">
        <BlogPostForm
          action={updateBlogPost.bind(null, post.id)}
          submitLabel="Lưu thay đổi"
          initialValues={{
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            contentMarkdown: post.contentMarkdown,
            coverImageUrl: post.coverImageUrl,
            authorName: post.authorName,
            isPublished: post.isPublished,
            metaTitle: post.metaTitle ?? "",
            metaDescription: post.metaDescription ?? "",
          }}
        />
      </div>
    </div>
  );
}
