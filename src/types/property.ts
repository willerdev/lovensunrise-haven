export type PropertyType = 'house_rent' | 'house_sell' | 'apartment_rent' | 'land_sell';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  description: string;
  images: string[];
  features: string[];
}