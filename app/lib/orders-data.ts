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

export async function fetchOneProject(id:string) {
  const session = await auth();
  try {
    const project = await fetch(`${API_URL}/api/works/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    if (!project.ok) {
      throw new Error("Proyecto no existe");
    }
    return await project.json();
  } catch (error) {
    console.log(error);
  }
}


export async function  fetStepsToWorkByIdWork(id: string) {
  const session = await auth();
  try {
    const steps = await fetch(`${API_URL}/api/stepstoworks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    if (!steps.ok) {
      throw new Error("Steps no existen");
    }
    return await steps.json();
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllTechsInWork(idWork: string) {
  const session = await auth();
  try {
    const res = await fetch(`${API_URL}/api/technicians/${idWork}`, {
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

export async function fetchAllOrdersByIdTech(idTech: string) {
  const session = await auth();
  try {
    const orders = await fetch(`${API_URL}/api/works/technicians/${idTech}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    const data = await orders.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    return {
      message: "Hubo un error",
      error: error,
    };
  }
}

