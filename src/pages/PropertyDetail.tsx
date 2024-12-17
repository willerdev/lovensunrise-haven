import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Flag, Home, Bed, Bath, Ruler, AlertCircle } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PropertySkeleton } from "@/components/skeletons/PropertySkeleton";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [reportType, setReportType] = useState<"report" | "claim" | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("I would like to know more about this property");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setCurrentUser({ ...user, ...profile });
      }
    };
    fetchUser();
  }, []);

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
      <div className="container mx-auto p-4">
        <PropertySkeleton />
      </div>
    );
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  const isOwner = currentUser?.id === property.owner_id;
  const locationString = `${property.address}, ${property.city}, ${property.state}`;

  const handleChat = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setIsChatOpen(true);
  };

  const handleBooking = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (isOwner) {
      toast({
        variant: "destructive",
        title: "Cannot book own property",
        description: "You cannot book a property that you own.",
      });
      return;
    }

    navigate(`/booking/${property.id}`);
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
      <header className="bg-white shadow-sm py-4 px-4 mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold">{property.title}</h1>
        </div>
      </header>

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
          <p className="text-gray-600 flex items-center gap-2">
            <Home className="w-4 h-4" />
            {locationString}
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

          {isOwner && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You cannot book your own property
              </AlertDescription>
            </Alert>
          )}

          <p className="text-gray-700">{property.description}</p>

          <PropertyActions 
            propertyId={property.id} 
            onChatClick={handleChat}
            onBookClick={handleBooking}
            isOwner={isOwner}
          />

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
