import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface Payment {
  id: string;
  created_at: string;
  total_price: number;
  property: {
    title: string;
  };
  tenant: {
    full_name: string;
  };
}

const LandlordPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data: properties } = await supabase
          .from("properties")
          .select("id")
          .eq("owner_id", session.user.id);

        if (!properties?.length) {
          setPayments([]);
          setLoading(false);
          return;
        }

        const propertyIds = properties.map(p => p.id);
        const { data, error } = await supabase
          .from("bookings")
          .select(`
            id,
            created_at,
            total_price,
            property:properties(title),
            tenant:profiles(full_name)
          `)
          .in("property_id", propertyIds)
          .eq("status", "confirmed")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPayments(data || []);
      } catch (error) {
        console.error("Error fetching payments:", error);
        toast({
          title: "Error",
          description: "Failed to load payment history",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [toast]);

  if (loading) {
    return <div className="p-4">Loading payments...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Payment History</h2>
      {payments.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          No payments found
        </Card>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{payment.property.title}</h3>
                  <p className="text-sm text-gray-600">
                    Tenant: {payment.tenant.full_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${payment.total_price}</p>
                  <span className="text-sm text-green-600">Paid</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandlordPayments;