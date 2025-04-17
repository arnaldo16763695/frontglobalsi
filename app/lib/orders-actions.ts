'use server'

import { revalidatePath } from "next/cache";
import { API_URL } from "@/lib/constants";
import { auth } from "@/auth";
import { projectRegisterSchema } from "@/lib/zod";
import { z } from "zod";
import { itemRegisterSchema } from "@/lib/zod";

export async function orderRegister(values: z.infer<typeof projectRegisterSchema>) {
  //encrypt password
  const session = await auth();
  const data = {
    companyId: values.companyId,
    userId: session?.user?.id,
  };

  try {
    console.log('Session que se envía:', session?.user?.id);
    const res = await fetch(`${API_URL}/api/works`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });


    const client = await res.json();
    // console.log("mi resultado->", user)
    revalidatePath("/projects/list");
    
    return client;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function addItemInWork(data: z.infer<typeof itemRegisterSchema>){
  const session = await auth();
  console.log("steps",data)
  try {
    const res = await fetch(`${API_URL}/api/stepstoworks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        description: data.description,
        worksId: data.worksId,
        userId: session?.user?.id,
      })
    })

    const user = await res.json();
    revalidatePath(`/projects/${data.worksId}/edit`);
    return user;
  } catch (error) {
    console.log("error: ", error);
    return {
      message: "Hubo un error",
      error: error,
    };
  }
}

