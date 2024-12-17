import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminTableSkeleton } from "@/components/skeletons/AdminTableSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { CheckCircle, XCircle, Eye, FileText, Database } from "lucide-react";

const Procurations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: procurations, isLoading } = useQuery({
    queryKey: ["procurations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("procuration_requests")
        .select("*, user:profiles(full_name)")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch procurations");
        throw error;
      }

      return data;
    },
  });

  const filteredProcurations = procurations?.filter(
    (proc) =>
      proc.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proc.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proc.user?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proc.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <AdminTableSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Procurations Management</h2>
      </div>

      <Input
        placeholder="Search procurations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      {!procurations || procurations.length === 0 ? (
        <div className="text-center py-8 space-y-3">
          <Database className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">No Procurations Found</h3>
          <p className="text-gray-500">No procuration requests have been submitted yet.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProcurations?.map((proc) => (
              <TableRow key={proc.id}>
                <TableCell className="font-medium">
                  {`${proc.first_name} ${proc.last_name}`}
                </TableCell>
                <TableCell>{proc.user?.full_name || "N/A"}</TableCell>
                <TableCell>
                  <span className="capitalize">{proc.status}</span>
                </TableCell>
                <TableCell>{proc.progress}%</TableCell>
                <TableCell>
                  {new Date(proc.created_at || "").toLocaleDateString()}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleApprove(proc.id)}
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleReject(proc.id)}
                  >
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4 text-purple-500" />
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

export default Procurations;
