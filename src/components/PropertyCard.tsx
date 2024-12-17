import { Property } from "../types/property";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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

  return (
    <div className="property-card">
      <div className="relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl" />
        )}
        <img
          src={property.images[0]}
          alt={property.title}
          className={`w-full h-48 object-cover rounded-t-xl transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
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
          {typeLabel[property.type]}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-1">
          {property.title}
        </h3>
        <p className="mt-1 text-gray-500 text-sm line-clamp-1">
          {property.location}
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
          {property.type.includes('rent') && '/month'}
        </p>
      </Link>
    </div>
  );
};