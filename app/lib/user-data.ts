export const dynamic = 'force-dynamic'; // Desactiva el renderizado estático
export async function fetchAllUsers() {
  try {

//  await new Promise((resolve) => setTimeout(resolve, 3000))

    const users = await fetch("http://localhost:4000/api/users");
    return await users.json();
  } catch (error) {
    console.log(error);
  }
}

export async function fetchOneUser(id: string) {
  try {
    const user = await fetch(`http://localhost:4000/api/users/${id}`);

    if (!user.ok) {
      throw new Error("Usuario no existe");
    }
    return await user.json();
  } catch (error) {
    console.log(error);
  }
}
