import { User, Mail, Phone, MapPin, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface BookingFormProps {
  isLoading: boolean;
  startDate?: Date;
  endDate?: Date;
  formData: {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    paymentMethod: string;
  };
  onStartDateChange: (date?: Date) => void;
  onEndDateChange: (date?: Date) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const BookingForm = ({
  isLoading,
  startDate,
  endDate,
  formData,
  onStartDateChange,
  onEndDateChange,
  onChange,
  onSubmit,
}: BookingFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={onStartDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={onEndDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="name"
            name="name"
            className="pl-9"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="email"
            name="email"
            type="email"
            className="pl-9"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              className="pl-9"
              value={formData.phone}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              className="pl-9"
              value={formData.whatsapp}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium">Address</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Textarea
            id="address"
            name="address"
            className="pl-9 min-h-[100px]"
            value={formData.address}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="paymentMethod" className="text-sm font-medium">Payment Method</label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={onChange}
            className="w-full rounded-md border border-input bg-background pl-9 py-2 pr-3"
            required
          >
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="cash">Cash</option>
          </select>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Confirm Booking"}
      </Button>
    </form>
  );
};