import { Home, Search, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const MobileNav = () => {
  const location = useLocation();
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

  const getProfilePath = () => {
    if (!userProfile) return "/profile";
    
    switch (userProfile.role) {
      case "landlord":
        return "/landlord-dashboard";
      case "tenant":
        return "/tenant-dashboard";
      default:
        return "/profile";
    }
  };

  const isActive = (path: string) => location.pathname === path;

  if (!isMobile) {
    return null;
  }

  return (
    <nav className="mobile-nav animate-slideUp">
      <Link to="/" className={`nav-item ${isActive("/") ? "text-gray-900" : ""}`}>
        <Home className="w-6 h-6" />
        <span>Home</span>
      </Link>
      <Link
        to="/search"
        className={`nav-item ${isActive("/search") ? "text-gray-900" : ""}`}
      >
        <Search className="w-6 h-6" />
        <span>Search</span>
      </Link>
      <Link
        to="/saved"
        className={`nav-item ${isActive("/saved") ? "text-gray-900" : ""}`}
      >
        <Heart className="w-6 h-6" />
        <span>Saved</span>
      </Link>
      <Link
        to={getProfilePath()}
        className={`nav-item ${isActive(getProfilePath()) ? "text-gray-900" : ""}`}
      >
        <User className="w-6 h-6" />
        <span>Profile</span>
      </Link>
    </nav>
  );
};