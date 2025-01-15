import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { DbBooking } from "@/types/database";
import { Badge } from "@/components/ui/badge";

interface BookingsListProps {
  bookings: DbBooking[];
}

export const BookingsList = ({ bookings }: BookingsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="space-y-1">
                  <h3 className="font-medium">{booking.properties?.title || 'Property Unavailable'}</h3>
                  <p className="text-sm text-gray-500">{booking.properties?.address || 'Address Unavailable'}</p>
                  <p className="text-sm">
                    {format(new Date(booking.start_date), 'PP')} - {format(new Date(booking.end_date), 'PP')}
                  </p>
                </div>
                <Badge variant={booking.status === 'active' ? 'default' : 'secondary'}>
                  {booking.status || 'pending'}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No bookings yet</p>
        )}
      </CardContent>
    </Card>
  );
};