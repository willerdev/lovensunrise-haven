import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Home, MessageCircle, AlertTriangle } from "lucide-react";
import { DbBooking } from "@/types/database";

interface DashboardStatsProps {
  bookings: DbBooking[];
}

export const DashboardStats = ({ bookings }: DashboardStatsProps) => {
  const currentBooking = bookings?.[0];
  const property = currentBooking?.properties;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Current Residence</CardTitle>
        </CardHeader>
        <CardContent>
          {property ? (
            <div>
              <p className="font-medium">{property.title}</p>
              <p className="text-sm text-gray-500">{property.address}</p>
              <p className="mt-2">
                Time spent: {format(new Date(currentBooking.start_date), 'PP')} - Present
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No active residence</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Payment</CardTitle>
        </CardHeader>
        <CardContent>
          {property ? (
            <div>
              <p className="text-2xl font-bold">${property.price}</p>
              <p className="text-sm text-gray-500">Due on {format(new Date(), 'PP')}</p>
            </div>
          ) : (
            <p className="text-gray-500">No pending payments</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button className="flex items-center text-blue-600 hover:text-blue-700">
            <MessageCircle className="mr-2 h-4 w-4" />
            Message Landlord
          </button>
          <button className="flex items-center text-blue-600 hover:text-blue-700">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Submit Complaint
          </button>
        </CardContent>
      </Card>
    </div>
  );
};