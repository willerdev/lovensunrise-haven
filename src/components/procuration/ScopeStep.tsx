import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ScopeStepProps {
  formData: any;
  onChange: (name: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ScopeStep = ({ formData, onChange, onNext, onBack }: ScopeStepProps) => {
  const scopeOptions = [
    "Property Purchase",
    "Property Sale",
    "Property Management",
    "Contract Negotiations",
    "Document Signing",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div>
          <Label>Scope of Authority</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {scopeOptions.map((scope) => (
              <div key={scope} className="flex items-center space-x-2">
                <Checkbox
                  id={scope}
                  checked={formData.contract_scope.includes(scope)}
                  onCheckedChange={(checked) => {
                    const newScope = checked
                      ? [...formData.contract_scope, scope]
                      : formData.contract_scope.filter((s: string) => s !== scope);
                    onChange("contract_scope", newScope);
                  }}
                />
                <Label htmlFor={scope}>{scope}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tasks_description">Tasks Description</Label>
          <Textarea
            id="tasks_description"
            value={formData.tasks_description}
            onChange={(e) => onChange("tasks_description", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="permissions">Permissions</Label>
          <Textarea
            id="permissions"
            value={formData.permissions}
            onChange={(e) => onChange("permissions", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="limitations">Limitations</Label>
          <Textarea
            id="limitations"
            value={formData.limitations}
            onChange={(e) => onChange("limitations", e.target.value)}
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