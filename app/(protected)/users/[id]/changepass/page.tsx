import HeaderSideBar from "@/app/components/HeaderSideBar";
import FormChangePass from "@/app/components/users/FormChangePass";
import { fetchOneUser } from "@/app/lib/user-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Restablecer contraseña de usuario',
};
const changePassPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const user = await fetchOneUser(params.id);
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
