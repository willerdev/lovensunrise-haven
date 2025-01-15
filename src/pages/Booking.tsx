import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BookingForm } from "@/components/booking/BookingForm";
import { useBooking } from "@/hooks/useBooking";

const Booking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isLandBooking = location.search.includes('type=land');

  const {
    isLoading,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    formData,
    handleChange,
    handleSubmit,
  } = useBooking(id!, isLandBooking);

  return (
    <div className="min-h-screen pb-20">
      <header className="p-4 bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold text-center flex-1 mr-8">
          Book  {isLandBooking ? 'Land' : 'Property'}
        </h1>
      </header>

      <main className="container mx-auto p-4 max-w-md">
        <BookingForm
          isLoading={isLoading}
          startDate={startDate}
          endDate={endDate}
          formData={formData}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default Booking;