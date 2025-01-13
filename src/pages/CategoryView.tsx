import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyCard } from "@/components/PropertyCard";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const CategoryView = () => {
  const { type } = useParams();

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

      return data || [];
    },
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
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
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