// ============================================
// SUPABASE DATABASE TYPES
// ============================================
// Auto-generated types from Supabase schema
// ============================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          price: number
          discount_price: number | null
          category_id: string
          images: string[]
          sizes: Json[]
          colors: Json[]
          stock: number
          sku: string | null
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          price: number
          discount_price?: number | null
          category_id: string
          images: string[]
          sizes: Json[]
          colors: Json[]
          stock?: number
          sku?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          price?: number
          discount_price?: number | null
          category_id?: string
          images?: string[]
          sizes?: Json[]
          colors?: Json[]
          stock?: number
          sku?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image: string | null
          parent_id: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image?: string | null
          parent_id?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image?: string | null
          parent_id?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string
          subtotal: number
          discount: number
          shipping_cost: number
          total: number
          status: string
          payment_method: string
          payment_status: string
          shipping_address: Json
          notes: string | null
          tracking_number: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          order_number: string
          user_id: string
          subtotal: number
          discount?: number
          shipping_cost: number
          total: number
          status?: string
          payment_method: string
          payment_status?: string
          shipping_address: Json
          notes?: string | null
          tracking_number?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string
          subtotal?: number
          discount?: number
          shipping_cost?: number
          total?: number
          status?: string
          payment_method?: string
          payment_status?: string
          shipping_address?: Json
          notes?: string | null
          tracking_number?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          size: string
          color: string
          price: number
          subtotal: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          size: string
          color: string
          price: number
          subtotal: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          size?: string
          color?: string
          price?: number
          subtotal?: number
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          phone: string | null
          avatar_url: string | null
          role: string
          is_active: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name: string
          phone?: string | null
          avatar_url?: string | null
          role?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          phone?: string | null
          avatar_url?: string | null
          role?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string | null
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          label: string
          recipient_name: string
          phone: string
          address_line1: string
          address_line2: string | null
          city: string
          province: string
          postal_code: string
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          label: string
          recipient_name: string
          phone: string
          address_line1: string
          address_line2?: string | null
          city: string
          province: string
          postal_code: string
          is_default?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          label?: string
          recipient_name?: string
          phone?: string
          address_line1?: string
          address_line2?: string | null
          city?: string
          province?: string
          postal_code?: string
          is_default?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      order_status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
      payment_method: 'bank_transfer' | 'e_wallet' | 'cod' | 'credit_card'
      payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
      user_role: 'customer' | 'admin'
    }
  }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
