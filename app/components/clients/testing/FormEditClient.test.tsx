import React from "react"; // 👈 esta línea resuelve el error
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
 
// este mock debe ir antes de importar el componente
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(), // simula redirección
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

import FormEditClient from "../FormEditClient";

// Simula el módulo clientRegister para no hacer llamadas reales
vi.mock("@/app/lib/clients-actions", () => ({
  clientEdit: vi.fn().mockResolvedValue({ success: true }),
}));

const mockClient = {
    id: "1",
    name: "Carlos Ruiz",
    rut: "12345678",
    phone: "04120000000",
    email: "carlos@example.com",
    status: "ACTIVE",
  };

describe("FormEditClient", () => { 
  it("debe renderizar el formulario con datos del cliente", () => {
    render(<FormEditClient client={mockClient} />);

    expect(screen.getByLabelText(/Nombre/i)).toHaveValue("Carlos Ruiz");
    expect(screen.getByLabelText(/Rut/i)).toHaveValue("12345678");
    expect(screen.getByLabelText(/Teléfono/i)).toHaveValue("04120000000");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("carlos@example.com");
    expect(screen.getByRole("button", { name: /guardar/i })).toBeInTheDocument();
  });
});
