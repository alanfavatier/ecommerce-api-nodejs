"use client";

import Link from "next/link";
import { useGetCategoriesQuery } from "@/store/features/categories/categoriesApi";

export default function CategoriesPage() {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Categorías</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Explora nuestros sectores de productos
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-56 animate-pulse rounded-2xl bg-zinc-200" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
          No se pudieron cargar las categorías. Verifica que el backend esté
          corriendo en http://localhost:3001.
        </div>
      ) : categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group relative h-56 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <h2 className="text-xl font-bold text-white">{category.name}</h2>
                <p className="text-sm text-zinc-200">Ver categoría</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-12 text-center">
          <p className="text-sm font-medium text-zinc-700">
            No hay categorías todavía
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Crea algunas desde el{" "}
            <Link href="/admin/categories" className="font-semibold text-indigo-600">
              panel de administración
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
