export function formatPrice(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(value?: string): string {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getApiErrorMessage(error: unknown): string {
  if (!error) return "Error inesperado";
  if (typeof error === "object" && error !== null) {
    const err = error as {
      data?: { message?: string; error?: string };
      error?: string;
      status?: number | string;
    };
    if (err.data?.message) return err.data.message;
    if (err.data?.error) return err.data.error;
    if (err.error === "FetchError") {
      return "No se pudo conectar con el servidor. ¿Está el backend corriendo en el puerto 3001?";
    }
    if (typeof err.status === "number" && err.status >= 500) {
      return "Error del servidor. Intenta de nuevo más tarde.";
    }
  }
  return "Ocurrió un error. Intenta de nuevo.";
}
