"use server";
import { loginSchema } from "@/lib/zod";
import { z } from "zod";
import { hash } from "bcryptjs";

import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { API_URL } from "@/lib/constants";
import { JWT } from "next-auth/jwt"; 

export async function login(
  email: string | undefined,
  password: string | undefined
) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (res.status === 401) {
    console.log(res.statusText);
    return null;
  }

  const user = await res.json();
  return user;
}

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const { data, success } = loginSchema.safeParse(values);
  if (!success) {
    return {
      error: "inalid data",
    };
  }
  try {
    const user = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return user;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Credenciales inválidas",
          };

        default:
          return {
            message: "Hubo un error",
          };
      }
    }
    throw error;
  }
};

export async function userRegister(formData: FormData) {
  //encrypt password
  const passEncryp = await hash(formData.get("password") as string, 10);

  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    password: passEncryp,
  };

  try {
    const res = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const user = await res.json();
    // console.log("mi resultado->", user)
    revalidatePath("/users/list");
    return user;
  } catch (error) {
    console.log("error: ", error);
    return {
      message: "Hubo un error",
      error: error,
    };
  }
}

export async function userEdit(id: string, formData: FormData) {
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    role: formData.get("role"),
    status: formData.get("status"),
  };

  const session = await auth();
  try {
    const res = await fetch(`${API_URL}/api/users/${id} `, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const user = await res.json();
    // console.log("mi resultado->", user);
    revalidatePath("/users/list");
    return user;
  } catch (error) {
    console.log("error: ", error);
    return {
      message: "Hubo un error",
      error: error,
    };
  }
}

export async function userChangePass(id: string, formData: FormData) {
  //encrypt password
  const passEncryp = await hash(formData.get("password") as string, 10);

  const data = {
    password: passEncryp,
  };

  const session = await auth();
  try {
    const res = await fetch(`${API_URL}/api/users/changepass/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const user = await res.json();
    console.log("mi resultado->", user);
    revalidatePath("/users/list");
    return user;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function refreshToken(token: JWT): Promise<JWT> {
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
  return data;
}

