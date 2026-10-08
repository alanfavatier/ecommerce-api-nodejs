import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LocalOrder } from "@/lib/types";

interface OrdersState {
  orders: LocalOrder[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersLocalSlice = createSlice({
  name: "localOrders",
  initialState,
  reducers: {
    hydrateOrders(state, action: PayloadAction<LocalOrder[]>) {
      state.orders = action.payload;
    },
    addLocalOrder(state, action: PayloadAction<LocalOrder>) {
      state.orders.unshift(action.payload);
    },
  },
});

export const { hydrateOrders, addLocalOrder } = ordersLocalSlice.actions;
export default ordersLocalSlice.reducer;
