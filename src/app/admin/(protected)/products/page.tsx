import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/actions/products";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/validation";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-charcoal-900">Sản phẩm</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-ivory-50 hover:bg-gold-500"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      <div className="mt-8 grid gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gold-100 bg-ivory-50 p-5"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                <Image src={p.coverImageUrl} alt={p.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-serif text-lg text-charcoal-900">
                  {p.name} {p.isFeatured && <span className="text-xs text-gold-600">★ Nổi bật</span>}
                </p>
                <p className="text-sm text-charcoal-500">
                  {PRODUCT_CATEGORY_LABELS[p.category] ?? p.category} · {p.priceLabel} ·{" "}
                  {p.isPublished ? "Đang hiển thị" : "Đã ẩn"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/products/${p.id}`} className="text-sm text-gold-600 hover:underline">
                Sửa
              </Link>
              <DeleteButton
                action={deleteProduct.bind(null, p.id)}
                confirmText={`Xóa sản phẩm "${p.name}"?`}
              />
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="rounded-xl border border-gold-100 bg-ivory-50 p-8 text-center text-charcoal-500">
            Chưa có sản phẩm nào.
          </p>
        )}
      </div>
    </div>
  );
}
