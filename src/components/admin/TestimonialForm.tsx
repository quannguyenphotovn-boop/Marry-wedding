export interface TestimonialFormValues {
  coupleName: string;
  quote: string;
  avatarUrl: string;
  weddingDate: string;
  rating: number;
  isPublished: boolean;
  sortOrder: number;
}

export function TestimonialForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  initialValues?: Partial<TestimonialFormValues>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div>
        <label htmlFor="coupleName" className="block text-sm font-medium">
          Tên cặp đôi *
        </label>
        <input
          id="coupleName"
          name="coupleName"
          required
          defaultValue={initialValues?.coupleName}
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="quote" className="block text-sm font-medium">
          Nội dung đánh giá *
        </label>
        <textarea
          id="quote"
          name="quote"
          required
          rows={4}
          defaultValue={initialValues?.quote}
          className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="weddingDate" className="block text-sm font-medium">
            Ngày cưới
          </label>
          <input
            id="weddingDate"
            name="weddingDate"
            type="date"
            defaultValue={initialValues?.weddingDate}
            className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
          />
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium">
            Số sao (1-5) *
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            min={1}
            max={5}
            required
            defaultValue={initialValues?.rating ?? 5}
            className="mt-2 w-full rounded-lg border border-gold-200 bg-ivory-50 px-4 py-3"
          />
        </div>
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
          defaultChecked={initialValues?.isPublished ?? true}
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
