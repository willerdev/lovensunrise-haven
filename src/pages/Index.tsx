import { useState } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { properties } from "../data/properties";
import { PropertyType } from "../types/property";
import { MobileNav } from "../components/MobileNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: "house_rent", label: "Houses for Rent" },
  { value: "house_sell", label: "Houses for Sale" },
  { value: "apartment_rent", label: "Apartments" },
  { value: "land_sell", label: "Land" },
];

const Index = () => {
  const [selectedType, setSelectedType] = useState<PropertyType | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const filteredProperties = selectedType
    ? properties.filter((p) => p.type === selectedType)
    : properties;

  return (
    <div className="min-h-screen pb-20">
      <header className="p-4 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-maroon">Lovensunrise</h1>
          {!isMobile && (
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
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedType === type.value
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default Index;