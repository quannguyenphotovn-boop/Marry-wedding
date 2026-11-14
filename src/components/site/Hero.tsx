import { LinkButton } from "../ui/Button";
import { HeroCarousel } from "./HeroCarousel";

export function Hero() {
  return (
    <section className="relative isolate">
      {/* A fixed aspect ratio at every breakpoint, not a viewport-height
          based one: on a narrow tall phone, h-[80vh] made the container
          far narrower (relative to its height) than the source photos
          are wide, which forced object-cover into a severe horizontal
          crop — on a couple standing apart, that showed only the empty
          gap between them, neither subject. A near-square ratio on
          phones keeps that crop mild (~30%, vs. ~47-60% at 4:5 or
          taller) while staying tall enough that the text block below
          doesn't cover most of the visible photo — 3:2 matched these
          photos' own aspect almost exactly but was short enough that
          the text overlay hid whatever wasn't in its top third. sm:
          moves to the exact 3:2 match once there's width to spare for
          both the photo and the text without the two competing for the
          same space; lg is the wider 2:1 desktop crop these slides were
          already tuned for per-photo via their object-position. max-h
          caps all three on short, ultra-wide windows. */}
      <div className="relative mx-auto aspect-square w-full max-w-[1800px] max-h-[800px] overflow-hidden sm:aspect-[3/2] lg:aspect-[2/1]">
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
