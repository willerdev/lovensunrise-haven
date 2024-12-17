import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "@/components/landlord/DashboardStats";
import { PropertyList } from "@/components/landlord/PropertyList";
import { LandlordMobileNav } from "@/components/landlord/MobileNav";
import LandlordBookings from "./landlord/Bookings";
import LandlordPayments from "./landlord/Payments";
import LandlordProfile from "./landlord/Profile";

const LandlordDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error || profile?.role !== "landlord") {
        toast({
          title: "Access Denied",
          description: "You don't have permission to view this page.",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkUser();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Landlord Dashboard</h1>
      </header>

      <div className="container mx-auto px-4">
        <Routes>
          <Route
            path="/"
            element={
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="hidden md:flex">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="properties">Properties</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <DashboardStats />
                </TabsContent>

                <TabsContent value="properties">
                  <PropertyList />
                </TabsContent>
              </Tabs>
            }
          />
          <Route path="/bookings" element={<LandlordBookings />} />
          <Route path="/payments" element={<LandlordPayments />} />
          <Route path="/profile" element={<LandlordProfile />} />
        </Routes>
      </div>

      <LandlordMobileNav />
    </div>
  );
};

export default LandlordDashboard;