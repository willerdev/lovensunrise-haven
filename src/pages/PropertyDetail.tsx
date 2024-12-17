import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Flag } from "lucide-react";
import { properties } from "../data/properties";
import { PropertyCard } from "../components/PropertyCard";
import { useState } from "react";

export const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const property = properties.find((p) => p.id === id);
  const similarProperties = properties
    .filter((p) => p.type === property?.type && p.id !== id)
    .slice(0, 3);

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="pb-20">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center justify-between p-4">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Flag className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="mt-16">
        <div className="relative h-72">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  currentImageIndex === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-semibold">{property.title}</h1>
          <p className="text-gray-600">{property.location}</p>

          <div className="flex gap-4 text-sm">
            {property.bedrooms && <span>{property.bedrooms} beds</span>}
            {property.bathrooms && <span>{property.bathrooms} baths</span>}
            <span>{property.area} sqft</span>
          </div>

          <p className="text-gray-700">{property.description}</p>

          <div className="space-y-2">
            <h2 className="font-semibold">Features</h2>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {similarProperties.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-semibold">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similarProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};