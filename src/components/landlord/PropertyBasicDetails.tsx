import { Home, DollarSign, Bed, Bath, SquareStack, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PropertyFormData } from "@/types/propertyTypes";

interface PropertyBasicDetailsProps {
  formData: PropertyFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onStatusChange: (value: string) => void;
  onFurnishingChange: (value: string) => void;
}

export const PropertyBasicDetails = ({
  formData,
  onChange,
  onStatusChange,
  onFurnishingChange,
}: PropertyBasicDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <div className="relative">
          <Home className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={onChange}
            className="pl-9"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Property Status</Label>
        <RadioGroup
          value={formData.status}
          onValueChange={onStatusChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rent" id="rent" />
            <Label htmlFor="rent">For Rent</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sale" id="sale" />
            <Label htmlFor="sale">For Sale</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Furnishing Status</Label>
        <RadioGroup
          value={formData.furnishing}
          onValueChange={onFurnishingChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="furnished" id="furnished" />
            <Label htmlFor="furnished">Furnished</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unfurnished" id="unfurnished" />
            <Label htmlFor="unfurnished">Unfurnished</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={onChange}
              className="pl-9"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="area">Area (sq ft)</Label>
          <div className="relative">
            <SquareStack className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="area"
              name="area"
              type="number"
              value={formData.area}
              onChange={onChange}
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <div className="relative">
            <Bed className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="bedrooms"
              name="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={onChange}
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <div className="relative">
            <Bath className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="bathrooms"
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={onChange}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onChange}
            className="pl-9"
          />
        </div>
      </div>
    </div>
  );
};