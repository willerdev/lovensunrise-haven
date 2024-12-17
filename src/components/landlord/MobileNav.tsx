import { Home, Building2, Calendar, Wallet, UserCircle, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";

export const LandlordMobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
      <div className="flex justify-around p-2">
        <NavLink to="/landlord" className="flex flex-col items-center p-2">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink to="/landlord/properties" className="flex flex-col items-center p-2">
          <Building2 className="w-6 h-6" />
          <span className="text-xs">Properties</span>
        </NavLink>
        <NavLink to="/landlord/bookings" className="flex flex-col items-center p-2">
          <Calendar className="w-6 h-6" />
          <span className="text-xs">Bookings</span>
        </NavLink>
        <NavLink to="/landlord/payments" className="flex flex-col items-center p-2">
          <Wallet className="w-6 h-6" />
          <span className="text-xs">Payments</span>
        </NavLink>
        <NavLink to="/procuration" className="flex flex-col items-center p-2">
          <FileText className="w-6 h-6" />
          <span className="text-xs">Procuration</span>
        </NavLink>
        <NavLink to="/landlord/profile" className="flex flex-col items-center p-2">
          <UserCircle className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};
