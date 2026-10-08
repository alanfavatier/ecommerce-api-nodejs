"use client";

import UserForm from "@/components/forms/UserForm";

export default function AdminNewUserPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-zinc-900">Nuevo usuario</h1>
      <UserForm />
    </div>
  );
}
