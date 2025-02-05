import { useState, useEffect } from "react";

interface PropertyImagesProps {
  images: string[];
  currentImageIndex: number;
  onImageChange: (index: number) => void;
}

export const PropertyImages = ({ images, currentImageIndex, onImageChange }: PropertyImagesProps) => {
  useEffect(() => {
    const timer = setInterval(() => {
      onImageChange((currentImageIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [currentImageIndex, images.length, onImageChange]);

  return (
    <div className="space-y-4">
      <div className="aspect-video relative overflow-hidden rounded-lg">
        {images[currentImageIndex] && (
          <img
            src={images[currentImageIndex]}
            alt={`Property ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        )}
      </div>
      
      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => onImageChange(index)}
            className={`relative aspect-video w-24 rounded-lg overflow-hidden ${
              index === currentImageIndex ? "ring-2 ring-primary" : ""
            }`}
          >
            <img
              src={image}
              alt={`Property thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};