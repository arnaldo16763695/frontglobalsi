import HeaderSideBar from "@/app/components/HeaderSideBar";
import React from "react";
import { DataTableProject } from "./data-table";
import { columns } from "./columns";
import { fetchAllProjects } from "@/app/lib/orders-data";

const ListProjectPage = async () => {
  const data = await fetchAllProjects();
  // console.log(data);
  return (
    <>
      <HeaderSideBar
        title="Listado de ordenes"
        before="Inicio"
        href="/dashboard"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <DataTableProject columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default ListProjectPage;
