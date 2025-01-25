import HeaderSideBar from "@/app/components/HeaderSideBar";
import FormRegister from "@/app/components/users/FormRegister";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { redirect } from "next/navigation";

const registerPage = async () => {
  const session = await auth()
  if (session?.user?.role!=='ADMIN') {
    redirect('/')
  }
  return (
    <>
      <HeaderSideBar
        title="Crear usuario"
        before="Listado de usuarios"
        href="/users/list"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 flex justify-center items-center rounded-xl bg-muted/50 md:min-h-min">
        <Card className="md:w-[60%] w-[95%]" >
            <CardHeader>Registro de usuarios</CardHeader>
            <CardContent>
              <FormRegister />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default registerPage;
