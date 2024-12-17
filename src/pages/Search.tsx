import { useState } from "react";
import { MobileNav } from "../components/MobileNav";
import { properties } from "../data/properties";
import { PropertyCard } from "../components/PropertyCard";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20">
      <header className="p-4 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <h1 className="text-2xl font-semibold text-center mb-4">Search Properties</h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by location or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
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

export default Search;