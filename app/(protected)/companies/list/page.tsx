import HeaderSideBar from "@/app/components/HeaderSideBar";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DataTableCompany } from "./data-table";
import { columns } from "./columns";
import { fetchAllCompanies } from "@/app/lib/company-data";

const page = async () => {
  const data = await fetchAllCompanies();

  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return redirect("/");
  }
  return (
    <>
      <HeaderSideBar title="Listado de empresas" before="Inicio" href="/" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <DataTableCompany columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default page;
