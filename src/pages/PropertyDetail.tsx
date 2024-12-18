import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Flag, Home, Bed, Bath, Ruler, AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PropertyHeader } from "@/components/property/PropertyHeader";
import { PropertyImages } from "@/components/property/PropertyImages";
import { PropertyActions } from "@/components/property/PropertyActions";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PropertySkeleton } from "@/components/skeletons/PropertySkeleton";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [reportType, setReportType] = useState<"report" | "claim" | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select(`
          *,
          property_images (
            image_url
          )
        `)
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching property:", error);
        return null;
      }

      return {
        ...data,
        images: data.property_images?.map((img: { image_url: string }) => img.image_url) || []
      };
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32 max-w-7xl">
        <PropertySkeleton />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32 max-w-7xl">
        Property not found
      </div>
    );
  }

  return (
    <div className="pb-20">
      <header className="bg-white shadow-sm py-4 mb-6">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32 max-w-7xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">{property.title}</h1>
          </div>
        </div>
      </header>

      <PropertyHeader 
        isLiked={isLiked}
        onLikeToggle={() => setIsLiked(!isLiked)}
        onReportClick={() => setReportType("report")}
      />

      <div className="mt-16 container mx-auto px-4 md:px-8 lg:px-16 xl:px-32 max-w-7xl">
        <PropertyImages
          images={property.images}
          currentImageIndex={currentImageIndex}
          onImageChange={setCurrentImageIndex}
        />

        <div className="p-4 space-y-4">
          <p className="text-gray-600 flex items-center gap-2">
            <Home className="w-4 h-4" />
            {`${property.address}, ${property.city}, ${property.state}`}
          </p>

          <div className="flex gap-6 text-sm">
            {property.bedrooms && (
              <span className="flex items-center gap-2">
                <Bed className="w-4 h-4" />
                {property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-2">
                <Bath className="w-4 h-4" />
                {property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              {property.area} sqft
            </span>
          </div>

          <p className="text-gray-700">{property.description}</p>

          <PropertyActions 
            propertyId={property.id} 
            onChatClick={() => {}}
            onBookClick={() => {}}
            isOwner={false}
          />
        </div>
      </div>

      <Dialog open={!!reportType} onOpenChange={() => setReportType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What would you like to do?</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setReportType("claim")}
            >
              Claim this property
            </Button>
            <Button
              variant="outline"
              onClick={() => setReportType("report")}
            >
              Report this property
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyDetail;
