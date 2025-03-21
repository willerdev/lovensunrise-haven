import { CategoryCard } from "./CategoryCard";

const categories = [
  {
    title: "House for Rent",
    description: "Find your perfect rental home",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60",
    href: "/category/house_rent",
  },
  {
    title: "House for Sale",
    description: "Properties available for purchase",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
    href: "/category/house_sell",
  },
  {
    title: "Apartment for Rent",
    description: "Explore apartments for rent",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=60",
    href: "/category/apartment_rent",
  },
  {
    title: "Hotels and Resorts",
    description: "Discover comfortable stays",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
    href: "/hotels",
  },
  {
    title: "Land and Plots",
    description: "Explore available land plots",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60",
    href: "/lands",
  },
  {
    title: "Diaspora",
    description: "Special services for our diaspora",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=60",
    href: "/procuration",
  },
];

export const Categories = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {categories.map((category) => (
        <CategoryCard key={category.title} {...category} />
      ))}
    </div>
  );
};