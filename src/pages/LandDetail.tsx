import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, MapPin, Ruler, DollarSign, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const LandDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: land, isLoading } = useQuery({
    queryKey: ["land", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lands")
        .select(`
          *,
          land_images (
            image_url
          ),
          profiles (
            full_name
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!land) {
    return <div>Land not found</div>;
  }

  const handleBooking = () => {
    navigate(`/booking/${id}?type=land`);
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm py-4 px-4 mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">{land.title}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              {land.land_images && land.land_images[currentImageIndex] && (
                <img
                  src={land.land_images[currentImageIndex].image_url}
                  alt={land.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {land.land_images?.map((image: any, index: number) => (
                <button
                  key={image.image_url}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-video w-24 rounded-lg overflow-hidden ${
                    index === currentImageIndex ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={`${land.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{land.address}, {land.city}, {land.state}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Ruler className="h-5 w-5" />
                <span>{land.area_sqm} sqm</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="h-5 w-5" />
                <span>${land.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-gray-600">{land.description}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Land Status</h2>
              <p className="text-gray-600 capitalize">{land.status}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Owner</h2>
              <p className="text-gray-600">{land.profiles?.full_name}</p>
            </div>

            <Alert className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please note: A 40% advance payment is required to initiate the land acquisition procedures.
              </AlertDescription>
            </Alert>

            <Button onClick={handleBooking} className="w-full">
              Book Viewing
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandDetail;
