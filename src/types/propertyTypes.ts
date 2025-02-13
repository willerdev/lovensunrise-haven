
import { PropertyType, PropertyCategory, FurnishingStatus } from './property';

export interface PropertyFormData {
  title: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  status: "rent" | "sale";
  furnishing: FurnishingStatus;
  type: PropertyType;
  category: PropertyCategory;
}

export interface PropertyFormProps {
  propertyId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}
