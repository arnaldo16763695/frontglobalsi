import HeaderSideBar from "@/app/components/HeaderSideBar";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchAllUsers } from "@/app/lib/user-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Listado de usuarios',
};

const page = async () => {
  const data = await fetchAllUsers();


  return (
    <>
      <HeaderSideBar title="Listado de usuarios" before="Inicio" href="/dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <DataTable columns={columns} data={data}  />
        </div>
      </div>
    </>
  );
};

export default page;
