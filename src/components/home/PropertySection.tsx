import { PropertyCard } from "../PropertyCard";
import { PropertySkeleton } from "@/components/skeletons/PropertySkeleton";
import { Property } from "@/types/property";

interface PropertySectionProps {
  properties: Property[];
  isLoading: boolean;
  onImageClick: (property: Property) => void;
}

export const PropertySection = ({ properties, isLoading, onImageClick }: PropertySectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <PropertySkeleton key={index} />
          ))
        ) : (
          properties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onImageClick={() => onImageClick(property)}
            />
          ))
        )}
      </div>
    </div>
  );
};