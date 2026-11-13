import { ImageUploader } from "./ImageUploader";

export interface BlogPostFormValues {
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  coverImageUrl: string;
  authorName: string;
  isPublished: boolean;
  metaTitle: string;
  metaDescription: string;
}

export function BlogPostForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  initialValues?: Partial<BlogPostFormValues>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Tiêu đề *
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={initialValues?.title}
            className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium">
            Slug *
          </label>
          <input
            id="slug"
            name="slug"
            required
            pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
            defaultValue={initialValues?.slug}
            className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium">
          Tóm tắt (hiển thị ở trang danh sách) *
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={initialValues?.excerpt}
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
        />
      </div>

      <ImageUploader name="coverImageUrl" entity="blog" label="Ảnh bìa *" initialUrl={initialValues?.coverImageUrl} />

      <div>
        <label htmlFor="contentMarkdown" className="block text-sm font-medium">
          Nội dung (hỗ trợ Markdown: ## Tiêu đề, **đậm**, danh sách...) *
        </label>
        <textarea
          id="contentMarkdown"
          name="contentMarkdown"
          required
          rows={14}
          defaultValue={initialValues?.contentMarkdown}
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3 font-mono text-sm"
        />
      </div>

      <div>
        <label htmlFor="authorName" className="block text-sm font-medium">
          Tác giả
        </label>
        <input
          id="authorName"
          name="authorName"
          defaultValue={initialValues?.authorName ?? "MARRY WEDDING"}
          className="mt-2 w-full max-w-sm rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
        />
      </div>

      <details className="rounded-lg border border-gold-100 p-4">
        <summary className="cursor-pointer text-sm font-medium text-charcoal-700">
          Tùy chọn SEO (không bắt buộc)
        </summary>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="metaTitle" className="block text-sm font-medium">
              Meta title{" "}
              <span className="text-charcoal-400">(không cần thêm &quot;| MARRY WEDDING&quot;)</span>
            </label>
            <input
              id="metaTitle"
              name="metaTitle"
              defaultValue={initialValues?.metaTitle}
              className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
            />
          </div>
          <div>
            <label htmlFor="metaDescription" className="block text-sm font-medium">
              Meta description
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              rows={2}
              defaultValue={initialValues?.metaDescription}
              className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
            />
          </div>
        </div>
      </details>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={initialValues?.isPublished}
          className="h-4 w-4"
        />
        Xuất bản công khai
      </label>

      <button
        type="submit"
        className="rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-ivory-50 hover:bg-gold-500 min-h-11"
      >
        {submitLabel}
      </button>
    </form>
  );
}
