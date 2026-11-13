import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/actions/products";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal-900">Sửa sản phẩm: {product.name}</h1>
      <div className="mt-8">
        <ProductForm
          action={updateProduct.bind(null, product.id)}
          submitLabel="Lưu thay đổi"
          initialValues={{
            name: product.name,
            slug: product.slug,
            category: product.category,
            description: product.description ?? "",
            priceLabel: product.priceLabel,
            coverImageUrl: product.coverImageUrl,
            isFeatured: product.isFeatured,
            isPublished: product.isPublished,
            sortOrder: product.sortOrder,
          }}
        />
      </div>
    </div>
  );
}
