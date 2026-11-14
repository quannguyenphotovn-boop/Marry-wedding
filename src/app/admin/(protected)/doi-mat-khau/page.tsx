import { ChangePasswordForm } from "../../../../components/admin/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal-900">Đổi mật khẩu</h1>
      <div className="mt-8">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
