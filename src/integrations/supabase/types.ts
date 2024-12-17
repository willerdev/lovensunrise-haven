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
      bookings: {
        Row: {
          created_at: string
          end_date: string
          id: string
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
          property_id?: string | null
          start_date?: string
          status?: string | null
          tenant_id?: string | null
          total_price?: number
          updated_at?: string
        }
        Relationships: [
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
      procuration_requests: {
        Row: {
          additional_docs_url: string[] | null
          contract_scope: Database["public"]["Enums"]["procuration_contract_type"][]
          created_at: string | null
          current_country: string
          expiry_date: string
          first_name: string
          id: string
          last_name: string
          legal_names: string
          limitations: string | null
          middle_name: string | null
          national_id: string
          national_id_url: string | null
          passport_url: string | null
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
          user_id: string
          zip_code: string
        }
        Insert: {
          additional_docs_url?: string[] | null
          contract_scope: Database["public"]["Enums"]["procuration_contract_type"][]
          created_at?: string | null
          current_country: string
          expiry_date: string
          first_name: string
          id?: string
          last_name: string
          legal_names: string
          limitations?: string | null
          middle_name?: string | null
          national_id: string
          national_id_url?: string | null
          passport_url?: string | null
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
          user_id: string
          zip_code: string
        }
        Update: {
          additional_docs_url?: string[] | null
          contract_scope?: Database["public"]["Enums"]["procuration_contract_type"][]
          created_at?: string | null
          current_country?: string
          expiry_date?: string
          first_name?: string
          id?: string
          last_name?: string
          legal_names?: string
          limitations?: string | null
          middle_name?: string | null
          national_id?: string
          national_id_url?: string | null
          passport_url?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      land_status: "building" | "agriculture"
      procuration_contract_type: "sell" | "buy" | "rent" | "donate"
      user_role: "landlord" | "tenant" | "broker"
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
