import FormRegisterClient from "@/app/components/clients/FormRegisterClient";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { redirect } from "next/navigation";

const registerClientPage = async () => {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <>
      <HeaderSideBar
        title="Registro cliente"
        before="Listado de clientes"
        href="/clients/list"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 flex justify-center items-center rounded-xl bg-muted/50 md:min-h-min">
          <Card className="md:w-[80%] w-[95%]">
            <CardHeader className='text-2xl font-bold'>Registro de cliente</CardHeader>
            <CardContent>
              <FormRegisterClient />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default registerClientPage;
