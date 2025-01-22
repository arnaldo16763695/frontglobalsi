// next-auth.d.ts
import { DefaultUser } from "next-auth";

// Extender la interfaz User de NextAuth para incluir la propiedad 'role'
declare module "next-auth" {
  interface User {
    role?: string; // Agregamos role como opcional, puedes cambiar esto a 'string' si es obligatorio
  }
}

console.log(DefaultUser)