import { Button } from "@/components/ui/button";

interface ReviewStepProps {
  formData: any;
  onBack: () => void;
  onSubmit: () => void;
}

export const ReviewStep = ({ formData, onBack, onSubmit }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Full Name</p>
            <p>{`${formData.first_name} ${formData.middle_name} ${formData.last_name}`}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">National ID</p>
            <p>{formData.national_id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p>{formData.street_address}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">State</p>
            <p>{formData.state}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Scope and Authority</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Contract Scope</p>
            <ul className="list-disc list-inside">
              {formData.contract_scope.map((scope: string) => (
                <li key={scope}>{scope}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tasks Description</p>
            <p>{formData.tasks_description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Duration</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Start Date</p>
            <p>{formData.start_date}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Expiry Date</p>
            <p>{formData.expiry_date}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit}>Submit Request</Button>
      </div>
    </div>
  );
};