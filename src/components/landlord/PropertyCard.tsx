import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const PropertyCard = ({ property, onDelete, onEdit }: PropertyCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{property.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video mb-4 relative overflow-hidden rounded-md">
          {property.images?.[0] ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              No image available
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {property.address}, {property.city}, {property.state}
        </p>
        <div className="flex gap-2 text-sm text-gray-600 mb-4">
          {property.bedrooms && <span>{property.bedrooms} beds</span>}
          {property.bathrooms && <span>• {property.bathrooms} baths</span>}
          {property.area && <span>• {property.area} sqft</span>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(property.id)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(property.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};