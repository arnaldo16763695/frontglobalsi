import FormEditClient from "@/app/components/clients/FormEditClient";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import { fetchOneClient } from "@/app/lib/client-data";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { redirect } from "next/navigation";

const editClientPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  const client = await fetchOneClient(params.id);
  return (
    <>
      <HeaderSideBar
        title="Registro cliente"
        before="Listado de clientes"
        href="/cients/list"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 flex justify-center items-center rounded-xl bg-muted/50 md:min-h-min">
          <Card className="md:w-[60%] w-[95%]">
            <CardHeader>Edición de cliente</CardHeader>
            <CardContent>
              <FormEditClient client={client}/>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default editClientPage;
