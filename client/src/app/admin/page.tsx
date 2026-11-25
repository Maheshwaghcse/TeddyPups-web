import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export default function AdminPage() {
  return (
    <div className="bg-[#FAF0DC] min-h-screen py-12 sm:py-16">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <AdminDashboardClient />
      </div>
    </div>
  );
}

