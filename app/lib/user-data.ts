export const dynamic = "force-dynamic"; // Desactiva el renderizado estático

import { process.env.API_URL } from "@/lib/constants";
import { auth } from "@/auth";

export async function fetchAllUsers() {
  const session = await auth();
  try {
    //  await new Promise((resolve) => setTimeout(resolve, 3000))

    const users = await fetch(`${process.env.API_URL}/api/users`, {
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
