'use server'

import { revalidatePath } from "next/cache";
import { process.env.API_URL } from "@/lib/constants";
import { auth } from "@/auth";
import { editStepToWorkSchema, projectRegisterSchema, updateCompanyInWorkSchema, updateWorkStatusSchema } from "@/lib/zod";
import { z } from "zod";
import { itemRegisterSchema, technicianToWorkSchema } from "@/lib/zod";

export async function orderRegister(values: z.infer<typeof projectRegisterSchema>) {
  //encrypt password
  const session = await auth();
  const data = {
    companyId: values.companyId,
    userId: session?.user?.id,
  };

  try {
    console.log('Session que se envía:', session?.user?.id);
    const res = await fetch(`${process.env.API_URL}/api/works`, {
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
    const res = await fetch(`${process.env.API_URL}/api/stepstoworks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        description: data.description,
        worksId: data.worksId,
        userId: session?.user?.id,
        order: data.order,
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

export async function reorderSteps(idWork: string, payload: { id: string; order: number }[]) {
  const session = await auth();
  try {
    const res = await fetch(`${process.env.API_URL}/api/stepstoworks/reorder/${idWork}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        worksId: idWork,
        ordered: payload
      }),
    });
    const client = await res.json();
    revalidatePath(`/projects/${idWork}/edit`);
    return client;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function editStepToWork(idWork: string, data: z.infer<typeof editStepToWorkSchema>) {
  const session = await auth();
  try {
    const res = await fetch(`${process.env.API_URL}/api/stepstoworks/${data.stepId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        description: data.description,
        userId: session?.user?.id,
      }),
    });
    const client = await res.json();
    revalidatePath(`/projects/${idWork}/edit`);
    return client;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function deleteStepToWork(idWork: string) {
  const session = await auth();
  try {
    const res = await fetch(`${process.env.API_URL}/api/stepstoworks/${idWork}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      }, 
    });
    const step = await res.json();
    revalidatePath(`/projects/${idWork}/edit`);
    return step;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function updateWorkStatus(idWork: string, status: z.infer<typeof updateWorkStatusSchema>) {
  const session = await auth();
  try {
    const res = await fetch(`${process.env.API_URL}/api/works/${idWork}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        progress:status.status,
        userId: session?.user?.id,
      }),
    });
    const resp = await res.json();
    
    revalidatePath(`/projects/${idWork}/edit`);
    return resp;
  } catch (error) {
    console.log("error: ", error);
  }
} 

export async function editCompanyInWork(idWork: string, data: z.infer<typeof updateCompanyInWorkSchema>) {
  const session = await auth();
  try {
    const res = await fetch(`${process.env.API_URL}/api/works/companyinwork/${idWork}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        companyId: data.companyId,
        userId: session?.user?.id,
      }),
    });
    const resp = await res.json();
    
    revalidatePath(`/projects/${idWork}/edit`);
    return resp;
  } catch (error) {
    console.log("error: ", error);
  }
}


export async function addTechToWork(data: z.infer<typeof technicianToWorkSchema>, idWork: string) {
  const session = await auth();
  try {
    const res = await fetch(`${process.env.API_URL}/api/technicians`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        technicianId: data.idTech,
        workId: idWork,
      }),
    });
    const resp = await res.json();
    console.log(resp)
    
    revalidatePath(`/projects/${idWork}/edit`);
    return resp;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function deleteTechFromWork(idTech: string, idWork: string) {
  const session = await auth();
  try {
    const res = await fetch(`${process.env.API_URL}/api/technicians/removefromwork/${idWork}/${idTech}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      }, 
    });
    const tech = await res.json();
    revalidatePath(`/projects/${idWork}/edit`);
    return tech;
  } catch (error) {
    console.log("error: ", error);
  }
}












