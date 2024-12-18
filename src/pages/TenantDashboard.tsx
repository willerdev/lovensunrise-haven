import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Calendar, CreditCard, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/tenant/DashboardStats";
import { BookingsList } from "@/components/tenant/BookingsList";
import { PaymentMethods } from "@/components/tenant/PaymentMethods";
import { ProfileInfo } from "@/components/tenant/ProfileInfo";
import ProcurationView from "./tenant/ProcurationView";
import { DbBooking, DbProfile } from "@/types/database";

const TenantDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("home");
  const [profile, setProfile] = useState<DbProfile | null>(null);
  const [bookings, setBookings] = useState<DbBooking[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      // Check if user is a tenant
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error || profileData?.role !== "tenant") {
        toast({
          title: "Access Denied",
          description: "You don't have permission to view this page.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setProfile(profileData);

      // Fetch bookings with properties data
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select(`
          *,
          properties (*)
        `)
        .eq("tenant_id", session.user.id);

      if (bookingsError) {
        console.error("Error fetching bookings:", bookingsError);
        return;
      }

      console.log("Fetched bookings:", bookingsData);
      setBookings(bookingsData as DbBooking[]);
    };

    checkUser();
  }, [navigate, toast]);

  const MobileNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center">
      <button
        onClick={() => setActiveTab("home")}
        className={`flex flex-col items-center ${activeTab === "home" ? "text-blue-600" : "text-gray-500"}`}
      >
        <Home size={20} />
        <span className="text-xs">Home</span>
      </button>
      <button
        onClick={() => setActiveTab("bookings")}
        className={`flex flex-col items-center ${activeTab === "bookings" ? "text-blue-600" : "text-gray-500"}`}
      >
        <Calendar size={20} />
        <span className="text-xs">Bookings</span>
      </button>
      <button
        onClick={() => setActiveTab("payments")}
        className={`flex flex-col items-center ${activeTab === "payments" ? "text-blue-600" : "text-gray-500"}`}
      >
        <CreditCard size={20} />
        <span className="text-xs">Payments</span>
      </button>
      <button
        onClick={() => setActiveTab("profile")}
        className={`flex flex-col items-center ${activeTab === "profile" ? "text-blue-600" : "text-gray-500"}`}
      >
        <User size={20} />
        <span className="text-xs">Profile</span>
      </button>
    </nav>
  );

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
            <h1 className="text-2xl font-bold text-gray-900">Tenant Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="hidden md:flex">
            <TabsTrigger value="home">
              <Home className="mr-2 h-4 w-4" />
              Home
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="mr-2 h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className="mr-2 h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="procuration">
              Procuration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <DashboardStats bookings={bookings} />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsList bookings={bookings} />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentMethods />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileInfo profile={profile} />
          </TabsContent>

          <TabsContent value="procuration">
            <ProcurationView />
          </TabsContent>
        </Tabs>
      </div>

      <MobileNav />
    </div>
  );
};

export default TenantDashboard;