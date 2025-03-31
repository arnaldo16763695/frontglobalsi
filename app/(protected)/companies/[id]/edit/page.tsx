import FormEditCompany from '@/app/components/companies/FormEditCompany'
import HeaderSideBar from '@/app/components/HeaderSideBar'
import { fetchOneCompany } from '@/app/lib/company-data'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { redirect } from "next/navigation";
import { auth } from "@/auth";


const page = async (props: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  const params = await props.params;
  const company = await fetchOneCompany(params.id);

  return (
    <>
    <HeaderSideBar
      title="Edición de empresa"
      before="Listado de empresas"
      href="/companies/list"
    />

    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 flex justify-center items-center rounded-xl bg-muted/50 md:min-h-min">
        <Card className="md:w-[80%] w-[95%]">
          <CardHeader className='text-2xl font-bold'>Edición de empresa</CardHeader>
          <CardContent>
            <FormEditCompany company={company}/>
          </CardContent>
        </Card>
        
      </div>
    </div>
  </>
 
  )
}

export default page