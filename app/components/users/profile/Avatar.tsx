"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadButton } from "@/app/components/uploads/uploadthing";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

interface AvatarProps {
  user: {
    avatar: string;
    id: string;   
  };
  setShowButton: (show: boolean) => void;
}
function AvatarProfile({ user, setShowButton }: AvatarProps) {
  const router = useRouter();
  const [upload, setUpload] = useState(false);
  return (
    <>
      <Avatar className="h-24 w-24">
        <AvatarImage src={`${user.avatar}`} />
        <AvatarFallback>Globalsi</AvatarFallback>
      </Avatar>
      {upload ? <UploadButton
        endpoint="imageUploader"
        className="ml-2 mt-4 ut-button:bg-slate-500 ut-button:ut-readying:bg-slate-500/50"
        onClientUploadComplete={() => {
          setUpload(false);
          setShowButton(true);
          router.refresh()
        }} 
        onUploadProgress={() => {
          setShowButton(false);
        }}       
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
          setUpload(false)
          setShowButton(true);
        }}        
      />
      : <span title="Editar avatar" onClick={() => setUpload(true)}><Pencil className="cursor-pointer ml-2" /></span>	
      }
    </>
  );
}

export default AvatarProfile;
