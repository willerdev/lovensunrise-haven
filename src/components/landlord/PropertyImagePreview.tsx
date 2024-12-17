import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyImagePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

export const PropertyImagePreview = ({ files, onRemove }: PropertyImagePreviewProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {files.map((file, index) => (
        <div key={index} className="relative group">
          <img
            src={URL.createObjectURL(file)}
            alt={`Preview ${index + 1}`}
            className="w-full h-32 object-cover rounded-md"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onRemove(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};