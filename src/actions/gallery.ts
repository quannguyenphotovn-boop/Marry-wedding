"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { galleryAlbumSchema } from "@/lib/validation";

function formToAlbumInput(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    category: String(formData.get("category") ?? ""),
    coverImageUrl: String(formData.get("coverImageUrl") ?? ""),
    description: String(formData.get("description") ?? ""),
    isPublished: formData.get("isPublished") === "on",
    sortOrder: String(formData.get("sortOrder") ?? "0"),
  };
}

export async function createAlbum(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = galleryAlbumSchema.parse(formToAlbumInput(formData));

  const album = await prisma.galleryAlbum.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      category: parsed.category,
      coverImageUrl: parsed.coverImageUrl,
      description: parsed.description || null,
      isPublished: parsed.isPublished ?? false,
      sortOrder: parsed.sortOrder ?? 0,
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/bo-suu-tap");
  revalidatePath("/");
  redirect(`/admin/gallery/${album.id}`);
}

export async function updateAlbum(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = galleryAlbumSchema.parse(formToAlbumInput(formData));

  await prisma.galleryAlbum.update({
    where: { id },
    data: {
      title: parsed.title,
      slug: parsed.slug,
      category: parsed.category,
      coverImageUrl: parsed.coverImageUrl,
      description: parsed.description || null,
      isPublished: parsed.isPublished ?? false,
      sortOrder: parsed.sortOrder ?? 0,
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/bo-suu-tap");
  revalidatePath("/");
  redirect(`/admin/gallery/${id}`);
}

export async function deleteAlbum(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.galleryAlbum.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/bo-suu-tap");
  revalidatePath("/");
}

export async function addPhoto(albumId: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const altText = String(formData.get("altText") ?? "").trim();
  if (!imageUrl) throw new Error("Thiếu đường dẫn ảnh.");

  const maxSort = await prisma.galleryPhoto.aggregate({
    where: { albumId },
    _max: { sortOrder: true },
  });

  await prisma.galleryPhoto.create({
    data: {
      albumId,
      imageUrl,
      altText: altText || "Ảnh bộ sưu tập MARRY WEDDING",
      sortOrder: (maxSort._max.sortOrder ?? -1) + 1,
    },
  });

  revalidatePath(`/admin/gallery/${albumId}`);
  revalidatePath("/bo-suu-tap");
}

export async function deletePhoto(photoId: string, albumId: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.galleryPhoto.delete({ where: { id: photoId } });
  revalidatePath(`/admin/gallery/${albumId}`);
  revalidatePath("/bo-suu-tap");
}
