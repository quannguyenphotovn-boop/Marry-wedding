import Image from "next/image";

const MOMENTS = [
  { src: "/images/real/moment-01.jpg", alt: "Cô dâu chú rể hôn nhau bên xe cổ điển" },
  { src: "/images/real/moment-02.jpg", alt: "Cô dâu chú rể trong studio hoa cao cấp" },
  { src: "/images/real/moment-03.jpg", alt: "Cô dâu chú rể bên xe scooter trong khu vườn" },
  { src: "/images/real/moment-04.jpg", alt: "Cô dâu chú rể dạo bước trong khu vườn" },
  { src: "/images/real/moment-05.jpg", alt: "Cô dâu chú rể vui đùa trên phố" },
];

export function MomentsShowcase() {
  const [big, ...rest] = MOMENTS;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
      <div className="group relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-xl lg:aspect-auto">
        <Image
          src={big.src}
          alt={big.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
        />
      </div>
      {rest.map((m) => (
        <div
          key={m.src}
          className="group relative aspect-[4/3] overflow-hidden rounded-xl"
        >
          <Image
            src={m.src}
            alt={m.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
