

export const dynamic = 'force-dynamic'; // Desactiva el renderizado estático

export async function fetchAllCompanies() {
  try {

//  await new Promise((resolve) => setTimeout(resolve, 3000))

    const companies = await fetch("http://localhost:4000/api/companies");
    return await companies.json();
  } catch (error) {
    console.log(error);
  }
}


export async function fetchOneCompany(id: string) {
  try {
    const companies = await fetch(`http://localhost:4000/api/companies/${id}`);

    if (!companies.ok) {
      throw new Error("Cliente no existe");
    }
    return await companies.json();
  } catch (error) {
    console.log(error); 
  }
}


