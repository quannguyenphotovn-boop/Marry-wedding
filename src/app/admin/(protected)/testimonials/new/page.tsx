import { createTestimonial } from "@/actions/testimonials";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal-900">Thêm đánh giá mới</h1>
      <div className="mt-8">
        <TestimonialForm action={createTestimonial} submitLabel="Thêm đánh giá" />
      </div>
    </div>
  );
}
