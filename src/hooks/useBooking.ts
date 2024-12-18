import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  paymentMethod: string;
}

export const useBooking = (id: string, isLandBooking: boolean) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    paymentMethod: "credit_card",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select both start and end dates",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Please login",
          description: "You need to be logged in to make a booking",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      console.log("Fetching details for:", { id, isLandBooking });

      const { data: item, error: fetchError } = await supabase
        .from(isLandBooking ? 'lands' : 'properties')
        .select('price')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error("Error fetching item:", fetchError);
        throw new Error(isLandBooking ? "Land not found" : "Property not found");
      }

      if (!item) {
        throw new Error(isLandBooking ? "Land not found" : "Property not found");
      }

      console.log("Found item:", item);

      const { error: bookingError } = await supabase
        .from("bookings")
        .insert({
          property_id: isLandBooking ? null : id,
          land_id: isLandBooking ? id : null,
          tenant_id: session.user.id,
          total_price: item.price,
          status: "pending",
          start_date: format(startDate, 'yyyy-MM-dd'),
          end_date: format(endDate, 'yyyy-MM-dd'),
        });

      if (bookingError) throw bookingError;

      toast({
        title: "Booking Successful!",
        description: "We'll contact you shortly with more details.",
      });
      navigate("/booking-success");
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    isLoading,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    formData,
    handleChange,
    handleSubmit,
  };
};