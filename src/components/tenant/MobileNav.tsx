
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, CreditCard, User, FileText } from "lucide-react";

export const TenantMobileNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center">
      <Link
        to="/tenant-dashboard"
        className={`flex flex-col items-center ${
          location.pathname === "/tenant-dashboard" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <Home size={20} />
        <span className="text-xs">Home</span>
      </Link>
      <Link
        to="/tenant-dashboard/bookings"
        className={`flex flex-col items-center ${
          location.pathname.includes("/bookings") ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <Calendar size={20} />
        <span className="text-xs">Bookings</span>
      </Link>
      <Link
        to="/tenant-dashboard/payments"
        className={`flex flex-col items-center ${
          location.pathname.includes("/payments") ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <CreditCard size={20} />
        <span className="text-xs">Payments</span>
      </Link>
      {/* Power of Attorney link hidden but preserved */}
      {false && (
        <Link
          to="/procuration"
          className={`flex flex-col items-center ${
            location.pathname === "/procuration" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <FileText size={20} />
          <span className="text-xs">Power of Attorney</span>
        </Link>
      )}
      <Link
        to="/tenant-dashboard/profile"
        className={`flex flex-col items-center ${
          location.pathname.includes("/profile") ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <User size={20} />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
};
