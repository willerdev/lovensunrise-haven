import { cn } from "@/lib/utils";
import { useCountryDetection } from "@/hooks/useCountryDetection";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  const { country, isLoading } = useCountryDetection();

  console.log("Country detection:", { country, isLoading }); // Debug log

  return (
    <div className={cn("flex items-center justify-center md:justify-start gap-4", className)}>
      <img 
        src="https://i.imgur.com/zvSYg45.png" 
        alt="Lovensunrise Logo" 
        className="h-8 w-auto"
      />
      {!isLoading && country && (
        <span className="text-sm text-gray-600">({country})</span>
      )}
    </div>
  );
};