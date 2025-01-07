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
import Properties from "./landlord/Properties";
import ProcurationView from "./landlord/ProcurationView";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

      console.log("Checking user role for:", session.user.id);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();

      console.log("Profile query result:", { profile, error });

      if (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to verify user permissions.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      if (!profile || profile.role !== "landlord") {
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Landlord Dashboard</h1>
          </div>
        </div>
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
                  <TabsTrigger value="procuration">Procuration</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <DashboardStats />
                </TabsContent>

                <TabsContent value="properties">
                  <PropertyList />
                </TabsContent>

                <TabsContent value="procuration">
                  <ProcurationView />
                </TabsContent>
              </Tabs>
            }
          />
          <Route path="/properties" element={<Properties />} />
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