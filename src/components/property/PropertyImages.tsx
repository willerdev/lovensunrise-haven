
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyImagesProps {
  images: string[];
  currentImageIndex: number;
  onImageChange: (index: number) => void;
}

export const PropertyImages = ({ images, currentImageIndex, onImageChange }: PropertyImagesProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-video relative overflow-hidden rounded-lg">
        {images[currentImageIndex] && (
          <>
            <img
              src={images[currentImageIndex]}
              alt={`Property ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => onImageChange(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white w-4" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
              onClick={() => onImageChange((currentImageIndex - 1 + images.length) % images.length)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
              onClick={() => onImageChange((currentImageIndex + 1) % images.length)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
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
