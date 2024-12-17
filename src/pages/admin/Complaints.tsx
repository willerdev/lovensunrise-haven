import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminTableSkeleton } from "@/components/skeletons/AdminTableSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { CheckCircle, XCircle, Eye, Database } from "lucide-react";

const Complaints = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: complaints, isLoading, refetch } = useQuery({
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

      return data;
    },
  });

  const handleResolve = async (id: string) => {
    try {
      const { error } = await supabase
        .from("property_reports")
        .update({ status: "resolved" })
        .eq("id", id);

      if (error) throw error;
      toast.success("Complaint marked as resolved");
      refetch();
    } catch (error) {
      console.error("Error resolving complaint:", error);
      toast.error("Failed to resolve complaint");
    }
  };

  const handleDismiss = async (id: string) => {
    try {
      const { error } = await supabase
        .from("property_reports")
        .update({ status: "dismissed" })
        .eq("id", id);

      if (error) throw error;
      toast.success("Complaint dismissed");
      refetch();
    } catch (error) {
      console.error("Error dismissing complaint:", error);
      toast.error("Failed to dismiss complaint");
    }
  };

  const filteredComplaints = complaints?.filter(
    (complaint) =>
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.report_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.reporter?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.property?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {!complaints || complaints.length === 0 ? (
        <div className="text-center py-8 space-y-3">
          <Database className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">No Complaints Found</h3>
          <p className="text-gray-500">No complaints have been submitted yet.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Complaints;