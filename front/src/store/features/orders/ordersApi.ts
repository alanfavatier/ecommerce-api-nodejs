import { apiSlice } from "../api/apiSlice";
import type { ApiOrder } from "@/lib/types";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<ApiOrder[], void>({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
