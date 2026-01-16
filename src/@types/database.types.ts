export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      absence_report_forms: {
        Row: {
          club_id: string
          created_at: string
          id: string
          name: string
          questions: Json
          updated_at: string
        }
        Insert: {
          club_id: string
          created_at?: string
          id?: string
          name: string
          questions: Json
          updated_at?: string
        }
        Update: {
          club_id?: string
          created_at?: string
          id?: string
          name?: string
          questions?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "absence_report_forms_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "absence_report_forms_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "joined_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "absence_report_forms_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      absence_report_reviews: {
        Row: {
          absence_report_id: string
          accepted: boolean
          comments: string | null
          created_at: string
          id: string
          reviewer_id: string | null
          updated_at: string
        }
        Insert: {
          absence_report_id: string
          accepted: boolean
          comments?: string | null
          created_at?: string
          id?: string
          reviewer_id?: string | null
          updated_at?: string
        }
        Update: {
          absence_report_id?: string
          accepted?: boolean
          comments?: string | null
          created_at?: string
          id?: string
          reviewer_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "absence_report_reviews_absence_report_id_fkey"
            columns: ["absence_report_id"]
            isOneToOne: false
            referencedRelation: "absence_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      absence_reports: {
        Row: {
          assigned_to_role: string | null
          club_id: string
          created_at: string
          data: Json
          date: string | null
          event_id: string | null
          form_id: string | null
          id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_to_role?: string | null
          club_id: string
          created_at?: string
          data: Json
          date?: string | null
          event_id?: string | null
          form_id?: string | null
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_to_role?: string | null
          club_id?: string
          created_at?: string
          data?: Json
          date?: string | null
          event_id?: string | null
          form_id?: string | null
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "absence_reports_assigned_to_role_fkey"
            columns: ["assigned_to_role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "absence_reports_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "absence_reports_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "joined_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "absence_reports_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "absence_reports_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "calendar_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "absence_reports_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "absence_report_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_events: {
        Row: {
          club_id: string
          created_at: string
          created_by: string | null
          description: string | null
          end_time: string
          id: string
          location: string | null
          start_time: string
          title: string
          updated_at: string
        }
        Insert: {
          club_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time: string
          id?: string
          location?: string | null
          start_time: string
          title: string
          updated_at?: string
        }
        Update: {
          club_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string
          id?: string
          location?: string | null
          start_time?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "joined_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      club_members: {
        Row: {
          accepted: boolean
          club_id: string
          joined_at: string
          role_id: string
          user_id: string
        }
        Insert: {
          accepted?: boolean
          club_id: string
          joined_at?: string
          role_id: string
          user_id: string
        }
        Update: {
          accepted?: boolean
          club_id?: string
          joined_at?: string
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "joined_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_members_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      clubs: {
        Row: {
          absence_report_required_reviewer: string | null
          absence_report_schema: Json
          active: boolean
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          public: boolean
          school: string | null
          website: string | null
        }
        Insert: {
          absence_report_required_reviewer?: string | null
          absence_report_schema: Json
          active?: boolean
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          public?: boolean
          school?: string | null
          website?: string | null
        }
        Update: {
          absence_report_required_reviewer?: string | null
          absence_report_schema?: Json
          active?: boolean
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          public?: boolean
          school?: string | null
          website?: string | null
        }
        Relationships: []
      }
      feedback_submissions: {
        Row: {
          club_id: string | null
          created_at: string
          feedback: string
          id: string
          user_id: string | null
        }
        Insert: {
          club_id?: string | null
          created_at?: string
          feedback: string
          id?: string
          user_id?: string | null
        }
        Update: {
          club_id?: string | null
          created_at?: string
          feedback?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_submissions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_submissions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "joined_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_submissions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          club_id: string | null
          created_at: string
          description: string | null
          file_name: string
          file_size: number
          file_type: string
          id: string
          updated_at: string
          url: string
          user_id: string | null
        }
        Insert: {
          club_id?: string | null
          created_at?: string
          description?: string | null
          file_name: string
          file_size: number
          file_type: string
          id?: string
          updated_at?: string
          url: string
          user_id?: string | null
        }
        Update: {
          club_id?: string | null
          created_at?: string
          description?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          updated_at?: string
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "joined_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          absence_report_approval_required: boolean
          absence_report_form: string | null
          absence_report_reviewer_role: string | null
          club_id: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          permissions: Json
          updated_at: string
        }
        Insert: {
          absence_report_approval_required?: boolean
          absence_report_form?: string | null
          absence_report_reviewer_role?: string | null
          club_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          permissions: Json
          updated_at?: string
        }
        Update: {
          absence_report_approval_required?: boolean
          absence_report_form?: string | null
          absence_report_reviewer_role?: string | null
          club_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          permissions?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_absence_report_form_fkey"
            columns: ["absence_report_form"]
            isOneToOne: false
            referencedRelation: "absence_report_forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_absence_report_reviewer_role_fkey"
            columns: ["absence_report_reviewer_role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "joined_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      joined_clubs: {
        Row: {
          absence_report_required_reviewer: string | null
          absence_report_schema: Json | null
          active: boolean | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string | null
          name: string | null
          public: boolean | null
          school: string | null
          website: string | null
        }
        Insert: {
          absence_report_required_reviewer?: string | null
          absence_report_schema?: Json | null
          active?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string | null
          name?: string | null
          public?: boolean | null
          school?: string | null
          website?: string | null
        }
        Update: {
          absence_report_required_reviewer?: string | null
          absence_report_schema?: Json | null
          active?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string | null
          name?: string | null
          public?: boolean | null
          school?: string | null
          website?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          club_id: string | null
          content: string | null
          created_at: string | null
          id: string | null
          read: boolean | null
          user_id: string | null
        }
        Insert: {
          club_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string | null
          read?: boolean | null
          user_id?: string | null
        }
        Update: {
          club_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string | null
          read?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "joined_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string | null
          nickname: string | null
          school: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
          nickname?: string | null
          school?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
          nickname?: string | null
          school?: string | null
        }
        Relationships: []
      }
      public_clubs: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          id: string | null
          name: string | null
          public: boolean | null
          school: string | null
          website: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: never
          id?: string | null
          name?: string | null
          public?: boolean | null
          school?: never
          website?: never
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: never
          id?: string | null
          name?: string | null
          public?: boolean | null
          school?: never
          website?: never
        }
        Relationships: []
      }
    }
    Functions: {
      absence_reports_assigned_get: {
        Args: { p_club_id: string }
        Returns: {
          assigned_to_role_id: string
          assigned_to_role_name: string
          data: Json
          event_end_time: string
          event_id: string
          event_name: string
          event_start_time: string
          form_id: string
          id: string
          report_date: string
          reviews: Json
          user_id: string
          user_name: string
        }[]
      }
      absence_reports_get: {
        Args: { p_club_id: string; p_user_id?: string }
        Returns: {
          assigned_to_role_id: string
          assigned_to_role_name: string
          event_end_time: string
          event_id: string
          event_name: string
          event_start_time: string
          id: string
          report_date: string
          reviews: Json
          user_id: string
          user_name: string
        }[]
      }
      absence_reports_is_approved: {
        Args: { p_report_id: string }
        Returns: boolean
      }
      invitations_accept: {
        Args: { invitation_id: string }
        Returns: undefined
      }
      invitations_create: {
        Args: { expires_at: string; new_club_id: string; role_id: string }
        Returns: string
      }
      invitations_delete: {
        Args: { invitation_id: string }
        Returns: undefined
      }
      invitations_get: {
        Args: { club_id: string }
        Returns: {
          created_at: string
          expires_at: string
          id: string
          invited_by_name: string
          role_name: string
          usage_count: number
        }[]
      }
      invitations_verify: {
        Args: { invitation_id: string }
        Returns: {
          club_name: string
          expires_at: string
          invited_by_name: string
          role_name: string
        }[]
      }
      profiles_locale_get: { Args: never; Returns: string }
      profiles_locale_set: { Args: { new_locale: string }; Returns: undefined }
      user_has_club_permission: {
        Args: { p_club_id: string; p_permission: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

