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

  // MOCK DE TOAST
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))
  
import FormRegisterClient from '../FormRegisterClient';
import { fireEvent, waitFor } from '@testing-library/react';


// Simula el módulo clientRegister para no hacer llamadas reales
vi.mock('@/app/lib/clients-actions', () => ({
  clientRegister: vi.fn().mockResolvedValue({ success: true }),
}));

describe('FormRegisterClient', () => {
  it('debe renderizar los campos del formulario', () => {
    render(<FormRegisterClient />);
    
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rut/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
  });
});

describe("FormRegisterClient (integración)", () => {
  it("envía el formulario correctamente", async () => {
    render(<FormRegisterClient />)

    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Juan Pérez" },
    })
    fireEvent.change(screen.getByLabelText(/Rut/i), {
      target: { value: "12345678-9" },
    })
    fireEvent.change(screen.getByLabelText(/Teléfono/i), {
      target: { value: "04141234567" },
    })
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "juan@example.com" },
    })

    fireEvent.click(screen.getByRole("button", { name: /guardar/i }))

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /guardar/i })
      ).toBeInTheDocument()
    })

    // Validaciones adicionales (opcional): verificar si se llamó a clientRegister
    const { clientRegister } = await import("@/app/lib/clients-actions")
    expect(clientRegister).toHaveBeenCalled()

    const toast = (await import("react-hot-toast")).default
    expect(toast.success).toHaveBeenCalledWith("Registro creado exitosamente")
  })
})

