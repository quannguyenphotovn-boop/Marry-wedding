export interface PackageFormValues {
  name: string;
  slug: string;
  tagline: string;
  priceFrom: number;
  priceLabel: string;
  features: string[];
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
}

export function PackageForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  initialValues?: Partial<PackageFormValues>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Tên gói *
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={initialValues?.name}
            className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium">
            Slug (dùng trong URL) *
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
        <label htmlFor="tagline" className="block text-sm font-medium">
          Mô tả ngắn
        </label>
        <input
          id="tagline"
          name="tagline"
          defaultValue={initialValues?.tagline}
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="priceFrom" className="block text-sm font-medium">
            Giá (VND, chỉ số) *
          </label>
          <input
            id="priceFrom"
            name="priceFrom"
            type="number"
            min={0}
            required
            defaultValue={initialValues?.priceFrom}
            className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
          />
        </div>
        <div>
          <label htmlFor="priceLabel" className="block text-sm font-medium">
            Nhãn giá hiển thị *
          </label>
          <input
            id="priceLabel"
            name="priceLabel"
            required
            placeholder="Từ 25.000.000đ"
            defaultValue={initialValues?.priceLabel}
            className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label htmlFor="featuresText" className="block text-sm font-medium">
          Tính năng / quyền lợi (mỗi dòng một mục)
        </label>
        <textarea
          id="featuresText"
          name="featuresText"
          rows={6}
          defaultValue={initialValues?.features?.join("\n")}
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

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={initialValues?.isFeatured}
            className="h-4 w-4"
          />
          Gói nổi bật
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={initialValues?.isPublished ?? true}
            className="h-4 w-4"
          />
          Hiển thị công khai
        </label>
      </div>

      <button
        type="submit"
        className="rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-ivory-50 hover:bg-gold-500 min-h-11"
      >
        {submitLabel}
      </button>
    </form>
  );
}
