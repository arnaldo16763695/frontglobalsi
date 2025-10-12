import { auth } from "@/auth";

export const dynamic = 'force-dynamic'; // Desactiva el renderizado estático
export async function fetchAllClients() {
  const session = await auth();
  try {
    const clients = await fetch(`${process.env.API_URL}/api/clients`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log('clients: ', clients);
    return await clients.json();
  } catch (error) {
    console.log(error);
  }
}


export async function fetchOneClient(id: string) {
  const session = await auth();
  try {
    const client = await fetch(`${process.env.API_URL}/api/clients/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!client.ok) {
      throw new Error("Cliente no existe");
    }
    return await client.json();
  } catch (error) {
    console.log(error);
  }
}


