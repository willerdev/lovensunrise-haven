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
import TenantDashboard from "./pages/TenantDashboard";
import LandlordDashboard from "./pages/LandlordDashboard";
import BrokerDashboard from "./pages/BrokerDashboard";
import AddLand from "./pages/landlord/AddLand";
import ProcurationForm from "./pages/procuration/ProcurationForm";
import { CategoryView } from "./pages/CategoryView";
import { Hotels } from "./pages/Hotels";
import Lands from "./pages/Lands";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Properties from "./pages/admin/Properties";
import AdminLands from "./pages/admin/Lands";
import Categories from "./pages/admin/Categories";
import Users from "./pages/admin/Users";
import Partners from "./pages/admin/Partners";
import Complaints from "./pages/admin/Complaints";
import Procurations from "./pages/admin/Procurations";
import Agents from "./pages/admin/Agents";

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
              <Route path="/tenant-dashboard/*" element={<TenantDashboard />} />
              <Route path="/landlord-dashboard/*" element={<LandlordDashboard />} />
              <Route path="/broker-dashboard/*" element={<BrokerDashboard />} />
              <Route path="/landlord-dashboard/add-land" element={<AddLand />} />
              <Route path="/procuration" element={<ProcurationForm />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />}>
                <Route path="properties" element={<Properties />} />
                <Route path="lands" element={<AdminLands />} />
                <Route path="categories" element={<Categories />} />
                <Route path="users" element={<Users />} />
                <Route path="partners" element={<Partners />} />
                <Route path="complaints" element={<Complaints />} />
                <Route path="procurations" element={<Procurations />} />
                <Route path="agents" element={<Agents />} />
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