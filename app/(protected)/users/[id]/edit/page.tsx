import HeaderSideBar from "@/app/components/HeaderSideBar";
import FormEditUser from "@/app/components/users/FormEditUser";
import { fetchOneUser } from "@/app/lib/user-data";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { redirect } from "next/navigation";

const editUserPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const user = await fetchOneUser(params.id);


  // if(user.error ==='Not Found'){
  //   redirect('/')
  // }

  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <>
      <HeaderSideBar
        title="Editar usuario"
        before="Listado de usuarios"
        href="/users/list"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 flex justify-center items-center rounded-xl bg-muted/50 md:min-h-min">
          <Card className="md:w-[60%] w-[95%]">
            <CardHeader>Edición de usuarios</CardHeader>
            <CardContent>
              <FormEditUser user={user} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default editUserPage;
