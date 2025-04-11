"use server";

import { API_URL } from "@/lib/constants";
import { auth } from "@/auth";

export async function fetchAllProjects() {
  const session = await auth();
  try {
    const res = await fetch(`${API_URL}/api/works`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    return {
      message: "Hubo un error",
      error: error,
    };
  }
}
