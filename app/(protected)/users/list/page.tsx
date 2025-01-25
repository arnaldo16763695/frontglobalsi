import HeaderSideBar from "@/app/components/HeaderSideBar";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchAllUsers } from "@/app/lib/user-data";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

const page = async () => {
  const data = await fetchAllUsers();

  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return redirect("/");
  }

  return (
    <>
      <HeaderSideBar title="Listado de usuarios" before="Inicio" href="/" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default page;
