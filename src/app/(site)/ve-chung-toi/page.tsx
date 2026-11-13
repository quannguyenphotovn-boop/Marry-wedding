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

      <CtaBanner />
    </>
  );
}
