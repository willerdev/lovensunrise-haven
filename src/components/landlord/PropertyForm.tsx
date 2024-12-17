import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, ArrowLeft, MapPin, Building2, Mail } from "lucide-react";
import { PropertyBasicDetails } from "./PropertyBasicDetails";
import { PropertyImagePreview } from "./PropertyImagePreview";
import { PropertyFormData } from "@/types/propertyTypes";

interface PropertyFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const PropertyForm = ({ onSuccess, onCancel }: PropertyFormProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    status: "rent",
    furnishing: "unfurnished",
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value as "rent" | "sale" }));
  };

  const handleFurnishingChange = (value: string) => {
    setFormData(prev => ({ ...prev, furnishing: value as "furnished" | "unfurnished" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to add a property",
          variant: "destructive",
        });
        return;
      }

      // Insert property
      const { data: property, error: propertyError } = await supabase
        .from("properties")
        .insert([{
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          area: Number(formData.area),
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code,
          owner_id: session.user.id,
          status: formData.status,
          furnishing_status: formData.furnishing,
        }])
        .select()
        .single();

      if (propertyError) throw propertyError;

      // Upload images
      const imagePromises = selectedFiles.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const filePath = `${property.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('properties_images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('properties_images')
          .getPublicUrl(filePath);

        // Save image reference
        const { error: imageError } = await supabase
          .from('property_images')
          .insert({
            property_id: property.id,
            image_url: publicUrl,
          });

        if (imageError) throw imageError;
      });

      await Promise.all(imagePromises);

      toast({
        title: "Success",
        description: "Property added successfully",
      });
      onSuccess();
    } catch (error) {
      console.error('Error adding property:', error);
      toast({
        title: "Error",
        description: "Failed to add property",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {step === 1 ? (
        <div className="space-y-4">
          <PropertyBasicDetails
            formData={formData}
            onChange={handleInputChange}
            onStatusChange={handleStatusChange}
            onFurnishingChange={handleFurnishingChange}
          />
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={() => setStep(2)}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="pl-9"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip_code">ZIP Code</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="zip_code"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleInputChange}
                  className="pl-9"
                  required
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Property Images</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p className="text-sm text-muted-foreground">
              You can select multiple images
            </p>
            <PropertyImagePreview
              files={selectedFiles}
              onRemove={handleRemoveFile}
            />
          </div>
          <div className="flex justify-between">
            <Button type="button" onClick={() => setStep(1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Property"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};