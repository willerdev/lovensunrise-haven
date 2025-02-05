import { Property } from "../types/property";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
  onImageClick?: () => void;
  isLand?: boolean;
}

export const PropertyCard = ({ property, onImageClick, isLand }: PropertyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  // Check if property is liked on component mount
  useEffect(() => {
    const checkIfLiked = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      console.log("Checking if property is liked:", {
        property_id: property.id,
        user_id: session.user.id,
        isLand
      });

      // Check in the appropriate table based on whether it's a land or property
      const { data, error } = await supabase
        .from(isLand ? 'saved_lands' : 'saved_properties')
        .select()
        .eq(isLand ? 'land_id' : 'property_id', property.id)
        .eq('user_id', session.user.id);

      if (error) {
        console.error("Error checking if item is liked:", error);
        return;
      }

      setIsLiked(data && data.length > 0);
    };

    checkIfLiked();
  }, [property.id, isLand]);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Please login",
        description: "You need to be logged in to save properties",
        variant: "destructive",
      });
      return;
    }

    try {
      const tableName = isLand ? 'saved_lands' : 'saved_properties';
      const idField = isLand ? 'land_id' : 'property_id';

      if (isLiked) {
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq(idField, property.id)
          .eq('user_id', session.user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from(tableName)
          .insert({
            [idField]: property.id,
            user_id: session.user.id,
          });

        if (error) throw error;
      }

      setIsLiked(!isLiked);
      toast({
        title: isLiked ? "Removed from favorites" : "Added to favorites",
        description: isLiked ? "Item removed from your favorites" : "Item saved to your favorites",
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: isLiked ? "Could not remove from favorites" : "Could not save to favorites",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number) => {
    return price >= 1000000
      ? `$${(price / 1000000).toFixed(1)}M`
      : `$${price.toLocaleString()}`;
  };

  const typeLabel: Record<string, string> = {
    house_rent: "House for Rent",
    house_sell: "House for Sale",
    apartment_rent: "Apartment for Rent",
    land_sell: "Land for Sale",
    hotel: "Hotel"
  };

  // Get the first image URL from either property_images or images array
  const imageUrl = isLand 
    ? property.land_images?.[0]?.image_url 
    : (property.property_images?.[0]?.image_url || property.images?.[0]);

  // Construct location string from address components
  const locationString = `${property.address}, ${property.city}, ${property.state}`;

  const isRental = property.type?.includes('rent');

  return (
    <div className="property-card">
      <div className="relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl" />
        )}
        <img
          src={imageUrl}
          alt={property.title}
          className={`w-full h-48 object-cover rounded-t-xl transition-opacity duration-300 cursor-pointer ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onClick={onImageClick}
        />
        <button
          onClick={handleLikeToggle}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
        <Badge 
          className={`absolute top-3 left-3 ${
            isLand ? 'bg-green-500' : isRental ? 'bg-blue-500' : 'bg-green-500'
          }`}
        >
          {isLand ? "Land for Sale" : property.type && typeLabel[property.type]}
        </Badge>
      </div>
      <Link to={isLand ? `/land/${property.id}` : `/property/${property.id}`} className="block p-4">
        <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-1">
          {property.title}
        </h3>
        <p className="mt-1 text-gray-500 text-sm line-clamp-1">
          {locationString}
        </p>
        {!isLand && (
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            {property.bedrooms && (
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
            )}
            {property.bathrooms && (
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
            )}
            <span>{property.area || property.area_sqm} sqft</span>
          </div>
        )}
        <p className="mt-2 text-lg font-semibold text-gray-900">
          {formatPrice(property.price)}
          {isRental && '/month'}
        </p>
      </Link>
    </div>
  );
};