import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { PropertyImageUpload } from "@/components/landlord/PropertyImageUpload";
import { LandStatus } from "@/integrations/supabase/enumTypes";

const AddLand = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    area_sqm: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    status: "residential" as LandStatus,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: LandStatus) => {
    setFormData((prev) => ({ ...prev, status: value }));
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
          description: "You must be logged in to add a land",
          variant: "destructive",
        });
        return;
      }

      const { data: land, error: landError } = await supabase
        .from("lands")
        .insert({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          area_sqm: Number(formData.area_sqm),
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code,
          status: formData.status,
          owner_id: session.user.id,
        })
        .select()
        .single();

      if (landError) throw landError;

      if (selectedFiles.length > 0) {
        const imagePromises = selectedFiles.map(async (file) => {
          const fileExt = file.name.split(".").pop();
          const filePath = `${land.id}/${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("properties_images")
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from("properties_images")
            .getPublicUrl(filePath);

          return supabase.from("land_images").insert({
            land_id: land.id,
            image_url: publicUrl,
          });
        });

        await Promise.all(imagePromises);
      }

      toast({
        title: "Success",
        description: "Land added successfully",
      });
      navigate("/landlord-dashboard/properties");
    } catch (error) {
      console.error("Error adding land:", error);
      toast({
        title: "Error",
        description: "Failed to add land",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Land</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>Land Status</Label>
            <RadioGroup
              value={formData.status}
              onValueChange={handleStatusChange}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="residential" id="residential" />
                <Label htmlFor="residential">Residential</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="commercial" id="commercial" />
                <Label htmlFor="commercial">Commercial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="industrial" id="industrial" />
                <Label htmlFor="industrial">Industrial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="eco_tourism" id="eco_tourism" />
                <Label htmlFor="eco_tourism">Eco Tourism</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agriculture" id="agriculture" />
                <Label htmlFor="agriculture">Agriculture</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="area_sqm">Area (sq m)</Label>
              <Input
                id="area_sqm"
                name="area_sqm"
                type="number"
                value={formData.area_sqm}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="zip_code">ZIP Code</Label>
              <Input
                id="zip_code"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <PropertyImageUpload
            selectedFiles={selectedFiles}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/landlord-dashboard/properties")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Land"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLand;