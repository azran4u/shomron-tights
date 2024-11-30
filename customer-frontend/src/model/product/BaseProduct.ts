import { ProductSchema } from "./ProductSchema";

export interface BaseProduct {
  id: string;
  kind: ProductSchema;
  name: string;
  price: number;
  supplier: string;
  discount_type: string;
  discount_min_qty: number;
  discount_price: number;
  description: string;
  stock: number;
  is_active: boolean;
  is_default: boolean;
  image: string;
}
