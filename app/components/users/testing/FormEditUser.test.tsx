import React from "react"; // 👈 esta línea resuelve el error
import { render, screen } from "@testing-library/react";

// 👇 este mock debe ir antes de importar tu componente
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(), // simula redirección
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

import FormEditUser from "../FormEditUser";

vi.mock("@/app/lib/users-actions", () => ({
  userEdit: vi.fn().mockResolvedValue({ success: true }),
}));

const mockUser = {
  id: "1",
  name: "Carlos Ruiz",
  role: "ADMIN",
  password: "12345678",
  phone: "04120000000",
  email: "carlos@example.com",
  status: "ACTIVE",
};

describe("FormEditUser", () => {
  it("debe renderizar el formulario con datos del usuario", () => {
    render(<FormEditUser user={mockUser} />);

    expect(screen.getByLabelText(/Nombre/i)).toHaveValue("Carlos Ruiz");
    expect(screen.getByLabelText(/Teléfono/i)).toHaveValue("04120000000");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("carlos@example.com");
    // Verifica que el valor visible del select esté en pantalla
    const rolOptions = screen.getAllByText("ADMIN");
    expect(rolOptions.length).toBeGreaterThan(0);

    const statusOptions = screen.getAllByText("ACTIVE");
    expect(statusOptions.length).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: /guardar/i })
    ).toBeInTheDocument();
  });
});
