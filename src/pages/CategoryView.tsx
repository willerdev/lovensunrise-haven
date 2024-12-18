import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PropertyCard } from "@/components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = {
  "apartment_rent": {
    title: "Apartments for Rent",
    categories: {
      "vip": "VIP",
      "middle": "Middle Class"
    }
  },
  "house_rent": {
    title: "Houses for Rent",
    categories: {
      "vvip": "VVIP",
      "vip": "VIP",
      "middle": "Middle Class",
      "lower": "Lower Class"
    }
  },
  "house_sell": {
    title: "Houses for Sale",
    categories: {
      "vvip": "VVIP",
      "vip": "VIP",
      "middle": "Middle Class",
      "lower": "Lower Class"
    }
  }
} as const;

const priceRanges = [
  { min: 0, max: 1000, label: "Under $1,000", value: "0-1000" },
  { min: 1000, max: 5000, label: "$1,000 - $5,000", value: "1000-5000" },
  { min: 5000, max: 10000, label: "$5,000 - $10,000", value: "5000-10000" },
  { min: 10000, max: 50000, label: "$10,000 - $50,000", value: "10000-50000" },
  { min: 50000, max: null, label: "Above $50,000", value: "50000-up" }
] as const;

export const CategoryView = () => {
  const { type } = useParams<{ type: keyof typeof categories }>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | undefined>();
  const [location, setLocation] = useState("");

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties", type, selectedCategory, selectedPriceRange, location],
    queryFn: async () => {
      console.log("Fetching properties for type:", type);
      let query = supabase
        .from("properties")
        .select(`
          *,
          property_images (
            image_url
          )
        `);

      if (type) {
        query = query.eq('type', type);
      }

      if (selectedCategory) {
        query = query.eq("category", selectedCategory);
      }

      if (selectedPriceRange) {
        const [min, max] = selectedPriceRange.split("-").map(Number);
        query = query.gte("price", min);
        if (max) {
          query = query.lte("price", max);
        }
      }

      if (location) {
        query = query.or(`city.ilike.%${location}%,address.ilike.%${location}%,state.ilike.%${location}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      console.log("Fetched properties:", data);
      return data;
    },
  });

  const categoryConfig = type ? categories[type] : null;
  const categoryTitle = categoryConfig?.title || "Properties";

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
            <h1 className="text-2xl font-semibold">{categoryTitle}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="flex flex-col gap-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            {categoryConfig && (
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryConfig.categories).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Price Range Filter */}
            <Select
              value={selectedPriceRange}
              onValueChange={setSelectedPriceRange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem 
                    key={range.value} 
                    value={range.value}
                  >
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Input
              placeholder="Search by location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>
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