import { useState } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { PropertyType, mapDbPropertyToProperty } from "../types/property";
import { MobileNav } from "../components/MobileNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, Building2, MapPin, User, PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertySkeleton } from "@/components/skeletons/PropertySkeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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

  const { data: properties = [], isLoading: isLoadingProperties } = useQuery({
    queryKey: ["properties", selectedType],
    queryFn: async () => {
      console.log("Fetching properties with type:", selectedType);
      
      let query = supabase
        .from("properties")
        .select(`
          *,
          property_images (
            image_url
          )
        `);

      if (selectedType && selectedType !== "land_sell") {
        query = query.eq("type", selectedType);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching properties:", error);
        return [];
      }

      return data.map(mapDbPropertyToProperty);
    },
  });

  const { data: lands = [], isLoading: isLoadingLands } = useQuery({
    queryKey: ["lands"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lands")
        .select(`
          *,
          land_images (
            image_url
          )
        `);

      if (error) {
        console.error("Error fetching lands:", error);
        return [];
      }

      return data;
    },
  });

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

  const handleAddProperty = () => {
    navigate("/landlord-dashboard/properties");
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const displayItems = selectedType === "land_sell" ? lands : properties;
  const isLoading = selectedType === "land_sell" ? isLoadingLands : isLoadingProperties;

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
                <Button variant="ghost" size="icon" onClick={handleAddProperty}>
                  <PlusCircle className="w-5 h-5" />
                </Button>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              {userProfile?.role === "landlord" && (
                <Button onClick={handleAddProperty}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              )}
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
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {propertyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() =>
                setSelectedType(selectedType === type.value ? null : type.value)
              }
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
      </header>

      <main className="container mx-auto p-4">
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <PropertySkeleton key={index} />
            ))
          ) : (
            displayItems.map((item) => (
              <PropertyCard 
                key={item.id} 
                property={item} 
                onImageClick={() => handleItemClick(item)}
                isLand={selectedType === "land_sell"}
              />
            ))
          )}
        </div>
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