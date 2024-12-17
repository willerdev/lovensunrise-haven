import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) => onChange("first_name", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="middle_name">Middle Name</Label>
          <Input
            id="middle_name"
            value={formData.middle_name}
            onChange={(e) => onChange("middle_name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) => onChange("last_name", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="national_id">National ID</Label>
          <Input
            id="national_id"
            value={formData.national_id}
            onChange={(e) => onChange("national_id", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="street_address">Street Address</Label>
          <Input
            id="street_address"
            value={formData.street_address}
            onChange={(e) => onChange("street_address", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => onChange("state", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone_call">Phone (Call)</Label>
          <Input
            id="phone_call"
            type="tel"
            value={formData.phone_call}
            onChange={(e) => onChange("phone_call", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone_whatsapp">Phone (WhatsApp)</Label>
          <Input
            id="phone_whatsapp"
            type="tel"
            value={formData.phone_whatsapp}
            onChange={(e) => onChange("phone_whatsapp", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};