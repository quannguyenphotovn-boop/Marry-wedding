import { PRODUCT_CATEGORY_LABELS } from "@/lib/validation";
import { ImageUploader } from "./ImageUploader";

export interface ProductFormValues {
  name: string;
  slug: string;
  category: string;
  description: string;
  priceLabel: string;
  coverImageUrl: string;
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
}

export function ProductForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  initialValues?: Partial<ProductFormValues>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Tên sản phẩm *
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
          {Object.entries(PRODUCT_CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <ImageUploader
        name="coverImageUrl"
        entity="products"
        label="Ảnh sản phẩm *"
        initialUrl={initialValues?.coverImageUrl}
      />

      <div>
        <label htmlFor="priceLabel" className="block text-sm font-medium">
          Nhãn giá hiển thị *
        </label>
        <input
          id="priceLabel"
          name="priceLabel"
          required
          placeholder="Từ 1.200.000đ"
          defaultValue={initialValues?.priceLabel}
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
        />
      </div>

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

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={initialValues?.isFeatured}
            className="h-4 w-4"
          />
          Sản phẩm nổi bật
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
