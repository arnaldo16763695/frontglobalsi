// FormRegisterClient.test.tsx
import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';


//este mock debe ir antes de importar el componente
vi.mock('next/navigation', () => ({
    useRouter: () => ({
      push: vi.fn(), // simula redirección
      replace: vi.fn(),
      refresh: vi.fn(),
    }),
  }));

import FormRegister from '../FormRegister';

// Simula el módulo clientRegister para no hacer llamadas reales
vi.mock('@/app/lib/users-actions', () => ({
  userRegister: vi.fn().mockResolvedValue({ success: true }),
}));

describe('FormRegister', () => {
  it('debe renderizar los campos del formulario', () => {
    render(<FormRegister />);
    
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
  });
});