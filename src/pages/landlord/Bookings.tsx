import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  property: {
    title: string;
  };
  tenant: {
    full_name: string;
  };
}

const LandlordBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data: properties } = await supabase
          .from("properties")
          .select("id")
          .eq("owner_id", session.user.id);

        if (!properties?.length) {
          setBookings([]);
          setLoading(false);
          return;
        }

        const propertyIds = properties.map(p => p.id);
        const { data, error } = await supabase
          .from("bookings")
          .select(`
            id,
            start_date,
            end_date,
            total_price,
            status,
            property:properties(title),
            tenant:profiles(full_name)
          `)
          .in("property_id", propertyIds)
          .order("start_date", { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast({
          title: "Error",
          description: "Failed to load bookings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [toast]);

  if (loading) {
    return <div className="p-4">Loading bookings...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Property Bookings</h2>
      {bookings.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          No bookings found for your properties
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold">{booking.property.title}</h3>
                <p className="text-sm text-gray-600">
                  Tenant: {booking.tenant.full_name}
                </p>
                <div className="text-sm">
                  <p>From: {new Date(booking.start_date).toLocaleDateString()}</p>
                  <p>To: {new Date(booking.end_date).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">
                    ${booking.total_price}
                  </span>
                  <span className={`text-sm capitalize px-2 py-1 rounded-full ${
                    booking.status === "confirmed" 
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandlordBookings;