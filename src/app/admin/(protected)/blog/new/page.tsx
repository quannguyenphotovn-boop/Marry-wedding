import { createBlogPost } from "@/actions/blog";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal-900">Viết bài mới</h1>
      <div className="mt-8">
        <BlogPostForm action={createBlogPost} submitLabel="Tạo bài viết" />
      </div>
    </div>
  );
}
