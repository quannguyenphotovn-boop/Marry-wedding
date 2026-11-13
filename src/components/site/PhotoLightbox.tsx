"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface LightboxPhoto {
  id: string;
  imageUrl: string;
  altText: string;
}

export function PhotoLightbox({ photos }: { photos: LightboxPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, photos.length]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="relative aspect-[4/5] overflow-hidden rounded-lg group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            aria-label={`Xem ảnh lớn: ${photo.altText}`}
          >
            <Image
              src={photo.imageUrl}
              alt={photo.altText}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-900/90 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="Đóng"
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 h-11 w-11 flex items-center justify-center rounded-full bg-ivory-50/10 text-ivory-50 hover:bg-ivory-50/20"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Ảnh trước"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
            }}
            className="absolute left-2 md:left-6 h-11 w-11 flex items-center justify-center rounded-full bg-ivory-50/10 text-ivory-50 hover:bg-ivory-50/20"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="relative h-[80vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[activeIndex].imageUrl}
              alt={photos[activeIndex].altText}
              fill
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Ảnh tiếp theo"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i === null ? i : (i + 1) % photos.length));
            }}
            className="absolute right-2 md:right-6 h-11 w-11 flex items-center justify-center rounded-full bg-ivory-50/10 text-ivory-50 hover:bg-ivory-50/20"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
