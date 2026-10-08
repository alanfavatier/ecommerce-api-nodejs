"use client";

import Link from "next/link";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/store/features/categories/categoriesApi";
import DeleteConfirm from "@/components/DeleteConfirm";
import { getApiErrorMessage } from "@/lib/format";

export default function AdminCategoriesPage() {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id).unwrap();
    } catch (err) {
      alert(getApiErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Categorías</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {categories ? `${categories.length} registradas` : "Cargando..."}
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          + Nueva categoría
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-zinc-200" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
          No se pudieron cargar las categorías.
        </div>
      ) : categories && categories.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-zinc-900">
                        {category.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-500">
                    {category.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50"
                      >
                        Editar
                      </Link>
                      <DeleteConfirm
                        onConfirm={() => handleDelete(category.id)}
                      />
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
            No hay categorías todavía
          </p>
          <Link
            href="/admin/categories/new"
            className="mt-4 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Crear la primera
          </Link>
        </div>
      )}
    </div>
  );
}
