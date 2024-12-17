import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PropertyBasicDetails } from "./PropertyBasicDetails";
import { PropertyLocationDetails } from "./PropertyLocationDetails";
import { PropertyImageUpload } from "./PropertyImageUpload";
import { PropertyFormData, PropertyFormProps } from "@/types/formTypes";
import { PropertyType } from "@/types/property";

export const PropertyForm = ({ propertyId, onSuccess, onCancel }: PropertyFormProps) => {
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
    type: "house_rent",
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!propertyId) return;

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", propertyId)
        .single();

      if (error) {
        console.error("Error fetching property:", error);
        return;
      }

      if (data) {
        setFormData({
          title: data.title || "",
          price: data.price?.toString() || "",
          bedrooms: data.bedrooms?.toString() || "",
          bathrooms: data.bathrooms?.toString() || "",
          area: data.area?.toString() || "",
          description: data.description || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          zip_code: data.zip_code || "",
          status: data.status as "rent" | "sale" || "rent",
          furnishing: data.furnishing_status as "furnished" | "unfurnished" || "unfurnished",
          type: data.type as PropertyType || "house_rent",
        });
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value as "rent" | "sale" }));
  };

  const handleFurnishingChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      furnishing: value as "furnished" | "unfurnished",
    }));
  };

  const handleTypeChange = (value: PropertyType) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
      e.target.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
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

      const propertyData = {
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
        status: formData.status,
        furnishing_status: formData.furnishing,
        type: formData.type,
        owner_id: session.user.id,
      };

      if (propertyId) {
        const { error: updateError } = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", propertyId);

        if (updateError) throw updateError;
      } else {
        const { data: property, error: insertError } = await supabase
          .from("properties")
          .insert(propertyData)
          .select()
          .single();

        if (insertError) throw insertError;

        if (selectedFiles.length > 0) {
          const imagePromises = selectedFiles.map(async (file) => {
            const fileExt = file.name.split(".").pop();
            const filePath = `${property.id}/${crypto.randomUUID()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
              .from("properties_images")
              .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from("properties_images")
              .getPublicUrl(filePath);

            return supabase.from("property_images").insert({
              property_id: property.id,
              image_url: publicUrl,
            });
          });

          await Promise.all(imagePromises);
        }
      }

      toast({
        title: "Success",
        description: propertyId ? "Property updated successfully" : "Property added successfully",
      });
      onSuccess();
    } catch (error) {
      console.error("Error saving property:", error);
      toast({
        title: "Error",
        description: propertyId ? "Failed to update property" : "Failed to add property",
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
            onTypeChange={handleTypeChange}
          />
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={() => setStep(2)}>
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <PropertyLocationDetails
            formData={formData}
            onChange={handleInputChange}
          />
          <PropertyImageUpload
            selectedFiles={selectedFiles}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
          />
          <div className="flex justify-between">
            <Button type="button" onClick={() => setStep(1)}>
              Back
            </Button>
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : (propertyId ? "Update" : "Add")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
