export type PropertyStatus = 'rent' | 'sale';
export type FurnishingStatus = 'furnished' | 'unfurnished';

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
  status: PropertyStatus;
  furnishing: FurnishingStatus;
}