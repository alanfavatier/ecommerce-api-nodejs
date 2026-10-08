"use client";

import Link from "next/link";
import { useGetProductsQuery } from "@/store/features/products/productsApi";
import { useGetCategoriesQuery } from "@/store/features/categories/categoriesApi";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const { data: products, isLoading: loadingProducts, isError: errorProducts } =
    useGetProductsQuery();
  const {
    data: categories,
    isLoading: loadingCategories,
    isError: errorCategories,
  } = useGetCategoriesQuery();

  const featured = products ? products.slice(0, 8) : [];

  return (
    <div>
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-zinc-900">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-20 sm:px-6 lg:py-28">
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-indigo-100">
            Nueva colección disponible
          </span>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Encuentra lo que buscas al mejor precio
          </h1>
          <p className="max-w-xl text-lg text-indigo-100">
            Explora nuestro catálogo de productos, agrégolos al carrito y
            realiza tu pedido en pocos pasos.
          </p>
          <div className="flex gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Ver productos
            </Link>
            <Link
              href="/categories"
              className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explorar categorías
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Categorías</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Explora por secciones
            </p>
          </div>
          <Link
            href="/categories"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Ver todas
          </Link>
        </div>
        {loadingCategories ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl bg-zinc-200"
              />
            ))}
          </div>
        ) : errorCategories ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800">
            No se pudieron cargar las categorías. Verifica que el backend esté
            corriendo.
          </p>
        ) : categories && categories.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group relative h-40 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-4 left-4 text-lg font-bold text-white">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-zinc-200 bg-white px-4 py-6 text-sm text-zinc-500">
            Aún no hay categorías. Puedes crear algunas desde el{" "}
            <Link href="/admin/categories" className="font-semibold text-indigo-600">
              panel de administración
            </Link>
            .
          </p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">
              Productos destacados
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Los más recientes del catálogo
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Ver todos
          </Link>
        </div>
        {loadingProducts ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-2xl bg-zinc-200"
              />
            ))}
          </div>
        ) : errorProducts ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
            No se pudieron cargar los productos. Verifica que el backend esté
            corriendo en http://localhost:3001.
          </div>
        ) : featured.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-10 text-center text-sm text-zinc-500">
            No hay productos todavía. Crea algunos desde el{" "}
            <Link href="/admin/products" className="font-semibold text-indigo-600">
              panel de administración
            </Link>
            .
          </div>
        )}
      </section>
    </div>
  );
}
