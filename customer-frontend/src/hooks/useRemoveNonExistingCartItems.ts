import { useProducts } from "./useProducts";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cartActions, selectCartItemsArray, selectOrderId } from "../store/cartSlice";
import { useEffect } from "react";
import { isEmpty, isNil } from "lodash";
import { useOrderById } from "./useOrderById";

export function useRemoveNonExistingCartItems() {
  const { products } = useProducts();
  const orderId = useAppSelector(selectOrderId);
  const { order } = useOrderById(orderId);
  const cartContent = useAppSelector(selectCartItemsArray);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNil(order)) return;
    if (
      isNil(products) ||
      isEmpty(products) ||
      isNil(cartContent) ||
      isEmpty(cartContent)
    )
      return;

    const placedProductIds = new Set(
      (order.products ?? [])
        .map((line) => line.product?.id)
        .filter((id): id is string => Boolean(id))
    );

    for (const cartItem of cartContent) {
      const cartItemId = cartItem.id;
      const product = products.find((product) => product.id === cartItemId);
      const inactiveAndNotOnOrder =
        !!product && product.is_active !== "כן" && !placedProductIds.has(cartItemId);
      if (!product || inactiveAndNotOnOrder) {
        if (!product) {
          console.error(
            `Product with id ${cartItemId} is in cart but not found in products`
          );
        }
        dispatch(cartActions.removeItem(cartItemId));
      }
    }
  }, [products, cartContent, order, dispatch]);
}
