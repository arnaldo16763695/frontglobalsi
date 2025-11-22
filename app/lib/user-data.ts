export const dynamic = "force-dynamic"; // Desactiva el renderizado estático

import { auth } from "@/auth";

export async function fetchAllUsers() {
  const session = await auth();
  try {
    //  await new Promise((resolve) => setTimeout(resolve, 3000))

    const res = await fetch(`${process.env.API_URL}/api/users`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("API error:", res.status);
      return null; // possibly without conexion
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Network error:", error);
    return null; // <-- aquí está el fix para ECONNREFUSED
  }
}

export async function fetchOneUser(id: string) {
  const session = await auth();
  try {
    const user = await fetch(`${process.env.API_URL}/api/users/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!user.ok) {
      throw new Error("Usuario no existe");
    }
    return await user.json();
  } catch (error) {
    console.log(error);
  }
}
export async function fetchOneProfile(id: string) {
  const session = await auth();
  try {
    const user = await fetch(`${process.env.API_URL}/api/users/profile/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!user.ok) {
      throw new Error("Usuario no existe");
    }
    return await user.json();
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserProfile(
  id: string,
  accessToken: string | undefined
) {
  try {
    const user = await fetch(`${process.env.API_URL}/api/users/profile/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!user.ok) {
      throw new Error("Usuario no existe");
    }
    return await user.json();
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllTechs() {
  const session = await auth();
  try {
    const users = await fetch(`${process.env.API_URL}/api/technicians`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return await users.json();
  } catch (error) {
    console.log(error);
  }
}

