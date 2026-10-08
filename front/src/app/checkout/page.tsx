"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/features/cart/cartSlice";
import { addLocalOrder } from "@/store/features/orders/ordersLocalSlice";
import { formatPrice } from "@/lib/format";
import type { ShippingInfo } from "@/lib/types";

const emptyShipping: ShippingInfo = {
  name: "",
  email: "",
  address: "",
  city: "",
  phone: "",
};

export default function CheckoutPage() {
  const items = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [shipping, setShipping] = useState<ShippingInfo>({
    ...emptyShipping,
    email: user?.email ?? "",
  });
  const [error, setError] = useState("");

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleChange = (field: keyof ShippingInfo, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !shipping.name.trim() ||
      !shipping.email.trim() ||
      !shipping.address.trim() ||
      !shipping.city.trim() ||
      !shipping.phone.trim()
    ) {
      setError("Completa todos los campos de envío.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) {
      setError("Ingresa un email válido.");
      return;
    }

    dispatch(
      addLocalOrder({
        id: crypto.randomUUID(),
        items,
        total,
        shipping,
        status: "pending",
        createdAt: new Date().toISOString(),
      }),
    );
    dispatch(clearCart());
    router.push("/orders?created=1");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-zinc-900">
          No hay productos para comprar
        </h1>
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
      <h1 className="mb-8 text-3xl font-bold text-zinc-900">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 lg:col-span-2"
        >
          <h2 className="text-lg font-bold text-zinc-900">Datos de envío</h2>
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-zinc-700">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                value={shipping.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={shipping.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-zinc-700">
              Dirección
            </label>
            <input
              id="address"
              type="text"
              value={shipping.address}
              onChange={(e) => handleChange("address", e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-zinc-700">
                Ciudad
              </label>
              <input
                id="city"
                type="text"
                value={shipping.city}
                onChange={(e) => handleChange("city", e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-zinc-700">
                Teléfono
              </label>
              <input
                id="phone"
                type="tel"
                value={shipping.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
          >
            Confirmar pedido
          </button>
        </form>

        <div className="h-fit rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-bold text-zinc-900">Tu pedido</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="text-zinc-600">
                  {item.product.name}{" "}
                  <span className="text-zinc-400">×{item.quantity}</span>
                </span>
                <span className="font-semibold text-zinc-900">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-zinc-200 pt-4 text-base font-bold text-zinc-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
