import HeaderSideBar from "@/app/components/HeaderSideBar";
import { columns } from "./columns";
import { DataTableClient } from "./data-table";

import { fetchAllClients } from "@/app/lib/client-data";

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
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <DataTableClient columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default listClientsPage;
