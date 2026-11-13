import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const PLACEHOLDER = {
  hero: "/images/placeholder/hero-01.svg",
  album1: "/images/placeholder/album-studio.svg",
  album2: "/images/placeholder/album-prewedding.svg",
  album3: "/images/placeholder/album-destination.svg",
  blog1: "/images/placeholder/blog-01.svg",
  blog2: "/images/placeholder/blog-02.svg",
  blog3: "/images/placeholder/blog-03.svg",
};

async function main() {
  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? "admin@marrywedding.vn";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "ChangeMe123!";

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Quản trị viên MARRY WEDDING",
      passwordHash: await bcrypt.hash(adminPassword, 12),
    },
  });
  console.log(`Seeded admin user: ${adminEmail}`);

  const packages = [
    {
      name: "Gói Tình Yêu",
      slug: "goi-tinh-yeu",
      tagline: "Lựa chọn trọn vẹn cho ngày trọng đại",
      priceFrom: 15000000,
      priceLabel: "Từ 15.000.000đ",
      featuresRaw: JSON.stringify([
        "1 ngày chụp ảnh cưới studio",
        "20 ảnh chỉnh sửa cao cấp",
        "1 album in ảnh 30x40cm",
        "Trang điểm & làm tóc cô dâu",
      ]),
      isFeatured: false,
      sortOrder: 1,
    },
    {
      name: "Gói Vĩnh Cửu",
      slug: "goi-vinh-cuu",
      tagline: "Lưu giữ từng khoảnh khắc đáng nhớ",
      priceFrom: 28000000,
      priceLabel: "Từ 28.000.000đ",
      featuresRaw: JSON.stringify([
        "2 ngày chụp: Studio + Ngoại cảnh",
        "40 ảnh chỉnh sửa cao cấp",
        "1 album cao cấp 30x40cm bọc da",
        "Phóng sự cưới 3-5 phút",
        "Trang điểm & làm tóc cô dâu 2 lượt",
      ]),
      isFeatured: true,
      sortOrder: 2,
    },
    {
      name: "Gói Hoàng Gia",
      slug: "goi-hoang-gia",
      tagline: "Trải nghiệm đám cưới đẳng cấp",
      priceFrom: 55000000,
      priceLabel: "Từ 55.000.000đ",
      featuresRaw: JSON.stringify([
        "3 ngày chụp: Studio + Ngoại cảnh + Destination",
        "80 ảnh chỉnh sửa cao cấp + toàn bộ ảnh gốc",
        "2 album cao cấp bọc da cao cấp",
        "Phim cưới điện ảnh 8-10 phút",
        "Đội ngũ 2 photographer + 1 videographer riêng",
        "Trang điểm & làm tóc cô dâu không giới hạn lượt",
      ]),
      isFeatured: false,
      sortOrder: 3,
    },
  ];

  for (const pkg of packages) {
    await prisma.pricingPackage.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
  }
  console.log(`Seeded ${packages.length} pricing packages`);

  const albums = [
    {
      title: "Studio Cổ Điển Sang Trọng",
      slug: "studio-co-dien-sang-trong",
      category: "studio",
      coverImageUrl: PLACEHOLDER.album1,
      description: "Bộ ảnh cưới chụp tại studio với phong cách cổ điển, sang trọng.",
      isPublished: true,
      sortOrder: 1,
      photos: [PLACEHOLDER.album1, PLACEHOLDER.album2, PLACEHOLDER.album3],
    },
    {
      title: "Pre-Wedding Đồng Quê",
      slug: "pre-wedding-dong-que",
      category: "pre_wedding",
      coverImageUrl: PLACEHOLDER.album2,
      description: "Bộ ảnh pre-wedding lãng mạn giữa khung cảnh đồng quê Bắc Ninh.",
      isPublished: true,
      sortOrder: 2,
      photos: [PLACEHOLDER.album2, PLACEHOLDER.album1],
    },
    {
      title: "Destination Wedding Đà Lạt",
      slug: "destination-wedding-da-lat",
      category: "destination",
      coverImageUrl: PLACEHOLDER.album3,
      description: "Hành trình ghi lại tình yêu giữa núi rừng và sương mù Đà Lạt.",
      isPublished: true,
      sortOrder: 3,
      photos: [PLACEHOLDER.album3, PLACEHOLDER.album2, PLACEHOLDER.album1],
    },
  ];

  for (const album of albums) {
    const { photos, ...albumData } = album;
    const created = await prisma.galleryAlbum.upsert({
      where: { slug: album.slug },
      update: albumData,
      create: albumData,
    });
    const existingPhotos = await prisma.galleryPhoto.count({ where: { albumId: created.id } });
    if (existingPhotos === 0) {
      await prisma.galleryPhoto.createMany({
        data: photos.map((url, idx) => ({
          albumId: created.id,
          imageUrl: url,
          altText: `${album.title} - ảnh ${idx + 1}`,
          sortOrder: idx,
        })),
      });
    }
  }
  console.log(`Seeded ${albums.length} gallery albums`);

  const posts = [
    {
      title: "5 Xu Hướng Chụp Ảnh Cưới Được Yêu Thích Năm 2026",
      slug: "5-xu-huong-chup-anh-cuoi-2026",
      excerpt: "Cùng MARRY WEDDING khám phá những xu hướng chụp ảnh cưới đang làm mưa làm gió.",
      contentMarkdown:
        "## Xu hướng ánh sáng tự nhiên\n\nÁnh sáng tự nhiên tiếp tục là lựa chọn hàng đầu...\n\n## Phong cách tối giản\n\nCác cặp đôi ngày càng ưa chuộng...",
      coverImageUrl: PLACEHOLDER.blog1,
      authorName: "MARRY WEDDING",
      isPublished: true,
      publishedAt: new Date(),
      metaTitle: "5 Xu Hướng Chụp Ảnh Cưới 2026",
      metaDescription: "Khám phá các xu hướng chụp ảnh cưới nổi bật năm 2026 cùng MARRY WEDDING.",
    },
    {
      title: "Kinh Nghiệm Chọn Gói Chụp Ảnh Cưới Phù Hợp",
      slug: "kinh-nghiem-chon-goi-chup-anh-cuoi",
      excerpt: "Những lưu ý quan trọng giúp cô dâu chú rể chọn được gói dịch vụ phù hợp nhất.",
      contentMarkdown:
        "## Xác định ngân sách\n\nTrước tiên, hãy xác định rõ ngân sách...\n\n## Tham khảo album mẫu\n\nHãy yêu cầu xem album thực tế...",
      coverImageUrl: PLACEHOLDER.blog2,
      authorName: "MARRY WEDDING",
      isPublished: true,
      publishedAt: new Date(),
      metaTitle: "Kinh Nghiệm Chọn Gói Chụp Ảnh Cưới",
      metaDescription: "Hướng dẫn chọn gói chụp ảnh cưới phù hợp với ngân sách và mong muốn.",
    },
    {
      title: "Hậu Trường Buổi Chụp Destination Wedding Tại Đà Lạt",
      slug: "hau-truong-destination-wedding-da-lat",
      excerpt: "Cùng nhìn lại những khoảnh khắc hậu trường đáng nhớ tại Đà Lạt.",
      contentMarkdown:
        "## Chuẩn bị trước chuyến đi\n\nĐội ngũ MARRY WEDDING đã chuẩn bị kỹ lưỡng...\n\n## Những khoảnh khắc đáng nhớ\n\n...",
      coverImageUrl: PLACEHOLDER.blog3,
      authorName: "MARRY WEDDING",
      isPublished: true,
      publishedAt: new Date(),
      metaTitle: "Hậu Trường Destination Wedding Đà Lạt",
      metaDescription: "Khoảnh khắc hậu trường buổi chụp destination wedding tại Đà Lạt.",
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`Seeded ${posts.length} blog posts`);

  const testimonials = [
    {
      coupleName: "Minh Anh & Đức Huy",
      quote:
        "MARRY WEDDING đã lưu giữ trọn vẹn những khoảnh khắc hạnh phúc nhất của chúng tôi. Đội ngũ chuyên nghiệp, tận tâm từ A-Z.",
      rating: 5,
      isPublished: true,
      sortOrder: 1,
    },
    {
      coupleName: "Thu Trang & Quốc Bảo",
      quote:
        "Album ảnh đẹp ngoài mong đợi, concept sáng tạo và đội ngũ rất kiên nhẫn hướng dẫn tạo dáng cho cả hai.",
      rating: 5,
      isPublished: true,
      sortOrder: 2,
    },
    {
      coupleName: "Ngọc Hà & Tuấn Kiệt",
      quote:
        "Dịch vụ cao cấp, giá trị tương xứng. Phim cưới quá xúc động, xem lại vẫn rơi nước mắt.",
      rating: 5,
      isPublished: true,
      sortOrder: 3,
    },
    {
      coupleName: "Phương Linh & Gia Huy",
      quote: "Rất hài lòng về chất lượng ảnh và sự chu đáo của toàn bộ team MARRY WEDDING.",
      rating: 5,
      isPublished: true,
      sortOrder: 4,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { coupleName: t.coupleName } });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log(`Seeded ${testimonials.length} testimonials`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
