
export type PropertyType = 'house_rent' | 'house_sell' | 'apartment_rent' | 'hotel' | 'land_sell';

export type PropertyStatus = 'rent' | 'sale';
export type FurnishingStatus = 'furnished' | 'unfurnished';
export type PropertyCategory = 'VVIP' | 'VIP' | 'Middle Class' | 'Lower Class';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area?: number | null;
  area_sqm?: number | null;
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
  category: PropertyCategory;
  images?: string[];
  property_images?: Array<{ image_url: string }>;
  land_images?: Array<{ image_url: string }>;
  profiles?: { full_name: string | null };
}

export const mapDbPropertyToProperty = (dbProperty: any): Property => {
  const property: Property = {
    ...dbProperty,
    type: dbProperty.type as PropertyType,
    category: dbProperty.category as PropertyCategory,
    images: dbProperty.property_images?.map((img: { image_url: string }) => img.image_url) || []
  };
  return property;
};
