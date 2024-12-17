import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyImagePreview } from "./PropertyImagePreview";

interface PropertyImageUploadProps {
  selectedFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

export const PropertyImageUpload = ({
  selectedFiles,
  onFileChange,
  onRemoveFile,
}: PropertyImageUploadProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="images">Property Images</Label>
      <Input
        id="images"
        type="file"
        accept="image/*"
        multiple
        onChange={onFileChange}
        className="cursor-pointer"
      />
      <p className="text-sm text-muted-foreground">
        You can select multiple images
      </p>
      <PropertyImagePreview
        files={selectedFiles}
        onRemove={onRemoveFile}
      />
    </div>
  );
};