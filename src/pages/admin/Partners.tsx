import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminTableSkeleton } from "@/components/skeletons/AdminTableSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { UserCheck, UserX, Mail, Database } from "lucide-react";
import { DbProfile } from "@/types/database";

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: partners, isLoading } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "broker")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch partners");
        throw error;
      }

      return data as DbProfile[];
    },
  });

  const filteredPartners = partners?.filter(
    (partner) =>
      partner.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <AdminTableSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Partners Management</h2>
      </div>

      <Input
        placeholder="Search partners..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      {!partners || partners.length === 0 ? (
        <div className="text-center py-8 space-y-3">
          <Database className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">No Partners Found</h3>
          <p className="text-gray-500">No partners have been added to the system yet.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPartners?.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell className="font-medium">{partner.full_name}</TableCell>
                <TableCell>{partner.phone || "N/A"}</TableCell>
                <TableCell>
                  <span className="capitalize">{partner.role || "Pending"}</span>
                </TableCell>
                <TableCell>
                  {new Date(partner.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button variant="ghost" size="icon">
                    <UserCheck className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <UserX className="h-4 w-4 text-red-500" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4 text-blue-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Partners;
