import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative isolate">
      <div className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src="/images/real/hero-couple-01.jpg"
          alt="Cô dâu chú rể trong bộ ảnh cưới studio của MARRY WEDDING"
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      {/* Bottom-aligned, not centered: this area of the photo is the
          subjects' dark trousers/shoes, clear of both faces, so text can
          sit directly on the photo (light color + shadow) with no card. */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-content px-4 pb-10 md:px-8 md:pb-14">
          <div className="max-w-xl">
            <span className="section-kicker !text-gold-200 [text-shadow:0_1px_8px_rgb(0_0_0_/_50%)]">
              Luxury Wedding Studio
            </span>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-ivory-50 [text-shadow:0_2px_16px_rgb(0_0_0_/_55%)] md:text-6xl">
              Lưu giữ khoảnh khắc trọn vẹn nhất đời người
            </h1>
            <p className="mt-5 text-ivory-100 leading-relaxed [text-shadow:0_1px_10px_rgb(0_0_0_/_55%)]">
              MARRY WEDDING đồng hành cùng bạn kiến tạo những bức ảnh và thước phim cưới đẳng cấp,
              tinh tế trong từng chi tiết.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton href="/lien-he">Đặt lịch tư vấn</LinkButton>
              <LinkButton
                href="/bo-suu-tap"
                variant="outline"
                className="!border-ivory-100 !text-ivory-50 hover:!bg-ivory-50 hover:!text-charcoal-900"
              >
                Xem bộ sưu tập
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
