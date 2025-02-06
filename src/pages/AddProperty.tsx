
import { PropertyForm } from "@/components/landlord/PropertyForm";

const AddProperty = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Property</h1>
      <PropertyForm onSuccess={() => window.location.href = '/landlord-dashboard'} />
    </div>
  );
};

export default AddProperty;
