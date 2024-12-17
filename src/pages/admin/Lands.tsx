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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const Lands = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: lands, isLoading } = useQuery({
    queryKey: ["admin-lands"],
    queryFn: async () => {
      console.log("Fetching lands for admin...");
      const { data, error } = await supabase
        .from("lands")
        .select(`
          *,
          land_images (image_url),
          profiles (full_name)
        `);
      
      if (error) {
        console.error("Error fetching lands:", error);
        toast.error("Failed to load lands");
        throw error;
      }
      
      console.log("Lands fetched:", data);
      return data;
    },
  });

  const filteredLands = lands?.filter((land) =>
    land.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    land.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("lands")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Land deleted successfully");
    } catch (error) {
      console.error("Error deleting land:", error);
      toast.error("Failed to delete land");
    }
  };

  if (isLoading) return <AdminTableSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Lands</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search lands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Area (sqm)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLands?.map((land) => (
            <TableRow key={land.id}>
              <TableCell>{land.title}</TableCell>
              <TableCell>{land.address}</TableCell>
              <TableCell>${land.price}</TableCell>
              <TableCell>{land.area_sqm}</TableCell>
              <TableCell>{land.status}</TableCell>
              <TableCell>{land.profiles?.full_name || "N/A"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // View details functionality
                      console.log("View land:", land.id);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(land.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Lands;