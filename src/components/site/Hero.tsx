import { LinkButton } from "@/components/ui/Button";
import { HeroCarousel } from "./HeroCarousel";

export function Hero() {
  return (
    <section className="relative isolate">
      {/* Mobile/tablet keep the original 80vh-tall full-bleed sizing. At
          lg+ the container switches to a fixed aspect-ratio instead of a
          viewport-height one: a vh-based height combined with an
          unbounded width let the effective aspect ratio (and therefore
          the crop) grow without limit on short, ultra-wide windows — that
          was the root cause of the seated bride ending up hidden behind
          the text block. aspect-[2/1], capped by max-w and max-h, keeps
          the crop within a known, safe range on every desktop size. */}
      <div className="relative mx-auto h-[80vh] min-h-[560px] w-full max-w-[1800px] overflow-hidden lg:h-auto lg:aspect-[2/1] lg:max-h-[800px]">
        <HeroCarousel />
      </div>

      {/* Bottom-aligned, not centered: this area of the photo is the
          subjects' dark trousers/shoes, clear of both faces, so text can
          sit directly on the photo (light color + shadow) with no card.
          Kept deliberately compact (tight spacing, smaller heading) — a
          taller text block reaches further up into the frame, which is
          what was overlapping a seated subject on some slides. */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-content px-4 pb-6 md:px-8 md:pb-8">
          <div className="max-w-xl">
            <span className="section-kicker !text-gold-200 [text-shadow:0_1px_8px_rgb(0_0_0_/_50%)]">
              Luxury Wedding Studio
            </span>
            <h1 className="mt-3 font-serif text-3xl leading-tight text-ivory-50 [text-shadow:0_2px_16px_rgb(0_0_0_/_55%)] md:text-5xl">
              Lưu giữ khoảnh khắc trọn vẹn nhất đời người
            </h1>
            <p className="mt-3 text-ivory-100 leading-relaxed [text-shadow:0_1px_10px_rgb(0_0_0_/_55%)]">
              MARRY WEDDING đồng hành cùng bạn kiến tạo những bức ảnh và thước phim cưới đẳng cấp,
              tinh tế trong từng chi tiết.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
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
