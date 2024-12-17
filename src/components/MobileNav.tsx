import { Home, Search, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const MobileNav = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

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
        to="/profile"
        className={`nav-item ${isActive("/profile") ? "text-gray-900" : ""}`}
      >
        <User className="w-6 h-6" />
        <span>Profile</span>
      </Link>
    </nav>
  );
};