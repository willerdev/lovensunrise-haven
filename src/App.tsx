import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import PropertyDetails from "@/pages/PropertyDetails";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import LandlordProperties from "@/pages/landlord/Properties";
import AddProperty from "@/pages/landlord/AddProperty";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/landlord-dashboard/properties" element={<LandlordProperties />} />
          <Route path="/landlord-dashboard/add-property" element={<AddProperty />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;