import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  className?: string;
}

export const CategoryCard = ({
  title,
  description,
  image,
  href,
  className,
}: CategoryCardProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]",
        className
      )}
    >
      <div className="aspect-[4/3] w-full">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
      </div>
      <div className="absolute bottom-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-200">{description}</p>
      </div>
    </Link>
  );
};