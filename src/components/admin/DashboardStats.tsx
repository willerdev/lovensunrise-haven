import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, Building2, Users, MapPin, Calendar } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const DashboardStats = () => {
  // Fetch properties count
  const { data: propertiesCount } = useQuery({
    queryKey: ['propertiesCount'],
    queryFn: async () => {
      const { count } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });

  // Fetch lands count
  const { data: landsCount } = useQuery({
    queryKey: ['landsCount'],
    queryFn: async () => {
      const { count } = await supabase
        .from('lands')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });

  // Fetch users count
  const { data: usersCount } = useQuery({
    queryKey: ['usersCount'],
    queryFn: async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });

  // Fetch bookings count
  const { data: bookingsCount } = useQuery({
    queryKey: ['bookingsCount'],
    queryFn: async () => {
      const { count } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });

  // Fetch property types distribution
  const { data: propertyTypes } = useQuery({
    queryKey: ['propertyTypes'],
    queryFn: async () => {
      const { data } = await supabase
        .from('properties')
        .select('type')
        .not('type', 'is', null);
      
      const typeCounts: { [key: string]: number } = {};
      data?.forEach(property => {
        typeCounts[property.type] = (typeCounts[property.type] || 0) + 1;
      });
      
      return Object.entries(typeCounts).map(([name, value]) => ({
        name,
        value
      }));
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{propertiesCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lands</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{landsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookingsCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Types Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyTypes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;