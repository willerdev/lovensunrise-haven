import { useState } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { PropertyType } from "../types/property";
import { MobileNav } from "../components/MobileNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, Building2, MapPin, User, PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const propertyTypes: { value: PropertyType; label: string; icon: React.ReactNode }[] = [
  { value: "house_rent", label: "Houses for Rent", icon: <Home className="w-4 h-4" /> },
  { value: "house_sell", label: "Houses for Sale", icon: <Home className="w-4 h-4" /> },
  { value: "apartment_rent", label: "Apartments", icon: <Building2 className="w-4 h-4" /> },
  { value: "land_sell", label: "Land", icon: <MapPin className="w-4 h-4" /> },
];

const Index = () => {
  const [selectedType, setSelectedType] = useState<PropertyType | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data: properties = [] } = useQuery({
    queryKey: ["properties", selectedType],
    queryFn: async () => {
      let query = supabase
        .from("properties")
        .select(`
          *,
          property_images (
            image_url
          )
        `);

      if (selectedType) {
        query = query.eq("type", selectedType);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching properties:", error);
        return [];
      }

      return data.map(property => ({
        ...property,
        images: property.property_images?.map((img: { image_url: string }) => img.image_url) || []
      }));
    },
  });

  return (
    <div className="min-h-screen pb-20">
      <header className="p-4 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-maroon">Lovensunrise</h1>
          {isMobile ? (
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => navigate("/login")}>
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <PlusCircle className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Log In
              </Button>
              <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            </div>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {propertyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() =>
                setSelectedType(selectedType === type.value ? null : type.value)
              }
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
                selectedType === type.value
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type.icon}
              {type.label}
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default Index;