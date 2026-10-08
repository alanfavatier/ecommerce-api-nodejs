"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { useGetOrdersQuery } from "@/store/features/orders/ordersApi";
import { formatPrice, formatDate } from "@/lib/format";

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  paid: "Pagado",
  shipped: "Enviado",
  delivered: "Entregado",
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-sky-100 text-sky-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
};

export default function AdminOrdersPage() {
  const localOrders = useAppSelector((state) => state.localOrders.orders);
  const { data: apiOrders, isLoading, isError } = useGetOrdersQuery();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900">Pedidos</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Pedidos del checkout (locales) y respuesta del endpoint GET /orders.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-bold text-zinc-900">
          Pedidos del checkout
        </h2>
        {localOrders.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">
            No hay pedidos creados desde el frontend todavía.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Cliente</th>
                  <th className="px-3 py-2">Ciudad</th>
                  <th className="px-3 py-2">Items</th>
                  <th className="px-3 py-2">Total</th>
                  <th className="px-3 py-2">Estado</th>
                  <th className="px-3 py-2">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {localOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50">
                    <td className="px-3 py-3 font-mono text-xs text-zinc-500">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-3 py-3 font-medium text-zinc-900">
                      {order.shipping.name}
                    </td>
                    <td className="px-3 py-3 text-zinc-600">
                      {order.shipping.city}
                    </td>
                    <td className="px-3 py-3 text-zinc-600">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)}
                    </td>
                    <td className="px-3 py-3 font-semibold text-zinc-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          statusStyles[order.status] ?? "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {statusLabels[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-zinc-500">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-bold text-zinc-900">
          GET /api/v1/orders
        </h2>
        {isLoading ? (
          <div className="mt-3 h-16 animate-pulse rounded-xl bg-zinc-100" />
        ) : isError ? (
          <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            No se pudo consultar el endpoint de pedidos.
          </p>
        ) : apiOrders && apiOrders.length > 0 ? (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-50 p-4 text-xs text-zinc-700">
            {JSON.stringify(apiOrders, null, 2)}
          </pre>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            El backend devuelve una lista vacía (el servicio de órdenes es un
            stub).{" "}
            <Link href="/checkout" className="font-semibold text-indigo-600">
              Crea un pedido
            </Link>{" "}
            desde el checkout para verlo en la sección superior.
          </p>
        )}
      </div>
    </div>
  );
}
