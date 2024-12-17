import { Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface PropertyActionsProps {
  propertyId: string;
  onChatClick: () => void;
}

export const PropertyActions = ({ propertyId, onChatClick }: PropertyActionsProps) => {
  const isMobile = useIsMobile();
  const actionButtons = (
    <>
      <Button className="flex-1" asChild>
        <Link to={`/booking/${propertyId}`}>
          <Calendar className="w-4 h-4 mr-2" />
          Book Now
        </Link>
      </Button>
      <Button variant="outline" className="flex-1" onClick={onChatClick}>
        <MessageSquare className="w-4 h-4 mr-2" />
        Chat
      </Button>
    </>
  );

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-4">
        {actionButtons}
      </div>
    );
  }

  return <div className="flex gap-4 mt-4">{actionButtons}</div>;
};