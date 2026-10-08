import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/store/features/api/apiSlice";
import cartReducer from "@/store/features/cart/cartSlice";
import authReducer from "@/store/features/auth/authSlice";
import ordersLocalReducer from "@/store/features/orders/ordersLocalSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      cart: cartReducer,
      auth: authReducer,
      localOrders: ordersLocalReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
