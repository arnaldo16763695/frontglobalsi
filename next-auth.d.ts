// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

// Extender la interfaz User de NextAuth para incluir la propiedad 'role'
declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
      refreshToken?: string;
      expiresIn?: number
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number
    role?: string;
    avatar?: string;
  }
}

// console.log(DefaultUser)