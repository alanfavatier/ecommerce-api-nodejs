"use client";

import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/features/cart/cartSlice";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:border-zinc-300 hover:shadow-lg">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-zinc-100"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {product.isBlock && (
          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
            No disponible
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <Link href={`/products/${product.id}`}>
            <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 hover:text-indigo-600">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-lg font-bold text-indigo-600">
            {formatPrice(product.price)}
          </p>
        </div>
        <button
          onClick={() => dispatch(addToCart({ product }))}
          disabled={product.isBlock}
          className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
