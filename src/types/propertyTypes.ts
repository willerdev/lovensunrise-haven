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
  furnishing: "furnished" | "unfurnished";
}