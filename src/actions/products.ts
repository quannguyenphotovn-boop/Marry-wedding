"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { productSchema } from "@/lib/validation";

function formToInput(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    category: String(formData.get("category") ?? ""),
    description: String(formData.get("description") ?? ""),
    priceLabel: String(formData.get("priceLabel") ?? ""),
    coverImageUrl: String(formData.get("coverImageUrl") ?? ""),
    isFeatured: formData.get("isFeatured") === "on",
    isPublished: formData.get("isPublished") === "on",
    sortOrder: String(formData.get("sortOrder") ?? "0"),
  };
}

export async function createProduct(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = productSchema.parse(formToInput(formData));

  await prisma.product.create({
    data: {
      name: parsed.name,
      slug: parsed.slug,
      category: parsed.category,
      description: parsed.description || null,
      priceLabel: parsed.priceLabel,
      coverImageUrl: parsed.coverImageUrl,
      isFeatured: parsed.isFeatured ?? false,
      isPublished: parsed.isPublished ?? true,
      sortOrder: parsed.sortOrder ?? 0,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/san-pham");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = productSchema.parse(formToInput(formData));

  await prisma.product.update({
    where: { id },
    data: {
      name: parsed.name,
      slug: parsed.slug,
      category: parsed.category,
      description: parsed.description || null,
      priceLabel: parsed.priceLabel,
      coverImageUrl: parsed.coverImageUrl,
      isFeatured: parsed.isFeatured ?? false,
      isPublished: parsed.isPublished ?? true,
      sortOrder: parsed.sortOrder ?? 0,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/san-pham");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/san-pham");
  revalidatePath("/");
}
