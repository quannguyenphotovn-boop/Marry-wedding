"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { pricingPackageSchema } from "@/lib/validation";

function parseFeatures(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function formToInput(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    priceFrom: String(formData.get("priceFrom") ?? "0"),
    priceLabel: String(formData.get("priceLabel") ?? ""),
    features: parseFeatures(String(formData.get("featuresText") ?? "")),
    isFeatured: formData.get("isFeatured") === "on",
    isPublished: formData.get("isPublished") === "on",
    sortOrder: String(formData.get("sortOrder") ?? "0"),
  };
}

export async function createPackage(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = pricingPackageSchema.parse(formToInput(formData));

  await prisma.pricingPackage.create({
    data: {
      name: parsed.name,
      slug: parsed.slug,
      tagline: parsed.tagline || null,
      priceFrom: parsed.priceFrom,
      priceLabel: parsed.priceLabel,
      featuresRaw: JSON.stringify(parsed.features),
      isFeatured: parsed.isFeatured ?? false,
      isPublished: parsed.isPublished ?? true,
      sortOrder: parsed.sortOrder ?? 0,
    },
  });

  revalidatePath("/admin/pricing");
  revalidatePath("/dich-vu");
  revalidatePath("/");
  redirect("/admin/pricing");
}

export async function updatePackage(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = pricingPackageSchema.parse(formToInput(formData));

  await prisma.pricingPackage.update({
    where: { id },
    data: {
      name: parsed.name,
      slug: parsed.slug,
      tagline: parsed.tagline || null,
      priceFrom: parsed.priceFrom,
      priceLabel: parsed.priceLabel,
      featuresRaw: JSON.stringify(parsed.features),
      isFeatured: parsed.isFeatured ?? false,
      isPublished: parsed.isPublished ?? true,
      sortOrder: parsed.sortOrder ?? 0,
    },
  });

  revalidatePath("/admin/pricing");
  revalidatePath("/dich-vu");
  revalidatePath("/");
  redirect("/admin/pricing");
}

export async function deletePackage(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.pricingPackage.delete({ where: { id } });
  revalidatePath("/admin/pricing");
  revalidatePath("/dich-vu");
  revalidatePath("/");
}
