// FormRegisterClient.test.tsx
import React from "react";
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

import FormAddOrder from "../FormAddOrder";

// Simula el módulo clientRegister para no hacer llamadas reales
vi.mock("@/app/lib/orders-actions", () => ({
  orderRegister: vi.fn().mockResolvedValue({ success: true }),
}));

describe("FormAddOrder", () => {
  it("debe renderizar los campos del formulario", () => {
    render(<FormAddOrder companies={[]} />);

    const label = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === "label" && /Empresa/i.test(content)
      );
    });
    expect(label).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /guardar/i })
    ).toBeInTheDocument();
  });
});
