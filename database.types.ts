export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      calificaciones: {
        Row: {
          calificador_id: string | null
          comentario: string | null
          created_at: string
          id: string
          lote_id: string | null
          puntaje: number | null
        }
        Insert: {
          calificador_id?: string | null
          comentario?: string | null
          created_at?: string
          id?: string
          lote_id?: string | null
          puntaje?: number | null
        }
        Update: {
          calificador_id?: string | null
          comentario?: string | null
          created_at?: string
          id?: string
          lote_id?: string | null
          puntaje?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "calificaciones_calificador_id_fkey"
            columns: ["calificador_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calificaciones_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "lotes_fibra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calificaciones_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "marketplace_lotes_publicos"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias_fibra: {
        Row: {
          created_at: string
          descripcion: string | null
          id: string
          nivel_calidad: number | null
          nombre: string
        }
        Insert: {
          created_at?: string
          descripcion?: string | null
          id?: string
          nivel_calidad?: number | null
          nombre: string
        }
        Update: {
          created_at?: string
          descripcion?: string | null
          id?: string
          nivel_calidad?: number | null
          nombre?: string
        }
        Relationships: []
      }
      empresas: {
        Row: {
          created_at: string
          direccion: string | null
          id: string
          profile_id: string
          razon_social: string | null
          rubro: string | null
          ruc: string | null
        }
        Insert: {
          created_at?: string
          direccion?: string | null
          id?: string
          profile_id: string
          razon_social?: string | null
          rubro?: string | null
          ruc?: string | null
        }
        Update: {
          created_at?: string
          direccion?: string | null
          id?: string
          profile_id?: string
          razon_social?: string | null
          rubro?: string | null
          ruc?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empresas_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      entidades_financieras: {
        Row: {
          created_at: string
          direccion: string | null
          id: string
          profile_id: string
          razon_social: string | null
          rubro: string | null
          ruc: string | null
        }
        Insert: {
          created_at?: string
          direccion?: string | null
          id?: string
          profile_id: string
          razon_social?: string | null
          rubro?: string | null
          ruc?: string | null
        }
        Update: {
          created_at?: string
          direccion?: string | null
          id?: string
          profile_id?: string
          razon_social?: string | null
          rubro?: string | null
          ruc?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entidades_financieras_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluaciones_crediticias: {
        Row: {
          created_at: string
          estado: string
          id: string
          monto_solicitado: number | null
          nombre_productor: string | null
          productor_id: string | null
          puntaje: number | null
          score: number | null
        }
        Insert: {
          created_at?: string
          estado?: string
          id?: string
          monto_solicitado?: number | null
          nombre_productor?: string | null
          productor_id?: string | null
          puntaje?: number | null
          score?: number | null
        }
        Update: {
          created_at?: string
          estado?: string
          id?: string
          monto_solicitado?: number | null
          nombre_productor?: string | null
          productor_id?: string | null
          puntaje?: number | null
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "evaluaciones_crediticias_productor_id_fkey"
            columns: ["productor_id"]
            isOneToOne: false
            referencedRelation: "marketplace_lotes_publicos"
            referencedColumns: ["productor_id"]
          },
          {
            foreignKeyName: "evaluaciones_crediticias_productor_id_fkey"
            columns: ["productor_id"]
            isOneToOne: false
            referencedRelation: "productores"
            referencedColumns: ["id"]
          },
        ]
      }
      fotos_lote: {
        Row: {
          created_at: string
          id: string
          lote_id: string
          orden: number
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          lote_id: string
          orden?: number
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          lote_id?: string
          orden?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "fotos_lote_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "lotes_fibra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fotos_lote_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "marketplace_lotes_publicos"
            referencedColumns: ["id"]
          },
        ]
      }
      lotes_fibra: {
        Row: {
          categoria_id: string | null
          codigo_lote: string | null
          color: string | null
          created_at: string
          estado: string
          fecha_esquila: string | null
          id: string
          peso_libras: number | null
          precio_por_libra: number | null
          productor_id: string
          ubicacion_general: string | null
        }
        Insert: {
          categoria_id?: string | null
          codigo_lote?: string | null
          color?: string | null
          created_at?: string
          estado?: string
          fecha_esquila?: string | null
          id?: string
          peso_libras?: number | null
          precio_por_libra?: number | null
          productor_id: string
          ubicacion_general?: string | null
        }
        Update: {
          categoria_id?: string | null
          codigo_lote?: string | null
          color?: string | null
          created_at?: string
          estado?: string
          fecha_esquila?: string | null
          id?: string
          peso_libras?: number | null
          precio_por_libra?: number | null
          productor_id?: string
          ubicacion_general?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lotes_fibra_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_fibra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lotes_fibra_productor_id_fkey"
            columns: ["productor_id"]
            isOneToOne: false
            referencedRelation: "marketplace_lotes_publicos"
            referencedColumns: ["productor_id"]
          },
          {
            foreignKeyName: "lotes_fibra_productor_id_fkey"
            columns: ["productor_id"]
            isOneToOne: false
            referencedRelation: "productores"
            referencedColumns: ["id"]
          },
        ]
      }
      mensajes_solicitud: {
        Row: {
          contenido: string
          created_at: string
          emisor_id: string
          id: string
          solicitud_id: string
        }
        Insert: {
          contenido: string
          created_at?: string
          emisor_id: string
          id?: string
          solicitud_id: string
        }
        Update: {
          contenido?: string
          created_at?: string
          emisor_id?: string
          id?: string
          solicitud_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mensajes_solicitud_emisor_id_fkey"
            columns: ["emisor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mensajes_solicitud_solicitud_id_fkey"
            columns: ["solicitud_id"]
            isOneToOne: false
            referencedRelation: "solicitudes_compra"
            referencedColumns: ["id"]
          },
        ]
      }
      notificaciones: {
        Row: {
          created_at: string
          id: string
          leida: boolean
          mensaje: string
          profile_id: string
          titulo: string
        }
        Insert: {
          created_at?: string
          id?: string
          leida?: boolean
          mensaje: string
          profile_id: string
          titulo: string
        }
        Update: {
          created_at?: string
          id?: string
          leida?: boolean
          mensaje?: string
          profile_id?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "notificaciones_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      productores: {
        Row: {
          codigo_productor: string
          comunidad: string | null
          created_at: string
          dni_ruc: string | null
          id: string
          nombre_asociacion: string | null
          profile_id: string
          provincia: string | null
          region: string
        }
        Insert: {
          codigo_productor: string
          comunidad?: string | null
          created_at?: string
          dni_ruc?: string | null
          id?: string
          nombre_asociacion?: string | null
          profile_id: string
          provincia?: string | null
          region?: string
        }
        Update: {
          codigo_productor?: string
          comunidad?: string | null
          created_at?: string
          dni_ruc?: string | null
          id?: string
          nombre_asociacion?: string | null
          profile_id?: string
          provincia?: string | null
          region?: string
        }
        Relationships: [
          {
            foreignKeyName: "productores_profile_id_fkey"
            columns: ["profile_id"]
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
          email: string | null
          estado: string
          id: string
          nombre: string
          rol: string
          telefono: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          estado?: string
          id: string
          nombre: string
          rol: string
          telefono?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          estado?: string
          id?: string
          nombre?: string
          rol?: string
          telefono?: string | null
        }
        Relationships: []
      }
      solicitudes_compra: {
        Row: {
          created_at: string
          empresa_id: string
          estado: string
          id: string
          lote_id: string
          precio_acordado: number | null
          productor_id: string
        }
        Insert: {
          created_at?: string
          empresa_id: string
          estado?: string
          id?: string
          lote_id: string
          precio_acordado?: number | null
          productor_id: string
        }
        Update: {
          created_at?: string
          empresa_id?: string
          estado?: string
          id?: string
          lote_id?: string
          precio_acordado?: number | null
          productor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "solicitudes_compra_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitudes_compra_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "lotes_fibra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitudes_compra_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "marketplace_lotes_publicos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitudes_compra_productor_id_fkey"
            columns: ["productor_id"]
            isOneToOne: false
            referencedRelation: "marketplace_lotes_publicos"
            referencedColumns: ["productor_id"]
          },
          {
            foreignKeyName: "solicitudes_compra_productor_id_fkey"
            columns: ["productor_id"]
            isOneToOne: false
            referencedRelation: "productores"
            referencedColumns: ["id"]
          },
        ]
      }
      transacciones: {
        Row: {
          created_at: string
          empresa_id: string | null
          estado: string
          id: string
          lote_id: string | null
          precio_por_libra: number | null
          productor_id: string | null
        }
        Insert: {
          created_at?: string
          empresa_id?: string | null
          estado?: string
          id?: string
          lote_id?: string | null
          precio_por_libra?: number | null
          productor_id?: string | null
        }
        Update: {
          created_at?: string
          empresa_id?: string | null
          estado?: string
          id?: string
          lote_id?: string | null
          precio_por_libra?: number | null
          productor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transacciones_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transacciones_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "lotes_fibra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transacciones_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "marketplace_lotes_publicos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transacciones_productor_id_fkey"
            columns: ["productor_id"]
            isOneToOne: false
            referencedRelation: "marketplace_lotes_publicos"
            referencedColumns: ["productor_id"]
          },
          {
            foreignKeyName: "transacciones_productor_id_fkey"
            columns: ["productor_id"]
            isOneToOne: false
            referencedRelation: "productores"
            referencedColumns: ["id"]
          },
        ]
      }
      validaciones_productor: {
        Row: {
          created_at: string
          id: string
          notas: string | null
          productor_id: string
          resultado: string | null
          validado_por: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          notas?: string | null
          productor_id: string
          resultado?: string | null
          validado_por?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          notas?: string | null
          productor_id?: string
          resultado?: string | null
          validado_por?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "validaciones_productor_productor_id_fkey"
            columns: ["productor_id"]
            isOneToOne: false
            referencedRelation: "marketplace_lotes_publicos"
            referencedColumns: ["productor_id"]
          },
          {
            foreignKeyName: "validaciones_productor_productor_id_fkey"
            columns: ["productor_id"]
            isOneToOne: false
            referencedRelation: "productores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "validaciones_productor_validado_por_fkey"
            columns: ["validado_por"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      marketplace_lotes_publicos: {
        Row: {
          categoria: string | null
          codigo_lote: string | null
          color: string | null
          comunidad: string | null
          created_at: string | null
          estado: string | null
          fecha_esquila: string | null
          id: string | null
          nivel_calidad: number | null
          nombre_asociacion: string | null
          peso_libras: number | null
          precio_por_libra: number | null
          productor_id: string | null
          productor_region: string | null
          region: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_profile_with_role: {
        Args: {
          p_avatar_url?: string
          p_comunidad?: string
          p_direccion?: string
          p_dni?: string
          p_email: string
          p_nombre: string
          p_provincia?: string
          p_razon_social?: string
          p_region?: string
          p_rol: string
          p_rubro?: string
          p_ruc?: string
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
  public: {
    Enums: {},
  },
} as const
