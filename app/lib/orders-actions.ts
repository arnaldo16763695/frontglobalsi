"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  editStepToWorkSchema,
  projectRegisterSchema,
  updateCompanyInWorkSchema,
  updateWorkStatusSchema,
} from "@/lib/zod";
import { z } from "zod";
import { itemRegisterSchema, technicianToWorkSchema } from "@/lib/zod";
import { capitalAndPoint } from "@/lib/helpers";

export async function orderRegister(
  values: z.infer<typeof projectRegisterSchema>
) {
  //encrypt password
  const session = await auth();
  const data = {
    companyId: values.companyId,
    userId: session?.user?.id,
  };

  try {
    console.log("Session que se envía:", session?.user?.id);
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

export async function addItemInWork(data: z.infer<typeof itemRegisterSchema>) {
  const session = await auth();

  try {
    const res = await fetch(`${process.env.API_URL}/api/stepstoworks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        description: capitalAndPoint(data.description),
        worksId: data.worksId,
        userId: session?.user?.id,
        order: data.order,
      }),
    });

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

export async function reorderSteps(
  idWork: string,
  payload: { id: string; order: number }[]
) {
  const session = await auth();
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/stepstoworks/reorder/${idWork}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({
          worksId: idWork,
          ordered: payload,
        }),
      }
    );
    const client = await res.json();
    revalidatePath(`/projects/${idWork}/edit`);
    return client;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function editStepToWork(
  idWork: string,
  data: z.infer<typeof editStepToWorkSchema>
) {
  const session = await auth();
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/stepstoworks/${data.stepId}/${idWork}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({
          description: capitalAndPoint(data.description),
          status: data.status,
          userId: session?.user?.id,
        }),
      }
    );
    const step = await res.json();
    console.log(
      `${process.env.API_URL}/api/stepstoworks/${data.stepId}/${idWork}`,
      step
    );
    revalidatePath(`/projects/${idWork}/edit`);
    return step;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function editStatusStepToWork(data: {
  stepId: string;
  worksId: string;
  status: "PENDING" | "FINISHED";
}) {
  const session = await auth();
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/stepstoworks/${data.stepId}/${data.worksId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({
          status: data.status,
          userId: session?.user?.id,
        }),
      }
    );
    const result = await res.json();
    console.log("edit step status", result);
    return result;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function deleteStepToWork(stepId: string, workId: string) {
  const session = await auth();
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/stepstoworks/${stepId}/${workId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.accessToken}`,
        },
      }
    );
    const step = await res.json();
    revalidatePath(`/projects/${workId}/edit`);
    return step;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function updateWorkStatus(
  idWork: string,
  status: z.infer<typeof updateWorkStatusSchema>
) {
  const session = await auth();
  try {
    if (status.status === "IN_PROGRESS") {
      const r = await fetch(
        `${process.env.API_URL}/api/technicians/${idWork}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (!r.ok) {
        return { ok: false, error: "No se pudo verificar técnicos asignados." };
      }

      const exist = await r.json();

      if (exist.length === 0) {
        return {
          ok: false,
          error: "whitoutTech",
          message: "Debe asignar al menos un técnico a la orden",
        };
      }
    }
    if (status.status === "FINISHED") {
      const r = await fetch(
        `${process.env.API_URL}/api/technicians/${idWork}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (!r.ok) {
        return { ok: false, error: "No se pudo verificar técnicos asignados." };
      }

      const exist = await r.json();

      if (exist.length === 0) {
        return {
          ok: false,
          error: "whitoutTech",
          message: "Debe asignar al menos un técnico a la orden",
        };
      }
    }
    if (status.status === "FINISHED") {
      const r = await fetch(
        `${process.env.API_URL}/api/stepstoworks/pending/${idWork}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (!r.ok) {
        return { ok: false, error: "No se pudo verificar técnicos asignados." };
      }

      const exist = await r.json();

      if (exist.length > 0) {
        return {
          ok: false,
          error: "stepsPending",
          message: "Aún existen tareas pendientes",
        };
      }
    }

    if (status.status === "FINISHED") {
      const r = await fetch(
        `${process.env.API_URL}/api/stepstoworks/${idWork}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (!r.ok) {
        return { ok: false, error: "No se pudo verificar técnicos asignados." };
      }

      const exist = await r.json();

      if (exist.length === 0) {
        return {
          ok: false,
          error: "whitoutSteps",
          message: "No puede finalizar una orden sin tareas",
        };
      }
    }

    const res = await fetch(`${process.env.API_URL}/api/works/${idWork}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        progress: status.status,
        userId: session?.user?.id,
      }),
    });
    const resp = await res.json();
    // console.log(resp, "rrrrrrrrrrrrr", status.status);

    revalidatePath(`/projects/${idWork}/edit`);
    return resp;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function editCompanyInWork(
  idWork: string,
  data: z.infer<typeof updateCompanyInWorkSchema>
) {
  const session = await auth();
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/works/companyinwork/${idWork}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({
          companyId: data.companyId,
          userId: session?.user?.id,
        }),
      }
    );
    const resp = await res.json();

    revalidatePath(`/projects/${idWork}/edit`);
    return resp;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function addTechToWork(
  data: z.infer<typeof technicianToWorkSchema>,
  idWork: string
) {
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

    revalidatePath(`/projects/${idWork}/edit`);
    return resp;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function deleteTechFromWork(idTech: string, idWork: string) {
  const session = await auth();
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/technicians/removefromwork/${idWork}/${idTech}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.accessToken}`,
        },
      }
    );
    const tech = await res.json();
    revalidatePath(`/projects/${idWork}/edit`);
    return tech;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function addImageToWork(
  idWork: string,
  urlImageWork: string,
  imageKey: string,
  userId: string,
  accessToken: string | undefined
) {
  const data = {
    worksId: idWork,
    url: urlImageWork,
    userId,
    imageKey,
  };
  try {
    const images = await fetch(`${process.env.API_URL}/api/imagestowork`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return images;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteImgFromDb(id: string) {
  const session = await auth();
  try {
    const images = await fetch(
      `${process.env.API_URL}/api/imagestowork/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${session?.user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return images;
  } catch (error) {
    console.log(error);
  }
}

export async function startsTechOrder(idWork: string) {
  const session = await auth();

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/works/startsorder/${idWork}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${session?.user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      status: 500,
      body: null,
    };
  }
}

export async function finishTechOrder(idWork: string) {
  const session = await auth();

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/works/finishorder/${idWork}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${session?.user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(await res.json(), '<----respuesta en el servidor');
    // return await res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      status: 500,
      body: null,
    };
  }
}
