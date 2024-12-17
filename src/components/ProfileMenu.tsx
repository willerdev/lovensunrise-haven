import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export const ProfileMenu = () => {
  return (
    <div className="space-y-2">
      <Link
        to="/procuration"
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <FileText className="w-5 h-5" />
        <span>Procuration Request</span>
      </Link>
    </div>
  );
};