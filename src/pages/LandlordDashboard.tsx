import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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

      // Check if user is a landlord
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
    <div className="min-h-screen p-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Landlord Dashboard</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">My Properties</h2>
          {/* Properties content will be implemented later */}
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Booking Requests</h2>
          {/* Booking requests content will be implemented later */}
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Messages</h2>
          {/* Messages content will be implemented later */}
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;