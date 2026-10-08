import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} MyStore. Todos los derechos reservados.
        </p>
        <nav className="flex gap-4 text-sm text-zinc-600">
          <Link href="/products" className="hover:text-zinc-900">
            Productos
          </Link>
          <Link href="/categories" className="hover:text-zinc-900">
            Categorías
          </Link>
          <Link href="/cart" className="hover:text-zinc-900">
            Carrito
          </Link>
        </nav>
      </div>
    </footer>
  );
}
