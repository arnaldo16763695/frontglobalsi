export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "http://127.0.0.1:3000"; // Usa localhost dentro del mismo contenedor
