/**
 * Tipos TypeScript generados para las tablas de Supabase
 * Estos tipos deben coincidir con el esquema de la base de datos
 */

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
      pages: {
        Row: {
          id: string
          slug: string
          title: string
          content: Json
          meta_title: string | null
          meta_description: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          content?: Json
          meta_title?: string | null
          meta_description?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          content?: Json
          meta_title?: string | null
          meta_description?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      sections: {
        Row: {
          id: string
          page_id: string | null
          type: 'hero' | 'products' | 'services' | 'blog' | 'contact' | 'testimonials' | 'features' | 'pricing' | 'faq' | 'cta'
          title: string | null
          subtitle: string | null
          content: Json
          order: number
          visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          page_id?: string | null
          type: 'hero' | 'products' | 'services' | 'blog' | 'contact' | 'testimonials' | 'features' | 'pricing' | 'faq' | 'cta'
          title?: string | null
          subtitle?: string | null
          content?: Json
          order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          page_id?: string | null
          type?: 'hero' | 'products' | 'services' | 'blog' | 'contact' | 'testimonials' | 'features' | 'pricing' | 'faq' | 'cta'
          title?: string | null
          subtitle?: string | null
          content?: Json
          order?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          features: Json
          category: string | null
          order: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          features?: Json
          category?: string | null
          order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          features?: Json
          category?: string | null
          order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          image_url: string | null
          category: string | null
          order: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          image_url?: string | null
          category?: string | null
          order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          image_url?: string | null
          category?: string | null
          order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          image_url: string | null
          author: string | null
          category: string | null
          tags: string[]
          published: boolean
          published_at: string | null
          meta_title: string | null
          meta_description: string | null
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content?: string | null
          image_url?: string | null
          author?: string | null
          category?: string | null
          tags?: string[]
          published?: boolean
          published_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string | null
          image_url?: string | null
          author?: string | null
          category?: string | null
          tags?: string[]
          published?: boolean
          published_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          filename: string
          url: string
          type: 'image' | 'video' | 'document' | 'audio'
          size: number | null
          alt_text: string | null
          created_at: string
        }
        Insert: {
          id?: string
          filename: string
          url: string
          type: 'image' | 'video' | 'document' | 'audio'
          size?: number | null
          alt_text?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          filename?: string
          url?: string
          type?: 'image' | 'video' | 'document' | 'audio'
          size?: number | null
          alt_text?: string | null
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          project_type: string | null
          budget_range: string | null
          message: string
          start_timeframe: string | null
          status: 'new' | 'read' | 'responded' | 'archived'
          created_at: string
          read: boolean
          responded: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          project_type?: string | null
          budget_range?: string | null
          message: string
          start_timeframe?: string | null
          status?: 'new' | 'read' | 'responded' | 'archived'
          created_at?: string
          read?: boolean
          responded?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          project_type?: string | null
          budget_range?: string | null
          message?: string
          start_timeframe?: string | null
          status?: 'new' | 'read' | 'responded' | 'archived'
          created_at?: string
          read?: boolean
          responded?: boolean
        }
      }
      site_content: {
        Row: {
          id: string
          section: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          section: string
          key: string
          value?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          section?: string
          key?: string
          value?: Json
          updated_at?: string
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
      [_ in never]: never
    }
  }
}
