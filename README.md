# MARRY WEDDING

Website cho studio ảnh & phim cưới cao cấp **MARRY WEDDING** (255D Nguyễn Gia Thiều, TP. Bắc
Ninh — hotline 0826 888 198 — marrywedding95@gmail.com).

Xây bằng **Next.js 15 (App Router) + TypeScript + Tailwind CSS + Prisma**, chạy như một ứng dụng
Node.js tự host (không dùng Vercel) để tương thích với Hostinger.

## Tính năng

- Trang marketing đầy đủ: Trang chủ, Giới thiệu, Dịch vụ & Bảng giá, Bộ sưu tập ảnh (lọc theo
  danh mục, lightbox), Blog, Liên hệ.
- Form đặt lịch tư vấn: validate, chống spam (honeypot + rate-limit theo IP lưu trong DB), gửi
  email thông báo qua Nodemailer, lưu lead vào database.
- Trang quản trị `/admin` (đăng nhập riêng): quản lý Bộ sưu tập ảnh, Blog, Bảng giá, Đánh giá
  khách hàng, danh sách Lead đặt lịch — không cần biết code.
- SEO: metadata động theo từng trang, sitemap.xml/robots.txt tự sinh, Open Graph, JSON-LD
  LocalBusiness với đúng địa chỉ/hotline thật.

## Chạy local

```bash
npm install
cp .env.example .env   # rồi chỉnh các giá trị cần thiết
npx prisma db push     # tạo database SQLite cho local dev
npm run db:seed        # dữ liệu mẫu + tài khoản admin
npm run dev
```

Mở http://localhost:3000. Đăng nhập quản trị tại http://localhost:3000/admin bằng
`ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` trong `.env`.

## Scripts

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Chạy dev server |
| `npm run build` | Build production (tạo `.next/standalone/`) |
| `npm run start` | Chạy bản build production tại local (`node .next/standalone/server.js`) |
| `npm run lint` | ESLint |
| `npm run db:push` | Đồng bộ schema Prisma vào database (dev) |
| `npm run db:migrate` | Áp dụng migration (production) |
| `npm run db:seed` | Seed dữ liệu mẫu |
| `npm run db:studio` | Mở Prisma Studio để xem/sửa dữ liệu |

## Triển khai lên Hostinger

Xem hướng dẫn chi tiết tại [DEPLOY.md](./DEPLOY.md).

## Cấu trúc thư mục chính

```
prisma/schema.prisma       Data model (Prisma)
src/app/(site)/            Các trang công khai (dùng layout có Header/Footer)
src/app/admin/             Trang quản trị (layout riêng, có xác thực)
src/app/api/               Route Handlers (booking, auth, upload)
src/actions/               Server Actions cho CRUD admin
src/components/site/       Component dùng cho trang công khai
src/components/admin/      Component dùng cho trang quản trị
src/lib/                   Prisma client, auth, mailer, validation, rate-limit
public/images/placeholder/ Ảnh placeholder — thay bằng ảnh thật qua trang quản trị
```
