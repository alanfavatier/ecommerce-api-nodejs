"use client";

import Link from "next/link";
import { useGetProductsQuery } from "@/store/features/products/productsApi";
import { useGetUsersQuery } from "@/store/features/users/usersApi";
import { useGetCategoriesQuery } from "@/store/features/categories/categoriesApi";
import { useGetOrdersQuery } from "@/store/features/orders/ordersApi";
import { useAppSelector } from "@/store/hooks";
import { formatPrice } from "@/lib/format";

export default function AdminDashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const localOrders = useAppSelector((state) => state.localOrders.orders);
  const { data: products, isLoading: loadingProducts } = useGetProductsQuery();
  const { data: users, isLoading: loadingUsers } = useGetUsersQuery();
  const { data: categories, isLoading: loadingCategories } =
    useGetCategoriesQuery();
  const { data: apiOrders, isLoading: loadingOrders } = useGetOrdersQuery();

  const totalRevenue = localOrders.reduce((sum, order) => sum + order.total, 0);

  const stats = [
    {
      label: "Productos",
      value: loadingProducts ? "..." : (products?.length ?? 0),
      href: "/admin/products",
      accent: "text-indigo-600 bg-indigo-50",
    },
    {
      label: "Categorías",
      value: loadingCategories ? "..." : (categories?.length ?? 0),
      href: "/admin/categories",
      accent: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Usuarios",
      value: loadingUsers ? "..." : (users?.length ?? 0),
      href: "/admin/users",
      accent: "text-amber-600 bg-amber-50",
    },
    {
      label: "Pedidos (API)",
      value: loadingOrders ? "..." : (apiOrders?.length ?? 0),
      href: "/admin/orders",
      accent: "text-sky-600 bg-sky-50",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Hola {user?.email}, aquí tienes el resumen de la tienda.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:shadow-md"
          >
            <span
              className={`inline-flex rounded-xl px-3 py-1.5 text-xs font-semibold ${stat.accent}`}
            >
              {stat.label}
            </span>
            <p className="mt-3 text-3xl font-bold text-zinc-900">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-bold text-zinc-900">
            Pedidos locales (del navegador)
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            El backend no tiene endpoint POST /orders, así que los pedidos del
            checkout se guardan localmente.
          </p>
          <p className="mt-4 text-3xl font-bold text-zinc-900">
            {localOrders.length}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Total:{" "}
            <span className="font-semibold text-zinc-900">
              {formatPrice(totalRevenue)}
            </span>
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-bold text-zinc-900">Acciones rápidas</h2>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/admin/products/new"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              + Nuevo producto
            </Link>
            <Link
              href="/admin/categories/new"
              className="rounded-xl border border-zinc-200 px-4 py-2.5 text-center text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
              + Nueva categoría
            </Link>
            <Link
              href="/admin/users/new"
              className="rounded-xl border border-zinc-200 px-4 py-2.5 text-center text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
              + Nuevo usuario
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
