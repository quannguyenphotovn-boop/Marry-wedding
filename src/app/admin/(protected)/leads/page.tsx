import { prisma } from "@/lib/prisma";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";

export default async function AdminLeadsPage() {
  const leads = await prisma.bookingLead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal-900">Khách hàng đặt lịch</h1>

      <div className="mt-8 overflow-x-auto rounded-xl border border-gold-100 bg-ivory-50">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-gold-100 text-left text-charcoal-500">
              <th className="px-4 py-3">Ngày gửi</th>
              <th className="px-4 py-3">Họ tên</th>
              <th className="px-4 py-3">Liên hệ</th>
              <th className="px-4 py-3">Gói quan tâm</th>
              <th className="px-4 py-3">Lời nhắn</th>
              <th className="px-4 py-3">Email thông báo</th>
              <th className="px-4 py-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-gold-50 align-top">
                <td className="px-4 py-3 whitespace-nowrap text-charcoal-500">
                  {new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(
                    lead.createdAt,
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-charcoal-900">{lead.fullName}</td>
                <td className="px-4 py-3">
                  <div>{lead.phone}</div>
                  {lead.email && <div className="text-charcoal-500">{lead.email}</div>}
                </td>
                <td className="px-4 py-3">{lead.packageInterest || "—"}</td>
                <td className="px-4 py-3 max-w-xs">{lead.message || "—"}</td>
                <td className="px-4 py-3">
                  {lead.notified ? (
                    <span className="text-green-700">Đã gửi</span>
                  ) : (
                    <span className="text-amber-700">Chưa gửi — cần liên hệ thủ công</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <LeadStatusSelect leadId={lead.id} status={lead.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {leads.length === 0 && (
          <p className="p-8 text-center text-charcoal-500">Chưa có yêu cầu đặt lịch nào.</p>
        )}
      </div>
    </div>
  );
}
