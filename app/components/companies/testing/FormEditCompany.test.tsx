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

import FormEditCompany from "../FormEditCompany";

// Simula el módulo companyEdit para no hacer llamadas reales
vi.mock("@/app/lib/company-actions", () => ({
    companyEdit: vi.fn().mockResolvedValue({ success: true }),
  }));


 const mockCompany = {
    id: '1',
    companyName: 'Mi Empresa',
    phone: '123456789',
    email: 'empresa@test.com',
    rut: '12345678-9',
    clientsId: 'client-1',
    location: 'Caracas',
    observations: 'Buena empresa',
    status: 'ACTIVE',
  }; 

  const mockClients = [
    { id: 'client-1', name: 'Cliente Uno', rut: '11111111-1', email: 'cliente1@test.com', phone: '111111111', status: 'ACTIVE' },
    { id: 'client-2', name: 'Cliente Dos', rut: '22222222-2', email: 'cliente2@test.com', phone: '222222222', status: 'ACTIVE' },
  ];

  describe("FormEditCompany", () => {
    it("debe renderizar el formulario con datos de la empresa", () => {
      render(<FormEditCompany company={mockCompany} clients={mockClients} />);

      expect(screen.getByLabelText(/Nombre/i)).toHaveValue('Mi Empresa');
      expect(screen.getByLabelText(/Rut/i)).toHaveValue('12345678-9');
      expect(screen.getByLabelText(/Teléfono/i)).toHaveValue('123456789');
      expect(screen.getByLabelText(/Email/i)).toHaveValue('empresa@test.com');
      expect(screen.getByLabelText(/Ubicación/i)).toHaveValue('Caracas');
      expect(screen.getByLabelText(/Observaciones/i)).toHaveValue('Buena empresa');
  
      // 👇 Status y Cliente son Selects, no inputs. No se pueden validar así de simple.
      // Los dejamos para tests de interacción más complejos.
      expect(screen.getByRole('button', { name: /Guardar/i })).toBeInTheDocument();
    });
  });

  