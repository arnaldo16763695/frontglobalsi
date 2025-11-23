import HeaderSideBar from "@/app/components/HeaderSideBar";
import { DataTableCompany } from "./data-table";
import { columns } from "./columns";
import { fetchAllCompanies } from "@/app/lib/company-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empresas",
};
const page = async () => {
  const data = await fetchAllCompanies();

  return (
    <>
      <HeaderSideBar
        title="Listado de empresas"
        before="Inicio"
        href="/dashboard"
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min overflow-x-hidden">
          {data === null ? (
            <p className="p-6 text-center text-red-500">
              No se pudo conectar a la base de datos o al servidor.
            </p>
          ) : (
            <div className="w-full max-w-[100vw] overflow-x-auto">
              <DataTableCompany columns={columns} data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
