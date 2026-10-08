"use client";

import { use } from "react";
import Link from "next/link";
import { useGetCategoryQuery } from "@/store/features/categories/categoriesApi";
import { useGetProductsQuery } from "@/store/features/products/productsApi";
import ProductCard from "@/components/ProductCard";
import { getApiErrorMessage } from "@/lib/format";

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const categoryId = Number(id);
  const {
    data: category,
    isLoading: loadingCategory,
    isError: errorCategory,
    error: categoryError,
  } = useGetCategoryQuery(categoryId, { skip: Number.isNaN(categoryId) });
  const {
    data: products,
    isLoading: loadingProducts,
    isError: errorProducts,
  } = useGetProductsQuery();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-8 text-sm text-zinc-500">
        <Link href="/categories" className="hover:text-indigo-600">
          Categorías
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800">
          {loadingCategory ? "Cargando..." : category?.name ?? "No encontrada"}
        </span>
      </nav>

      {errorCategory ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
          {getApiErrorMessage(categoryError)}
        </div>
      ) : (
        <div className="mb-10 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100">
          {category?.image && (
            <div className="relative h-56 sm:h-72">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h1 className="absolute bottom-6 left-6 text-3xl font-bold text-white sm:text-4xl">
                {category?.name}
              </h1>
            </div>
          )}
          {!category?.image && (
            <h1 className="p-6 text-3xl font-bold text-zinc-900">
              {category?.name ?? "Categoría"}
            </h1>
          )}
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-zinc-900">Productos</h2>
        <p className="mt-1 text-sm text-zinc-500">
          El backend no asocia productos a categorías, así que mostramos el
          catálogo completo.
        </p>
      </div>

      {loadingProducts ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl bg-zinc-200" />
          ))}
        </div>
      ) : errorProducts ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
          No se pudieron cargar los productos.
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-12 text-center text-sm text-zinc-500">
          No hay productos en el catálogo.
        </div>
      )}
    </div>
  );
}
