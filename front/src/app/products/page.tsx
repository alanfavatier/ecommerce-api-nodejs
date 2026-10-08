"use client";

import { useMemo, useState } from "react";
import { useGetProductsQuery } from "@/store/features/products/productsApi";
import ProductCard from "@/components/ProductCard";

type SortKey = "name-asc" | "name-desc" | "price-asc" | "price-desc";

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("name-asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filtered = useMemo(() => {
    if (!products) return [];
    let result = [...products];
    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter((p) => p.name.toLowerCase().includes(query));
    }
    const min = minPrice === "" ? null : Number(minPrice);
    const max = maxPrice === "" ? null : Number(maxPrice);
    if (min !== null && !Number.isNaN(min)) {
      result = result.filter((p) => p.price >= min);
    }
    if (max !== null && !Number.isNaN(max)) {
      result = result.filter((p) => p.price <= max);
    }
    switch (sort) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
    }
    return result;
  }, [products, search, sort, minPrice, maxPrice]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Productos</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {products ? `${products.length} productos en el catálogo` : "Cargando catálogo..."}
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre..."
          className="flex-1 rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min $"
            min={0}
            className="w-28 rounded-xl border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <span className="text-zinc-400">—</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max $"
            min={0}
            className="w-28 rounded-xl border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="name-asc">Nombre: A-Z</option>
          <option value="name-desc">Nombre: Z-A</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl bg-zinc-200" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
          No se pudieron cargar los productos. Verifica que el backend esté
          corriendo en http://localhost:3001.
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-12 text-center">
          <p className="text-sm font-medium text-zinc-700">
            No se encontraron productos
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            {products && products.length > 0
              ? "Prueba ajustando los filtros de búsqueda."
              : "Aún no hay productos en el catálogo."}
          </p>
        </div>
      )}
    </div>
  );
}
