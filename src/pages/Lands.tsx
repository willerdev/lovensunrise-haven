import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PropertyCard } from "@/components/PropertyCard";
import { MobileNav } from "@/components/MobileNav";

type LandStatus = "residential" | "eco_tourism" | "industrial" | "commercial" | "agriculture" | null;

const Lands = () => {
  const [selectedStatus, setSelectedStatus] = useState<LandStatus>(null);

  const { data: lands = [], isLoading } = useQuery({
    queryKey: ["lands", selectedStatus],
    queryFn: async () => {
      console.log("Fetching lands with status:", selectedStatus);
      let query = supabase
        .from("lands")
        .select(`
          *,
          land_images (
            image_url
          ),
          profiles (
            full_name
          )
        `);

      if (selectedStatus) {
        query = query.eq("status", selectedStatus);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching lands:", error);
        throw error;
      }

      console.log("Fetched lands:", data);
      return data;
    },
  });

  const categories: { label: string; value: LandStatus }[] = [
    { label: "All", value: null },
    { label: "Residential", value: "residential" },
    { label: "Eco Tourism", value: "eco_tourism" },
    { label: "Industrial", value: "industrial" },
    { label: "Commercial", value: "commercial" },
    { label: "Agricultural", value: "agriculture" },
  ];

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
            <h1 className="text-2xl font-semibold">Available Lands</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.label}
              variant={selectedStatus === category.value ? "default" : "outline"}
              onClick={() => setSelectedStatus(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lands.map((land) => (
              <PropertyCard 
                key={land.id} 
                property={land} 
                isLand={true}
              />
            ))}
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
};

export default Lands;