import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { DbBooking } from "@/types/database";

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
              <div key={booking.id} className="border-b pb-4">
                <h3 className="font-medium">{booking.properties?.title}</h3>
                <p className="text-sm text-gray-500">{booking.properties?.address}</p>
                <p className="text-sm">
                  {format(new Date(booking.start_date), 'PP')} - {format(new Date(booking.end_date), 'PP')}
                </p>
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