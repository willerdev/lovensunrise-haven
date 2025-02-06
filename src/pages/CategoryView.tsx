
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyCard } from "@/components/PropertyCard";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PropertySkeleton } from "@/components/skeletons/PropertySkeleton";
import { Property, PropertyType, mapDbPropertyToProperty } from "@/types/property";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { RentalSearchFilter, RentalFilters } from "@/components/RentalSearchFilter";
import { useState } from "react";

export const CategoryView = () => {
  const { type } = useParams<{ type: string }>();
  const [filters, setFilters] = useState<RentalFilters>({});

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties", type],
    queryFn: async () => {
      console.log("Fetching properties for category:", type);
      const { data, error } = await supabase
        .from("properties")
        .select(`
          *,
          property_images (
            image_url
          ),
          profiles (
            full_name
          )
        `)
        .eq("type", type);

      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      return data.map(mapDbPropertyToProperty) || [];
    },
  });

  const filteredProperties = properties.filter((property) => {
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.status && property.status !== filters.status) return false;
    return true;
  });

  const getCategoryTitle = () => {
    switch (type) {
      case "house_rent":
        return "Houses for Rent";
      case "house_sell":
        return "Houses for Sale";
      case "apartment_rent":
        return "Apartments for Rent";
      default:
        return "Properties";
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm py-4 px-4 mb-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">{getCategoryTitle()}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {type?.includes('rent') && (
          <div className="mb-6">
            <RentalSearchFilter onFilter={setFilters} />
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <PropertySkeleton key={index} />
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {type === "apartment_rent" 
                ? "No apartments have been registered yet. Please check back later."
                : "No properties found in this category."}
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
              />
            ))}
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
};

export default CategoryView;
