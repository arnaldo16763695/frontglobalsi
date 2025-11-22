import React from "react";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormAddOrder from "@/app/components/projects/FormAddOrder";
import { fetchAllCompanies } from "@/app/lib/company-data";

const regiterProjectPage = async () => {
  const companies = await fetchAllCompanies();
  return (
    <>
      <HeaderSideBar
        title="Registro de orden"
        before="Listado de ordenes"
        href="/projects/list"
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 flex justify-center items-center rounded-xl bg-muted/50 md:min-h-min">
          <Card className="md:w-[80%] w-[95%]">
            <CardHeader className="text-2xl font-bold">
              Registro de ordenes
            </CardHeader>
            <CardContent>
              {companies === null ? (
                <p className="p-6 text-center text-red-500">
                  No se pudo conectar a la base de datos o al servidor.
                </p>
              ) : (
                <FormAddOrder companies={companies} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default regiterProjectPage;
