'use server'

import { revalidatePath } from "next/cache";
import { API_URL } from "@/lib/constants";
import { auth } from "@/auth";

export async function clientRegister(formData: FormData) {
  //encrypt password

  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    rut: formData.get("rut"),
  };

  try {
    const session = await auth();
    const res = await fetch(`${API_URL}/api/clients`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const client = await res.json();
    // console.log("mi resultado->", user)
    revalidatePath("/clients/list");
    
    return client;
  } catch (error) {
    console.log("error: ", error);
  }
}


export async function clientEdit(id: string, formData: FormData) {
  const session = await auth();
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      rut: formData.get("rut"),
      status: formData.get("status"),
    };
  
    try {
      const res = await fetch(`${API_URL}/api/clients/${id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${session?.user?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const client = await res.json();
      revalidatePath("/clients/list");
      return client;
    } catch (error) {
      console.log("error: ", error);
    }
  }