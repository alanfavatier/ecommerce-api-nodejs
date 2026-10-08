export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isBlock?: boolean;
}

export interface User {
  id: number;
  email: string;
  password?: string;
  createdAt?: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface ApiOrder {
  id?: number | string;
  createdAt?: string;
  total?: number;
  status?: string;
  [key: string]: unknown;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
}

export interface LocalOrder {
  id: string;
  items: CartItem[];
  total: number;
  shipping: ShippingInfo;
  status: "pending" | "paid" | "shipped" | "delivered";
  createdAt: string;
}

export interface AuthUser {
  id: number;
  email: string;
}
