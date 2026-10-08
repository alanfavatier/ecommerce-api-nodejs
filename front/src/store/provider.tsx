"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./index";
import { setCredentials } from "./features/auth/authSlice";
import { hydrateCart } from "./features/cart/cartSlice";
import { hydrateOrders } from "./features/orders/ordersLocalSlice";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(makeStore);

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      const cart = localStorage.getItem("cart");
      const orders = localStorage.getItem("orders");
      store.dispatch(setCredentials(user ? JSON.parse(user) : null));
      store.dispatch(hydrateCart(cart ? JSON.parse(cart) : []));
      store.dispatch(hydrateOrders(orders ? JSON.parse(orders) : []));
    } catch {
      store.dispatch(setCredentials(null));
    }
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (!state.auth.hydrated) return;
      localStorage.setItem("user", JSON.stringify(state.auth.user));
      localStorage.setItem("cart", JSON.stringify(state.cart.items));
      localStorage.setItem("orders", JSON.stringify(state.localOrders.orders));
    });
    return unsubscribe;
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
