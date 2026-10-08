"use client";

import ProductForm from "@/components/forms/ProductForm";

export default function AdminNewProductPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-zinc-900">
        Nuevo producto
      </h1>
      <ProductForm />
    </div>
  );
}
