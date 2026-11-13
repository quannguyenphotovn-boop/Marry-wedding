"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { testimonialSchema } from "@/lib/validation";

function formToInput(formData: FormData) {
  return {
    coupleName: String(formData.get("coupleName") ?? ""),
    quote: String(formData.get("quote") ?? ""),
    avatarUrl: String(formData.get("avatarUrl") ?? ""),
    weddingDate: String(formData.get("weddingDate") ?? ""),
    rating: String(formData.get("rating") ?? "5"),
    isPublished: formData.get("isPublished") === "on",
    sortOrder: String(formData.get("sortOrder") ?? "0"),
  };
}

export async function createTestimonial(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = testimonialSchema.parse(formToInput(formData));

  await prisma.testimonial.create({
    data: {
      coupleName: parsed.coupleName,
      quote: parsed.quote,
      avatarUrl: parsed.avatarUrl || null,
      weddingDate: parsed.weddingDate ? new Date(parsed.weddingDate) : null,
      rating: parsed.rating,
      isPublished: parsed.isPublished ?? true,
      sortOrder: parsed.sortOrder ?? 0,
    },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = testimonialSchema.parse(formToInput(formData));

  await prisma.testimonial.update({
    where: { id },
    data: {
      coupleName: parsed.coupleName,
      quote: parsed.quote,
      avatarUrl: parsed.avatarUrl || null,
      weddingDate: parsed.weddingDate ? new Date(parsed.weddingDate) : null,
      rating: parsed.rating,
      isPublished: parsed.isPublished ?? true,
      sortOrder: parsed.sortOrder ?? 0,
    },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
