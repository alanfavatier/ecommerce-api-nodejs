"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFromCart,
  updateCartQuantity,
} from "@/store/features/cart/cartSlice";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100">
          <svg
            className="h-10 w-10 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.5l1.7 12.1a1.5 1.5 0 0 0 1.5 1.3h9.6a1.5 1.5 0 0 0 1.5-1.2L20 7H6M9 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900">Tu carrito está vacío</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Agrega productos desde el catálogo para comenzar tu compra.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900">Carrito</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4"
            >
              <Link
                href={`/products/${item.product.id}`}
                className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/products/${item.product.id}`}
                      className="text-sm font-semibold text-zinc-900 hover:text-indigo-600"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-zinc-500">
                      {formatPrice(item.product.price)} c/u
                    </p>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="text-zinc-400 transition hover:text-red-600"
                    aria-label="Quitar producto"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m6 18 12-12M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-zinc-300">
                    <button
                      onClick={() =>
                        dispatch(
                          updateCartQuantity({
                            id: item.product.id,
                            quantity: item.quantity - 1,
                          }),
                        )
                      }
                      className="px-3 py-1.5 font-semibold text-zinc-600 hover:text-zinc-900"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateCartQuantity({
                            id: item.product.id,
                            quantity: item.quantity + 1,
                          }),
                        )
                      }
                      className="px-3 py-1.5 font-semibold text-zinc-600 hover:text-zinc-900"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-bold text-zinc-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-bold text-zinc-900">Resumen</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-zinc-600">
              <dt>Subtotal</dt>
              <dd className="font-semibold">{formatPrice(total)}</dd>
            </div>
            <div className="flex justify-between text-zinc-600">
              <dt>Envío</dt>
              <dd className="font-semibold">Gratis</dd>
            </div>
            <div className="border-t border-zinc-200 pt-2 text-base font-bold text-zinc-900">
              <div className="flex justify-between">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 block rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Finalizar compra
          </Link>
          <Link
            href="/products"
            className="mt-3 block text-center text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
