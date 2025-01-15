import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, differenceInDays } from "date-fns";
import { Home, CreditCard, Calendar, AlertTriangle, TrendingUp } from "lucide-react";
import { DbBooking } from "@/types/database";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardStatsProps {
  bookings: DbBooking[];
}

export const DashboardStats = ({ bookings }: DashboardStatsProps) => {
  const currentBooking = bookings?.[0];
  const property = currentBooking?.properties;

  // Calculate days spent in current residence
  const daysSpent = currentBooking 
    ? differenceInDays(new Date(), new Date(currentBooking.start_date))
    : 0;

  // Mock data for the payment history graph
  const paymentData = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1200 },
    { month: 'Mar', amount: 1200 },
    { month: 'Apr', amount: 1200 },
    { month: 'May', amount: 1200 },
    { month: 'Jun', amount: 1200 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Rent</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${property?.price || 0}</div>
            <p className="text-xs text-muted-foreground">
              Next payment due {format(new Date(), 'PP')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days in Residence</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{daysSpent} days</div>
            <p className="text-xs text-muted-foreground">
              Since {currentBooking ? format(new Date(currentBooking.start_date), 'PP') : 'N/A'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
            <p className="text-xs text-muted-foreground">
              Lifetime bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Complaints</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No pending issues
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={paymentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#2563eb" 
                    fill="#3b82f6" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Residence</CardTitle>
          </CardHeader>
          <CardContent>
            {property ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{property.title}</h3>
                  <p className="text-sm text-gray-500">{property.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Bedrooms</p>
                    <p className="text-2xl">{property.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Bathrooms</p>
                    <p className="text-2xl">{property.bathrooms}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Area</p>
                    <p className="text-2xl">{property.area} m²</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <p className="text-2xl capitalize">{property.type}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No active residence</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};