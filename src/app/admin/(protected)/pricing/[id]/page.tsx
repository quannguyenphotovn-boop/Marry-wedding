import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePackage } from "@/actions/pricing";
import { PackageForm } from "@/components/admin/PackageForm";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = await prisma.pricingPackage.findUnique({ where: { id } });
  if (!pkg) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal-900">Sửa gói: {pkg.name}</h1>
      <div className="mt-8">
        <PackageForm
          action={updatePackage.bind(null, pkg.id)}
          submitLabel="Lưu thay đổi"
          initialValues={{
            name: pkg.name,
            slug: pkg.slug,
            tagline: pkg.tagline ?? "",
            priceFrom: pkg.priceFrom,
            priceLabel: pkg.priceLabel,
            features: JSON.parse(pkg.featuresRaw) as string[],
            isFeatured: pkg.isFeatured,
            isPublished: pkg.isPublished,
            sortOrder: pkg.sortOrder,
          }}
        />
      </div>
    </div>
  );
}
