'use server'

import { revalidatePath } from "next/cache";

export async function clientRegister(formData: FormData) {
  //encrypt password

  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    rut: formData.get("rut"),
  };

  try {
    const res = await fetch("http://localhost:4000/api/clients", {
      method: "POST",
      headers: {
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
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      rut: formData.get("rut"),
      status: formData.get("status"),
    };
  
    try {
      const res = await fetch(`http://localhost:4000/api/clients/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const client = await res.json();
      console.log("mi resultado->", client);
      revalidatePath("/clients/list");
      return client;
    } catch (error) {
      console.log("error: ", error);
    }
  }