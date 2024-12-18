import { Database } from "@/integrations/supabase/types";

export type DbProperty = Database['public']['Tables']['properties']['Row'];
export type DbPropertyImage = Database['public']['Tables']['property_images']['Row'];
export type DbProfile = Database['public']['Tables']['profiles']['Row'];
export type DbBooking = Database['public']['Tables']['bookings']['Row'] & {
  properties?: DbProperty | null;
};
export type DbMessage = Database['public']['Tables']['messages']['Row'];
export type DbSavedProperty = Database['public']['Tables']['saved_properties']['Row'];