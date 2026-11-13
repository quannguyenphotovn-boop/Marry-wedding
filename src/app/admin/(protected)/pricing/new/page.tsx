import { createPackage } from "@/actions/pricing";
import { PackageForm } from "@/components/admin/PackageForm";

export default function NewPackagePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal-900">Thêm gói dịch vụ mới</h1>
      <div className="mt-8">
        <PackageForm action={createPackage} submitLabel="Tạo gói dịch vụ" />
      </div>
    </div>
  );
}
