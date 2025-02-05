import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Flag, Home, Bed, Bath, Ruler, AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [reportType, setReportType] = useState<"report" | "claim" | null>(null);
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");
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

  const handleReport = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Please login",
          description: "You need to be logged in to report properties",
          variant: "destructive",
        });
        return;
      }

      console.log("Submitting report:", {
        property_id: id,
        reporter_id: session.user.id,
        report_type: reportType,
        description: reportDescription,
      });

      const { error } = await supabase
        .from('property_reports')
        .insert({
          property_id: id,
          reporter_id: session.user.id,
          report_type: reportReason,
          description: reportDescription,
        });

      if (error) {
        console.error("Error submitting report:", error);
        throw error;
      }

      toast({
        title: "Report submitted",
        description: "Thank you for your report. We will review it shortly.",
      });
      
      setReportType(null);
      setReportReason("");
      setReportDescription("");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit report. Please try again.",
      });
    }
  };

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

          {property.type === 'land_sell' && (
            <Alert className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please note: A 40% advance payment is required to initiate the land acquisition procedures.
              </AlertDescription>
            </Alert>
          )}

          <PropertyActions 
            propertyId={property.id} 
            property={property}
            onChatClick={() => {}}
            isOwner={false}
          />
        </div>
      </div>

      <Dialog open={!!reportType} onOpenChange={() => setReportType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {reportType === "report" ? "Report Property" : "Claim Property"}
            </DialogTitle>
            <DialogDescription>
              {reportType === "report" 
                ? "Please provide details about why you're reporting this property."
                : "Please provide details to verify your ownership of this property."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {reportType === "report" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Reason for reporting</Label>
                  <RadioGroup value={reportReason} onValueChange={setReportReason}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inappropriate" id="inappropriate" />
                      <Label htmlFor="inappropriate">Inappropriate content</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fake" id="fake" />
                      <Label htmlFor="fake">Fake listing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="spam" id="spam" />
                      <Label htmlFor="spam">Spam</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder={
                  reportType === "report"
                    ? "Please provide more details about the issue..."
                    : "Please provide details to verify your ownership..."
                }
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setReportType(null)}>
                Cancel
              </Button>
              <Button onClick={handleReport}>
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyDetail;
