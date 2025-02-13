
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
    navigate('/landlord-dashboard/properties');
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Property</h1>
      <PropertyForm 
        onSuccess={handleSuccess}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
};

export default AddProperty;
