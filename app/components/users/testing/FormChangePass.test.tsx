import React from "react"; // 👈 esta línea resuelve el error
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

//este mock debe ir antes de importar el componente
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(), // simula redirección
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

import FormChangePass from "../FormChangePass";

// Simula el módulo clientEdit para no hacer llamadas reales
vi.mock("@/app/lib/users-actions", () => ({
  userChangePass: vi.fn().mockResolvedValue({ success: true }),
}));

const mockUser = {
  id: "1",
  name: "Carlos Ruiz",
  password: "12345678",
  rut: "12345678",
  phone: "04120000000",
  email: "carlos@example.com",
  status: "ACTIVE",
};

describe("FormChangePass", () => {
  it("debe renderizar el formulario con datos del cliente", () => {
    render(<FormChangePass user={mockUser} />);

    expect(screen.getByLabelText(/Nueva contraseña:/i)).toHaveValue("");
    expect(screen.getByLabelText(/Repite contraseña:/i)).toHaveValue("");
    expect(screen.getByRole("button", { name: /guardar/i })).toBeInTheDocument();
  });
});