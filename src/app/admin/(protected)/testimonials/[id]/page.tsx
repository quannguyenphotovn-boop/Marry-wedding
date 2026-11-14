import { notFound } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import { updateTestimonial } from "../../../../../actions/testimonials";
import { TestimonialForm } from "../../../../../components/admin/TestimonialForm";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal-900">Sửa đánh giá: {testimonial.coupleName}</h1>
      <div className="mt-8">
        <TestimonialForm
          action={updateTestimonial.bind(null, testimonial.id)}
          submitLabel="Lưu thay đổi"
          initialValues={{
            coupleName: testimonial.coupleName,
            quote: testimonial.quote,
            avatarUrl: testimonial.avatarUrl ?? "",
            weddingDate: testimonial.weddingDate
              ? testimonial.weddingDate.toISOString().slice(0, 10)
              : "",
            rating: testimonial.rating,
            isPublished: testimonial.isPublished,
            sortOrder: testimonial.sortOrder,
          }}
        />
      </div>
    </div>
  );
}
