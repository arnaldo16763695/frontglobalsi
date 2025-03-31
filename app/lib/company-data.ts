

export async function fetchAllCompanies() {
  try {

//  await new Promise((resolve) => setTimeout(resolve, 3000))

    const companies = await fetch("http://localhost:4000/api/companies",{ cache: 'no-store' });
    return await companies.json();
  } catch (error) {
    console.log(error);
  }
}


export async function fetchOneCompany(id: string) {
  try {
    const companies = await fetch(`http://localhost:4000/api/companies/${id}`, { cache: 'no-store' });

    if (!companies.ok) {
      throw new Error("Cliente no existe");
    }
    return await companies.json();
  } catch (error) {
    console.log(error);
  }
}


