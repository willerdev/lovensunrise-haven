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
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type PropertyReport = Database['public']['Tables']['property_reports']['Row'];

const Complaints = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: complaints, isLoading } = useQuery({
    queryKey: ["complaints"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("property_reports")
        .select("*, reporter:profiles(full_name), property:properties(title)")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch complaints");
        throw error;
      }

      return data as (PropertyReport & {
        reporter: { full_name: string } | null;
        property: { title: string } | null;
      })[];
    },
  });

  const filteredComplaints = complaints?.filter(
    (complaint) =>
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.report_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.reporter?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.property?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResolve = async (complaintId: string) => {
    try {
      const { error } = await supabase
        .from("property_reports")
        .update({ status: "resolved" })
        .eq("id", complaintId);

      if (error) throw error;
      toast.success("Complaint marked as resolved");
    } catch (error) {
      toast.error("Failed to update complaint status");
    }
  };

  const handleDismiss = async (complaintId: string) => {
    try {
      const { error } = await supabase
        .from("property_reports")
        .update({ status: "dismissed" })
        .eq("id", complaintId);

      if (error) throw error;
      toast.success("Complaint dismissed");
    } catch (error) {
      toast.error("Failed to dismiss complaint");
    }
  };

  if (isLoading) return <AdminTableSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Complaints Management</h2>
      </div>

      <Input
        placeholder="Search complaints..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Reporter</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredComplaints?.map((complaint) => (
            <TableRow key={complaint.id}>
              <TableCell className="font-medium">
                {complaint.property?.title || "N/A"}
              </TableCell>
              <TableCell>{complaint.reporter?.full_name || "Anonymous"}</TableCell>
              <TableCell>
                <span className="capitalize">{complaint.report_type}</span>
              </TableCell>
              <TableCell>
                <span className="capitalize">{complaint.status}</span>
              </TableCell>
              <TableCell>
                {new Date(complaint.created_at || "").toLocaleDateString()}
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleResolve(complaint.id)}
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDismiss(complaint.id)}
                >
                  <XCircle className="h-4 w-4 text-red-500" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4 text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Complaints;