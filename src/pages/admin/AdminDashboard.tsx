import { useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Building2, Users, Map, Category, Users2, MessageSquare, FileText, UserCog, LogOut } from "lucide-react";
import { Outlet } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    }
  };

  const menuItems = [
    {
      title: "Properties",
      url: "/admin-dashboard/properties",
      icon: Building2,
    },
    {
      title: "Lands",
      url: "/admin-dashboard/lands",
      icon: Map,
    },
    {
      title: "Categories",
      url: "/admin-dashboard/categories",
      icon: Category,
    },
    {
      title: "Users",
      url: "/admin-dashboard/users",
      icon: Users,
    },
    {
      title: "Partners",
      url: "/admin-dashboard/partners",
      icon: Users2,
    },
    {
      title: "Complaints",
      url: "/admin-dashboard/complaints",
      icon: MessageSquare,
    },
    {
      title: "Procurations",
      url: "/admin-dashboard/procurations",
      icon: FileText,
    },
    {
      title: "Broker Agents",
      url: "/admin-dashboard/brokers",
      icon: UserCog,
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2 w-full text-red-500">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;