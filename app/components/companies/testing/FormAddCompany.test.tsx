import React from 'react'; // 👈 esta línea resuelve el error
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
    useRouter: () => ({
      push: vi.fn(), // simula redirección
      replace: vi.fn(),
      refresh: vi.fn(),
    }),
  }));
import FormAddCompany from '../FormAddCompany';

// Simula el módulo companyRegister para no hacer llamadas reales
vi.mock('@/app/lib/company-actions', () => ({
  companyRegister: vi.fn().mockResolvedValue({ success: true }),
}));

describe('FormAddCompany', () => {
    it('debe renderizar los campos del formulario', () => {
      render(<FormAddCompany clients={[]} />);
      
      expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Rut/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      const label = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === "label" && /Cliente/i.test(content);
      });
      expect(label).toBeInTheDocument();
      expect(screen.getByLabelText(/Ubicación/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Observaciones/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
    });
  });