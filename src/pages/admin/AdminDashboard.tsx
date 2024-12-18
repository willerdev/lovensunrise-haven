import { Outlet, useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import DashboardStats from "@/components/admin/DashboardStats";

const AdminDashboard = () => {
  const location = useLocation();
  const isDefaultRoute = location.pathname === '/admin-dashboard';

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-50">
        {isDefaultRoute ? <DashboardStats /> : <Outlet />}
      </main>
    </div>
  );
};

export default AdminDashboard;