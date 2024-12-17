import { Property } from "../types/property";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
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
        user_id: session.user.id
      });

      const { data, error } = await supabase
        .from("saved_properties")
        .select()
        .eq("property_id", property.id)
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error checking if property is liked:", error);
        return;
      }

      setIsLiked(data && data.length > 0);
    };

    checkIfLiked();
  }, [property.id]);

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
      if (isLiked) {
        const { error } = await supabase
          .from("saved_properties")
          .delete()
          .eq("property_id", property.id)
          .eq("user_id", session.user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("saved_properties")
          .insert({
            property_id: property.id,
            user_id: session.user.id,
          });

        if (error) throw error;
      }

      setIsLiked(!isLiked);
      toast({
        title: isLiked ? "Removed from favorites" : "Added to favorites",
        description: isLiked ? "Property removed from your favorites" : "Property saved to your favorites",
      });
    } catch (error) {
      console.error('Error toggling property favorite:', error);
      toast({
        title: "Error",
        description: isLiked ? "Could not remove property from favorites" : "Could not save property to favorites",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number) => {
    return price >= 1000000
      ? `$${(price / 1000000).toFixed(1)}M`
      : `$${price.toLocaleString()}`;
  };

  const typeLabel = {
    house_rent: "House for Rent",
    house_sell: "House for Sale",
    apartment_rent: "Apartment for Rent",
    land_sell: "Land for Sale",
  };

  // Get the first image URL from either property_images or images array
  const imageUrl = property.property_images?.[0]?.image_url || property.images?.[0];

  // Construct location string from address components
  const locationString = `${property.address}, ${property.city}, ${property.state}`;

  return (
    <div className="property-card">
      <div className="relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl" />
        )}
        <img
          src={imageUrl}
          alt={property.title}
          className={`w-full h-48 object-cover rounded-t-xl transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
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
      </div>
      <Link to={`/property/${property.id}`} className="block p-4">
        <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
          {property.type && typeLabel[property.type]}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-1">
          {property.title}
        </h3>
        <p className="mt-1 text-gray-500 text-sm line-clamp-1">
          {locationString}
        </p>
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
          {property.bedrooms && (
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
          )}
          {property.bathrooms && (
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
          )}
          <span>{property.area} sqft</span>
        </div>
        <p className="mt-2 text-lg font-semibold text-gray-900">
          {formatPrice(property.price)}
          {property.type?.includes('rent') && '/month'}
        </p>
      </Link>
    </div>
  );
};
