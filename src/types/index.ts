// Tipos globales de la aplicación

export interface Product {
  id: number
  name: string
  description: string
  price: string
  image?: string
  category?: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  slug: string
  author?: string
  image?: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
}
