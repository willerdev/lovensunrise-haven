import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Phone, MapPin, Mail, Building2, Flag } from "lucide-react";

interface PersonalInfoStepProps {
  formData: any;
  onChange: (name: string, value: any) => void;
  onNext: () => void;
}

export const PersonalInfoStep = ({ formData, onChange, onNext }: PersonalInfoStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="first_name"
              className="pl-9"
              value={formData.first_name}
              onChange={(e) => onChange("first_name", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="last_name"
              className="pl-9"
              value={formData.last_name}
              onChange={(e) => onChange("last_name", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone_call">Phone (Call)</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="phone_call"
              type="tel"
              className="pl-9"
              value={formData.phone_call}
              onChange={(e) => onChange("phone_call", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone_whatsapp">Phone (WhatsApp)</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="phone_whatsapp"
              type="tel"
              className="pl-9"
              value={formData.phone_whatsapp}
              onChange={(e) => onChange("phone_whatsapp", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="street_address">Street Address</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="street_address"
              className="pl-9"
              value={formData.street_address}
              onChange={(e) => onChange("street_address", e.target.value)}
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
              className="pl-9"
              value={formData.zip_code}
              onChange={(e) => onChange("zip_code", e.target.value)}
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
              className="pl-9"
              value={formData.state}
              onChange={(e) => onChange("state", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="current_country">Current Country</Label>
          <div className="relative">
            <Flag className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="current_country"
              className="pl-9"
              value={formData.current_country}
              onChange={(e) => onChange("current_country", e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};