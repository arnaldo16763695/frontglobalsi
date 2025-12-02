import React from "react";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import {fetchAllOrdersFinoshedByIdTech} from '@/app/lib/orders-data'
import { auth } from "@/auth";
import { DataTableFinishedOrdersTech } from "./data-table";
import { columns } from "./columns";

const TechProjectsList = async () => {
  const session = await auth();
  const data = await fetchAllOrdersFinoshedByIdTech(session?.user?.id || ""); 
  return (
    <>
      <HeaderSideBar
        title="Ordenes Finalizadas"
        before="Inicio"
        href="/dashboard"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="w-full max-w-[100vw] overflow-x-auto">
          <DataTableFinishedOrdersTech columns={columns} data={data} /> 
        </div>
      </div>
    </>
  );
};

export default TechProjectsList;
