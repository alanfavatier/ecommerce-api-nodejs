"use client";

import { use } from "react";
import { useGetUserQuery } from "@/store/features/users/usersApi";
import UserForm from "@/components/forms/UserForm";
import { getApiErrorMessage } from "@/lib/format";

export default function AdminEditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const userId = Number(id);
  const { data: user, isLoading, isError, error } = useGetUserQuery(userId, {
    skip: Number.isNaN(userId),
  });

  if (isLoading) {
    return (
      <div>
        <div className="mb-6 h-9 w-64 animate-pulse rounded-lg bg-zinc-200" />
        <div className="h-80 max-w-lg animate-pulse rounded-2xl bg-zinc-200" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
        {getApiErrorMessage(error)}
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-zinc-900">Editar usuario</h1>
      <UserForm user={user} />
    </div>
  );
}
