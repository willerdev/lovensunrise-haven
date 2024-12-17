import { Database } from "@/integrations/supabase/types";

export type ProcurationRequest = Database['public']['Tables']['procuration_requests']['Row'];

export type ContractScope = 'sell' | 'buy' | 'rent' | 'donate';

export interface ProcurationFormData {
  first_name: string;
  middle_name?: string;
  last_name: string;
  national_id: string;
  street_address: string;
  state: string;
  phone_call: string;
  phone_whatsapp: string;
  current_country: string;
  zip_code: string;
  contract_scope: ContractScope[];
  tasks_description: string;
  permissions: string;
  limitations?: string;
  legal_names: string;
  start_date: Date;
  expiry_date: Date;
}