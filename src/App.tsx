
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import { PropertyDetail } from "./pages/PropertyDetail";
import LandDetail from "./pages/LandDetail";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CompleteProfile from "./pages/CompleteProfile";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import Payment from "./pages/Payment";
import TenantDashboard from "./pages/TenantDashboard";
import LandlordDashboard from "./pages/LandlordDashboard";
import BrokerDashboard from "./pages/BrokerDashboard";
import AddLand from "./pages/landlord/AddLand";
import { CategoryView } from "./pages/CategoryView";
import { Hotels } from "./pages/Hotels";
import Lands from "./pages/Lands";
import Properties from "./pages/Properties";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/Properties";
import AdminLands from "./pages/admin/Lands";
import Categories from "./pages/admin/Categories";
import Users from "./pages/admin/Users";
import Partners from "./pages/admin/Partners";
import Complaints from "./pages/admin/Complaints";
import Procurations from "./pages/admin/Procurations";
import Agents from "./pages/admin/Agents";
import SiteSettings from "./pages/admin/SiteSettings";
import AdminBookings from "./pages/admin/Bookings";
import PaymentSettings from "./pages/admin/PaymentSettings";
import ProcurationForm from "./pages/procuration/ProcurationForm";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AddProperty from "./pages/AddProperty";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/:type" element={<CategoryView />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/lands" element={<Lands />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/land/:id" element={<LandDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/complete-profile" element={<CompleteProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/procuration" element={<ProcurationForm />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tenant-dashboard/*" element={<TenantDashboard />} />
              <Route path="/landlord-dashboard/*" element={<LandlordDashboard />} />
              <Route path="/broker-dashboard/*" element={<BrokerDashboard />} />
              <Route path="/landlord-dashboard/add-land" element={<AddLand />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />}>
                <Route path="properties" element={<AdminProperties />} />
                <Route path="lands" element={<AdminLands />} />
                <Route path="categories" element={<Categories />} />
                <Route path="users" element={<Users />} />
                <Route path="partners" element={<Partners />} />
                <Route path="complaints" element={<Complaints />} />
                <Route path="procurations" element={<Procurations />} />
                <Route path="agents" element={<Agents />} />
                <Route path="settings" element={<SiteSettings />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="payment-settings" element={<PaymentSettings />} />
              </Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
