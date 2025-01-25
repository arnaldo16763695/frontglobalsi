export async function fetchAllUsers() {
  try {
    const users = await fetch("http://localhost:4000/api/users");
    return await users.json();
  } catch (error) {
    console.log(error);
  }
}

export async function fetchOneUser( id: string ) {
  try {
    const user = await fetch(`http://localhost:4000/api/users/${id}`);
    if (!user) {
      throw new Error("Usuario no existe");
    }
    return await user.json();
  } catch (error) {
    console.log(error);
  }
}
