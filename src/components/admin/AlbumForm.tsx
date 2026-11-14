import { GALLERY_CATEGORY_LABELS } from "../../lib/validation";
import { ImageUploader } from "./ImageUploader";

export interface AlbumFormValues {
  title: string;
  slug: string;
  category: string;
  coverImageUrl: string;
  description: string;
  isPublished: boolean;
  sortOrder: number;
}

export function AlbumForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  initialValues?: Partial<AlbumFormValues>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Tên album *
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
        <label htmlFor="category" className="block text-sm font-medium">
          Danh mục *
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={initialValues?.category}
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
        >
          <option value="" disabled>
            -- Chọn danh mục --
          </option>
          {Object.entries(GALLERY_CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <ImageUploader
        name="coverImageUrl"
        entity="gallery"
        label="Ảnh bìa album *"
        initialUrl={initialValues?.coverImageUrl}
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Mô tả
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={initialValues?.description}
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="sortOrder" className="block text-sm font-medium">
          Thứ tự hiển thị
        </label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={initialValues?.sortOrder ?? 0}
          className="mt-2 w-full max-w-[160px] rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={initialValues?.isPublished}
          className="h-4 w-4"
        />
        Hiển thị công khai
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
