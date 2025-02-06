
import { PropertyForm } from "@/components/landlord/PropertyForm";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Property</h1>
      <PropertyForm 
        onSuccess={() => window.location.href = '/landlord-dashboard'} 
        onCancel={() => navigate(-1)}
      />
    </div>
  );
};

export default AddProperty;
