import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "@/actions/testimonials";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-charcoal-900">Đánh giá khách hàng</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-ivory-50 hover:bg-gold-500"
        >
          + Thêm đánh giá
        </Link>
      </div>

      <div className="mt-8 grid gap-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-gold-100 bg-ivory-50 p-5"
          >
            <div className="max-w-xl">
              <p className="font-serif text-lg text-charcoal-900">{t.coupleName}</p>
              <p className="mt-1 text-sm text-charcoal-500 italic">“{t.quote}”</p>
              <p className="mt-1 text-xs text-charcoal-400">
                {t.rating}★ · {t.isPublished ? "Đang hiển thị" : "Đã ẩn"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/testimonials/${t.id}`} className="text-sm text-gold-600 hover:underline">
                Sửa
              </Link>
              <DeleteButton
                action={deleteTestimonial.bind(null, t.id)}
                confirmText={`Xóa đánh giá của "${t.coupleName}"?`}
              />
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <p className="rounded-xl border border-gold-100 bg-ivory-50 p-8 text-center text-charcoal-500">
            Chưa có đánh giá nào.
          </p>
        )}
      </div>
    </div>
  );
}
