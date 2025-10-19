import React from "react";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import FormEditPofile from "@/app/components/users/profile/FormEditPofile";
import { fetchOneProfile } from "@/app/lib/user-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export type User = {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  status: string;
};
async function EditProfilePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const user = await fetchOneProfile(params.id);
  const session = await auth();

  if (session?.user.id !== user.id) {
    return redirect("/dashboard");
  }

  console.log('este es mi usuario',user)

  return (
    <>
      <HeaderSideBar title="Editar perfil" before="Inicio" href="/dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 flex justify-center items-center rounded-xl bg-muted/50 md:min-h-min">
          <Card className="md:w-[60%] w-[95%]">
            <CardHeader>Edición de perfil</CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`/${user.avatar}`} />
                    <AvatarFallback>Globalsi</AvatarFallback>
                  </Avatar>
                  <Pencil className="ml-2" />
                </div>
                <div className="flex flex-col gap-2 ">
                  <h1 className="text-xs md:text-sm font-bold">{user.name}</h1>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <FormEditPofile user={user} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default EditProfilePage;
