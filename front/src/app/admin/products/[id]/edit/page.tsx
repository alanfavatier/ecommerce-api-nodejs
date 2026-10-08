"use client";

import { use } from "react";
import { useGetProductQuery } from "@/store/features/products/productsApi";
import ProductForm from "@/components/forms/ProductForm";
import { getApiErrorMessage } from "@/lib/format";

export default function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: product, isLoading, isError, error } = useGetProductQuery(id);

  if (isLoading) {
    return (
      <div>
        <div className="mb-6 h-9 w-64 animate-pulse rounded-lg bg-zinc-200" />
        <div className="h-96 max-w-lg animate-pulse rounded-2xl bg-zinc-200" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
        {getApiErrorMessage(error)}
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-zinc-900">
        Editar producto
      </h1>
      <ProductForm product={product} />
    </div>
  );
}
