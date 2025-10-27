"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AvatarProfile from "./Avatar";
import { DialogChangePass } from "./DialogChangePass";
import FormEditPofile from "./FormEditPofile";
import { User } from "@/lib/types";
import { useState } from "react";

function CardProfile({ user }: { user: User }) {
    const [showButton, setShowButton] = useState<boolean>(true);
  return (
    <Card className="md:w-[60%] w-[95%]">
      <CardHeader>Edición de perfil</CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center">
            <AvatarProfile user={user} setShowButton={setShowButton} />
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="text-xs md:text-sm font-bold">{user.name}</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {user.email}
            </p>
            <DialogChangePass user={user} />
          </div>
        </div>
        <FormEditPofile user={user} showButton={showButton} />
      </CardContent>
    </Card>
  );
}

export default CardProfile;
