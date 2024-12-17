import { useParams } from "react-router-dom";
import { PropertyCard } from "@/components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const categories = {
  "VVIP": "vvip",
  "VIP": "vip",
  "Middle Class": "middle",
  "Lower Class": "lower",
};

export const CategoryView = () => {
  const { type } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties", type, selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from("properties")
        .select(`
          *,
          property_images (
            image_url
          )
        `)
        .eq("type", type);

      if (selectedCategory) {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      return data;
    },
  });

  const categoryTitle = type?.charAt(0).toUpperCase() + type?.slice(1);

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
            <h1 className="text-2xl font-semibold">{categoryTitle} Properties</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {Object.entries(categories).map(([label, value]) => (
            <Button
              key={value}
              variant={selectedCategory === value ? "default" : "outline"}
              onClick={() => setSelectedCategory(value)}
            >
              {label}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};