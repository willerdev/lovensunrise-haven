import React from "react";
import { MobileNav } from "../components/MobileNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { User, PlusCircle, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Categories } from "@/components/home/Categories";
import { TrustedPartners } from "@/components/home/TrustedPartners";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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

  const handleUserIconClick = () => {
    if (!userProfile) {
      navigate("/profile");
      return;
    }

    switch (userProfile.role) {
      case "landlord":
        navigate("/landlord-dashboard");
        break;
      case "tenant":
        navigate("/tenant-dashboard");
        break;
      default:
        navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="p-4 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-maroon">Lovensunrise</h1>
          {isMobile ? (
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleUserIconClick}
              >
                <User className="w-5 h-5" />
              </Button>
              {userProfile?.role === "landlord" && (
                <Button variant="ghost" size="icon" onClick={() => navigate("/landlord-dashboard/add-land")}>
                  <PlusCircle className="w-5 h-5" />
                </Button>
              )}
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              {userProfile?.role === "landlord" && (
                <Button onClick={() => navigate("/landlord-dashboard/add-land")}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              )}
              <Button variant="ghost" onClick={() => navigate("/procuration")}>
                <FileText className="w-4 h-4 mr-2" />
                Procuration
              </Button>
              {!userProfile ? (
                <>
                  <Button variant="ghost" onClick={() => navigate("/login")}>
                    Log In
                  </Button>
                  <Button onClick={() => navigate("/signup")}>Sign Up</Button>
                </>
              ) : (
                <Button onClick={handleUserIconClick}>
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-7xl py-8">
        <Categories />
      </main>

      <TrustedPartners />
      <MobileNav />
    </div>
  );
};

export default Index;