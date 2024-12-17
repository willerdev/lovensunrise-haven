import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Building2, Mail } from "lucide-react";

interface PropertyLocationDetailsProps {
  formData: {
    address: string;
    city: string;
    state: string;
    zip_code: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PropertyLocationDetails = ({
  formData,
  onChange,
}: PropertyLocationDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
              className="pl-9"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};