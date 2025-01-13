import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const partners = [
  { name: "RDB", id: 1 },
  { name: "RRA", id: 2 },
  { name: "US Embassy", id: 3 },
  { name: "Rwandan Embassy", id: 4 },
];

export const TrustedPartners = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">Our Trusted Partners</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {partners.map((partner) => (
              <CarouselItem key={partner.id} className="pl-2 md:pl-4 md:basis-1/4 lg:basis-1/4">
                <div className="p-4">
                  <div className="h-24 flex items-center justify-center rounded-lg bg-white shadow-sm">
                    <span className="text-lg font-bold text-gray-600">{partner.name}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 font-bold mb-2">Contact Information:</p>
          <p className="text-gray-500 font-bold">
            0783028398x, 0787356938x
          </p>
        </div>
      </div>
    </div>
  );
};