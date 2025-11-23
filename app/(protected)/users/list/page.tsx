import HeaderSideBar from "@/app/components/HeaderSideBar";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchAllUsers } from "@/app/lib/user-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listado de usuarios",
};

const page = async () => {
  const data = await fetchAllUsers();

  return (
    <>
      <HeaderSideBar
        title="Listado de usuarios"
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
              <DataTable columns={columns} data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
