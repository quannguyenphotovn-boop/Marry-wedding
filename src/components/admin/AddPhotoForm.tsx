import { ImageUploader } from "./ImageUploader";

export function AddPhotoForm({ action }: { action: (formData: FormData) => Promise<void> }) {
  return (
    <form action={action} className="space-y-4 rounded-xl border border-gold-100 bg-ivory-50 p-5">
      <ImageUploader name="imageUrl" entity="gallery" label="Thêm ảnh mới" />
      <div>
        <label htmlFor="altText" className="block text-sm font-medium">
          Mô tả ảnh (alt text, hỗ trợ SEO)
        </label>
        <input
          id="altText"
          name="altText"
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-2.5 text-sm"
          placeholder="Ví dụ: Cô dâu chú rể tại studio MARRY WEDDING"
        />
      </div>
      <button
        type="submit"
        className="rounded-full border border-gold-400 px-5 py-2.5 text-sm font-medium text-charcoal-900 hover:bg-gold-400 hover:text-ivory-50"
      >
        + Thêm vào album
      </button>
    </form>
  );
}
