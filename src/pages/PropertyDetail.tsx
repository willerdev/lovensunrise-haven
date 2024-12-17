import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Flag, MessageSquare, Calendar } from "lucide-react";
import { properties } from "../data/properties";
import { PropertyCard } from "../components/PropertyCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [reportType, setReportType] = useState<"report" | "claim" | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("I would like to know more about this property");
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const property = properties.find((p) => p.id === id);
  const similarProperties = properties
    .filter((p) => p.type === property?.type && p.id !== id)
    .slice(0, 3);

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
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Flag className="w-6 h-6" />
                </button>
              </DialogTrigger>
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

          {isMobile ? (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-4">
              <Button className="flex-1" asChild>
                <Link to={`/booking/${property.id}`}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleChat}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </div>
          ) : (
            <div className="flex gap-4 mt-4">
              <Button className="flex-1" asChild>
                <Link to={`/booking/${property.id}`}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleChat}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </div>
          )}

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
        </div>
      </div>
    </div>
  );
};
