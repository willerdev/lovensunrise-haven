import React from "react";
import { PropertyForm } from "@/components/landlord/PropertyForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const AddProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Success",
      description: "Property added successfully",
    });
    navigate("/landlord-dashboard/properties");
  };

  const handleCancel = () => {
    navigate("/landlord-dashboard/properties");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Property</h1>
      <PropertyForm 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AddProperty;