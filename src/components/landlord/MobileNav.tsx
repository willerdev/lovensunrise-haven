import { Home, Calendar, DollarSign, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const LandlordMobileNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === `/landlord-dashboard${path}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center md:hidden">
      <Link
        to="/landlord-dashboard"
        className={`flex flex-col items-center ${
          isActive("") ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <Home size={20} />
        <span className="text-xs">Home</span>
      </Link>
      <Link
        to="/landlord-dashboard/bookings"
        className={`flex flex-col items-center ${
          isActive("/bookings") ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <Calendar size={20} />
        <span className="text-xs">Bookings</span>
      </Link>
      <Link
        to="/landlord-dashboard/payments"
        className={`flex flex-col items-center ${
          isActive("/payments") ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <DollarSign size={20} />
        <span className="text-xs">Payments</span>
      </Link>
      <Link
        to="/landlord-dashboard/profile"
        className={`flex flex-col items-center ${
          isActive("/profile") ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <User size={20} />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
};