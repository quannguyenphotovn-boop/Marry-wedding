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

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-content px-4 md:px-8 w-full">
          <div className="max-w-xl rounded-2xl bg-ivory-50/85 p-6 backdrop-blur-sm md:p-8">
            <span className="section-kicker">Luxury Wedding Studio</span>
            <h1 className="mt-4 font-serif text-4xl text-charcoal-900 leading-tight md:text-6xl">
              Lưu giữ khoảnh khắc trọn vẹn nhất đời người
            </h1>
            <p className="mt-5 text-charcoal-700 leading-relaxed">
              MARRY WEDDING đồng hành cùng bạn kiến tạo những bức ảnh và thước phim cưới đẳng cấp,
              tinh tế trong từng chi tiết.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton href="/lien-he">Đặt lịch tư vấn</LinkButton>
              <LinkButton href="/bo-suu-tap" variant="outline">
                Xem bộ sưu tập
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
