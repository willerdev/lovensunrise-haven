import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("text-2xl font-bold flex items-center gap-1", className)}>
      <span className="text-[#1A1F2C]">loven</span>
      <span className="text-maroon-600">sunrise</span>
      <span className="text-sm text-gray-600 ml-2">09:00-20:00pm</span>
    </div>
  );
};