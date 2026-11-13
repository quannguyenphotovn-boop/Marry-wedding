import Link from "next/link";
import { WordmarkLogo } from "./WordmarkLogo";

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-ivory-100">
      <div className="mx-auto max-w-content px-4 md:px-8 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <WordmarkLogo variant="light" />
          <p className="mt-4 text-sm text-ivory-200 leading-relaxed max-w-xs">
            Studio ảnh &amp; phim cưới cao cấp, lưu giữ trọn vẹn từng khoảnh khắc thiêng liêng
            trong ngày trọng đại của bạn.
          </p>
        </div>

        <div>
          <h3 className="section-kicker">Liên hệ</h3>
          <ul className="mt-4 space-y-2 text-sm text-ivory-200">
            <li>Số 255D Nguyễn Gia Thiều, TP. Bắc Ninh</li>
            <li>
              Hotline:{" "}
              <a href="tel:0826888198" className="hover:text-gold-400">
                0826 888 198
              </a>
            </li>
            <li>
              Email:{" "}
              <a href="mailto:marrywedding95@gmail.com" className="hover:text-gold-400">
                marrywedding95@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="section-kicker">Khám phá</h3>
          <ul className="mt-4 space-y-2 text-sm text-ivory-200">
            <li>
              <Link href="/dich-vu" className="hover:text-gold-400">
                Dịch vụ &amp; Bảng giá
              </Link>
            </li>
            <li>
              <Link href="/bo-suu-tap" className="hover:text-gold-400">
                Bộ sưu tập ảnh
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-gold-400">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="hover:text-gold-400">
                Đặt lịch tư vấn
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-charcoal-700">
        <p className="mx-auto max-w-content px-4 md:px-8 py-6 text-xs text-ivory-300">
          © {new Date().getFullYear()} MARRY WEDDING. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
