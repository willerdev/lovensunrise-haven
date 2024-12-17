export type PropertyType = 'house_rent' | 'house_sell' | 'apartment_rent' | 'land_sell';

export type PropertyStatus = 'rent' | 'sale';
export type FurnishingStatus = 'furnished' | 'unfurnished';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area: number | null;
  description: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  latitude?: number | null;
  longitude?: number | null;
  status?: string | null;
  owner_id?: string | null;
  created_at: string;
  updated_at?: string;
  furnishing_status?: string | null;
  images?: string[];
  property_images?: { image_url: string }[];
}

export const mapDbPropertyToProperty = (dbProperty: any): Property => ({
  ...dbProperty,
  type: dbProperty.type as PropertyType, // Ensure type is cast to PropertyType
  images: dbProperty.property_images?.map((img: { image_url: string }) => img.image_url) || []
});