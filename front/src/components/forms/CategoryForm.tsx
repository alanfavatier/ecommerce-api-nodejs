"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/store/features/categories/categoriesApi";
import { getApiErrorMessage } from "@/lib/format";
import type { Category } from "@/lib/types";

export default function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter();
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [name, setName] = useState(category?.name ?? "");
  const [image, setImage] = useState(category?.image ?? "");
  const [error, setError] = useState("");

  const loading = creating || updating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 3 || name.trim().length > 15) {
      setError("El nombre debe tener entre 3 y 15 caracteres.");
      return;
    }
    try {
      new URL(image);
    } catch {
      setError("La imagen debe ser una URL válida (https://...).");
      return;
    }

    try {
      if (category) {
        await updateCategory({
          id: category.id,
          changes: { name: name.trim(), image },
        }).unwrap();
      } else {
        await createCategory({ name: name.trim(), image }).unwrap();
      }
      router.push("/admin/categories");
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg space-y-5 rounded-2xl border border-zinc-200 bg-white p-6"
    >
      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-zinc-700">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={15}
          required
          placeholder="Ropa"
          className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <p className="mt-1 text-xs text-zinc-400">Entre 3 y 15 caracteres.</p>
      </div>
      <div>
        <label htmlFor="image" className="mb-1.5 block text-sm font-medium text-zinc-700">
          Imagen (URL)
        </label>
        <input
          id="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          placeholder="https://ejemplo.com/imagen.jpg"
          className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        {image && (
          <div className="mt-3 h-32 w-32 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="Vista previa" className="h-full w-full object-cover" />
          </div>
        )}
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:bg-zinc-400"
        >
          {loading ? "Guardando..." : category ? "Guardar cambios" : "Crear categoría"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
