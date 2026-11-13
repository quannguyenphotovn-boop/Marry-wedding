import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBlogPost } from "@/actions/blog";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-charcoal-900">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-ivory-50 hover:bg-gold-500"
        >
          + Viết bài mới
        </Link>
      </div>

      <div className="mt-8 grid gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gold-100 bg-ivory-50 p-5"
          >
            <div>
              <p className="font-serif text-lg text-charcoal-900">{post.title}</p>
              <p className="text-sm text-charcoal-500">
                {post.isPublished ? "Đã xuất bản" : "Bản nháp"} · /blog/{post.slug}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/blog/${post.id}`} className="text-sm text-gold-600 hover:underline">
                Sửa
              </Link>
              <DeleteButton
                action={deleteBlogPost.bind(null, post.id)}
                confirmText={`Xóa bài viết "${post.title}"?`}
              />
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="rounded-xl border border-gold-100 bg-ivory-50 p-8 text-center text-charcoal-500">
            Chưa có bài viết nào.
          </p>
        )}
      </div>
    </div>
  );
}
