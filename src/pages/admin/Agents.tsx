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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { UserPlus, Database } from "lucide-react";
import { Label } from "@/components/ui/label";

type AgentRole = "loven_agent" | "independent_agent";

interface AgentFormData {
  email: string;
  full_name: string;
  role: AgentRole | "";
}

interface Agent {
  id: string;
  full_name: string | null;
  role: AgentRole | null;
  created_at: string;
}

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [newAgent, setNewAgent] = useState<AgentFormData>({
    email: "",
    full_name: "",
    role: "",
  });

  const { data: agents, isLoading, refetch } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .in("role", ["loven_agent", "independent_agent"])
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch agents");
        throw error;
      }

      return (data || []) as Agent[];
    },
  });

  const handleAddAgent = async () => {
    try {
      if (!newAgent.email || !newAgent.full_name || !newAgent.role) {
        toast.error("Please fill in all fields");
        return;
      }

      const { error } = await supabase.from("profiles").update({
        role: newAgent.role,
        full_name: newAgent.full_name,
      }).eq("email", newAgent.email);

      if (error) throw error;

      toast.success("Agent added successfully");
      setIsOpen(false);
      refetch();
      setNewAgent({ email: "", full_name: "", role: "" });
    } catch (error) {
      console.error("Error adding agent:", error);
      toast.error("Failed to add agent");
    }
  };

  const filteredAgents = agents?.filter(
    (agent) =>
      agent.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <AdminTableSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Agents Management</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={newAgent.email}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, email: e.target.value })
                  }
                  placeholder="agent@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={newAgent.full_name}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, full_name: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newAgent.role}
                  onValueChange={(value: AgentRole) =>
                    setNewAgent({ ...newAgent, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loven_agent">Loven Agent</SelectItem>
                    <SelectItem value="independent_agent">
                      Independent Agent
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleAddAgent}>
                Add Agent
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Input
        placeholder="Search agents..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      {!agents || agents.length === 0 ? (
        <div className="text-center py-8 space-y-3">
          <Database className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">No Agents Found</h3>
          <p className="text-gray-500">No agents have been added to the system yet.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents?.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="font-medium">{agent.full_name}</TableCell>
                <TableCell>
                  <span className="capitalize">
                    {agent.role?.replace("_", " ")}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(agent.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Agents;
