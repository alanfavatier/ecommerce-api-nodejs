"use client";

import Link from "next/link";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "@/store/features/products/productsApi";
import DeleteConfirm from "@/components/DeleteConfirm";
import { formatPrice, getApiErrorMessage } from "@/lib/format";

export default function AdminProductsPage() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
    } catch (err) {
      alert(getApiErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Productos</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {products ? `${products.length} en el catálogo` : "Cargando..."}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          + Nuevo producto
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-zinc-200" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
          No se pudieron cargar los productos.
        </div>
      ) : products && products.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-zinc-900">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-zinc-900">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    {product.isBlock ? (
                      <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                        Bloqueado
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                        Activo
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50"
                      >
                        Editar
                      </Link>
                      <DeleteConfirm onConfirm={() => handleDelete(product.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-12 text-center">
          <p className="text-sm font-medium text-zinc-700">
            No hay productos todavía
          </p>
          <Link
            href="/admin/products/new"
            className="mt-4 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Crear el primero
          </Link>
        </div>
      )}
    </div>
  );
}
