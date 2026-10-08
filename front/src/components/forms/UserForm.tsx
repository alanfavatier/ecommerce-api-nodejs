"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/store/features/users/usersApi";
import { getApiErrorMessage } from "@/lib/format";
import type { User } from "@/lib/types";

export default function UserForm({ user }: { user?: User }) {
  const router = useRouter();
  const [createUser, { isLoading: creating }] = useCreateUserMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loading = creating || updating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Ingresa un email válido.");
      return;
    }

    try {
      if (user) {
        await updateUser({ id: user.id, changes: { email } }).unwrap();
      } else {
        if (password.length < 8) {
          setError("La contraseña debe tener al menos 8 caracteres.");
          return;
        }
        await createUser({ email, password }).unwrap();
      }
      router.push("/admin/users");
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg space-y-5 rounded-2xl border border-zinc-200 bg-white p-6"
    >
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
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="usuario@ejemplo.com"
          className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      {!user && (
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-zinc-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            placeholder="Mínimo 8 caracteres"
            className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      )}
      {user && (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          La contraseña no se puede modificar desde esta interfaz.
        </p>
      )}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:bg-zinc-400"
        >
          {loading ? "Guardando..." : user ? "Guardar cambios" : "Crear usuario"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
