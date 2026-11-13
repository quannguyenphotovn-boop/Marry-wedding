"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function DeleteButton({
  action,
  confirmText,
}: {
  action: () => Promise<void>;
  confirmText: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!window.confirm(confirmText)) return;
        startTransition(async () => {
          await action();
          router.refresh();
        });
      }}
      className="text-sm text-red-600 hover:text-red-700 disabled:opacity-60"
    >
      {isPending ? "Đang xóa..." : "Xóa"}
    </button>
  );
}
