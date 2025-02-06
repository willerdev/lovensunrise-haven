
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RentalSearchFilterProps {
  onFilter: (filters: RentalFilters) => void;
}

export interface RentalFilters {
  minPrice?: number;
  maxPrice?: number;
  availableDate?: Date;
  status?: string;
}

export const RentalSearchFilter = ({ onFilter }: RentalSearchFilterProps) => {
  const [filters, setFilters] = useState<RentalFilters>({});

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Min Price</Label>
          <Input
            type="number"
            placeholder="Min price"
            onChange={(e) =>
              setFilters({ ...filters, minPrice: Number(e.target.value) })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Max Price</Label>
          <Input
            type="number"
            placeholder="Max price"
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: Number(e.target.value) })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Available Date</Label>
          <DatePicker
            date={filters.availableDate}
            setDate={(date) => setFilters({ ...filters, availableDate: date })}
          />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleFilter} className="w-full">Apply Filters</Button>
    </div>
  );
};
