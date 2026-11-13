"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Slide {
  src: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    src: "/images/real/hero-couple-01.jpg",
    alt: "Cô dâu chú rể trong bộ ảnh cưới studio của MARRY WEDDING",
  },
  {
    src: "/images/real/moment-05.jpg",
    alt: "Cô dâu chú rể vui đùa trên phố",
  },
  {
    src: "/images/real/moment-02.jpg",
    alt: "Cô dâu chú rể trong studio hoa cao cấp",
  },
  {
    src: "/images/real/moment-01.jpg",
    alt: "Cô dâu chú rể hôn nhau bên xe cổ điển",
  },
  {
    src: "/images/real/moment-03.jpg",
    alt: "Cô dâu chú rể bên xe scooter trong khu vườn",
  },
  {
    src: "/images/real/moment-04.jpg",
    alt: "Cô dâu chú rể dạo bước trong khu vườn",
  },
];

const SLIDE_DURATION_MS = 5000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 bg-charcoal-900">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Blurred, scaled-up copy fills every edge of the hero so the
              section stays full-bleed with no empty bars. */}
          <Image
            src={slide.src}
            alt=""
            aria-hidden="true"
            fill
            priority={i === 0}
            className="scale-110 object-cover object-center blur-2xl brightness-[0.65]"
          />
          {/* The real photo, never cropped — object-contain guarantees
              every subject's head and feet both stay fully in frame,
              regardless of that photo's composition or the container's
              aspect ratio. This is why each slide gets its own treatment
              instead of a single shared crop formula: no per-photo
              object-position tuning can satisfy "full head AND full
              legs" when a photo's aspect ratio differs a lot from the
              hero's — only not-cropping-at-all can. */}
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-contain object-center"
          />
        </div>
      ))}
    </div>
  );
}
