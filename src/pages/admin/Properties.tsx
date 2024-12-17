import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Properties = () => {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Properties</h1>
      {/* Property management UI will be implemented here */}
    </div>
  );
};

export default Properties;