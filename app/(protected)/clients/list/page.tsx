import HeaderSideBar from "@/app/components/HeaderSideBar";
import { columns } from "./columns";
import { DataTableClient } from "./data-table";
import React from "react";

import { fetchAllClients } from "@/app/lib/client-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clientes",
};
const listClientsPage = async () => {
  const data = await fetchAllClients();

  return (
    <>
      <HeaderSideBar
        title="Listado de Clientes"
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
              <DataTableClient columns={columns} data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default listClientsPage;
