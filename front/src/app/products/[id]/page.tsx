"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useGetProductQuery } from "@/store/features/products/productsApi";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/features/cart/cartSlice";
import { formatPrice, getApiErrorMessage } from "@/lib/format";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: product, isLoading, isError, error } = useGetProductQuery(id);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-3xl bg-zinc-200" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded-lg bg-zinc-200" />
          <div className="h-6 w-1/3 animate-pulse rounded-lg bg-zinc-200" />
          <div className="h-24 w-full animate-pulse rounded-lg bg-zinc-200" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-zinc-900">
          Producto no disponible
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {getApiErrorMessage(error)}
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Volver a productos
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    dispatch(addToCart({ product, quantity }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <nav className="mb-8 text-sm text-zinc-500">
        <Link href="/products" className="hover:text-indigo-600">
          Productos
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          {product.isBlock && (
            <span className="mb-4 w-fit rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Producto no disponible
            </span>
          )}
          <h1 className="text-3xl font-bold text-zinc-900">{product.name}</h1>
          <p className="mt-3 text-3xl font-bold text-indigo-600">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-zinc-600">
            Este producto está disponible ahora mismo en nuestra tienda.
            Agrégalo al carrito y completa tu pedido desde el checkout.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-xl border border-zinc-300">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2.5 text-lg font-semibold text-zinc-600 transition hover:text-zinc-900"
                aria-label="Reducir cantidad"
              >
                −
              </button>
              <span className="min-w-10 text-center text-sm font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2.5 text-lg font-semibold text-zinc-600 transition hover:text-zinc-900"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={product.isBlock}
              className="flex-1 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
            >
              {added ? "¡Agregado!" : "Agregar al carrito"}
            </button>
          </div>

          <Link
            href="/cart"
            className="mt-4 text-center text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Ir al carrito →
          </Link>
        </div>
      </div>
    </div>
  );
}
