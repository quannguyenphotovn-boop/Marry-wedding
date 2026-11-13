import { z } from "zod";

// VN phone: optional +84/84 prefix or leading 0, then 9-10 digits.
const vnPhoneRegex = /^(\+84|84|0)[1-9][0-9]{8,9}$/;

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Vui lòng nhập họ tên").max(120),
  phone: z
    .string()
    .trim()
    .regex(vnPhoneRegex, "Số điện thoại không hợp lệ"),
  email: z.email("Email không hợp lệ").optional().or(z.literal("")),
  weddingDate: z.string().optional().or(z.literal("")),
  packageInterest: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot: real users never see or fill this field. Deliberately NOT
  // constrained to be empty here — a validation error would tip off a bot
  // that the field is being checked. Instead the route handler reads this
  // value and silently pretends success when it's non-empty.
  website: z.string().max(200).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const loginSchema = z.object({
  email: z.email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export const pricingPackageSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và gạch ngang"),
  tagline: z.string().trim().max(200).optional().or(z.literal("")),
  priceFrom: z.coerce.number().int().min(0),
  priceLabel: z.string().trim().min(1).max(80),
  features: z.array(z.string().trim().min(1)).max(30),
  isFeatured: z.coerce.boolean().optional(),
  isPublished: z.coerce.boolean().optional(),
  sortOrder: z.coerce.number().int().optional(),
});

export const testimonialSchema = z.object({
  coupleName: z.string().trim().min(2).max(160),
  quote: z.string().trim().min(5).max(1000),
  avatarUrl: z.string().trim().max(500).optional().or(z.literal("")),
  weddingDate: z.string().optional().or(z.literal("")),
  rating: z.coerce.number().int().min(1).max(5),
  isPublished: z.coerce.boolean().optional(),
  sortOrder: z.coerce.number().int().optional(),
});

export const blogPostSchema = z.object({
  title: z.string().trim().min(2).max(200),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và gạch ngang"),
  excerpt: z.string().trim().min(5).max(400),
  contentMarkdown: z.string().trim().min(10),
  coverImageUrl: z.string().trim().min(1).max(500),
  authorName: z.string().trim().min(2).max(120),
  isPublished: z.coerce.boolean().optional(),
  metaTitle: z.string().trim().max(200).optional().or(z.literal("")),
  metaDescription: z.string().trim().max(300).optional().or(z.literal("")),
});

export const galleryAlbumSchema = z.object({
  title: z.string().trim().min(2).max(160),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và gạch ngang"),
  category: z.enum([
    "pre_wedding",
    "wedding_day",
    "studio",
    "concept",
    "destination",
    "film",
  ]),
  coverImageUrl: z.string().trim().min(1).max(500),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  isPublished: z.coerce.boolean().optional(),
  sortOrder: z.coerce.number().int().optional(),
});

export const GALLERY_CATEGORY_LABELS: Record<string, string> = {
  pre_wedding: "Pre-wedding",
  wedding_day: "Ngày cưới",
  studio: "Chụp Studio",
  concept: "Concept",
  destination: "Destination",
  film: "Phóng sự cưới",
};

export const productSchema = z.object({
  name: z.string().trim().min(2).max(160),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và gạch ngang"),
  category: z.enum(["album", "in-anh", "khung-anh", "usb-qua-tang", "khac"]),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  priceLabel: z.string().trim().min(1).max(80),
  coverImageUrl: z.string().trim().min(1).max(500),
  isFeatured: z.coerce.boolean().optional(),
  isPublished: z.coerce.boolean().optional(),
  sortOrder: z.coerce.number().int().optional(),
});

export const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  album: "Album ảnh cưới",
  "in-anh": "Ảnh in cao cấp",
  "khung-anh": "Khung ảnh & tranh treo",
  "usb-qua-tang": "USB & quà tặng",
  khac: "Sản phẩm khác",
};
