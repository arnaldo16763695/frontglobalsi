import React from 'react'; 
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

//este mock debe ir antes de importar el componente
vi.mock('next/navigation', () => ({
    useRouter: () => ({
      push: vi.fn(), // simula redirección
      replace: vi.fn(),
      refresh: vi.fn(),
    }),
  }));
import FormLogin from "../FormLogin";

// Simula el módulo clientRegister para no hacer llamadas reales
vi.mock('@/app/lib/users-actions', () => ({
    loginAction: vi.fn().mockResolvedValue({ success: true }),
  }));

describe('FormLogin', () => {
  it('debe renderizar los campos del formulario', () => {
    render(<FormLogin />);
    
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });
}); 