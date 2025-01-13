import React, { useEffect } from "react";
import { MobileNav } from "../components/MobileNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { User, PlusCircle, FileText, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Categories } from "@/components/home/Categories";
import { TrustedPartners } from "@/components/home/TrustedPartners";
import { Logo } from "@/components/Logo";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isWelcomeVisible, setIsWelcomeVisible] = React.useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('welcomeDismissed');
    if (dismissed === 'true') {
      setIsWelcomeVisible(false);
    }
  }, []);

  const handleDismissWelcome = () => {
    localStorage.setItem('welcomeDismissed', 'true');
    setIsWelcomeVisible(false);
  };

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

  const { data: welcomeMessage } = useQuery({
    queryKey: ["welcomeMessage"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "welcome_message")
        .single();

      if (error) {
        console.error("Error fetching welcome message:", error);
        return null;
      }

      return data?.value;
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
          <Logo />
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
                Power of Attorney
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
        {welcomeMessage && isWelcomeVisible && (
          <div className="text-center mb-8 max-w-3xl mx-auto relative bg-white p-4 rounded-lg shadow">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={handleDismissWelcome}
            >
              <X className="h-4 w-4" />
            </Button>
            <p className="text-lg text-gray-700">{welcomeMessage}</p>
          </div>
        )}
        <Categories />
      </main>

      <TrustedPartners />
      <MobileNav />
    </div>
  );
};

export default Index;