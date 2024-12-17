import React, { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const hotelCategories = {
  "eco_resort": "Eco Resorts",
  "high_end_lodge": "High End Lodge",
  "hotel": "Hotels"
};

const priceRanges = [
  { min: 0, max: 100, label: "Under $100" },
  { min: 100, max: 300, label: "$100 - $300" },
  { min: 300, max: 500, label: "$300 - $500" },
  { min: 500, max: 1000, label: "$500 - $1,000" },
  { min: 1000, max: null, label: "Above $1,000" }
];

export const Hotels = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [location, setLocation] = useState("");

  const { data: hotels = [], isLoading } = useQuery({
    queryKey: ["hotels", selectedCategory, selectedPriceRange, location],
    queryFn: async () => {
      let query = supabase
        .from("properties")
        .select(`
          *,
          property_images (
            image_url
          )
        `)
        .eq('type', 'hotel');

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
        console.error("Error fetching hotels:", error);
        throw error;
      }

      return data;
    },
  });

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
            <h1 className="text-2xl font-semibold">Hotels</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="flex flex-col gap-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <Select
              value={selectedCategory || ""}
              onValueChange={(value) => setSelectedCategory(value || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {Object.entries(hotelCategories).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range Filter */}
            <Select
              value={selectedPriceRange || ""}
              onValueChange={(value) => setSelectedPriceRange(value || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Price</SelectItem>
                {priceRanges.map((range, index) => (
                  <SelectItem 
                    key={index} 
                    value={`${range.min}-${range.max || ''}`}
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
            {hotels.map((hotel) => (
              <PropertyCard key={hotel.id} property={hotel} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Hotels;