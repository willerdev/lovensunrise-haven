import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminTableSkeleton } from "@/components/skeletons/AdminTableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const AdminBookings = () => {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      console.log("Fetching bookings for admin...");
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          properties (title, address),
          lands (title, address),
          profiles (full_name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching bookings:", error);
        throw error;
      }
      
      console.log("Bookings fetched:", data);
      return data;
    },
  });

  if (isLoading) return <AdminTableSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Bookings</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property/Land</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                {booking.properties?.title || booking.lands?.title || 'N/A'}
                <br />
                <span className="text-sm text-gray-500">
                  {booking.properties?.address || booking.lands?.address || 'N/A'}
                </span>
              </TableCell>
              <TableCell>{booking.profiles?.full_name || 'N/A'}</TableCell>
              <TableCell>
                {format(new Date(booking.start_date), 'PP')} -
                <br />
                {format(new Date(booking.end_date), 'PP')}
              </TableCell>
              <TableCell>${booking.total_price}</TableCell>
              <TableCell>
                <Badge
                  variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                >
                  {booking.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminBookings;