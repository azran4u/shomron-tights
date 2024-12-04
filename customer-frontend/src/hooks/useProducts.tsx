import { useQuery } from "@tanstack/react-query";
import { productsSrevice } from "../services/productsSrevice";
import { Product } from "../model/product/Product";

export function useProducts() {
  const { isLoading, data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await productsSrevice.getAll();
      return res.filter((product) => product.is_active === "כן");
    },
    initialData: [],
  });

  return { isLoading, products };
}
