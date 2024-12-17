import { PropertyCard } from "../PropertyCard";
import { PropertySkeleton } from "@/components/skeletons/PropertySkeleton";

interface LandSectionProps {
  lands: any[];
  isLoading: boolean;
  onImageClick: (land: any) => void;
}

export const LandSection = ({ lands, isLoading, onImageClick }: LandSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Land for Sale</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <PropertySkeleton key={index} />
          ))
        ) : (
          lands.map((land) => (
            <PropertyCard 
              key={land.id} 
              property={land} 
              onImageClick={() => onImageClick(land)}
              isLand={true}
            />
          ))
        )}
      </div>
    </div>
  );
};