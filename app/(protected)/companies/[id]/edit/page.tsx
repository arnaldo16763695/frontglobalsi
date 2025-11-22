import FormEditCompany from "@/app/components/companies/FormEditCompany";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import { fetchOneCompany } from "@/app/lib/company-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchAllClients } from "@/app/lib/client-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edición de empresas",
};
const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const company = await fetchOneCompany(params.id);
  const clients = await fetchAllClients();

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
            <CardHeader className="text-2xl font-bold">
              Edición de empresa
            </CardHeader>
            <CardContent>
              {clients === null ? (
                <p className="p-6 text-center text-red-500">
                  No se pudo conectar a la base de datos o al servidor.
                </p>
              ) : (
                <FormEditCompany company={company} clients={clients} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
