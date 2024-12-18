import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Building2, Users, Map, Grid2X2, Users2, 
  MessageSquare, FileText, UserCog, LogOut,
  ChevronLeft, ChevronRight, Loader, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
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
      icon: Grid2X2,
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
      url: "/admin-dashboard/agents",
      icon: UserCog,
    },
    {
      title: "Site Settings",
      url: "/admin-dashboard/settings",
      icon: Settings,
    },
  ];

  const handleNavigation = async (url: string) => {
    setIsLoading(url);
    navigate(url);
    setTimeout(() => setIsLoading(null), 500);
  };

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className={cn(
            "font-semibold transition-all duration-300",
            isCollapsed ? "hidden" : "block"
          )}>
            Admin Dashboard
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          {menuItems.map((item) => (
            <Button
              key={item.url}
              variant={location.pathname === item.url ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start mb-1",
                isCollapsed ? "px-2" : "px-4"
              )}
              onClick={() => handleNavigation(item.url)}
            >
              {isLoading === item.url ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <item.icon className="h-5 w-5" />
              )}
              {!isCollapsed && (
                <span className="ml-2">{item.title}</span>
              )}
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50",
              isCollapsed ? "px-2" : "px-4"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};