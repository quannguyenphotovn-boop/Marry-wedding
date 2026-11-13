import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePackage } from "@/actions/pricing";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminPricingPage() {
  const packages = await prisma.pricingPackage.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-charcoal-900">Bảng giá</h1>
        <Link
          href="/admin/pricing/new"
          className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-ivory-50 hover:bg-gold-500"
        >
          + Thêm gói mới
        </Link>
      </div>

      <div className="mt-8 grid gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gold-100 bg-ivory-50 p-5"
          >
            <div>
              <p className="font-serif text-lg text-charcoal-900">
                {pkg.name} {pkg.isFeatured && <span className="text-xs text-gold-600">★ Nổi bật</span>}
              </p>
              <p className="text-sm text-charcoal-500">
                {pkg.priceLabel} · {pkg.isPublished ? "Đang hiển thị" : "Đã ẩn"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/pricing/${pkg.id}`} className="text-sm text-gold-600 hover:underline">
                Sửa
              </Link>
              <DeleteButton
                action={deletePackage.bind(null, pkg.id)}
                confirmText={`Xóa gói "${pkg.name}"? Hành động này không thể hoàn tác.`}
              />
            </div>
          </div>
        ))}

        {packages.length === 0 && (
          <p className="rounded-xl border border-gold-100 bg-ivory-50 p-8 text-center text-charcoal-500">
            Chưa có gói dịch vụ nào.
          </p>
        )}
      </div>
    </div>
  );
}
