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
        {/* Photo has a bright studio background — a left-to-right dark
            overlay (rather than the previous bottom-up one) keeps the text
            block, which sits on the left, readable against it. */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 via-charcoal-900/45 to-charcoal-900/10" />
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-content px-4 md:px-8 w-full">
          <div className="max-w-xl text-ivory-50">
            <span className="section-kicker !text-gold-200">Luxury Wedding Studio</span>
            <h1 className="mt-4 font-serif text-4xl md:text-6xl leading-tight">
              Lưu giữ khoảnh khắc trọn vẹn nhất đời người
            </h1>
            <p className="mt-5 text-ivory-100 leading-relaxed">
              MARRY WEDDING đồng hành cùng bạn kiến tạo những bức ảnh và thước phim cưới đẳng cấp,
              tinh tế trong từng chi tiết.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton href="/lien-he">Đặt lịch tư vấn</LinkButton>
              <LinkButton href="/bo-suu-tap" variant="outline" className="!border-ivory-100 !text-ivory-50 hover:!bg-ivory-50 hover:!text-charcoal-900">
                Xem bộ sưu tập
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
