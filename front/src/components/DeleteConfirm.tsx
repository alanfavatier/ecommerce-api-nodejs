"use client";

import { useState } from "react";

export default function DeleteConfirm({
  onConfirm,
  label = "Eliminar",
}: {
  onConfirm: () => void;
  label?: string;
}) {
  const [asking, setAsking] = useState(false);

  if (asking) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            onConfirm();
            setAsking(false);
          }}
          className="rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => setAsking(false)}
          className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setAsking(true)}
      className="rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
    >
      {label}
    </button>
  );
}
