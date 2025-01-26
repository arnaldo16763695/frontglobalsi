export async function fetchAllUsers() {
  try {
    const users = await fetch("http://localhost:4000/api/users", {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate", // Evita la caché
        Pragma: "no-cache", // Compatibilidad con HTTP/1.0
        Expires: "0", // Fecha de expiración en el pasado
      },
    });
    return await users.json();
  } catch (error) {
    console.log(error);
  }
}

export async function fetchOneUser(id: string) {
  try {
    const user = await fetch(`http://localhost:4000/api/users/${id}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate", // Evita la caché
        Pragma: "no-cache", // Compatibilidad con HTTP/1.0
        Expires: "0", // Fecha de expiración en el pasado
      },
    });

    if (!user.ok) {
      throw new Error("Usuario no existe");
    }
    return await user.json();
  } catch (error) {
    console.log(error);
  }
}
