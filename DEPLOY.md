# Hướng dẫn Deploy — MARRY WEDDING

Website chạy như một ứng dụng **Node.js** độc lập (không phải site tĩnh). Sau `npm run build`,
Next.js tạo ra `.next/standalone/server.js` — **một file duy nhất** lắng nghe `process.env.PORT`,
dùng chung cho cả hai cách deploy dưới đây (chỉ khác cấu hình, không khác code).

---

## 0. Trước khi deploy lần đầu

### 0.1. Đẩy code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<tai-khoan>/<ten-repo>.git
git push -u origin main
```

> `.env` đã được `.gitignore` loại trừ — sẽ **không** bị đẩy lên GitHub. Đây là chủ đích: secret
> thật (mật khẩu email, SESSION_SECRET...) phải tạo trực tiếp trên server, không qua git.

### 0.2. Chuyển database từ SQLite sang MySQL

Local dev dùng SQLite (`prisma/schema.prisma` có `provider = "sqlite"`) để không cần cài MySQL
trên máy cá nhân. **Trên Hostinger (production), đổi sang MySQL** — Hostinger cấp sẵn MySQL miễn
phí trong mọi gói hosting/Business/Cloud:

1. Trong hPanel → **Databases → MySQL Databases**, tạo database + user mới, ghi lại:
   `tên database`, `username`, `password`, `host` (thường là `localhost`).
2. Sửa `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "mysql"   // đổi từ "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
3. Trên server, đặt `DATABASE_URL="mysql://username:password@localhost:3306/ten_database"`.
4. Chạy `npx prisma migrate deploy` (hoặc `npx prisma db push` cho lần đầu) để tạo bảng trên MySQL.

Schema này không dùng `enum` hay kiểu `Json` gốc của Prisma (dùng `String` thay thế) — đây là
chủ đích, vì SQLite không hỗ trợ `enum`, nên schema giữ nguyên không đổi khi chuyển qua MySQL.

### 0.3. ⚠️ Cách Next.js nạp biến môi trường ở bản build "standalone" — đọc kỹ

`next build` **tự động copy file `.env` đang có vào `.next/standalone/.env`** tại thời điểm
build. File `server.js` không tự đọc biến môi trường của hệ điều hành theo cách thông thường —
nó dựa vào file `.env` đã được copy đó.

- Nếu bạn set biến môi trường thật ở **cấp hệ thống/hPanel/PM2** (khuyến nghị, xem các bước dưới),
  các giá trị đó sẽ **được ưu tiên hơn** file `.env` đã copy — an toàn, không cần commit secret.
- Nếu bạn chỉ đặt giá trị trong file `.env` rồi build, hãy nhớ: **phải build LẠI sau khi sửa
  `.env`** để bản `.next/standalone/.env` được cập nhật. Sửa `.env` mà không build lại sẽ khiến
  server chạy với giá trị cũ.

👉 Cách an toàn nhất: luôn build trực tiếp trên server (sau khi đã tạo `.env` thật ở đó), **hoặc**
set biến môi trường thật qua giao diện hPanel / PM2 — không phụ thuộc vào file `.env` lúc runtime.

---

## Phương án A — Hostinger hPanel "Setup Node.js App" (shared/Business/Cloud hosting)

1. Trong hPanel, vào **Advanced → Node.js** → **Create Application**.
2. Chọn phiên bản Node.js **20 hoặc mới hơn** (bắt buộc — Next.js 15 không hỗ trợ Node 18).
3. **Application root**: thư mục chứa code (ví dụ `/home/<user>/marry-wedding`).
4. **Application startup file**: `.next/standalone/server.js`
5. Kéo code lên server: dùng Git (hPanel thường có tùy chọn pull từ GitHub repo), hoặc SSH +
   `git clone`.
6. Trong phần **Environment variables** của hPanel, thêm từng biến (tham khảo `.env.example`):
   `DATABASE_URL`, `SESSION_SECRET`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`,
   `SMTP_PASS`, `MAIL_FROM`, `MAIL_TO`, `NEXT_PUBLIC_SITE_URL`, `UPLOAD_MAX_SIZE_MB`. **Không**
   set `PORT` — Passenger tự tiêm biến này.
7. Qua terminal/SSH trong application root:
   ```bash
   npm install
   npx prisma generate
   npx prisma migrate deploy     # hoặc: npx prisma db push (lần đầu)
   npm run db:seed               # tạo tài khoản admin đầu tiên — đổi mật khẩu ngay sau đó
   npm run build
   ```
8. Bấm **Restart** trong hPanel Node.js App.
9. Vào `https://<domain-cua-ban>/admin` để đăng nhập quản trị.

**Quan trọng khi redeploy lần sau:** chỉ `git pull` rồi `npm install && npm run build` rồi
Restart — **không** xóa/ghi đè toàn bộ thư mục ứng dụng, vì ảnh đã upload nằm ở
`public/uploads/` (không nằm trong git) và sẽ mất nếu bị ghi đè.

---

## Phương án B — Hostinger VPS (PM2 + Nginx)

1. SSH vào VPS, cài Node.js 20+ (ví dụ qua `nvm`), Nginx, và Git.
2. ```bash
   git clone https://github.com/<tai-khoan>/<ten-repo>.git
   cd <ten-repo>
   nano .env           # tạo file .env thật với giá trị production (xem .env.example)
   npm install
   npx prisma generate
   npx prisma migrate deploy
   npm run db:seed
   npm run build
   ```
3. Cài PM2 toàn cục: `npm install -g pm2`
4. Chạy: `pm2 start ecosystem.config.js` rồi `pm2 save` và `pm2 startup` (để tự chạy lại khi
   server reboot).
5. Cấu hình Nginx reverse proxy trỏ về `127.0.0.1:3000` (hoặc `PORT` bạn chọn trong
   `ecosystem.config.js`), ví dụ:
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_set_header Host $host;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }
   ```
6. Cài SSL miễn phí: `sudo certbot --nginx -d your-domain.com`.

**⚠️ Nếu dùng SQLite fallback trên VPS** (thay vì MySQL): chỉ chạy **1 instance** duy nhất
(`instances: 1`, `exec_mode: "fork"` — đã đặt sẵn trong `ecosystem.config.js`). **Không** bật PM2
cluster mode với SQLite — nhiều worker ghi đồng thời vào 1 file SQLite sẽ gây lỗi khóa file. Nếu
cần chạy nhiều instance, hãy dùng MySQL (xem mục 0.2).

**Redeploy lần sau:**
```bash
git pull
npm install
npx prisma migrate deploy
npm run build
pm2 restart marry-wedding
```

---

## Sau khi deploy — checklist

- [ ] Đổi `ADMIN_SEED_PASSWORD` / đăng nhập `/admin` rồi đổi mật khẩu (hiện chưa có màn hình đổi
      mật khẩu trong UI — có thể cập nhật trực tiếp qua `npx prisma studio` hoặc tạo tài khoản
      admin mới qua script seed với email khác).
- [ ] Test gửi email: điền form tại `/lien-he`, kiểm tra hộp mail `marrywedding95@gmail.com`
      nhận được thông báo. Nếu dùng Gmail SMTP, nhớ dùng **App Password**
      (https://myaccount.google.com/apppasswords), không dùng mật khẩu Gmail thường.
- [ ] Vào `/admin` thay toàn bộ ảnh placeholder (`public/images/placeholder/...`) bằng ảnh thật
      qua các trang quản lý Gallery/Blog/Testimonials.
- [ ] Kiểm tra `https://<domain>/sitemap.xml` và `/robots.txt` trả về đúng nội dung.
- [ ] Trỏ domain thật về Hostinger (DNS A record / Nameserver theo hướng dẫn Hostinger) và cập
      nhật `NEXT_PUBLIC_SITE_URL` cho đúng domain thật, rồi build lại.

## Khắc phục lỗi thường gặp

| Lỗi | Nguyên nhân thường gặp |
|---|---|
| `Table does not exist` khi chạy production | Chưa chạy `npx prisma migrate deploy`/`db push` trên database production, hoặc `DATABASE_URL` sai |
| Trang chạy nhưng dữ liệu cũ/sai dù đã sửa `.env` | Chưa build lại sau khi sửa `.env` — xem mục 0.3 |
| Ảnh upload biến mất sau khi deploy lại | Deploy bằng cách ghi đè toàn bộ thư mục thay vì `git pull` — xem lưu ý ở Phương án A/B |
| Không gửi được email thông báo đặt lịch | Sai `SMTP_USER`/`SMTP_PASS`, hoặc dùng mật khẩu Gmail thường thay vì App Password. Lead vẫn được lưu trong `/admin/leads`, chỉ là chưa gửi email — không mất dữ liệu |
