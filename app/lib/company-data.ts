

import { API_URL } from "@/lib/constants";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic'; // Desactiva el renderizado estático

export async function fetchAllCompanies() {
  const session = await auth();
  try {

//  await new Promise((resolve) => setTimeout(resolve, 3000))

    const companies = await fetch(`${API_URL}/api/companies`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    // console.log(companies);
    return await companies.json();
  } catch (error) {
    console.log("error: ", error);
    return {
      message: "Hubo un error",
      error: error,
    };
  }
}


export async function fetchOneCompany(id: string) {
  const session = await auth();
  try {
    const companies = await fetch(`${API_URL}/api/companies/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!companies.ok) {
      throw new Error("Cliente no existe");
    }
    return await companies.json();
  } catch (error) {
    console.log(error); 
  }
}


