"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-zinc-900">
        Algo salió mal
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Ocurrió un error inesperado al renderizar esta página.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
