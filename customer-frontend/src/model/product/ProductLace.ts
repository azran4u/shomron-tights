import { BaseProduct } from "./BaseProduct";
import { ProductSchema } from "./ProductSchema";

export interface ProductLace extends BaseProduct {
  kind: ProductSchema.LACE;
  lace: string;
  color: string;
}
