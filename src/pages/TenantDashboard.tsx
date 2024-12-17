import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Calendar, CreditCard, MessageCircle, AlertTriangle, User } from "lucide-react";
import { format } from "date-fns";

const TenantDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("home");
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

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

      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select(`
          *,
          properties (
            title,
            address,
            owner_id,
            price
          )
        `)
        .eq("tenant_id", session.user.id);

      setBookings(bookingsData || []);
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
        <h1 className="text-2xl font-bold text-gray-900">Tenant Dashboard</h1>
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
          </TabsList>

          <TabsContent value="home">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Current Residence</CardTitle>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div>
                      <p className="font-medium">{bookings[0].properties.title}</p>
                      <p className="text-sm text-gray-500">{bookings[0].properties.address}</p>
                      <p className="mt-2">
                        Time spent: {format(new Date(bookings[0].start_date), 'PP')} - Present
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No active residence</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Next Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div>
                      <p className="text-2xl font-bold">${bookings[0].properties.price}</p>
                      <p className="text-sm text-gray-500">Due on {format(new Date(), 'PP')}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No pending payments</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button className="flex items-center text-blue-600 hover:text-blue-700">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message Landlord
                  </button>
                  <button className="flex items-center text-blue-600 hover:text-blue-700">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Submit Complaint
                  </button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border-b pb-4">
                        <h3 className="font-medium">{booking.properties.title}</h3>
                        <p className="text-sm text-gray-500">{booking.properties.address}</p>
                        <p className="text-sm">
                          {format(new Date(booking.start_date), 'PP')} - {format(new Date(booking.end_date), 'PP')}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No bookings yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <button className="p-4 border rounded-lg text-center hover:bg-gray-50">
                    <CreditCard className="mx-auto mb-2" />
                    Bank Transfer
                  </button>
                  <button className="p-4 border rounded-lg text-center hover:bg-gray-50">
                    <CreditCard className="mx-auto mb-2" />
                    Mobile Money
                  </button>
                  <button className="p-4 border rounded-lg text-center hover:bg-gray-50">
                    <CreditCard className="mx-auto mb-2" />
                    Cash Payment
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile && (
                  <>
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <p>{profile.full_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p>{profile.phone}</p>
                    </div>
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => supabase.auth.signOut()}
                      className="w-full border border-red-600 text-red-600 py-2 rounded-lg hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <MobileNav />
    </div>
  );
};

export default TenantDashboard;