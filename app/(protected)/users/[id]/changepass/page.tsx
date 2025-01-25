import HeaderSideBar from "@/app/components/HeaderSideBar";
import FormChangePass from "@/app/components/users/FormChangePass";
import { fetchOneUser } from "@/app/lib/user-data";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { redirect } from "next/navigation";

const changePassPage = async ({ params }: { params: { id: string } }) => {
  const user = await fetchOneUser(params.id);
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <>
      <HeaderSideBar
        title="Restablecer contraseña de usuario"
        before="Listado de usuarios"
        href="/users/list"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 flex justify-center items-center rounded-xl bg-muted/50 md:min-h-min">
          <Card className="md:w-[60%] w-[95%]">
            <CardHeader>Restablecer contraseña de: {user.name}</CardHeader>
            <CardContent>
              <FormChangePass user={user} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default changePassPage;
