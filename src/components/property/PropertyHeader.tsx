import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyHeaderProps {
  isLiked: boolean;
  onLikeToggle: () => void;
  onReportClick: () => void;
}

export const PropertyHeader = ({ isLiked, onLikeToggle, onReportClick }: PropertyHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex gap-2">
          <button
            onClick={onLikeToggle}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </button>
          <button 
            onClick={onReportClick}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Flag className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};