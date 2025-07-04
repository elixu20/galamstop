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
      agency_verification: {
        Row: {
          agency_id: string
          agency_name: string
          id: string
          submitted_at: string | null
          user_id: string
          verification_status: string
          verified_at: string | null
        }
        Insert: {
          agency_id: string
          agency_name: string
          id?: string
          submitted_at?: string | null
          user_id: string
          verification_status?: string
          verified_at?: string | null
        }
        Update: {
          agency_id?: string
          agency_name?: string
          id?: string
          submitted_at?: string | null
          user_id?: string
          verification_status?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      alert_preferences: {
        Row: {
          alert_type: string
          created_at: string | null
          enabled: boolean | null
          id: string
          threshold_value: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          threshold_value?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          threshold_value?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      case_discussions: {
        Row: {
          attachment_url: string | null
          case_id: string
          created_at: string | null
          id: string
          message: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          attachment_url?: string | null
          case_id: string
          created_at?: string | null
          id?: string
          message: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          attachment_url?: string | null
          case_id?: string
          created_at?: string | null
          id?: string
          message?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_discussions_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "drone_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      drone_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          drone_id: string
          id: string
          is_read: boolean | null
          message: string
          severity: string
          telemetry_id: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          drone_id: string
          id?: string
          is_read?: boolean | null
          message: string
          severity?: string
          telemetry_id?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          drone_id?: string
          id?: string
          is_read?: boolean | null
          message?: string
          severity?: string
          telemetry_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drone_alerts_drone_id_fkey"
            columns: ["drone_id"]
            isOneToOne: false
            referencedRelation: "drones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drone_alerts_telemetry_id_fkey"
            columns: ["telemetry_id"]
            isOneToOne: false
            referencedRelation: "drone_telemetry"
            referencedColumns: ["id"]
          },
        ]
      }
      drone_reports: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          parameters: Json
          report_type: string
          report_url: string | null
          resolution_status: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          parameters?: Json
          report_type: string
          report_url?: string | null
          resolution_status?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          parameters?: Json
          report_type?: string
          report_url?: string | null
          resolution_status?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      drone_telemetry: {
        Row: {
          altitude: number | null
          battery_level: number | null
          drone_id: string
          id: string
          latitude: number | null
          longitude: number | null
          speed: number | null
          timestamp: string
        }
        Insert: {
          altitude?: number | null
          battery_level?: number | null
          drone_id: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          speed?: number | null
          timestamp?: string
        }
        Update: {
          altitude?: number | null
          battery_level?: number | null
          drone_id?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          speed?: number | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "drone_telemetry_drone_id_fkey"
            columns: ["drone_id"]
            isOneToOne: false
            referencedRelation: "drones"
            referencedColumns: ["id"]
          },
        ]
      }
      drones: {
        Row: {
          api_key: string | null
          created_at: string
          feed_url: string | null
          id: string
          last_connected: string | null
          model: string | null
          name: string
          serial_number: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key?: string | null
          created_at?: string
          feed_url?: string | null
          id?: string
          last_connected?: string | null
          model?: string | null
          name: string
          serial_number?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key?: string | null
          created_at?: string
          feed_url?: string | null
          id?: string
          last_connected?: string | null
          model?: string | null
          name?: string
          serial_number?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      enforcement_actions: {
        Row: {
          action_type: string
          case_id: string
          court_ruling: string | null
          created_at: string | null
          created_by: string
          description: string
          equipment_destroyed: boolean | null
          evidence_urls: string[] | null
          fine_amount: number | null
          id: string
          location_lat: number | null
          location_lng: number | null
          updated_at: string | null
        }
        Insert: {
          action_type: string
          case_id: string
          court_ruling?: string | null
          created_at?: string | null
          created_by: string
          description: string
          equipment_destroyed?: boolean | null
          evidence_urls?: string[] | null
          fine_amount?: number | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          updated_at?: string | null
        }
        Update: {
          action_type?: string
          case_id?: string
          court_ruling?: string | null
          created_at?: string | null
          created_by?: string
          description?: string
          equipment_destroyed?: boolean | null
          evidence_urls?: string[] | null
          fine_amount?: number | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enforcement_actions_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "drone_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      galamsey_hotspots: {
        Row: {
          created_at: string | null
          id: string
          last_activity_date: string | null
          latitude: number
          location_name: string
          longitude: number
          report_count: number | null
          severity: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_activity_date?: string | null
          latitude: number
          location_name: string
          longitude: number
          report_count?: number | null
          severity?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_activity_date?: string | null
          latitude?: number
          location_name?: string
          longitude?: number
          report_count?: number | null
          severity?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      mining_permits: {
        Row: {
          company_name: string
          created_at: string | null
          expiry_date: string
          id: string
          issue_date: string
          permit_number: string
          site_location: string
          status: string
          updated_at: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          expiry_date: string
          id?: string
          issue_date: string
          permit_number: string
          site_location: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          expiry_date?: string
          id?: string
          issue_date?: string
          permit_number?: string
          site_location?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          organization: string | null
          updated_at: string | null
          user_type: string
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          organization?: string | null
          updated_at?: string | null
          user_type?: string
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          organization?: string | null
          updated_at?: string | null
          user_type?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      violators_registry: {
        Row: {
          created_at: string | null
          equipment_seized: string[] | null
          id: string
          land_seized: string[] | null
          offender_name: string
          organization: string | null
          total_fines: number | null
          updated_at: string | null
          violation_count: number | null
        }
        Insert: {
          created_at?: string | null
          equipment_seized?: string[] | null
          id?: string
          land_seized?: string[] | null
          offender_name: string
          organization?: string | null
          total_fines?: number | null
          updated_at?: string | null
          violation_count?: number | null
        }
        Update: {
          created_at?: string | null
          equipment_seized?: string[] | null
          id?: string
          land_seized?: string[] | null
          offender_name?: string
          organization?: string | null
          total_fines?: number | null
          updated_at?: string | null
          violation_count?: number | null
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
      app_role: "admin" | "moderator" | "law_enforcement" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "law_enforcement", "user"],
    },
  },
} as const
