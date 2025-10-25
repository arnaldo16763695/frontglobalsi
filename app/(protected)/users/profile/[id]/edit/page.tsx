import React from "react";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import FormEditPofile from "@/app/components/users/profile/FormEditPofile";
import { fetchOneProfile } from "@/app/lib/user-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AvatarProfile from "@/app/components/users/profile/Avatar";
import { DialogChangePass } from "@/app/components/users/profile/DialogChangePass";

async function EditProfilePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const user = await fetchOneProfile(params.id);
  const session = await auth();

  if (session?.user.id !== user.id) {
    return redirect("/dashboard");
  }

  return (
    <>
      <HeaderSideBar title="Editar perfil" before="Inicio" href="/dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] py-2 flex-1 flex justify-center items-center rounded-xl bg-muted/50 md:min-h-min">
          <Card className="md:w-[60%] w-[95%]">
            <CardHeader>Edición de perfil</CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center">
                   <AvatarProfile user={user} /> 
                </div>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <h1 className="text-xs md:text-sm font-bold">{user.name}</h1>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {user.email}
                  </p>
                  <DialogChangePass user={user} /> 
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
