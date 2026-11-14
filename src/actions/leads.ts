"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { getSession } from "../lib/auth";

const VALID_STATUSES = ["new", "contacted", "converted", "archived"];

export async function updateLeadStatus(leadId: string, status: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  if (!VALID_STATUSES.includes(status)) throw new Error("Invalid status");

  await prisma.bookingLead.update({ where: { id: leadId }, data: { status } });
  revalidatePath("/admin/leads");
}
