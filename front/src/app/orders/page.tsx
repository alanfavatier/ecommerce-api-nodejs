"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAppSelector } from "@/store/hooks";
import { useGetOrdersQuery } from "@/store/features/orders/ordersApi";
import { formatPrice, formatDate } from "@/lib/format";

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  paid: "Pagado",
  shipped: "Enviado",
  delivered: "Entregado",
};

function OrdersContent() {
  const searchParams = useSearchParams();
  const created = searchParams.get("created") === "1";
  const localOrders = useAppSelector((state) => state.localOrders.orders);
  const user = useAppSelector((state) => state.auth.user);
  const { data: apiOrders, isLoading: loadingApi } = useGetOrdersQuery();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-zinc-900">Mis pedidos</h1>

      {created && (
        <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-800">
          ¡Pedido creado correctamente! Gracias por tu compra.
        </div>
      )}

      {!user && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800">
          No has iniciado sesión. Tus pedidos se guardan localmente en este
          dispositivo.{" "}
          <Link href="/login" className="font-semibold underline">
            Inicia sesión
          </Link>{" "}
          para gestionar tu cuenta.
        </div>
      )}

      <div className="mt-8 space-y-4">
        {localOrders.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-12 text-center">
            <p className="text-sm font-medium text-zinc-700">
              No tienes pedidos todavía
            </p>
            <Link
              href="/products"
              className="mt-4 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          localOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-mono text-zinc-500">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  {statusLabels[order.status] ?? order.status}
                </span>
              </div>
              <ul className="mt-4 divide-y divide-zinc-100 border-t border-zinc-100">
                {order.items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex items-center justify-between py-3 text-sm"
                  >
                    <span className="text-zinc-700">
                      {item.product.name}{" "}
                      <span className="text-zinc-400">×{item.quantity}</span>
                    </span>
                    <span className="font-semibold text-zinc-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3">
                <p className="text-sm text-zinc-500">
                  Enviar a: {order.shipping.name}, {order.shipping.city}
                </p>
                <p className="text-base font-bold text-zinc-900">
                  {formatPrice(order.total)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-bold text-zinc-900">
          Pedidos registrados en el servidor
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Endpoint <code className="rounded bg-zinc-100 px-1">GET /orders</code>{" "}
          del backend.
        </p>
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6">
          {loadingApi ? (
            <div className="h-16 animate-pulse rounded-xl bg-zinc-100" />
          ) : apiOrders && apiOrders.length > 0 ? (
            <ul className="divide-y divide-zinc-100">
              {apiOrders.map((order, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="font-mono text-zinc-500">
                    #{String(order.id ?? index + 1)}
                  </span>
                  <span className="text-zinc-700">
                    {order.createdAt ? formatDate(String(order.createdAt)) : "-"}
                  </span>
                  <span className="font-semibold text-zinc-900">
                    {order.total ? formatPrice(Number(order.total)) : "-"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500">
              El backend no tiene pedidos registrados aún (el endpoint siempre
              devuelve una lista vacía).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-zinc-200" />
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}
