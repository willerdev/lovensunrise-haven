import { useEffect } from "react";
import { MobileNav } from "../components/MobileNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProfileMenu } from "@/components/ProfileMenu";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      return profile;
    },
  });

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="p-4 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <h1 className="text-2xl font-semibold text-center">Profile</h1>
      </header>

      <main className="container mx-auto p-4 max-w-md">
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <ProfileMenu />
          {userProfile?.role === "admin" && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/admin-dashboard")}
            >
              Admin Dashboard
            </Button>
          )}
          {!userProfile ? (
            <div className="flex flex-col gap-2">
              <Button onClick={() => navigate("/login")}>Log In</Button>
              <Button variant="outline" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </div>
          ) : (
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default Profile;