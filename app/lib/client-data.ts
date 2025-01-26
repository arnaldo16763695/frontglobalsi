export async function fetchAllClients() {
  try {

//  await new Promise((resolve) => setTimeout(resolve, 3000))

    const clients = await fetch("http://localhost:4000/api/clients",{ cache: 'no-store' });
    return await clients.json();
  } catch (error) {
    console.log(error);
  }
}


export async function fetchOneClient(id: string) {
  try {
    const client = await fetch(`http://localhost:4000/api/clients/${id}`, { cache: 'no-store' });

    if (!client.ok) {
      throw new Error("Cliente no existe");
    }
    return await client.json();
  } catch (error) {
    console.log(error);
  }
}


