import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-bold text-indigo-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900">
        Página no encontrada
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
