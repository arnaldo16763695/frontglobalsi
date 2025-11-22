import HeaderSideBar from "@/app/components/HeaderSideBar";
import React from "react";
import { DataTableProject } from "./data-table";
import { columns } from "./columns";
import { fetchAllProjects } from "@/app/lib/orders-data";

const ListProjectPage = async () => {
  const data = await fetchAllProjects();
  return (
    <>
      <HeaderSideBar
        title="Listado de ordenes"
        before="Inicio"
        href="/dashboard"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
          {data === null ? (
            <p className="p-6 text-center text-red-500">
              No se pudo conectar a la base de datos o al servidor.
            </p>
          ) : (
            <DataTableProject columns={columns} data={data} />
          )}
        </div>
      </div>
    </>
  );
};

export default ListProjectPage;
