export interface Tables {
  bookings: {
    Row: {
      created_at: string;
      end_date: string;
      id: string;
      property_id: string | null;
      start_date: string;
      status: string | null;
      tenant_id: string | null;
      total_price: number;
      updated_at: string;
    };
    Insert: {
      created_at?: string;
      end_date: string;
      id?: string;
      property_id?: string | null;
      start_date: string;
      status?: string | null;
      tenant_id?: string | null;
      total_price: number;
      updated_at?: string;
    };
    Update: {
      created_at?: string;
      end_date?: string;
      id?: string;
      property_id?: string | null;
      start_date?: string;
      status?: string | null;
      tenant_id?: string | null;
      total_price?: number;
      updated_at?: string;
    };
  };
  properties: {
    Row: {
      id: string;
      title: string;
      type: string;
      price: number;
      bedrooms?: number | null;
      bathrooms?: number | null;
      area: number | null;
      description: string | null;
      address: string;
      city: string;
      state: string;
      zip_code: string;
      latitude?: number | null;
      longitude?: number | null;
      status?: string | null;
      owner_id?: string | null;
      created_at: string;
      updated_at?: string;
      furnishing_status?: string | null;
    };
    Insert: {
      id?: string;
      title: string;
      type: string;
      price: number;
      bedrooms?: number | null;
      bathrooms?: number | null;
      area?: number | null;
      description?: string | null;
      address: string;
      city: string;
      state: string;
      zip_code: string;
      latitude?: number | null;
      longitude?: number | null;
      status?: string | null;
      owner_id?: string | null;
      created_at?: string;
      updated_at?: string;
      furnishing_status?: string | null;
    };
    Update: {
      id?: string;
      title?: string;
      type?: string;
      price?: number;
      bedrooms?: number | null;
      bathrooms?: number | null;
      area?: number | null;
      description?: string | null;
      address?: string;
      city?: string;
      state?: string;
      zip_code?: string;
      latitude?: number | null;
      longitude?: number | null;
      status?: string | null;
      owner_id?: string | null;
      created_at?: string;
      updated_at?: string;
      furnishing_status?: string | null;
    };
  };
  saved_properties: {
    Row: {
      id: string;
      property_id: string | null;
      user_id: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      property_id?: string | null;
      user_id?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      property_id?: string | null;
      user_id?: string | null;
      created_at?: string;
    };
  };
  saved_lands: {
    Row: {
      id: string;
      land_id: string | null;
      user_id: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      land_id?: string | null;
      user_id?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      land_id?: string | null;
      user_id?: string | null;
      created_at?: string;
    };
  };
  lands: {
    Row: {
      id: string;
      title: string;
      price: number;
      area_sqm: number;
      description: string | null;
      address: string;
      city: string;
      state: string;
      zip_code: string;
      latitude: number | null;
      longitude: number | null;
      status: "building" | "agriculture";
      owner_id: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      title: string;
      price: number;
      area_sqm: number;
      description?: string | null;
      address: string;
      city: string;
      state: string;
      zip_code: string;
      latitude?: number | null;
      longitude?: number | null;
      status: "building" | "agriculture";
      owner_id?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      title?: string;
      price?: number;
      area_sqm?: number;
      description?: string | null;
      address?: string;
      city?: string;
      state?: string;
      zip_code?: string;
      latitude?: number | null;
      longitude?: number | null;
      status?: "building" | "agriculture";
      owner_id?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  profiles: {
    Row: {
      id: string;
      full_name: string | null;
      avatar_url: string | null;
      phone: string | null;
      role: "landlord" | "tenant" | "broker" | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id: string;
      full_name?: string | null;
      avatar_url?: string | null;
      phone?: string | null;
      role?: "landlord" | "tenant" | "broker" | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      full_name?: string | null;
      avatar_url?: string | null;
      phone?: string | null;
      role?: "landlord" | "tenant" | "broker" | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  messages: {
    Row: {
      id: string;
      sender_id: string | null;
      receiver_id: string | null;
      content: string;
      property_id: string | null;
      created_at: string;
      read: boolean | null;
    };
    Insert: {
      id?: string;
      sender_id?: string | null;
      receiver_id?: string | null;
      content: string;
      property_id?: string | null;
      created_at?: string;
      read?: boolean | null;
    };
    Update: {
      id?: string;
      sender_id?: string | null;
      receiver_id?: string | null;
      content?: string;
      property_id?: string | null;
      created_at?: string;
      read?: boolean | null;
    };
  };
  property_images: {
    Row: {
      id: string;
      property_id: string | null;
      image_url: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      property_id?: string | null;
      image_url: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      property_id?: string | null;
      image_url?: string;
      created_at?: string;
    };
  };
  land_images: {
    Row: {
      id: string;
      land_id: string | null;
      image_url: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      land_id?: string | null;
      image_url: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      land_id?: string | null;
      image_url?: string;
      created_at?: string;
    };
  };
}

export type Database = {
  public: {
    Tables: Tables;
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      land_status: "building" | "agriculture";
      user_role: "landlord" | "tenant" | "broker";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};