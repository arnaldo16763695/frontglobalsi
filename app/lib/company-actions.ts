'use server'

import { revalidatePath } from "next/cache";

export async function companyRegister(formData: FormData) {
  //encrypt password

  const data = {
    companyName: formData.get("companyName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    rut: formData.get("rut"),
    location: formData.get("location"),
    observations: formData.get("observations"),
  };

  try {
    const res = await fetch("http://localhost:4000/api/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const company = await res.json();
    // console.log("mi resultado->", user)
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
      location: formData.get("location"),
      observations: formData.get("observations"),
    };
  
    try {
      const res = await fetch(`http://localhost:4000/api/companies/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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