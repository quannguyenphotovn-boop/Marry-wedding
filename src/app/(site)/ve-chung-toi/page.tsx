import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBanner } from "@/components/site/CtaBanner";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Câu chuyện về MARRY WEDDING — studio ảnh & phim cưới cao cấp tại Bắc Ninh, nơi mỗi khung hình là một kỷ niệm vĩnh cửu.",
};

const VALUES = [
  {
    title: "Tận tâm từng chi tiết",
    desc: "Mỗi buổi chụp được chuẩn bị kỹ lưỡng từ concept, trang phục đến ánh sáng.",
  },
  {
    title: "Chất lượng cao cấp",
    desc: "Thiết bị chuyên nghiệp, đội ngũ chỉnh sửa ảnh/phim theo chuẩn studio quốc tế.",
  },
  {
    title: "Đồng hành tận tình",
    desc: "Tư vấn trọn vẹn hành trình, từ buổi gặp đầu tiên đến khi nhận album hoàn chỉnh.",
  },
];

const STATS = [
  { value: "500+", label: "Cặp đôi đã đồng hành" },
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "1.200+", label: "Album đã giao" },
  { value: "15+", label: "Nhiếp ảnh gia & đạo diễn hình ảnh" },
];

const MILESTONES = [
  {
    year: "Khởi đầu",
    title: "Thành lập MARRY WEDDING",
    desc: "Bắt đầu từ một studio nhỏ tại Bắc Ninh với khát vọng lưu giữ những khoảnh khắc cưới chân thật và đẹp nhất.",
  },
  {
    year: "Phát triển",
    title: "Mở rộng dịch vụ & sản phẩm",
    desc: "Bổ sung dịch vụ phóng sự cưới, destination wedding và dòng sản phẩm album, khung ảnh, quà tặng cao cấp.",
  },
  {
    year: "Hiện tại",
    title: "Thương hiệu được tin tưởng",
    desc: "Trở thành lựa chọn của hàng trăm cặp đôi mỗi năm, không ngừng nâng cao chất lượng hình ảnh và trải nghiệm khách hàng.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            kicker="Về chúng tôi"
            title="MARRY WEDDING — Nơi tình yêu được kể bằng hình ảnh"
            description="Thành lập với mong muốn lưu giữ trọn vẹn những khoảnh khắc thiêng liêng nhất trong đời, MARRY WEDDING tự hào là studio ảnh & phim cưới cao cấp tại Bắc Ninh, phục vụ các cặp đôi trên toàn quốc."
          />

          <div className="mt-14 grid gap-10 md:grid-cols-2 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/placeholder/album-studio.svg"
                alt="Đội ngũ MARRY WEDDING"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-5 text-charcoal-700 leading-relaxed">
              <p>
                MARRY WEDDING quy tụ đội ngũ nhiếp ảnh gia, đạo diễn hình ảnh và chuyên gia trang
                điểm giàu kinh nghiệm, luôn đặt câu chuyện riêng của mỗi cặp đôi làm trung tâm của
                từng dự án.
              </p>
              <p>
                Từ những buổi chụp studio cổ điển sang trọng đến hành trình destination wedding
                đầy cảm xúc, chúng tôi cam kết mang đến trải nghiệm dịch vụ cao cấp, chuyên nghiệp
                và trọn vẹn nhất.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-charcoal-900">
        <Container>
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl text-gold-400 md:text-4xl">{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-ivory-200">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-ivory-100">
        <Container>
          <SectionHeading kicker="Giá trị cốt lõi" title="Điều làm nên sự khác biệt của MARRY WEDDING" />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-xl border border-gold-100 bg-ivory-50 p-8 text-center">
                <h3 className="font-serif text-xl text-charcoal-900">{v.title}</h3>
                <p className="mt-3 text-sm text-charcoal-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            kicker="Hành trình thương hiệu"
            title="Câu chuyện của MARRY WEDDING"
            description="Từ một studio nhỏ đến thương hiệu chụp ảnh cưới cao cấp được nhiều cặp đôi lựa chọn."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {MILESTONES.map((m, idx) => (
              <div key={m.title} className="relative pl-6">
                <span className="absolute left-0 top-1 h-3 w-3 rounded-full bg-gold-400" aria-hidden="true" />
                {idx < MILESTONES.length - 1 && (
                  <span className="absolute left-[5px] top-5 hidden h-[calc(100%-1rem)] w-px bg-gold-200 md:block" aria-hidden="true" />
                )}
                <span className="section-kicker">{m.year}</span>
                <h3 className="mt-2 font-serif text-xl text-charcoal-900">{m.title}</h3>
                <p className="mt-2 text-sm text-charcoal-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
