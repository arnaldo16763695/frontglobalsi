import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { login } from "@/app/lib/users-actions";
import { API_URL } from "./lib/constants";
import { JWT } from "next-auth/jwt";



async function refreshToken(token: JWT): Promise<JWT> {
  if (!token.refreshToken) {
    throw new Error("No refresh token");
  }
  const res = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Refresh ${token.refreshToken}`,
    },
  });
  const data = await res.json();
  return {
    ...token,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiresIn: data.expiresIn,
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
      
        const email = credentials.email as string;
        const password = credentials.password as string;
      
        // Realiza la solicitud al backend
        const response = await login(email, password);
      
        // Validación de respuesta
        if (!response || response.error) {
          return null;
        }
      
        // Extraer correctamente desde backendToken
        const { user, backendToken } = response;
      
        return {
          ...user,
          accessToken: backendToken.accessToken,
          refreshToken: backendToken.refreshToken,
          expiresIn: backendToken.expiresIn,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = user.expiresIn;
      }

      if(new Date().getTime() < (token.expiresIn as unknown as number)) {
        return token;
      }

      return await refreshToken(token);
    },
    async session({ session, token }) {
      // Guardar tokens en la sesión
      session.user.role = token.role as string;
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      return session;
    },
  },
});

