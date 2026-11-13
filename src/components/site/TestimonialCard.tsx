export interface TestimonialCardData {
  coupleName: string;
  quote: string;
  rating: number;
}

export function TestimonialCard({ testimonial }: { testimonial: TestimonialCardData }) {
  return (
    <figure className="rounded-xl border border-gold-100 bg-ivory-50 p-8 h-full flex flex-col">
      <div className="flex gap-1 text-gold-400" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill={i < testimonial.rating ? "currentColor" : "none"} stroke="currentColor">
            <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" strokeWidth="1" />
          </svg>
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-charcoal-700 leading-relaxed italic">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-4 font-serif text-lg text-charcoal-900">
        {testimonial.coupleName}
      </figcaption>
    </figure>
  );
}
