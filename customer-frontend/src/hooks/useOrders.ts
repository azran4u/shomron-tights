import { useQuery } from "@tanstack/react-query";
import { ordersService } from "../services/ordersService";

export function useOrders() {
  const { isFetching: isLoading, data: orders } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => ordersService.getAll(),
    staleTime: 0,
    gcTime: 0,
  });

  return { isLoading, orders };
}
