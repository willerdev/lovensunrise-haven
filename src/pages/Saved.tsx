import { MobileNav } from "../components/MobileNav";
import { PropertyCard } from "../components/PropertyCard";
import { properties } from "../data/properties";

const Saved = () => {
  // In a real app, this would be managed by a proper state management solution
  const savedProperties = properties.slice(0, 3); // Showing first 3 as example

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