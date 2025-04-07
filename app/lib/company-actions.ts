'use server'

import { API_URL } from "@/lib/constants";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function companyRegister(formData: FormData) {
  //encrypt password
  const session = await auth();

  const data = {
    companyName: formData.get("companyName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    rut: formData.get("rut"),
    clientsId: formData.get("client"),
    location: formData.get("location"),
    observations: formData.get("observations"),
  };

  try {
    const res = await fetch(`${API_URL}/api/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const company = await res.json();
    console.log("mi resultado->", company)
    revalidatePath("/companies/list");
    
    return company;
  } catch (error) {
    console.log("error: ", error);
  }
}


export async function companyEdit(id: string, formData: FormData) {
    const data = {
      companyName: formData.get("companyName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      rut: formData.get("rut"),
      status: formData.get("status"),
      clientsId: formData.get("client"),
      location: formData.get("location"),
      observations: formData.get("observations"),
    };
  
    const session = await auth();
    try {
      const res = await fetch(`${API_URL}/api/companies/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(data),
      });
  
      const company = await res.json();
      revalidatePath("/companies/list");
      return company;
    } catch (error) {
      console.log("error: ", error);
    }
  }