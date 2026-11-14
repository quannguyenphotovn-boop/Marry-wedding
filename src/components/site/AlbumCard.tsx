import Image from "next/image";
import Link from "next/link";
import { GALLERY_CATEGORY_LABELS } from "../../lib/validation";

export interface AlbumCardData {
  slug: string;
  title: string;
  category: string;
  coverImageUrl: string;
}

export function AlbumCard({ album }: { album: AlbumCardData }) {
  return (
    <Link
      href={`/bo-suu-tap/${album.slug}`}
      className="group block overflow-hidden rounded-xl border border-gold-100 transition-shadow duration-300 hover:shadow-luxury active:shadow-luxury"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={album.coverImageUrl}
          alt={album.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
        />
      </div>
      <div className="p-4 bg-ivory-50">
        <span className="text-xs uppercase tracking-wide text-gold-500">
          {GALLERY_CATEGORY_LABELS[album.category] ?? album.category}
        </span>
        <h3 className="mt-1 font-serif text-lg text-charcoal-900 transition-colors group-hover:text-gold-600 group-active:text-gold-600">
          {album.title}
        </h3>
      </div>
    </Link>
  );
}
