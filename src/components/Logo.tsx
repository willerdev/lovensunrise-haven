import { cn } from "@/lib/utils";
import { useCountryDetection } from "@/hooks/useCountryDetection";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  const { country, isLoading } = useCountryDetection();

  console.log("Country detection:", { country, isLoading }); // Debug log

  return (
    <div className="flex items-center gap-4">
      <div className={cn("text-2xl font-bold flex items-center gap-1", className)}>
        <span className="text-[#1A1F2C]">loven</span>
        <span className="text-maroon-600">sunrise</span>
      </div>
      {!isLoading && country && (
        <span className="text-sm text-gray-600">({country})</span>
      )}
    </div>
  );
};