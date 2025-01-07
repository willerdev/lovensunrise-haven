import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Lands from "./pages/Lands";
import LandDetails from "./pages/LandDetails";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import LandlordDashboard from "./pages/LandlordDashboard";
import TenantDashboard from "./pages/TenantDashboard";
import BrokerDashboard from "./pages/BrokerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LandlordProperties from "./pages/landlord/Properties";
import AddProperty from "./pages/landlord/AddProperty";
import LandlordLands from "./pages/landlord/Lands";
import LandlordBookings from "./pages/landlord/Bookings";
import LandlordMessages from "./pages/landlord/Messages";
import TenantBookings from "./pages/tenant/Bookings";
import TenantMessages from "./pages/tenant/Messages";
import TenantSavedProperties from "./pages/tenant/SavedProperties";
import BrokerProperties from "./pages/broker/Properties";
import BrokerLands from "./pages/broker/Lands";
import BrokerBookings from "./pages/broker/Bookings";
import BrokerMessages from "./pages/broker/Messages";
import AdminProperties from "./pages/admin/Properties";
import AdminLands from "./pages/admin/Lands";
import AdminBookings from "./pages/admin/Bookings";
import AdminUsers from "./pages/admin/Users";
import AdminMessages from "./pages/admin/Messages";
import AdminSettings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/lands" element={<Lands />} />
          <Route path="/lands/:id" element={<LandDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
          <Route path="/landlord-dashboard/properties" element={<LandlordProperties />} />
          <Route path="/landlord-dashboard/add-property" element={<AddProperty />} />
          <Route path="/landlord-dashboard/lands" element={<LandlordLands />} />
          <Route path="/landlord-dashboard/bookings" element={<LandlordBookings />} />
          <Route path="/landlord-dashboard/messages" element={<LandlordMessages />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
          <Route path="/tenant-dashboard/bookings" element={<TenantBookings />} />
          <Route path="/tenant-dashboard/messages" element={<TenantMessages />} />
          <Route path="/tenant-dashboard/saved-properties" element={<TenantSavedProperties />} />
          <Route path="/broker-dashboard" element={<BrokerDashboard />} />
          <Route path="/broker-dashboard/properties" element={<BrokerProperties />} />
          <Route path="/broker-dashboard/lands" element={<BrokerLands />} />
          <Route path="/broker-dashboard/bookings" element={<BrokerBookings />} />
          <Route path="/broker-dashboard/messages" element={<BrokerMessages />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/properties" element={<AdminProperties />} />
          <Route path="/admin-dashboard/lands" element={<AdminLands />} />
          <Route path="/admin-dashboard/bookings" element={<AdminBookings />} />
          <Route path="/admin-dashboard/users" element={<AdminUsers />} />
          <Route path="/admin-dashboard/messages" element={<AdminMessages />} />
          <Route path="/admin-dashboard/settings" element={<AdminSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;