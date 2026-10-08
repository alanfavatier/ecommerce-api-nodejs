"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials } from "@/store/features/auth/authSlice";
import { useUpdateUserMutation } from "@/store/features/users/usersApi";
import { getApiErrorMessage } from "@/lib/format";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const hydrated = useAppSelector((state) => state.auth.hydrated);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [emailDraft, setEmailDraft] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const email = emailDraft ?? user?.email ?? "";

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!user) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Ingresa un email válido.");
      return;
    }

    try {
      await updateUser({ id: user.id, changes: { email } }).unwrap();
      dispatch(setCredentials({ id: user.id, email }));
      setEmailDraft(null);
      setMessage("Datos actualizados correctamente.");
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  if (!hydrated || !user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <div className="h-64 animate-pulse rounded-3xl bg-zinc-200" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900">Mi cuenta</h1>
        <p className="mt-1 text-sm text-zinc-500">
          ID de usuario: <span className="font-mono">{user.id}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {message && (
            <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </p>
          )}
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmailDraft(e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:bg-zinc-400"
          >
            {isLoading ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>

        <div className="mt-8 flex flex-col gap-3 border-t border-zinc-100 pt-6">
          <Link
            href="/orders"
            className="rounded-xl border border-zinc-200 px-4 py-2.5 text-center text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
          >
            Ver mis pedidos
          </Link>
          <button
            onClick={() => {
              dispatch(setCredentials(null));
              localStorage.setItem("user", "null");
              router.push("/");
            }}
            className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
