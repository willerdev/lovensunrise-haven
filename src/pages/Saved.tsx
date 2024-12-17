import { MobileNav } from "../components/MobileNav";
import { PropertyCard } from "../components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Saved = () => {
  const { data: savedProperties = [] } = useQuery({
    queryKey: ["saved-properties"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data, error } = await supabase
        .from("saved_properties")
        .select(`
          property:properties (
            *,
            property_images (
              image_url
            )
          )
        `)
        .eq("user_id", session.user.id);

      if (error) throw error;
      return data?.map(item => item.property) || [];
    },
  });

  return (
    <div className="min-h-screen pb-20">
      <header className="p-4 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <h1 className="text-2xl font-semibold text-center">Saved Properties</h1>
      </header>

      <main className="container mx-auto p-4">
        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No saved properties yet.</p>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
};

export default Saved;