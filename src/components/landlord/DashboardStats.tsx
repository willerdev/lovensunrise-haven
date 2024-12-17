import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CalendarDays, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const DashboardStats = () => {
  const { data: stats } = useQuery({
    queryKey: ["landlord-stats"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      // First, get the property IDs owned by the landlord
      const { data: properties } = await supabase
        .from("properties")
        .select("id")
        .eq("owner_id", session.user.id);

      const propertyIds = properties?.map(prop => prop.id) || [];

      // Then use these IDs for subsequent queries
      const [propertiesCount, bookingsCount, paymentsSum] = await Promise.all([
        supabase.from("properties")
          .select("id", { count: "exact" })
          .eq("owner_id", session.user.id),
        supabase.from("bookings")
          .select("id", { count: "exact" })
          .in("property_id", propertyIds),
        supabase.from("bookings")
          .select("total_price")
          .in("property_id", propertyIds)
      ]);

      console.log("Stats fetched:", {
        properties: propertiesCount.count,
        bookings: bookingsCount.count,
        payments: paymentsSum.data
      });

      return {
        properties: propertiesCount.count || 0,
        bookings: bookingsCount.count || 0,
        totalPayments: paymentsSum.data?.reduce((sum, booking) => sum + Number(booking.total_price), 0) || 0
      };
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.properties || 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.bookings || 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats?.totalPayments || 0}</div>
        </CardContent>
      </Card>
    </div>
  );
};