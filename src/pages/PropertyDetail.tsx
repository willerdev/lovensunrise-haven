import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PropertyHeader } from "@/components/property/PropertyHeader";
import { PropertyImages } from "@/components/property/PropertyImages";
import { PropertyActions } from "@/components/property/PropertyActions";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [reportType, setReportType] = useState<"report" | "claim" | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("I would like to know more about this property");
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: property } = useQuery({
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

  if (!property) {
    return <div>Property not found</div>;
  }

  const handleChat = () => {
    // For demo purposes, assuming user is not logged in
    const isLoggedIn = false;
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setIsChatOpen(true);
  };

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
    setIsChatOpen(false);
  };

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: `${reportType === "claim" ? "Claim" : "Report"} Submitted`,
      description: "We will review your submission and get back to you soon.",
    });
    setReportType(null);
  };

  return (
    <div className="pb-20">
      <PropertyHeader 
        isLiked={isLiked}
        onLikeToggle={() => setIsLiked(!isLiked)}
        onReportClick={() => setReportType("report")}
      />

      <div className="mt-16">
        <PropertyImages
          images={property.images}
          currentImageIndex={currentImageIndex}
          onImageChange={setCurrentImageIndex}
        />

        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-semibold">{property.title}</h1>
          <p className="text-gray-600">{property.location}</p>

          <div className="flex gap-4 text-sm">
            {property.bedrooms && <span>{property.bedrooms} beds</span>}
            {property.bathrooms && <span>{property.bathrooms} baths</span>}
            <span>{property.area} sqft</span>
          </div>

          <p className="text-gray-700">{property.description}</p>

          <PropertyActions propertyId={property.id} onChatClick={handleChat} />

          <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Message</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
                <Button onClick={handleSendMessage}>Send Message</Button>
              </div>
            </DialogContent>
          </Dialog>

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
              {reportType && (
                <form onSubmit={handleReport} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {reportType === "claim"
                        ? "Proof of Ownership"
                        : "Report Details"}
                    </label>
                    <Textarea
                      placeholder={
                        reportType === "claim"
                          ? "Please provide details about your ownership..."
                          : "Please describe the issue..."
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Email</label>
                    <Input type="email" required />
                  </div>
                  <Button type="submit">Submit {reportType}</Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};