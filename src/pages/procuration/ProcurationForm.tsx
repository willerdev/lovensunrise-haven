import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoStep } from "@/components/procuration/PersonalInfoStep";
import { ScopeStep } from "@/components/procuration/ScopeStep";
import { DocumentsStep } from "@/components/procuration/DocumentsStep";
import { ReviewStep } from "@/components/procuration/ReviewStep";
import { ArrowLeft } from "lucide-react";

const ProcurationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    national_id: "",
    street_address: "",
    state: "",
    phone_call: "",
    phone_whatsapp: "",
    current_country: "",
    zip_code: "",
    contract_scope: [],
    tasks_description: "",
    permissions: "",
    limitations: "",
    legal_names: "",
    start_date: "",
    expiry_date: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Procuration Request</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step {step} of 4</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <PersonalInfoStep
              formData={formData}
              onChange={handleInputChange}
              onNext={nextStep}
            />
          )}
          {step === 2 && (
            <ScopeStep
              formData={formData}
              onChange={handleInputChange}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <DocumentsStep
              formData={formData}
              onChange={handleInputChange}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 4 && (
            <ReviewStep
              formData={formData}
              onBack={prevStep}
              onSubmit={() => {
                // Handle form submission
                console.log("Form submitted:", formData);
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcurationForm;