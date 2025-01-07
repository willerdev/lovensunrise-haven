export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bank_transfer_payments: {
        Row: {
          account_number: string
          amount: number
          bank_name: string
          created_at: string
          full_name: string
          id: string
          land_id: string | null
          proof_url: string | null
          property_id: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          account_number: string
          amount: number
          bank_name: string
          created_at?: string
          full_name: string
          id?: string
          land_id?: string | null
          proof_url?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          account_number?: string
          amount?: number
          bank_name?: string
          created_at?: string
          full_name?: string
          id?: string
          land_id?: string | null
          proof_url?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_transfer_payments_land_id_fkey"
            columns: ["land_id"]
            isOneToOne: false
            referencedRelation: "lands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_transfer_payments_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_transfer_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          created_at: string
          end_date: string
          id: string
          land_id: string | null
          property_id: string | null
          start_date: string
          status: string | null
          tenant_id: string | null
          total_price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          land_id?: string | null
          property_id?: string | null
          start_date: string
          status?: string | null
          tenant_id?: string | null
          total_price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          land_id?: string | null
          property_id?: string | null
          start_date?: string
          status?: string | null
          tenant_id?: string | null
          total_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_land_id_fkey"
            columns: ["land_id"]
            isOneToOne: false
            referencedRelation: "lands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      land_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          land_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          land_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          land_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "land_images_land_id_fkey"
            columns: ["land_id"]
            isOneToOne: false
            referencedRelation: "lands"
            referencedColumns: ["id"]
          },
        ]
      }
      land_visits: {
        Row: {
          id: string
          land_id: string | null
          user_id: string | null
          visited_at: string
        }
        Insert: {
          id?: string
          land_id?: string | null
          user_id?: string | null
          visited_at?: string
        }
        Update: {
          id?: string
          land_id?: string | null
          user_id?: string | null
          visited_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "land_visits_land_id_fkey"
            columns: ["land_id"]
            isOneToOne: false
            referencedRelation: "lands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "land_visits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lands: {
        Row: {
          address: string
          area_sqm: number
          city: string
          created_at: string
          description: string | null
          id: string
          latitude: number | null
          longitude: number | null
          owner_id: string | null
          price: number
          state: string
          status: Database["public"]["Enums"]["land_status"]
          title: string
          updated_at: string
          zip_code: string
        }
        Insert: {
          address: string
          area_sqm: number
          city: string
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          owner_id?: string | null
          price: number
          state: string
          status: Database["public"]["Enums"]["land_status"]
          title: string
          updated_at?: string
          zip_code: string
        }
        Update: {
          address?: string
          area_sqm?: number
          city?: string
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          owner_id?: string | null
          price?: number
          state?: string
          status?: Database["public"]["Enums"]["land_status"]
          title?: string
          updated_at?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "lands_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          property_id: string | null
          read: boolean | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          property_id?: string | null
          read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          property_id?: string | null
          read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mobile_money_payments: {
        Row: {
          amount: number
          created_at: string
          email: string
          full_name: string
          id: string
          land_id: string | null
          phone_number: string
          property_id: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          email: string
          full_name: string
          id?: string
          land_id?: string | null
          phone_number: string
          property_id?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          land_id?: string | null
          phone_number?: string
          property_id?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mobile_money_payments_land_id_fkey"
            columns: ["land_id"]
            isOneToOne: false
            referencedRelation: "lands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mobile_money_payments_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mobile_money_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      procuration_requests: {
        Row: {
          additional_docs_url: string[] | null
          contract_scope: Database["public"]["Enums"]["procuration_contract_type"][]
          country: string
          created_at: string | null
          current_country: string
          diaspora_card_url: string | null
          expiry_date: string
          first_name: string
          id: string
          last_name: string
          legal_names: string
          limitations: string | null
          middle_name: string | null
          national_id: string
          national_id_url: string
          passport_url: string
          permissions: string
          phone_call: string
          phone_whatsapp: string
          progress: number | null
          residence_proof_url: string | null
          start_date: string
          state: string
          status: string | null
          street_address: string
          tasks_description: string
          updated_at: string | null
          use_escrow: boolean | null
          user_id: string
          zip_code: string
        }
        Insert: {
          additional_docs_url?: string[] | null
          contract_scope: Database["public"]["Enums"]["procuration_contract_type"][]
          country?: string
          created_at?: string | null
          current_country: string
          diaspora_card_url?: string | null
          expiry_date: string
          first_name: string
          id?: string
          last_name: string
          legal_names: string
          limitations?: string | null
          middle_name?: string | null
          national_id: string
          national_id_url: string
          passport_url: string
          permissions: string
          phone_call: string
          phone_whatsapp: string
          progress?: number | null
          residence_proof_url?: string | null
          start_date: string
          state: string
          status?: string | null
          street_address: string
          tasks_description: string
          updated_at?: string | null
          use_escrow?: boolean | null
          user_id: string
          zip_code: string
        }
        Update: {
          additional_docs_url?: string[] | null
          contract_scope?: Database["public"]["Enums"]["procuration_contract_type"][]
          country?: string
          created_at?: string | null
          current_country?: string
          diaspora_card_url?: string | null
          expiry_date?: string
          first_name?: string
          id?: string
          last_name?: string
          legal_names?: string
          limitations?: string | null
          middle_name?: string | null
          national_id?: string
          national_id_url?: string
          passport_url?: string
          permissions?: string
          phone_call?: string
          phone_whatsapp?: string
          progress?: number | null
          residence_proof_url?: string | null
          start_date?: string
          state?: string
          status?: string | null
          street_address?: string
          tasks_description?: string
          updated_at?: string | null
          use_escrow?: boolean | null
          user_id?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "procuration_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          area: number | null
          bathrooms: number | null
          bedrooms: number | null
          category: string
          city: string
          created_at: string
          description: string | null
          furnishing_status: string | null
          id: string
          latitude: number | null
          longitude: number | null
          owner_id: string | null
          price: number
          state: string
          status: string | null
          title: string
          type: string
          updated_at: string
          zip_code: string
        }
        Insert: {
          address: string
          area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          category: string
          city: string
          created_at?: string
          description?: string | null
          furnishing_status?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          owner_id?: string | null
          price: number
          state: string
          status?: string | null
          title: string
          type: string
          updated_at?: string
          zip_code: string
        }
        Update: {
          address?: string
          area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          category?: string
          city?: string
          created_at?: string
          description?: string | null
          furnishing_status?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          owner_id?: string | null
          price?: number
          state?: string
          status?: string | null
          title?: string
          type?: string
          updated_at?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      property_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          property_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          property_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_reports: {
        Row: {
          created_at: string | null
          description: string
          id: string
          property_id: string | null
          report_type: string
          reporter_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          property_id?: string | null
          report_type: string
          reporter_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          property_id?: string | null
          report_type?: string
          reporter_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_reports_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_visits: {
        Row: {
          id: string
          property_id: string | null
          user_id: string | null
          visited_at: string
        }
        Insert: {
          id?: string
          property_id?: string | null
          user_id?: string | null
          visited_at?: string
        }
        Update: {
          id?: string
          property_id?: string | null
          user_id?: string | null
          visited_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_visits_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_visits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rev_bookings: {
        Row: {
          booking_date: string
          created_at: string
          id: string
          notes: string | null
          service_id: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          booking_date: string
          created_at?: string
          id?: string
          notes?: string | null
          service_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          booking_date?: string
          created_at?: string
          id?: string
          notes?: string | null
          service_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rev_bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "rev_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rev_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rev_services: {
        Row: {
          category: string
          created_at: string
          description: string | null
          duration: number
          gender: string
          id: string
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          duration: number
          gender: string
          id?: string
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          duration?: number
          gender?: string
          id?: string
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      saved_lands: {
        Row: {
          created_at: string
          id: string
          land_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          land_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          land_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_lands_land_id_fkey"
            columns: ["land_id"]
            isOneToOne: false
            referencedRelation: "lands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_lands_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_properties: {
        Row: {
          created_at: string
          id: string
          property_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          property_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_properties_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_searches: {
        Row: {
          created_at: string
          id: string
          search_query: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          search_query: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          search_query?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      land_status:
        | "residential"
        | "eco_tourism"
        | "industrial"
        | "commercial"
        | "agriculture"
      procuration_contract_type: "sell" | "buy" | "rent" | "donate"
      user_role:
        | "landlord"
        | "tenant"
        | "broker"
        | "admin"
        | "loven_agent"
        | "independent_agent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
