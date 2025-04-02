import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { compare } from "bcryptjs";

import { login } from "./app/lib/users-actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // credentials: {
      //   email: { label: "Email", type: "text", placeholder: "correo@email.com" },
      //   password: { label: "Password", type: "password", placeholder: "Tu contraseña" },
      // },

      authorize: async (credentials) => {
        let user = null
        if (!credentials?.email || !credentials?.password) {
          // throw new Error("Invalid credentials");
          return null
        }
        const email = credentials.email as string
        // logic to salt and hash password


        // logic to verify if the user exists
        user = await login(email)

        if (!user) {
          console.log('Invalid credentials')
          return null
        }

        if (user.error) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          return null
        }

        const isCorrectpass = await compare(
          credentials.password as string,
          user.password
        );

        if (!isCorrectpass) {
          return null
        }

        // return user object with their profile data
        return {
          email: user.email,
          name: user.name,
          id: user.id,
          role: user.role
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id;
        token.role = user.role || ""; // Aseguramos que role esté en el token, si no está asignamos un valor vacío
      }
      return token;
    },
    session({ session, token }) {
      // Aseguramos que el objeto session.user tenga las propiedades id y role
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      console.log(session, '------', token)
      return session;
    },
  }




})