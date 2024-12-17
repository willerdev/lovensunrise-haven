import { useState, useRef } from "react";
import { PropertyType } from "../types/property";
import { MobileNav } from "../components/MobileNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, Building2, MapPin, User, PlusCircle, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PropertySection } from "@/components/home/PropertySection";
import { LandSection } from "@/components/home/LandSection";
import { mapDbPropertyToProperty } from "@/types/property";

const propertyTypes: { value: PropertyType; label: string; icon: React.ReactNode }[] = [
  { value: "house_rent", label: "Houses for Rent", icon: <Home className="w-4 h-4" /> },
  { value: "house_sell", label: "Houses for Sale", icon: <Home className="w-4 h-4" /> },
  { value: "apartment_rent", label: "Apartments", icon: <Building2 className="w-4 h-4" /> },
  { value: "land_sell", label: "Land", icon: <MapPin className="w-4 h-4" /> },
];

const Index = () => {
  const [selectedType, setSelectedType] = useState<PropertyType | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      return profile;
    },
  });

  const scroll = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = 200;
      categoriesRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleUserIconClick = () => {
    if (!userProfile) {
      navigate("/login");
      return;
    }

    switch (userProfile.role) {
      case "landlord":
        navigate("/landlord-dashboard");
        break;
      case "tenant":
        navigate("/tenant-dashboard");
        break;
      case "broker":
        navigate("/broker-dashboard");
        break;
      default:
        navigate("/complete-profile");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="p-4 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-maroon">Lovensunrise</h1>
          {isMobile ? (
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleUserIconClick}
              >
                <User className="w-5 h-5" />
              </Button>
              {userProfile?.role === "landlord" && (
                <Button variant="ghost" size="icon" onClick={() => navigate("/landlord-dashboard/add-land")}>
                  <PlusCircle className="w-5 h-5" />
                </Button>
              )}
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              {userProfile?.role === "landlord" && (
                <Button onClick={() => navigate("/landlord-dashboard/add-land")}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              )}
              <Button variant="ghost" onClick={() => navigate("/procuration")}>
                <FileText className="w-4 h-4 mr-2" />
                Procuration
              </Button>
              {!userProfile ? (
                <>
                  <Button variant="ghost" onClick={() => navigate("/login")}>
                    Log In
                  </Button>
                  <Button onClick={() => navigate("/signup")}>Sign Up</Button>
                </>
              ) : (
                <Button onClick={handleUserIconClick}>
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="container mx-auto relative">
          {isMobile && (
            <>
              <button 
                onClick={() => scroll('left')} 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')} 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          <div 
            ref={categoriesRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-8 md:px-0 md:justify-center"
          >
            {propertyTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(selectedType === type.value ? null : type.value)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
                  selectedType === type.value
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type.icon}
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-7xl">
        <PropertySection 
          properties={properties}
          isLoading={isLoadingProperties}
          onImageClick={handleItemClick}
        />
        
        <LandSection 
          lands={lands}
          isLoading={isLoadingLands}
          onImageClick={handleItemClick}
        />
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="grid gap-4">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img
                src={selectedItem?.property_images?.[0]?.image_url || selectedItem?.land_images?.[0]?.image_url}
                alt={selectedItem?.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{selectedItem?.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedItem?.address}</p>
              <p className="mt-2">{selectedItem?.description}</p>
              <p className="mt-2 font-semibold">
                ${selectedItem?.price.toLocaleString()}
                {selectedItem?.type?.includes('rent') && '/month'}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <MobileNav />
    </div>
  );
};

export default Index;