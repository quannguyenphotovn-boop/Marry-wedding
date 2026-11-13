import Image from "next/image";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/validation";

export interface ProductCardData {
  name: string;
  category: string;
  description: string | null;
  priceLabel: string;
  coverImageUrl: string;
  isFeatured: boolean;
}

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-gold-100 bg-ivory-50 transition-shadow duration-300 hover:shadow-luxury active:shadow-luxury">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.coverImageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
        />
        {product.isFeatured && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-ivory-50">
            Nổi bật
          </span>
        )}
      </div>
      <div className="p-5">
        <span className="text-xs uppercase tracking-wide text-gold-500">
          {PRODUCT_CATEGORY_LABELS[product.category] ?? product.category}
        </span>
        <h3 className="mt-1 font-serif text-lg text-charcoal-900 transition-colors group-hover:text-gold-600 group-active:text-gold-600">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-2 text-sm text-charcoal-500 line-clamp-2">{product.description}</p>
        )}
        <p className="mt-3 font-serif text-lg text-gold-600">{product.priceLabel}</p>
      </div>
    </div>
  );
}
