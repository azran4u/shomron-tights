import { BaseProduct } from "./BaseProduct";
import { ProductSchema } from "./ProductSchema";

export interface ProductShort extends BaseProduct {
  kind: ProductSchema.SHORT;
  length: string;
  size: string;
  color: string;
  length_description?: string;
  length_sort_order: string;
}
