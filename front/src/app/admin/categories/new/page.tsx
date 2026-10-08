"use client";

import CategoryForm from "@/components/forms/CategoryForm";

export default function AdminNewCategoryPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-zinc-900">
        Nueva categoría
      </h1>
      <CategoryForm />
    </div>
  );
}
