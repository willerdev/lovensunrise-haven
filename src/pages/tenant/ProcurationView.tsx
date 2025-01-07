import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

const ProcurationView = () => {
  const { data: procurationData, isLoading } = useQuery({
    queryKey: ["procuration-data"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      console.log("Fetching procuration data for user:", session.user.id);

      const { data, error } = await supabase
        .from("procuration_requests")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching procuration data:", error);
        throw error;
      }

      console.log("Procuration data fetched:", data);
      return data;
    },
  });

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!procurationData) {
    return (
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Procuration Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No procuration data submitted yet.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Procuration Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p>{`${procurationData.first_name} ${procurationData.middle_name || ''} ${procurationData.last_name}`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">National ID</p>
                <p>{procurationData.national_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p>{procurationData.street_address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p>{procurationData.state}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Contract Details</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p>{format(new Date(procurationData.start_date), 'PP')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p>{format(new Date(procurationData.expiry_date), 'PP')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="capitalize">{procurationData.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Progress</p>
                <p>{procurationData.progress}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcurationView;