import { Property } from "../types/property";

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Beachfront Villa",
    type: "house_sell",
    price: 1200000,
    location: "Malibu, CA",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    description: "Stunning beachfront villa with panoramic ocean views",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    ],
    features: ["Ocean View", "Private Pool", "Garden", "Garage"],
  },
  {
    id: "2",
    title: "Downtown Luxury Apartment",
    type: "apartment_rent",
    price: 3500,
    location: "New York, NY",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    description: "High-end apartment in the heart of Manhattan",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    ],
    features: ["Doorman", "Gym", "Terrace", "Pet Friendly"],
  },
  // ... Add 13 more properties with similar structure
];