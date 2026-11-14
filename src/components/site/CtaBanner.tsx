import { LinkButton } from "../ui/Button";

export function CtaBanner() {
  return (
    <section className="bg-charcoal-900">
      <div className="mx-auto max-w-content px-4 md:px-8 py-16 text-center text-ivory-50">
        <h2 className="font-serif text-3xl md:text-4xl">Sẵn sàng viết tiếp câu chuyện tình yêu?</h2>
        <p className="mt-4 text-ivory-200 max-w-xl mx-auto">
          Liên hệ ngay với MARRY WEDDING để được tư vấn miễn phí và giữ trọn ưu đãi tốt nhất cho
          ngày cưới của bạn.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <LinkButton href="/lien-he">Đặt lịch tư vấn</LinkButton>
          <a
            href="tel:0826888198"
            className="inline-flex items-center justify-center rounded-full border border-ivory-100 px-6 py-3 text-sm font-medium text-ivory-50 hover:bg-ivory-50 hover:text-charcoal-900 transition-colors min-h-11"
          >
            Gọi 0826 888 198
          </a>
        </div>
      </div>
    </section>
  );
}
