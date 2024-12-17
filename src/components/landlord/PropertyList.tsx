import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export const PropertyList = () => {
  const { data: properties } = useQuery({
    queryKey: ["landlord-properties"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("owner_id", session.user.id);

      return data || [];
    }
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (!error) {
      // Refresh properties list
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Properties</CardTitle>
        <Button asChild>
          <Link to="/add-property">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {properties?.map((property) => (
            <div key={property.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">{property.title}</h3>
                <p className="text-sm text-muted-foreground">{property.address}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDelete(property.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {!properties?.length && (
            <p className="text-center text-muted-foreground">No properties yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};