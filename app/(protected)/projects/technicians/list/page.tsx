import React from "react";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import {fetchAllOrdersByIdTech} from '@/app/lib/orders-data'
import { auth } from "@/auth";
import { DataTableOrdersTech } from "./data-table";
import { columns } from "./columns";

const TechProjectsList = async () => {
  const session = await auth();
  const data = await fetchAllOrdersByIdTech(session?.user?.id || ""); 
  return (
    <>
      <HeaderSideBar
        title="Listado de Ordenes"
        before="Inicio"
        href="/dashboard"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <DataTableOrdersTech columns={columns} data={data} /> 
        </div>
      </div>
    </>
  );
};

export default TechProjectsList;
