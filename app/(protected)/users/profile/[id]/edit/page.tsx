import React from "react";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import { fetchOneProfile } from "@/app/lib/user-data";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CardProfile from "@/app/components/users/profile/CardProfile";

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
         <CardProfile user={user} />
        </div>
      </div>
    </>
  );
}

export default EditProfilePage;
