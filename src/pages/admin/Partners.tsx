import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminTableSkeleton } from "@/components/skeletons/AdminTableSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { UserCheck, UserX, Mail } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

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

      return data as Profile[];
    },
  });

  const filteredPartners = partners?.filter(
    (partner) =>
      partner.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = async (partnerId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: "broker" })
        .eq("id", partnerId);

      if (error) throw error;
      toast.success("Partner approved successfully");
    } catch (error) {
      toast.error("Failed to approve partner");
    }
  };

  const handleSuspend = async (partnerId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: null })
        .eq("id", partnerId);

      if (error) throw error;
      toast.success("Partner suspended successfully");
    } catch (error) {
      toast.error("Failed to suspend partner");
    }
  };

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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleApprove(partner.id)}
                >
                  <UserCheck className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSuspend(partner.id)}
                >
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
    </div>
  );
};

export default Partners;