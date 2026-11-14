import { createProduct } from "../../../../../actions/products";
import { ProductForm } from "../../../../../components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal-900">Thêm sản phẩm mới</h1>
      <div className="mt-8">
        <ProductForm action={createProduct} submitLabel="Tạo sản phẩm" />
      </div>
    </div>
  );
}
