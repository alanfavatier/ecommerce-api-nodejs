"use client";

import Link from "next/link";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "@/store/features/users/usersApi";
import { useAppSelector } from "@/store/hooks";
import DeleteConfirm from "@/components/DeleteConfirm";
import { formatDate, getApiErrorMessage } from "@/lib/format";

export default function AdminUsersPage() {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const currentUser = useAppSelector((state) => state.auth.user);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      alert(getApiErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Usuarios</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {users ? `${users.length} registrados` : "Cargando..."}
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          + Nuevo usuario
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-zinc-200" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
          No se pudieron cargar los usuarios.
        </div>
      ) : users && users.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Registro</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3 font-mono text-zinc-500">
                    {user.id}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-zinc-900">
                      {user.email}
                    </span>
                    {currentUser?.id === user.id && (
                      <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                        Tú
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50"
                      >
                        Editar
                      </Link>
                      {currentUser?.id !== user.id && (
                        <DeleteConfirm onConfirm={() => handleDelete(user.id)} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-12 text-center">
          <p className="text-sm font-medium text-zinc-700">
            No hay usuarios todavía
          </p>
        </div>
      )}
    </div>
  );
}
