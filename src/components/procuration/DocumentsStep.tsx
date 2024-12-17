import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DocumentsStepProps {
  formData: any;
  onChange: (name: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DocumentsStep = ({ formData, onChange, onNext, onBack }: DocumentsStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="legal_names">Legal Names (as they appear on documents)</Label>
          <Input
            id="legal_names"
            value={formData.legal_names}
            onChange={(e) => onChange("legal_names", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => onChange("start_date", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiry_date">Expiry Date</Label>
          <Input
            id="expiry_date"
            type="date"
            value={formData.expiry_date}
            onChange={(e) => onChange("expiry_date", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="national_id_doc">National ID Document</Label>
          <Input
            id="national_id_doc"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onChange("national_id_url", file);
              }
            }}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="residence_proof">Proof of Residence</Label>
          <Input
            id="residence_proof"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onChange("residence_proof_url", file);
              }
            }}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="passport">Passport</Label>
          <Input
            id="passport"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onChange("passport_url", file);
              }
            }}
            required
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};