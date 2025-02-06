
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyCard } from "@/components/PropertyCard";
import { Property } from "@/types/property";
import { PropertySkeleton } from "@/components/skeletons/PropertySkeleton";

const Properties = () => {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
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
        .eq("status", "available");

      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <PropertySkeleton key={index} />
          ))
        ) : (
          properties?.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Properties;
