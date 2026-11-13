import { LinkButton } from "@/components/ui/Button";

export interface PackageCardData {
  slug: string;
  name: string;
  tagline: string | null;
  priceLabel: string;
  features: string[];
  isFeatured: boolean;
}

export function PackageCard({ pkg }: { pkg: PackageCardData }) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-8 transition-transform duration-300 hover:-translate-y-1 active:-translate-y-1 ${
        pkg.isFeatured
          ? "border-gold-400 bg-charcoal-900 text-ivory-50 shadow-luxury"
          : "border-gold-100 bg-ivory-50 text-charcoal-900"
      }`}
    >
      {pkg.isFeatured && (
        <span className="mb-3 inline-block w-fit rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-ivory-50">
          Phổ biến nhất
        </span>
      )}
      <h3 className="font-serif text-2xl">{pkg.name}</h3>
      {pkg.tagline && (
        <p className={`mt-2 text-sm ${pkg.isFeatured ? "text-ivory-200" : "text-charcoal-500"}`}>
          {pkg.tagline}
        </p>
      )}
      <p className="mt-6 font-serif text-3xl text-gold-400">{pkg.priceLabel}</p>

      <ul className="mt-6 space-y-3 flex-1">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <LinkButton
        href={`/lien-he?goi=${pkg.slug}`}
        variant={pkg.isFeatured ? "primary" : "outline"}
        className="mt-8"
      >
        Chọn gói này
      </LinkButton>
    </div>
  );
}
