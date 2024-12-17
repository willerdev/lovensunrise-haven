import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PropertyFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const PropertyForm = ({ onSuccess, onCancel }: PropertyFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
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
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          price: Number(formData.get("price")),
          bedrooms: Number(formData.get("bedrooms")),
          bathrooms: Number(formData.get("bathrooms")),
          area: Number(formData.get("area")),
          address: formData.get("address") as string,
          city: formData.get("city") as string,
          state: formData.get("state") as string,
          zip_code: formData.get("zip_code") as string,
          owner_id: session.user.id,
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input id="bedrooms" name="bedrooms" type="number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input id="bathrooms" name="bathrooms" type="number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="area">Area (sq ft)</Label>
          <Input id="area" name="area" type="number" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input id="state" name="state" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip_code">ZIP Code</Label>
          <Input id="zip_code" name="zip_code" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="images">Property Images</Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            setSelectedFiles(files);
          }}
          className="cursor-pointer"
        />
        <p className="text-sm text-muted-foreground">
          You can select multiple images
        </p>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Property"}
        </Button>
      </div>
    </form>
  );
};