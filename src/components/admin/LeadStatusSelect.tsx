"use client";

import { useState, useTransition } from "react";
import { updateLeadStatus } from "../../actions/leads";

const STATUS_LABELS: Record<string, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  converted: "Đã chốt",
  archived: "Lưu trữ",
};

export function LeadStatusSelect({ leadId, status }: { leadId: string; status: string }) {
  const [value, setValue] = useState(status);
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value;
        setValue(next);
        startTransition(async () => {
          await updateLeadStatus(leadId, next);
        });
      }}
      className="rounded-full border border-gold-200 bg-ivory-50 px-3 py-1.5 text-xs"
    >
      {Object.entries(STATUS_LABELS).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
}
