"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Slide {
  src: string;
  alt: string;
  /** Tailwind object-position utility — tuned per photo so the crop never
      cuts into a subject's head while still showing as much of the rest
      of the frame (legs included) as that photo's composition allows. */
  position: string;
}

const SLIDES: Slide[] = [
  {
    src: "/images/real/hero-couple-01.jpg",
    alt: "Cô dâu chú rể trong bộ ảnh cưới studio của MARRY WEDDING",
    position: "object-[center_18%]",
  },
  {
    src: "/images/real/moment-05.jpg",
    alt: "Cô dâu chú rể vui đùa trên phố",
    position: "object-top",
  },
  {
    src: "/images/real/moment-02.jpg",
    alt: "Cô dâu chú rể trong studio hoa cao cấp",
    // Groom (head ~32% down) is off to the right, clear of the text
    // block's horizontal column, so his safety only needs modest top
    // headroom. The bride (face ~52-56% down) sits directly in that
    // column though, seated lower in frame — too little top-crop pushes
    // the text zone's mapped range right over her face. 60% balances
    // both: keeps the groom's head inside the frame with margin, while
    // moving the text zone's image-range below her face.
    position: "object-[center_60%]",
  },
  {
    src: "/images/real/moment-01.jpg",
    alt: "Cô dâu chú rể hôn nhau bên xe cổ điển",
    position: "object-top",
  },
  {
    src: "/images/real/moment-03.jpg",
    alt: "Cô dâu chú rể bên xe scooter trong khu vườn",
    position: "object-bottom",
  },
  {
    src: "/images/real/moment-04.jpg",
    alt: "Cô dâu chú rể dạo bước trong khu vườn",
    // Balanced center crop — the couple is small in this wide garden
    // scene, so an even top/bottom crop keeps the full surrounding
    // scenery (architecture, gazebo, bushes) in frame on both sides
    // rather than pushing them right up against the bottom edge.
    position: "object-center",
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
    <div className="absolute inset-0">
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          className={`object-cover ${slide.position} transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
